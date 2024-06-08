import { useEffect, useState, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import ApexChart from "react-apexcharts"
import { BsBarChartSteps } from "react-icons/bs"
import { toast } from "react-toastify"

import { schedulingActions } from "@/store"
import { paths, mutilSeriesRangeBarChartConfig } from "@/config"
import { orderApi, hierarchyApi, InjectionMachineApi, workOrderApi } from "@/services/api"
import { useCallApi } from "@/hooks"
import {
    getEquipmentListOfMaterial,
    isoToTimestamp,
    addTimeToDateTime,
    subTimeToDateTime,
    compareTime,
    formatDateTime,
    getCurrentDateTime,
    getPrerequisteOperationList,
    convertDateFormat,
    handleProducSchedulingWorkCenterData,
    poperListMapper,
} from "@/utils/functions"

import SelectInput from "@/components/SelectInput"
import Button from "@/components/Button"
import Card from "@/components/Card"
import { Log } from "oidc-react"
import { ProductSchedulingDisplayToggle } from "./ProductSchedulingDisplayToggle"

// function extractWorkUnits(data) {
//     let workUnits = []

//     // Lặp qua từng đối tượng trong mảng dữ liệu
//     data.forEach((enterprise) => {
//         // Lặp qua từng site của doanh nghiệp
//         enterprise.sites.forEach((site) => {
//             // Lặp qua từng khu vực của site
//             site.areas.forEach((area) => {
//                 // Lặp qua từng trung tâm làm việc của khu vực
//                 area.workCenters.forEach((workCenter) => {
//                     // Thêm tất cả các đơn vị làm việc vào mảng workUnits
//                     workUnits = workUnits.concat(workCenter.workUnits)
//                 })
//             })
//         })
//     })

//     return workUnits
// }
function extractWorkCenters(data) {
    let workCenters = []
    // Duyệt qua mỗi phần tử trong mảng dữ liệu
    data.forEach((enterprise) => {
        // Duyệt qua mỗi site của doanh nghiệp
        enterprise.sites.forEach((site) => {
            // Duyệt qua mỗi khu vực của site
            site.areas.forEach((area) => {
                // Thêm các workCenter của khu vực vào mảng workCenters
                workCenters = workCenters.concat(area.workCenters)
            })
        })
    })
    return workCenters
}
function ProductSScheduling() {
    const callApi = useCallApi()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { shifts } = useSelector((state) => state.setting)
    const shiftOptions = shifts.map((item, index) => ({ key: item.description, value: index }))
    const schedulingProducts = useSelector((state) => state.scheduling.schedulingProducts) // lưu list đơn sản xuất đang được điều độ
    const [equipments, setEquipments] = useState([])
    const [showChart, setShowChart] = useState(false)
    const [chartSeries, setChartSeries] = useState([])
    const [workCenter, setWorkCenter] = useState([])
    const [workCenterList, setWorkCenterList] = useState([])
    const [statusFilter, setStatusFilter] = useState(0)

    const outputs = useRef([])
    const handleSetValue = (index, keysAndValues) => {
        const newValue = schedulingProducts.map((item, _index) =>
            index !== _index ? item : { ...item, ...keysAndValues },
        )
        dispatch(schedulingActions.setSchedulingProducts(newValue))
    }
    const fetchData = useCallback(() => {
        callApi([hierarchyApi.enterprise.getEnterprise()], (res) => {
            // setWorkCenterList(poperListMapper(extractWorkUnits(res[0].items), "absolutePath", "absolutePath"))
            // console.log(extractWorkCenters(res[0].items))
            setWorkCenterList(poperListMapper(extractWorkCenters(res[0].items), "absolutePath", "absolutePath"))
        })
    }, [callApi])
    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleSubmit = () => {
        // const { data, valid } = handleScheduledData(schedulingProducts, shifts, true)

        // if (valid) {
        const apis = schedulingProducts.map((item) =>
            orderApi.workOrder.updateWorkOrders(item, item.manufacturingOrder, item.workOrderId),
        )

        callApi(
            apis,
            (res) => {
                navigate(paths.schedule)
                dispatch(schedulingActions.removeSchedulingProducts())
            },
            "Tạo kế hoạch sản xuất thành công",
        )
    }
    const handleAutoScheduling = async () => {
        console.log(schedulingProducts)
        let payload = schedulingProducts.map((item) => ({
            ...item,
            manufacturingOrderId: item.manufacturingOrder,
            workOrderId: item.workOrderId,
        }))

        let data = {
            workOrderIds: payload,
            schedulingOptions: {
                overridingOptions: {
                    overridingStrategy: 0,
                },
                optimizationOptions: {
                    optimizationStrategy: 0,
                    groupingAllowed: true,
                    tabuSearchOptions: {
                        maxIterations: 20,
                        tabuListSize: 10,
                    },
                },
                planningOptions: {
                    splittingAllowed: true,
                },
            },
        }

        try {
            const response = await workOrderApi.autoScheduling.autoScheduling(data)
            // Handle the response data here

            let dispatchData = response.map((item) => ({
                ...item,
                workOrderStatus: 2,
                startTime: item.startTime.split(".")[0],
                endTime: item.endTime.split(".")[0],
            }))
            dispatch(schedulingActions.setSchedulingProducts(dispatchData))
            toast.success("Tự động điều độ thành công!") // Add this line
        } catch (error) {
            // Handle errors here
            console.error(error)
            toast.error("Failed to dispatch data.") // Add this line
        }
    }
    useEffect(() => {
        let chartData = schedulingProducts.map((item) => {
            return {
                name: item.workOrderId,
                data: [
                    { x: item.manufacturingOrder, y: [isoToTimestamp(item.startTime), isoToTimestamp(item.endTime)] },
                ],
            }
        })
        setChartSeries(chartData)
    }, [schedulingProducts, shifts])

    // useEffect(() => {}, [schedulingProducts[0].startTime])
    return (
        <div
            data-component="ProductSScheduling"
            className="3xl:scroll-x container h-full 3xl:w-[calc(100vw-120px)] 3xl:px-2"
        >
            <div className=" flex items-center gap-5 pb-5">
                <Button onClick={handleSubmit}>Xác nhận điều độ sản xuất</Button>
                {/* <Button onClick={() => setShowChart(!showChart)} transparent={!showChart}>
                    <BsBarChartSteps />
                </Button> */}
                <Button onClick={handleAutoScheduling} className="ml-auto">
                    Tự động điều độ
                </Button>
                <div className="ml-5">
                    <ProductSchedulingDisplayToggle filter={statusFilter} setFilter={setStatusFilter} />
                </div>
            </div>
            {statusFilter != 0 && (
                <Card className="scroll-y mb-5 max-h-[50%] w-full">
                    <ApexChart
                        series={chartSeries}
                        options={mutilSeriesRangeBarChartConfig}
                        type="rangeBar"
                        height={chartSeries.length * 100}
                        width="100%"
                    />
                </Card>
            )}
            {statusFilter != 1 && (
                <>
                    {schedulingProducts.length > 0 ? (
                        <Card className="flex w-full flex-col">
                            <div className="flex w-full min-w-[1660px] gap-8 border-b border-primary-3 pb-2 pt-2">
                                <div className="text-16-b w-40">Id đơn công đoạn</div>
                                <div className="text-16-b w-40">Id đơn sản xuất</div>
                                {/* <div className="text-16-b w-20">Trạng thái</div> */}
                                <div className="text-16-b grow">Khu làm việc</div>
                                <div className="text-16-b w-[250px]">Thời gian bắt đầu</div>
                                <div className="text-16-b w-[250px]">Thời gian kết thúc</div>
                                <div className="text-16-b w-[200px] pr-5">Ngày đến hạn</div>
                            </div>
                            <div className="w-full min-w-[1660px]">
                                {schedulingProducts.map((item, index) => (
                                    <SchedulingItem
                                        item={item}
                                        index={index}
                                        schedulingProducts={schedulingProducts}
                                        handleSetValue={handleSetValue}
                                        workCenterList={workCenterList}
                                    />
                                ))}
                            </div>
                        </Card>
                    ) : (
                        <h2>Không có đơn công đoạn cần điều độ</h2>
                    )}
                </>
            )}
        </div>
    )
}

export default ProductSScheduling

function SchedulingItem({ item, index, schedulingProducts, handleSetValue, workCenterList }) {
    const callApi = useCallApi()

    const [workCenterOutput, setWorkCenterOutput] = useState([])
    useEffect(() => {
        callApi(
            () => hierarchyApi.WorkCenterOutput.getWorkCenterOutput(item.manufacturingOrder),
            (res) => {
                setWorkCenterOutput(getPrerequisteOperationList(res, "workCenter", "workCenter"))
            },
        )
    }, [])
    return (
        <div className="my-4 w-full" key={index}>
            <div className="flex items-end gap-8 border-b border-primary-3 pb-2">
                <div className="w-40">{item.workOrderId}</div>
                <div className="w-40">{item.manufacturingOrder}</div>
                {/* <div className="w-20">{item.workOrderStatus}</div> */}
                <div className="grow">
                    <select
                        className="h-8 cursor-pointer"
                        label="Khu làm việc"
                        value={schedulingProducts[index].workCenter}
                        onChange={(e) => {
                            let tempWorkCenter = e.target.value
                            handleSetValue(index, { workCenter: tempWorkCenter })
                        }}
                    >
                        <option value="">Vui lòng chọn một khu làm việc...</option>
                        {workCenterList.map((item) => (
                            <option className="h-10" value={item.key}>
                                {item.value}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex w-[250px] items-end">
                    <input
                        type="datetime-local"
                        className="text-16-m cursor-pointer"
                        value={schedulingProducts[index].startTime ?? ""}
                        onChange={(e) => {
                            let tempStartTime = e.target.value
                            let tempEndTime = addTimeToDateTime(tempStartTime, item.duration)
                            if (compareTime(tempEndTime, item.dueDate) != 1) {
                                handleSetValue(index, { endTime: tempEndTime, startTime: tempStartTime })
                            } else {
                                toast.error("Ngày kết thúc phải trước ngày đến hạn")
                            }
                        }}
                    />
                </div>
                <div className="flex w-[250px] items-end">
                    <input
                        type="datetime-local"
                        className="text-16-m cursor-pointer"
                        value={schedulingProducts[index].endTime ?? ""}
                        onChange={(e) => {
                            let tempEndTime = e.target.value
                            let tempStartTime = subTimeToDateTime(tempEndTime, item.duration)
                            if (
                                compareTime(tempEndTime, formatDateTime(schedulingProducts[index].startTime)) != -1 &&
                                compareTime(tempEndTime, item.dueDate) != 1
                            ) {
                                handleSetValue(index, { endTime: tempEndTime, startTime: tempStartTime })
                            } else {
                                toast.error("Ngày kết thúc phải sau ngày bắt đầu và trước ngày đến hạn")
                            }
                        }}
                    />
                </div>
                <div className="w-[200px]">{convertDateFormat(item.dueDate)}</div>
            </div>
        </div>
    )
}
