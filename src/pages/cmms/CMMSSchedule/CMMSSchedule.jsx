import Button from "@/components/Button"
import Confirm from "@/components/Confirm"
import PoperMenuNew from "@/components/PoperMenuNew"
import Table from "@/components/Table"
import { useCallApi, usePoperMenuNew } from "@/hooks"
import { CMMSEquipmentAPi, CMMSMaintenanceRequestApi, CMMSPersonAPi } from "@/services/api"
import {
    getCMMSMaintenanceRequestEditMenuNav,
    getCMMSMaintenanceRequestMenuNav,
    getCMMSScheduleMenuNav,
} from "@/utils/menuNavigation"
import { CMMS_SCHEDULE_TABLE_COLUMNS } from "@/utils/tableColumns"
import { useCallback, useEffect, useState } from "react"
import { CMMSScheduleMapper, poperListMapper } from "@/utils/functions"
import { useLocation } from "react-router-dom"
import ScheduleModal from "./ScheduleModal"

function CMMSSchedule() {
    const callApi = useCallApi()
    const location = useLocation()
    const routeData = location.state // biến lưu data gửi từ trang CMMSEquipmentClass

    const { active, position, handleClose, handleOpen } = usePoperMenuNew(600)
    const [deleteConfirm, setDeleteConfirm] = useState({}) //State này chứa thông tin về xác nhận xóa vật tư. Khi người dùng chọn xóa một vật tư, thông tin xác nhận xóa sẽ được lưu trữ trong deleteConfirm, bao gồm tiêu đề, nội dung và hàm xác nhận.

    const [initValue, setInitValue] = useState() // dùng để chứa data đang chỉnh sửa, nếu = null thì đang tạo mục mới; undefined là bình thường
    const [activedItem, setActivedItem] = useState(null)
    const [scheduleModal, setScheduleModal] = useState({})

    const [maintenanceRequest, setMaintenanceRequest] = useState([])
    const [maintenanceRequestShowData, setMaintenanceRequestShowData] = useState([])
    const [personList, setPersonList] = useState([])

    const fetchData = useCallback(() => {
        callApi(
            [
                CMMSMaintenanceRequestApi.maintenanceRequest.getMaintenanceRequestsByTypeAndEquipmentClass(
                    1,
                    routeData.equipmentClassId,
                ),
                CMMSPersonAPi.person.getPersons(),
            ],
            (res) => {
                setMaintenanceRequest(res[0].items)
                setPersonList(poperListMapper(res[1].items, "personId", "personName"))
            },
        )
    }, [callApi])
    useEffect(() => {
        fetchData()
    }, [fetchData])
    useEffect(() => {
        setMaintenanceRequestShowData(CMMSScheduleMapper.apiToClient(maintenanceRequest))
    }, [maintenanceRequest])
    const handleAdd = (e) => {
        setInitValue(null)
        handleOpen(e)
    }
    const handleSubmit = (value) => {
        console.log(value)
        let data
        let callApiFunction
        let successMessage

        if (!initValue) {
            data = CMMSScheduleMapper.clientToAPI(value)
            callApiFunction = CMMSMaintenanceRequestApi.standard.createMaintenanceRequest(
                data,
                routeData.equipmentClassId,
            )
            successMessage = "Tạo lịch bảo trì thành công"
        } else {
            data = value.info
            callApiFunction = CMMSMaintenanceRequestApi.maintenanceRequest.updateMaintenanceRequest(
                data,
                activedItem.maintenanceRequestId,
            )
            successMessage = "Chỉnh sửa lịch bảo trì thành công"
        }
        callApi(() => callApiFunction, fetchData, successMessage)
    }
    const handleCreateSchedule = (year) => {
        let data
        let callApiFunction
        let successMessage
        data = {
            status: 2,
            // year: parseInt(year, 10),
        }

        callApiFunction = CMMSMaintenanceRequestApi.standard.updateMaintenanceRequest(data, routeData.equipmentClassId)
        successMessage = "Lên lịch bảo trì thành công"
        callApi(() => callApiFunction, fetchData, successMessage)
    }
    const handleEdit = (e) => {
        setInitValue(CMMSScheduleMapper.initValue(activedItem))
        handleOpen(e)
    }
    const handleDelete = (row) => {
        const maintenanceRequestId = row.maintenanceRequestId
        const problem = row.problem

        setDeleteConfirm({
            actived: true,
            title: "Xác nhận xóa yêu cầu bảo trì " + problem,
            content: `Yêu cầu bảo trì ${problem} sẽ bị xóa vĩnh viễn và không được hiển thị tại trang này nữa`,
            onConfirm() {
                callApi(
                    () => CMMSMaintenanceRequestApi.maintenanceRequest.deleteMaintenanceRequest(maintenanceRequestId),
                    fetchData,
                    `Yêu cầu bảo trì ${problem} được xóa thành công`,
                )
            },
        })
    }
    const handleTableRowClick = (row, index) => {
        const activedRow = maintenanceRequest[index]
        setActivedItem(activedRow)
    }
    return (
        <>
            <div data-component="ResourceType" className="container flex h-full flex-wrap">
                <div className="relative h-full grow xl:w-full">
                    <div className="flex ">
                        <Button onClick={handleAdd}>Lên lịch bảo trì</Button>
                        <Button
                            onClick={() => {
                                handleCreateSchedule()
                            }}
                            className="ml-auto mr-1"
                        >
                            Tạo yêu cầu bảo trì từ lịch bảo trì
                        </Button>
                    </div>
                    <div className="scroll-y mt-2 h-[calc(100%-60px)] p-1 pt-0">
                        {maintenanceRequest.length == 0 ? (
                            <>
                                <h2 className="mt-4">Hiện tại không có yêu cầu nào, vui lòng tạo mới!</h2>
                            </>
                        ) : (
                            <Table
                                activable
                                primary
                                sticky
                                headers={CMMS_SCHEDULE_TABLE_COLUMNS}
                                body={maintenanceRequestShowData}
                                className="mt-4"
                                // onEdit={handleEdit}
                                onRowClick={handleTableRowClick}
                                onDeleteRow={handleDelete}
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
                            : getCMMSScheduleMenuNav(personList)
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
            {scheduleModal.actived && (
                <ScheduleModal
                    data={scheduleModal.data}
                    onClose={() => setScheduleModal({ actived: false })}
                    onConfirm={(year) => handleCreateSchedule(year)}
                />
            )}
        </>
    )
}

export default CMMSSchedule
