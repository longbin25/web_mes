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
import {
    getPrerequisteOperationList,
    getCurrentDateTime,
    workOrderListMapper,
    ProductionSchedulingMapper,
} from "@/utils/functions"
import CheckTable from "@/components/CheckTable"
import { toast } from "react-toastify"

function ProductionScheduling() {
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
                setWorkOrders(ProductionSchedulingMapper.apiToClient(workOrder))
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
    console.log(workOrders)
    const handleSelectOrder = (row, index) => {
        setWorkOrders(ProductionSchedulingMapper.workOrderMapper(workOrders, row))
        // setWorkOrders((prevData) =>
        //     prevData.filter(
        //         (item, _index) =>
        //             item.workOrderId !== row.workOrderId || item.manufacturingOrder !== row.manufacturingOrder,
        //     ),
        // )
    }
    const handleScheduling = () => {
        if (workOrderListMapper.clientToDispath(workOrders).length == 0) {
            toast.error("Không có đơn công đoạn nào được chọn")
        } else {
            dispatch(schedulingActions.setSchedulingProducts(workOrderListMapper.clientToDispath(workOrders)))
            navigate(paths.mes.scheduling)
        }
    }

    const handleRemoveItem = (workOrderId, manufacturingOrder) => {
        setWorkOrders(
            ProductionSchedulingMapper.workOrderRemoveMapper(workOrders, {
                workOrderId: workOrderId,
                manufacturingOrder: manufacturingOrder,
            }),
        )
    }
    return (
        <div data-component="ProductionCommand" className="container  flex grow flex-col">
            <Button
                disabled={workOrderListMapper.clientToDispath(workOrders).length == 0}
                className=" w-fit"
                onClick={handleScheduling}
            >
                Lên kế hoạch sản xuất
            </Button>
            <div className="mt-5 overflow-scroll">
                {workOrders.length > 0 ? (
                    <CheckTable
                        activable
                        primary
                        sticky
                        checkedList={schedulingOrders}
                        headers={PRODUCTION_COMMAND_TABLE_COLUMNS}
                        body={workOrdersShowData}
                        onRowClick={handleSelectOrder}
                        onDeleteRow={(row) => handleRemoveItem(row.workOrderId, row.manufacturingOrder)}
                        // onEdit={handleEdit}
                    />
                ) : (
                    <div className="text-16-m">Hiện tại không có đơn công đoạn nào</div>
                )}
            </div>

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
export default ProductionScheduling
