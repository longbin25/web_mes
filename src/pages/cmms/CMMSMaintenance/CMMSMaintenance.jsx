import Button from "@/components/Button"
import Confirm from "@/components/Confirm"
import PoperMenuNew from "@/components/PoperMenuNew"
import { useCallApi, usePoperMenuNew } from "@/hooks"
import { CMMSMaintenanceRequestApi, CMMSMaterialAPi, CMMSPersonAPi, CMMSSettingApi } from "@/services/api"
import { CMMS_MAINTENANCE_FILTER_STATUS_LIST } from "@/utils/constants"
import { getCMMSMaintenanceResponseEditMenuNav, getCMMSPersonMenuNav } from "@/utils/menuNavigation"
import { useCallback, useEffect, useState } from "react"
import ScheduleEventModal from "@/components/ScheduleEventModal"
import MaintenanceDetailModal from "./MaintenanceDetailModal"
import {
    CMMSMaintenanceMapper,
    compareTime,
    getResourceOptionsList,
    getValuesByKey,
    poperListMapper,
} from "@/utils/functions"
import MaintenanceResponseCard from "./MaintenanceResponseCard"
import Card from "@/components/Card"
import TextInput from "@/components/TextInput"
import SelectInput from "@/components/SelectInput"
import SearchFilterTimeStatusBar from "@/components/SearchFilterTimeStatusBar"
import DeleteScheduleModal from "./DeleteScheduleModal"

function CMMSMaintenance() {
    const callApi = useCallApi()
    const { active, position, handleClose, handleOpen } = usePoperMenuNew(800)

    const [deleteConfirm, setDeleteConfirm] = useState({}) //State này chứa thông tin về xác nhận xóa vật tư. Khi người dùng chọn xóa một vật tư, thông tin xác nhận xóa sẽ được lưu trữ trong deleteConfirm, bao gồm tiêu đề, nội dung và hàm xác nhận.
    const [scheduleEventModal, setScheduleEventModal] = useState({})
    const [initValue, setInitValue] = useState() // dùng để chứa data đang chỉnh sửa, nếu = null thì đang tạo mục mới; undefined là bình thường
    const [activedItem, setActivedItem] = useState(null)
    const [toggleButtonsMode, setToggleButtonsMode] = useState(0)
    const [maintenanceDetailModal, setMaintenanceDetailModal] = useState(0)
    const [searchInput, setSearchInput] = useState("")
    const [dayStart, setDayStart] = useState("")
    const [dayEnd, setDayEnd] = useState("")
    const [filter, setFilter] = useState("0") // state cho status
    const [stateFilter, setStateFilter] = useState("0") // state cho lọc theo loại lịch trình hay khắc phục
    const [filterData, setFilterData] = useState([])
    const [filterDataShowData, setFilterDataShowData] = useState([])
    const [deleteScheduleModal, setDeleteScheduleModal] = useState({})

    const [maintenanceResponses, setMaintenanceResponses] = useState([])
    const [causeList, setCauseList] = useState([])
    const [correctionList, setCorrectionList] = useState([])
    const [personList, setPersonList] = useState([])
    const [materialInforList, setMaterialInforList] = useState([])

    const fetchData = useCallback(() => {
        callApi(
            [
                CMMSSettingApi.causes.getCauses(),
                CMMSSettingApi.corrections.getCorrections(),
                CMMSMaintenanceRequestApi.maintenanceResponses.getMaintenanceResponses(),
                CMMSPersonAPi.person.getPersons(),
                CMMSMaterialAPi.materialInfor.getMaterialInfors(),
            ],
            (res) => {
                setCauseList(poperListMapper(res[0].items, "causeId", "causeName"))
                setCorrectionList(poperListMapper(res[1].items, "correctionId", "correctionName"))
                setMaintenanceResponses(res[2].items)
                setPersonList(poperListMapper(res[3].items, "personId", "personName"))
                setMaterialInforList(getResourceOptionsList(res[4].items, "materialInforId"))
            },
        )
    }, [callApi])
    useEffect(() => {
        fetchData()
    }, [fetchData])
    const deleteMaintenanceResponseByYear = useCallback(
        (id,year) => {
            callApi(
                [CMMSMaintenanceRequestApi.maintenanceResponses.deleteMaintenanceResponseByYear(id,year)],
                (res) => {},
                `Xóa yêu cầu bảo trì theo lịch thành công`
            )
        },
        [callApi],
    )

    useEffect(() => {
        let result
        switch (filter[0]) {
            case "0":
                result = maintenanceResponses
                break
            case "1":
                result = maintenanceResponses.filter((item) => item.status == "Assigned")
                break
            case "2":
                result = maintenanceResponses.filter((item) => item.status == "InProgress")
                break
            case "3":
                result = maintenanceResponses.filter((item) => item.status == "Review")
                break
            case "4":
                result = maintenanceResponses.filter((item) => item.status == "Completed")
                break
            default:
                result = maintenanceResponses
                break
        }
        // console.log(result)
        switch (stateFilter[0]) {
            case "0":
                result = result
                break
            case "1":
                result = result.filter((item) => item.type == "Preventive")
                break
            case "2":
                result = result.filter((item) => item.type == "Reactive")
                break
            default:
                result = result
                break
        }
        console.log(result)

        result =
            searchInput == ""
                ? result
                : result.filter((item) => item.problem.includes(searchInput) || item.code.includes(searchInput))
        if (dayStart != "") result = result.filter((item) => compareTime(dayStart, item.createdAt) == -1)
        if (dayEnd != "") result = result.filter((item) => compareTime(dayEnd, item.createdAt) == 1)
        setFilterDataShowData(CMMSMaintenanceMapper.apiToClient(result))
        setFilterData(result)
    }, [filter, searchInput, maintenanceResponses, dayStart, dayEnd, stateFilter])
    console.log(filterData)
    const handleAdd = (e) => {
        setInitValue(null)
        handleOpen(e)
    }
    const handleSubmit = (value) => {
        let data
        let callApiFunction
        let successMessage
        data = {
            // ...value.info,
            // ...value.info2,
            // responsiblePerson: value.info.responsiblePerson[0],
            plannedFinish: value.info2.plannedFinish,
            dueDate: value.info2.dueDate,
            materials: value.info2.materialInforId,
        }

        callApiFunction = CMMSMaintenanceRequestApi.maintenanceResponses.updateMaintenanceResponse(
            data,
            value.info.maintenanceResponseId,
        )
        successMessage = `Cập nhật thành công`
        callApi(() => callApiFunction, fetchData, successMessage)
    }
    const handleEdit = (data, e) => {
        console.log(data)
        setInitValue({
            info: {
                ...data,
                cause: getValuesByKey(data.cause, causeList),
                correction: getValuesByKey(data.correction, correctionList),
                responsiblePerson: [data.responsiblePerson.personId],
            },
            info2: {
                estProcessTime: data.estProcessTime,
                plannedStart: data.plannedStart,
                plannedFinish: data.plannedFinish,
                actualStartTime: data.actualStartTime,
                actualFinishTime: data.actualFinishTime,
                dueDate: data.dueDate,
                // ...data,
            },
        })
        handleOpen(e)
    }
    const handleDelete = (row) => {
        const maintenanceResponseId = row.maintenanceResponseId
        const code = row.code

        setDeleteConfirm({
            actived: true,
            title: "Xác nhận xóa công việc bảo trì " + code,
            content: `Công việc bảo trì ${code} sẽ bị xóa vĩnh viễn và không được hiển thị tại trang này nữa`,
            onConfirm() {
                callApi(
                    () =>
                        CMMSMaintenanceRequestApi.maintenanceResponses.deleteMaintenanceResponse(maintenanceResponseId),
                    fetchData,
                    `Công việc bảo trì ${code} được xóa thành công`,
                )
            },
        })
    }
    const handleTableRowClick = (row, index) => {
        const activedRow = maintenanceResponses[index]
        setActivedItem(activedRow)
    }
    const hanldeMaintenanceDetailModalConfirm = (data, maintenanceResponseId) => {
        let callApiFunction
        let successMessage
        callApiFunction = CMMSMaintenanceRequestApi.maintenanceResponses.updateMaintenanceResponse(
            data,
            maintenanceResponseId,
        )
        successMessage = `Cập nhật thành công`
        callApi(() => callApiFunction, fetchData, successMessage)
    }

    return (
        <>
            <div data-component="ResourceType" className="container flex h-full flex-wrap">
                <div className="relative h-full grow xl:w-full">
                    <SearchFilterTimeStatusBar
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        filter={filter}
                        setFilter={setFilter}
                        dayStart={dayStart}
                        setDayStart={setDayStart}
                        dayEnd={dayEnd}
                        setDayEnd={setDayEnd}
                        stateFilter={stateFilter}
                        setStateFilter={setStateFilter}
                        type="CMMSMaintenance"
                        setDeleteScheduleModal={setDeleteScheduleModal}
                    />
                    {/* <MaintenanceResponseStatusFilter value={filter} setValue={setFilter} titles={["a", "b"]} /> */}
                    {/* <Button className="ml-auto">Chuyển sang dạng lịch</Button> */}
                    <div className="top-[500px]">
                        {filterData.length > 0 ? (
                            <>
                                {filterData.map((item) => (
                                    <MaintenanceResponseCard
                                        data={item}
                                        fetchData={fetchData}
                                        setMaintenanceDetailModal={setMaintenanceDetailModal}
                                        handleDelete={handleDelete}
                                        handleEdit={handleEdit}
                                    />
                                ))}
                            </>
                        ) : (
                            <h2>Không có công việc nào...</h2>
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
                            ? getCMMSMaintenanceResponseEditMenuNav(
                                  causeList,
                                  correctionList,
                                  personList,
                                  materialInforList,
                              )
                            : getCMMSPersonMenuNav()
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
            {scheduleEventModal.actived && (
                <ScheduleEventModal
                    onConfirm={scheduleEventModal.onConfirm}
                    data={scheduleEventModal.data}
                    onClose={() => setScheduleEventModal({ actived: false })}
                />
            )}
            {maintenanceDetailModal.actived && (
                <MaintenanceDetailModal
                    data={maintenanceDetailModal.data}
                    onClose={() => setMaintenanceDetailModal({ actived: false })}
                    hanldeMaintenanceDetailModalConfirm={hanldeMaintenanceDetailModalConfirm}
                    causeList={causeList}
                    correctionList={correctionList}
                />
            )}
            {deleteScheduleModal.actived && (
                <DeleteScheduleModal
                    data={deleteScheduleModal.data}
                    onClose={() => setDeleteScheduleModal({ actived: false })}
                    onConfirm={(id, year) => deleteMaintenanceResponseByYear(id, year)}
                />
            )}
        </>
    )
}

export default CMMSMaintenance
