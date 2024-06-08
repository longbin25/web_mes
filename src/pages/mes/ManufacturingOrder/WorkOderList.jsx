import { useState, useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import cl from "classnames"
import { useNavigate, useLocation } from "react-router-dom"
import { MdOutlineClose } from "react-icons/md"

import Card from "@/components/Card"
import Button from "@/components/Button"
import Table from "@/components/Table"
import PoperMenu from "@/components/PoperMenu"
import Confirm from "@/components/Confirm"

import { usePoperMenu, useCallApi } from "@/hooks"
import { schedulingActions } from "@/store"
import { orderApi, hierarchyApi } from "@/services/api"
import { PRODUCTION_COMMAND_TABLE_COLUMNS } from "@/utils/tableColumns"
import { getProductionCommandMenuNav } from "@/utils/menuNavigation"
import { paths } from "@/config"
import { getPrerequisteOperationList, getCurrentDateTime, workOrderListMapper } from "@/utils/functions"

function WorkOderList() {
    const { active, position, handleClose, handleOpen } = usePoperMenu()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const callApi = useCallApi()
    const location = useLocation()
    const manufacturingOrderId = location.state

    const [workOrders, setWorkOrders] = useState([])
    const [workOrdersShowData, setWorkOrdersShowData] = useState([])
    const [initValue, setInitValue] = useState()
    const [schedulingOrders, setSchedulingOrders] = useState([])
    const [fourSelectData, setFourSelectData] = useState([]) // dùng để tạo select cho work center
    const [deleteConfirm, setDeleteConfirm] = useState({})
    const [prerequisiteOperations, setPrerequistteOperations] = useState([])

    const fetchData = useCallback(() => {
        callApi(
            [orderApi.workOrder.getWorkOrders(""), hierarchyApi.enterprise.getEnterprise()],
            ([workOrder, fourSelectData]) => {
                console.log(workOrder)
                setWorkOrders(
                    workOrder.items.map((item) => {
                        return {
                            ...item,
                            startTime: item.startTime == "0001-01-01T00:00:00" ? getCurrentDateTime() : item.startTime,
                            endTime: item.endTime == "0001-01-01T00:00:00" ? getCurrentDateTime() : item.endTime,
                        }
                    }),
                )
                setPrerequistteOperations(getPrerequisteOperationList(workOrder.items, "workOrderId", "workOrderId"))
                setFourSelectData(fourSelectData.items)
            },
        )
    }, [callApi])
    useEffect(() => {
        fetchData()
    }, [fetchData])
    useEffect(() => {
        setWorkOrdersShowData(workOrderListMapper.apiToClient(workOrders))
    }, [workOrders])

    // useEffect(() => {
    //     setSchedulingOrdersShowData(workOrderListMapper.apiToClient(schedulingOrders))
    // }, [schedulingOrders])
    const handleSubmit = (value) => {
        if (!initValue) {
            let sendData = {
                ...value.info,
                prerequisiteOperations: [value.info.prerequisiteOperations],
                workOrderStatus: parseInt(value.info.workOrderStatus),
                ...value.fourSelect,
            }
            callApi(
                () => orderApi.workOrder.createWorkOrders(sendData, manufacturingOrderId),
                fetchData,
                "Tạo đơn công đoạn thành công",
            )
        } else {
            let sendData = {
                ...value.info,
                prerequisiteOperations: [value.info.prerequisiteOperations],
                workOrderStatus: parseInt(value.info.workOrderStatus),
                ...value.fourSelect,
            }
            callApi(
                () => orderApi.workOrder.updateWorkOrders(sendData, manufacturingOrderId, initValue.info.workOrderId),
                fetchData,
                "Sửa đơn công đoạn thành công",
            )
        }
    }
    const handleDeleteRow = (row) => {
        const workOrderId = row.workOrderId
        setDeleteConfirm({
            actived: true,
            title: "Xác nhận xóa đơn công đoạn " + workOrderId,
            content: `Đơn công đoạn ${workOrderId} sẽ bị xóa vĩnh viễn và không được hiển thị tại trang này nữa`,
            onConfirm() {
                callApi(
                    () => orderApi.workOrder.deleteWorkOrders(workOrderId),
                    fetchData,
                    `Đơn công đoạn ${workOrderId} được xóa thành công`,
                )
            },
        })
    }

    const handleEdit = (e, row, index) => {
        setInitValue({
            info: {
                ...row,
                // ...manufacturingOrder[index],
                // materialDefinitionId: manufacturingOrder[index].materialDefinition.materialDefinitionId,
            },
            fourSelect: {
                ...row,
            },
            properties: [],
        })
        handleOpen(e)
    }
    const handleSelectOrder = (row, index) => {
        setSchedulingOrders([
            ...schedulingOrders,
            {
                ...row,
                workOrderStatus: 2,
            },
        ])
        setWorkOrders((prevData) =>
            prevData.filter(
                (item, _index) =>
                    item.workOrderId !== row.workOrderId || item.manufacturingOrder !== row.manufacturingOrder,
            ),
        )
    }
    const handleScheduling = () => {
        dispatch(schedulingActions.setSchedulingProducts(workOrderListMapper.clientToDispath(schedulingOrders)))
        navigate(paths.mes.scheduling)
    }

    const handleRemoveItem = (workOrderId, manufacturingOrder) => {
        const newValue = schedulingOrders.filter((item) => {
            if (item.workOrderId !== workOrderId || item.manufacturingOrder !== manufacturingOrder) {
                return true
            } else {
                setWorkOrdersShowData([...workOrders, item])
                return false
            }
        })
        setSchedulingOrders(newValue)
    }
    return (
        <div data-component="ProductionCommand" className="container mt-2 flex grow flex-col">
            <Card className="mr-5 flex flex-1 grow  flex-col overflow-scroll">
                <div className="flex h-10 items-center justify-between  ">
                    <h3>Danh sách đơn công đoạn thuộc đơn sản xuất {manufacturingOrderId}</h3>
                    {/* <Button large className="mt-2" onClick={handleOpen}>
                        Đơn công đoạn mới
                    </Button> */}
                </div>
                <div className="overflow-scroll">
                    {workOrders.length > 0 ? (
                        <Table
                            headers={PRODUCTION_COMMAND_TABLE_COLUMNS}
                            body={workOrdersShowData}
                            sticky
                            onRowClick={handleSelectOrder}
                            // onDeleteRow={handleDeleteRow}
                            // onEdit={handleEdit}
                        />
                    ) : (
                        <div className="text-16-m">Hiện tại không có đơn công đoạn nào</div>
                    )}
                </div>
            </Card>
            {schedulingOrders.length > 0 && (
                <Card className="mr-5 mt-5 flex-1 ">
                    <div className="flex">
                        <h3>Danh sách lệnh sản xuất được điều độ</h3>
                        <Button className="ml-auto" onClick={handleScheduling}>
                            Lên kế hoạch sản xuất
                        </Button>
                    </div>

                    <div className="flex w-full  overflow-scroll">
                        <Table
                            className="w-full"
                            headers={PRODUCTION_COMMAND_TABLE_COLUMNS}
                            body={schedulingOrders}
                            sticky
                            // onRowClick={handleSelectOrder}
                            onDeleteRow={(row) => handleRemoveItem(row.workOrderId, row.manufacturingOrder)}
                            // onEdit={handleEdit}
                        />
                        {/* component cũ -> giờ chuyển sang dùng bảng để hiển thị */}
                        {/* {schedulingOrders.map((item, index) => (
                            <div
                                key={item.workOrderId + item.manufacturingOrder}
                                className="text-16-m group relative mr-3 mt-1 flex
                                        cursor-pointer whitespace-nowrap rounded-lg shadow-sub transition-all hover:bg-accent-2"
                                onClick={() => handleRemoveItem(item.workOrderId, item.manufacturingOrder)}
                            >
                                <span className="px-3 py-1">{item.workOrderId}</span>
                                <span
                                    className="absolute top-[50%] right-[-10px] hidden
                                            h-8 w-8 translate-y-[-50%] items-center justify-center 
                                            rounded-full bg-accent-1 text-neutron-4 group-hover:flex"
                                >
                                    <MdOutlineClose className="text-2xl" />
                                </span>
                            </div>
                        ))} */}
                    </div>
                </Card>
            )}

            {active && (
                <PoperMenu
                    menuNavigaton={getProductionCommandMenuNav(prerequisiteOperations, fourSelectData)}
                    position={position}
                    onClose={() => {
                        setInitValue(undefined)
                        handleClose()
                    }}
                    onClick={handleSubmit}
                    activateValidation={false}
                    initValue={initValue ? initValue : undefined}
                />
            )}

            {deleteConfirm.actived && (
                <Confirm
                    title={deleteConfirm.title}
                    content={deleteConfirm.content}
                    onClose={() => setDeleteConfirm({ actived: false })}
                    onConfirm={deleteConfirm.onConfirm}
                />
            )}
        </div>
    )
}
export default WorkOderList
