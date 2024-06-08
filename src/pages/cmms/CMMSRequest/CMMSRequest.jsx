import Button from "@/components/Button"
import Confirm from "@/components/Confirm"
import PoperMenuNew from "@/components/PoperMenuNew"
import Table from "@/components/Table"
import { useCallApi, usePoperMenuNew } from "@/hooks"
import { CMMSEquipmentAPi, CMMSMaintenanceRequestApi, CMMSPersonAPi } from "@/services/api"
import { CMMSRequestMapper, poperListMapper } from "@/utils/functions"
import { getCMMSMaintenanceRequestEditMenuNav, getCMMSMaintenanceRequestMenuNav } from "@/utils/menuNavigation"
import { CMMS_EQUIPMENT_CLASS_TABLE_COLUMNS, CMMS_REQUEST_TABLE_COLUMNS } from "@/utils/tableColumns"
import { useCallback, useEffect, useState } from "react"
import RequestDetailModal from "./RequestDetailModal"
import RequestModal from "./RequestModal"
import ToggleButtons from "@/components/ToggleButtons"
import { CMMMS_REQUEST_MODE_LIST } from "@/utils/constants"
import { useNavigate } from "react-router-dom"

function CMMSRequest() {
    const callApi = useCallApi()
    const navigate = useNavigate()

    const { active, position, handleClose, handleOpen } = usePoperMenuNew(600)
    const [deleteConfirm, setDeleteConfirm] = useState({}) //State này chứa thông tin về xác nhận xóa vật tư. Khi người dùng chọn xóa một vật tư, thông tin xác nhận xóa sẽ được lưu trữ trong deleteConfirm, bao gồm tiêu đề, nội dung và hàm xác nhận.

    const [initValue, setInitValue] = useState() // dùng để chứa data đang chỉnh sửa, nếu = null thì đang tạo mục mới; undefined là bình thường
    const [activedItem, setActivedItem] = useState(null)
    const [requestDetailModal, setRequestDetailModal] = useState({})
    const [requestModal, setRequestModal] = useState({})

    const [maintenanceRequest, setMaintenanceRequest] = useState([])
    const [maintenanceRequestShowData, setMaintenanceRequestShowData] = useState([])
    const [personList, setPersonList] = useState([])
    const [equipmentClass, setEquipmentClass] = useState([])
    const [equipmentClassList, setEquipmentClassList] = useState([])

    const [toggleButtonsMode, setToggleButtonsMode] = useState(0)

    const fetchData = useCallback(() => {
        callApi(
            [
                CMMSMaintenanceRequestApi.maintenanceRequest.getMaintenanceRequestsByType(0),
                CMMSPersonAPi.person.getPersons(),
                CMMSEquipmentAPi.equipmentClass.getEquipmentClasses(),
            ],
            (res) => {
                setMaintenanceRequest(res[0].items)
                setPersonList(poperListMapper(res[1].items, "personId", "personName"))
                setEquipmentClassList(poperListMapper(res[2].items, "equipmentClassId", "name"))
                setEquipmentClass(res[2].items)
            },
        )
    }, [callApi])

    useEffect(() => {
        fetchData()
    }, [fetchData])
    useEffect(() => {
        setMaintenanceRequestShowData(CMMSRequestMapper.apiToClient(maintenanceRequest))
    }, [maintenanceRequest])
    const handleAdd = (e) => {
        setInitValue(null)
        setRequestModal({
            actived: true,
        })
    }
    const handleConfirm = (data) => {
        let callApiFunction
        let successMessage
        callApiFunction = CMMSMaintenanceRequestApi.maintenanceRequest.createMaintenanceRequest(data)
        successMessage = `Đã tạo yêu cầu bảo trì`
        callApi(() => callApiFunction, fetchData, successMessage)
    }
    const handleSubmit = (value) => {
        console.log(value)
        let data
        let callApiFunction
        let successMessage

        if (!initValue) {
            data = CMMSRequestMapper.clientToAPI(value)
            callApiFunction = CMMSMaintenanceRequestApi.maintenanceRequest.createMaintenanceRequest(data)
            successMessage = "Tạo yêu cầu bảo trì thành công"
        } else {
            data = CMMSRequestMapper.edit(value)
            callApiFunction = CMMSMaintenanceRequestApi.maintenanceRequest.updateMaintenanceRequest(
                data,
                activedItem.maintenanceRequestId,
            )
            successMessage = "Chỉnh sửa yêu cầu bảo trì thành công"
        }
        callApi(() => callApiFunction, fetchData, successMessage)
    }
    const handleEdit = (e) => {
        setInitValue(CMMSRequestMapper.initValue(activedItem))
        handleOpen(e)
    }
    const handleDelete = (row) => {
        const maintenanceRequestId = row.maintenanceRequestId
        const code = row.code

        setDeleteConfirm({
            actived: true,
            title: "Xác nhận xóa yêu cầu bảo trì " + code,
            content: `Yêu cầu bảo trì ${code} sẽ bị xóa vĩnh viễn và không được hiển thị tại trang này nữa`,
            onConfirm() {
                callApi(
                    () => CMMSMaintenanceRequestApi.maintenanceRequest.deleteMaintenanceRequest(maintenanceRequestId),
                    fetchData,
                    `Yêu cầu bảo trì ${code} được xóa thành công`,
                )
            },
        })
    }
    const handleTableRowClick = (row, index) => {
        const activedRow = maintenanceRequest[index]
        setActivedItem(activedRow)
    }
    const handleRequestDetailModalConfirm = (data) => {
        let callApiFunction
        let successMessage
        callApiFunction = CMMSMaintenanceRequestApi.maintenanceRequest.updateMaintenanceRequest(
            {
                status: 2,
            },
            data.maintenanceRequestId,
        )
        successMessage = `Đã duyệt yêu cầu bảo trì`
        callApi(() => callApiFunction, fetchData, successMessage)
    }
    const handleRequestDetailModalReject = (data) => {
        let callApiFunction
        let successMessage
        callApiFunction = CMMSMaintenanceRequestApi.maintenanceRequest.updateMaintenanceRequest(
            {
                status: 1,
            },
            data.maintenanceRequestId,
        )
        successMessage = `Từ chối yêu cầu bảo trì`
        callApi(() => callApiFunction, fetchData, successMessage)
    }
    return (
        <>
            <div data-component="ResourceType" className="container flex h-full flex-wrap">
                <div className="relative h-full grow xl:w-full">
                    <div className="flex">
                        <div className="flex-1">
                            {toggleButtonsMode == 0 && (
                                <Button onClick={handleAdd}>Tạo yêu cầu bảo trì khắc phục</Button>
                            )}
                        </div>
                        <div className="flex-1">
                            <ToggleButtons
                                active={toggleButtonsMode}
                                onClick={setToggleButtonsMode}
                                titles={CMMMS_REQUEST_MODE_LIST}
                            />
                        </div>
                        <div className="flex-1"></div>
                    </div>

                    <div className="scroll-y mt-2 h-[calc(100%-60px)] p-1 pt-0">
                        {toggleButtonsMode == 0 && (
                            <>
                                {maintenanceRequestShowData.length == 0 ? (
                                    <>
                                        <h2 className="mt-4">Hiện tại không có yêu cầu nào, vui lòng tạo mới!</h2>
                                    </>
                                ) : (
                                    <Table
                                        activable
                                        primary
                                        sticky
                                        headers={CMMS_REQUEST_TABLE_COLUMNS}
                                        body={maintenanceRequestShowData}
                                        className="mt-4"
                                        onEdit={handleEdit}
                                        onRowClick={handleTableRowClick}
                                        onDeleteRow={handleDelete}
                                        enableIdClick
                                        idClickFunction={(e, row, index) => {
                                            setRequestDetailModal({
                                                actived: true,
                                                data: row,
                                            })
                                        }}
                                    />
                                )}
                            </>
                        )}
                        {toggleButtonsMode == 1 && (
                            <Table
                                activable
                                primary
                                sticky
                                headers={CMMS_EQUIPMENT_CLASS_TABLE_COLUMNS}
                                body={equipmentClass}
                                className="mt-4"
                                onEdit={handleEdit}
                                onRowClick={handleTableRowClick}
                                onDeleteRow={handleDelete}
                                enableIdClick
                                idClickFunction={(e, row, index) => {
                                    console.log(row)
                                    navigate(`/cmms/schedule/${row.name}`, { state: row })
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
            {active && (
                <PoperMenuNew
                    position={position}
                    onClose={handleClose}
                    menuNavigaton={
                        initValue
                            ? getCMMSMaintenanceRequestEditMenuNav(personList)
                            : getCMMSMaintenanceRequestMenuNav(personList, equipmentClassList)
                    }
                    onClick={handleSubmit}
                    initValue={initValue ? initValue : undefined}
                    activateValidation={false}
                />
            )}
            {deleteConfirm.actived && (
                <Confirm
                    title={deleteConfirm.title}
                    content={deleteConfirm.content}
                    onConfirm={deleteConfirm.onConfirm}
                    onClose={() => setDeleteConfirm({ actived: false })}
                />
            )}
            {requestDetailModal.actived && (
                <RequestDetailModal
                    data={requestDetailModal.data}
                    onClose={() => setRequestDetailModal({ actived: false })}
                    onConfirm={handleRequestDetailModalConfirm}
                    onReject={handleRequestDetailModalReject}
                />
            )}
            {requestModal.actived && (
                <RequestModal
                    data={requestModal.data}
                    onClose={() => setRequestModal({ actived: false })}
                    onConfirm={requestModal.onConfirm}
                    onReject={requestModal.onReject}
                    handleConfirm={handleConfirm}
                />
            )}
        </>
    )
}

export default CMMSRequest
