import Card from "@/components/Card"
import PieChart from "@/components/PieChart"
import Radialbar from "@/components/Radialbar"
import { useCallApi } from "@/hooks"
import { CMMSChartAPi, CMMSMaintenanceRequestApi } from "@/services/api"
import { useCallback, useEffect, useState } from "react"
import CMMSDashboarDayToggle from "./CMMSDashboarDayToggle/CMMSDashboarDayToggle"
import { handleCNMMSDashboardEquipmentErrorData } from "@/utils/functions"
import ColumnChart from "@/components/ColumnChart"

function CMMSDashboard() {
    const callApi = useCallApi()

    const [dashboardData, setDashboardData] = useState()
    const [equipmentErrorData, setEquipmentErrorData] = useState([])
    const [dayToggle, setDayToggle] = useState(0)
    const [maintenanceProgress, setMaintenanceProgress] = useState([0, 0, 0, 0])
    const [maintenanceProgressLabel, setMaintenanceProgressLabel] = useState([
        "Chưa bắt đầu",
        "Đang bảo trì",
        "Đang xem xét",
        "Đã hoàn thành",
    ])
    const fetchData = useCallback(() => {
        callApi(
            [
                CMMSChartAPi.dashboard.getDashboarData(dayToggle),
                CMMSMaintenanceRequestApi.maintenanceResponses.getMaintenanceResponseByStatus(0),
                CMMSMaintenanceRequestApi.maintenanceResponses.getMaintenanceResponseByStatus(1),
                CMMSMaintenanceRequestApi.maintenanceResponses.getMaintenanceResponseByStatus(2),
                CMMSMaintenanceRequestApi.maintenanceResponses.getMaintenanceResponseByStatus(3),
            ],
            (res) => {
                setDashboardData(res[0])
                setEquipmentErrorData(handleCNMMSDashboardEquipmentErrorData(res[0].equipmentCauses))
                setMaintenanceProgress([res[1].totalItems, res[2].totalItems, res[3].totalItems, res[4].totalItems])
                setMaintenanceProgressLabel([
                    "Chưa bắt đầu: " + res[1].totalItems,
                    "Đang bảo trì: " + res[2].totalItems,
                    "Đang xem xét: " + res[3].totalItems,
                    "Đã hoàn thành: " + res[4].totalItems,
                ])
            },
        )
    }, [callApi, dayToggle])
    console.log(equipmentErrorData)
    useEffect(() => {
        fetchData()
    }, [fetchData])
    return (
        <>
            <div className="">
                <div className="mb-2 flex">
                    <Card className="flex w-fit flex-1 flex-col items-center  bg-neutron-4">
                        <h3 className="text-center">Tiến độ bảo trì</h3>
                        <PieChart
                        width={450}
                            value={maintenanceProgress}
                            labels={maintenanceProgressLabel}
                            color={["#D24545", "#2C7865", "#FFAF45", "#387ADF"]}
                        />
                    </Card>
                    <Card className="ml-5 w-fit flex-1 bg-neutron-4">
                        <h3 className="text-center">Số lỗi của thiết bị</h3>
                        <ColumnChart width={450} data={equipmentErrorData} />
                    </Card>
                </div>

                <CMMSDashboarDayToggle filter={dayToggle} setFilter={setDayToggle} />
                <div className="mt-2 flex">
                    <Card className="flex w-[400px] flex-col items-center">
                        <h3>Tỉ lệ bảo trì khắc phục</h3>
                        <Radialbar
                            value={(dashboardData?.reactiveCompleted / dashboardData?.reactiveTotal) * 100}
                            width={300}
                            color="#00cc00"
                        />
                        <div className="mb-4 w-[300px] border border-primary-1"></div>

                        <div className="flex w-full justify-around">
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-bold">Tổng</p>
                                <p className="text-lg font-bold">{dashboardData?.reactiveTotal}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-bold">Hoàn thành</p>
                                <p className="text-lg font-bold">{dashboardData?.reactiveCompleted}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-bold">Tỉ lệ hoành thành</p>
                                <p className="text-lg font-bold">{dashboardData?.reactiveCompletionRate} %</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="ml-5 flex min-h-[400px] w-[400px] flex-col items-center">
                        <h3>Tỉ lệ bảo trì phòng ngừa</h3>
                        <Radialbar
                            value={(dashboardData?.preventiveCompleted / dashboardData?.preventiveTotal) * 100}
                            width={300}
                            color="#00cc00"
                        />
                        <div className="mb-4 w-[300px] border border-primary-1"></div>

                        <div className="flex w-full justify-around">
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-bold">Tổng</p>
                                <p className="text-lg font-bold">{dashboardData?.preventiveTotal}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-bold">Hoàn thành</p>
                                <p className="text-lg font-bold">{dashboardData?.preventiveCompleted}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-bold">Tỉ lệ hoành thành</p>
                                <p className="text-lg font-bold">{dashboardData?.preventiveCompletionRate} %</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="ml-5 flex min-h-[350px] w-[400px] flex-col items-center">
                        <h3>Tỉ lệ bảo trì ngoài kế hoạch</h3>
                        <Radialbar value={dashboardData?.reactiveToPreventiveRate} width={300} color="#00cc00" />
                        <div className="mb-4 w-[300px] border border-primary-1"></div>
                        <div className="flex flex-col items-center">
                            <p className="text-lg font-bold">Tỉ lệ bảo trì ngoài kế hoạch</p>
                            <p className="text-lg font-bold">{dashboardData?.reactiveToPreventiveRate} %</p>
                        </div>
                    </Card>
                    <Card className="ml-5 flex min-h-[350px] w-[520px] flex-col items-center">
                        <h3>Tỉ lệ phòng ngừa đúng hạn</h3>
                        <Radialbar value={dashboardData?.onTimePreventive * 100} width={300} color="#00cc00" />
                        <div className="mb-4 w-[400px] border border-primary-1"></div>
                        <div className="flex w-full justify-around">
                            <div className="flex flex-col items-center">
                                <p className="text-center text-lg font-bold">Hoàn thành đúng hạn</p>
                                <p className="text-lg font-bold">{dashboardData?.onTimePreventive}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-center text-lg font-bold">Hoàn thành trễ hạn</p>
                                <p className="text-lg font-bold">{dashboardData?.overDuePreventive}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-center text-lg font-bold">Chưa hoàn thành trễ hạn</p>
                                <p className="text-lg font-bold">{dashboardData?.overDuePreventiveInCompleted} %</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* <div className="mt-5 flex">
                    <Card className=" flex min-h-[400px] w-[400px] flex-col items-center">
                        <h3>Số lượng lỗi theo từng loại equipment</h3>
                    </Card>
                    <Card className="ml-5 flex min-h-[400px] w-[400px] flex-col items-center">
                        <h2>Tổng quan material</h2>
                    </Card>
                    <Card className="ml-5 flex min-h-[400px] w-[400px] flex-col items-center">
                        <h2>Chỉ số đánh giá ...</h2>
                    </Card>
                </div> */}
            </div>
        </>
    )
}

export default CMMSDashboard
