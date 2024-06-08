import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import { useCallApi } from "@/hooks"
import Card from "@/components/Card"
import Radialbar from "@/components/Radialbar"
import Progressbar from "@/components/Progressbar"
import ValueItem from "@/components/ValueItem"
import { paths } from "@/config"
import { workOrderApi, resourceApi, oeeApi, hierarchyApi, orderApi, InjectionMachineApi } from "@/services/api"
import PieChart from "@/components/PieChart"
import TreeView from "@/components/TreeView/TreeView"
import { handleOeeData } from "@/utils/functions"
function getStatusArray(arr) {
    let statusObj = {
        isScheduled: [],
        running: [],
        complete: [],
    }

    arr.forEach((item) => {
        switch (item.workOrderStatus) {
            case 2:
                statusObj.isScheduled.push(item)
                break
            case 3:
                statusObj.running.push(item)
                break
            case 4:
                statusObj.complete.push(item)
                break
            default:
                break
        }
    })

    return {
        isScheduled: statusObj.isScheduled.length,
        running: statusObj.running.length,
        complete: statusObj.complete.length,
    }
}
function Dashboard() {
    const navigate = useNavigate()
    const callApi = useCallApi()
    const [data, setData] = useState({
        averageOee: {
            oee: 0,
            a: 0,
            p: 0,
            q: 0,
        },
    })
    const [oeeData, setOeeData] = useState([])
    const [companyHierachyData, setCompanyHierachyData] = useState([])
    const [workOrders, setWorkOrders] = useState([])
    const [resourceCount, setResourceCount] = useState({
        equipmentClass: 0,
        equipment: 0,
        injectionMachine: 0,
        mold: 0,
        materialClass: 0,
        material: 0,
        plasticProduct: 0,
        plasticMaterial: 0,
    })

    const [selectingNode, setSelectingNode] = useState({
        name: "",
        id: "",
        path: "",
        idKey: "enterpriseId",
        idEditKey: "",
        title: "Thêm enterprise",
        editTitle: "Sửa enterprise",
    })
    const { oeeDuration } = useSelector((state) => state.setting)
    const fetchCompanyHierachy = useCallback(() => {
        callApi(hierarchyApi.enterprise.getEnterprise, (res) => {
            setCompanyHierachyData(res.items)
        })
    }, [callApi])
    useEffect(() => {
        fetchCompanyHierachy()
    }, [fetchCompanyHierachy])
    const fetchWorkOrders = useCallback(() => {
        callApi([orderApi.workOrder.getWorkOrders("")], ([workOrder]) => {
            setWorkOrders(getStatusArray(workOrder.items))
        })
    }, [callApi])
    useEffect(() => {
        fetchWorkOrders()
    }, [fetchWorkOrders])

    const getOeeData = useCallback(() => {
        callApi(
            () => oeeApi.getOee(50),
            workOrderApi.getWorkOrders(),

            (data) => {
                console.log(data[1])
                setOeeData(data[0])
            },
        )
    }, [callApi])
    useEffect(() => {
        getOeeData()
    }, [getOeeData])

    const getCountResourceData = useCallback(() => {
        return callApi(
            [
                resourceApi.equipment.getEquipmentClasses(),
                resourceApi.equipment.getEquipments(),
                InjectionMachineApi.injectionMachine.getInjectionMachine(),
                InjectionMachineApi.mold.getMold(),

                resourceApi.material.getMaterialClasses(),
                resourceApi.material.getMaterials(),
                InjectionMachineApi.plasticProduct.getPlasticProduct(),
                InjectionMachineApi.plasticMaterial.getPlasticMaterial(),
            ],
            (res) => {
                setResourceCount({
                    equipmentClass: res[0].totalItems,
                    equipment: res[1].totalItems,
                    injectionMachine: res[2].totalItems,
                    mold: res[3].totalItems,

                    materialClass: res[4].totalItems,
                    material: res[5].totalItems,
                    plasticProduct: res[6].totalItems,
                    plasticMaterial: res[7].totalItems,
                })
            },
        )
    }, [callApi])
    useEffect(() => {
        getCountResourceData()
    }, [getCountResourceData])
    console.log(resourceCount)
    return (
        <div data-component="Dashboard" className="container h-full">
            <div className="flex h-[340px] w-full gap-5">
                <Card className="flex flex-1 cursor-pointer flex-col items-center transition-all hover:shadow-sub">
                    <h3>Tiến độ sản xuất</h3>
                    <PieChart
                        width={450}
                        value={[workOrders.isScheduled, workOrders.running, workOrders.complete]}
                        labels={[
                            "Chưa sản xuất: " + workOrders.isScheduled,
                            "Đang sản xuất: " + workOrders.running,
                            "Đã hoàn thành: " + workOrders.complete,
                        ]}
                        color={["#D24545", "#2C7865", "#387ADF"]}
                    />
                </Card>
                <Card className="flex w-full flex-1 cursor-pointer flex-col items-center transition-all hover:shadow-sub">
                    <h3>Chỉ số OEE</h3>
                    <div className="flex  w-full items-center">
                        <div className="flex  flex-col items-center">
                            <Radialbar value={oeeData?.oee * 100} width={300} fontSize={24} />
                            <h3>OEE</h3>
                        </div>

                        <div className=" mt-8 flex-1">
                            <div className="mb-4 flex items-center">
                                <span className="mr-2 text-xl font-bold text-primary-1">A</span>
                                <Progressbar
                                    height={36}
                                    textLimit={30}
                                    value={oeeData?.a * 100}
                                    className="grow"
                                    unit="%"
                                    color="#3468C0"
                                    fixed={2}
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <span className="mr-2 text-xl font-bold text-primary-1">P</span>
                                <Progressbar
                                    height={36}
                                    textLimit={30}
                                    value={oeeData?.p * 100}
                                    className="grow"
                                    unit="%"
                                    color="#3652AD"
                                    fixed={2}
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <span className="mr-2 text-xl font-bold text-primary-1">Q</span>
                                <Progressbar
                                    height={36}
                                    textLimit={30}
                                    value={oeeData?.q * 100}
                                    className="grow"
                                    unit="%"
                                    color="#365486"
                                    fixed={2}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex h-[calc(100%-350px)] min-h-[300px] w-full gap-5 py-5">
                <Card className="flex-2 w-1/4 cursor-pointer transition-all hover:shadow-sub">
                    <h3 className="mb-3 text-center">Thiết bị</h3>
                    <div className="mb-4 mt-4 flex items-center text-lg">
                        <p className="ml-4 w-60  font-bold">Số loại thiết bị</p>
                        <p className="">{resourceCount.equipmentClass} </p>
                    </div>
                    <div className="mb-4 mt-4 flex items-center text-lg">
                        <p className="ml-4 w-60  font-bold">Số thiết bị</p>
                        <p className="">{resourceCount.equipment} </p>
                    </div>
                    {/* <div className="mb-4 mt-4 flex items-center text-lg">
                        <p className="ml-4 w-60  font-bold">Số máy ép</p>
                        <p className="">{resourceCount.injectionMachine} </p>
                    </div>
                    <div className="mb-4 mt-4 flex items-center text-lg">
                        <p className="ml-4 w-60  font-bold">Số khuôn</p>
                        <p className="">{resourceCount.mold} </p>
                    </div> */}
                </Card>
                <Card className="flex-2 w-1/4 cursor-pointer transition-all hover:shadow-sub">
                    <h3 className="mb-3 text-center">Vật tư</h3>
                    <div className="mb-4 mt-4 flex items-center text-lg">
                        <p className="ml-4 w-60  font-bold">Số loại vật tư</p>
                        <p className="">{resourceCount.materialClass} </p>
                    </div>
                    <div className="mb-4 mt-4 flex items-center text-lg">
                        <p className="ml-4 w-60  font-bold">Số vật tư</p>
                        <p className="">{resourceCount.material} </p>
                    </div>
                    {/* <div className="mb-4 mt-4 flex items-center text-lg">
                        <p className="ml-4 w-60  font-bold">Số sản phẩm ép</p>
                        <p className="">{resourceCount.plasticProduct} </p>
                    </div>
                    <div className="mb-4 mt-4 flex items-center text-lg">
                        <p className="ml-4 w-60  font-bold">Số nguyên liệu nhựa</p>
                        <p className="">{resourceCount.plasticMaterial} </p>
                    </div> */}
                </Card>

                <Card className="scroll-y  h-full w-1/2 cursor-pointer transition-all hover:shadow-sub">
                    <h3>Phân cấp nhà máy</h3>
                    <TreeView
                        companyHierachyData={companyHierachyData}
                        setSelectingNode={setSelectingNode}
                        selectingNode={selectingNode}
                    />
                </Card>
            </div>
        </div>
    )
}

export default Dashboard
