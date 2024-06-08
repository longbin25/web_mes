import Button from "@/components/Button"
import Confirm from "@/components/Confirm"
import PoperMenuNew from "@/components/PoperMenuNew"
import Table from "@/components/Table"
import ToggleButtons from "@/components/ToggleButtons"
import { useCallApi, usePoperMenuNew } from "@/hooks"
import { CMMSMaterialAPi, InjectionMachineApi, hierarchyApi, resourceApi } from "@/services/api"
import { RESOURCE_PAGE_EQUIPMENT_LIST } from "@/utils/constants"
import {
    CMMSMaterialRequestMapper,
    getResourceOptionsList,
    injectionMachineMapper,
    moldMapper,
    normalMachineMapper,
    returnData,
    statusTextToNumber,
} from "@/utils/functions"
import {
    getCMMSMaterialRequestEditMenuNav,
    getCMMSMaterialRequestMenuNav,
    getCMMSHistoryCardMenuNav,
    getCMMSHistoryCardEditMenuNav,
    getCMMSMaterialMenuNav,
    getCMMSMaterialEditMenuNav,
    getCreateEquipmentMenuNav,
    getCreateInjectionMachineMenuNav,
    getCreateMoldMenuNav,
    getCreateEquipmentEditMenuNav,
    getCreateInjectionMachineEditMenuNav,
} from "@/utils/menuNavigation"
import { EQUIPMENT_INFO_TABLE_COLUMNS, MOLD_INFO_TABLE_COLUMNS } from "@/utils/tableColumns"
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import EquipmentDetailModal from "./EquipmentDetailModal"

const handler = {
    label: {
        0: "thiết bị",
        1: "máy ép",
        2: "khuôn",
    },
    labelUpperCase: {
        0: "Thiết bị",
        1: "Máy ép",
        2: "Khuôn",
    },
    tableColumn: {
        0: EQUIPMENT_INFO_TABLE_COLUMNS,
        1: EQUIPMENT_INFO_TABLE_COLUMNS,
        2: MOLD_INFO_TABLE_COLUMNS,
    },
    fetchData: {
        equipment: resourceApi.equipment.getEquipments,
        injectionMachine: InjectionMachineApi.injectionMachine.getInjectionMachine,
        mold: InjectionMachineApi.mold.getMold,
    },
    createMenuNav: {
        0: (equipmentTypeList, equipmentWorkUnitList, moldList, injectionMachineList) =>
            getCreateEquipmentMenuNav(equipmentTypeList, equipmentWorkUnitList),
        1: (equipmentTypeList, equipmentWorkUnitList, moldList, injectionMachineList) =>
            getCreateInjectionMachineMenuNav(moldList, equipmentWorkUnitList),
        2: (equipmentTypeList, equipmentWorkUnitList, moldList, injectionMachineList) =>
            getCreateMoldMenuNav(injectionMachineList, equipmentWorkUnitList),
    },
    editMenuNav: {
        0: (equipmentTypeList, equipmentWorkUnitList, moldList, injectionMachineList) =>
            getCreateEquipmentEditMenuNav(equipmentTypeList, equipmentWorkUnitList),
        1: (equipmentTypeList, equipmentWorkUnitList, moldList, injectionMachineList) =>
            getCreateInjectionMachineEditMenuNav(moldList, equipmentWorkUnitList),
        2: (equipmentTypeList, equipmentWorkUnitList, moldList, injectionMachineList) =>
            getCreateMoldMenuNav(injectionMachineList, equipmentWorkUnitList),
    },
    createMapper: {
        0: normalMachineMapper.clientToAPI,
        1: injectionMachineMapper.clientToAPI,
        2: moldMapper.clientToAPI,
    },
    editMapper: {
        0: normalMachineMapper.edit,
        1: injectionMachineMapper.edit,
        2: moldMapper.edit,
    },
    initValueMapper: {
        0: (data, equipmentTypeList) => normalMachineMapper.initValue(data, equipmentTypeList),
        1: (data, equipmentTypeList) => injectionMachineMapper.initValue(data, equipmentTypeList),
        2: moldMapper.initValue,
    },
}
function ResourceEquipment() {
    const callApi = useCallApi()

    const { active, position, handleClose, handleOpen } = usePoperMenuNew(600)
    const [deleteConfirm, setDeleteConfirm] = useState({}) //State này chứa thông tin về xác nhận xóa vật tư. Khi người dùng chọn xóa một vật tư, thông tin xác nhận xóa sẽ được lưu trữ trong deleteConfirm, bao gồm tiêu đề, nội dung và hàm xác nhận.
    const [initValue, setInitValue] = useState() // dùng để chứa data đang chỉnh sửa, nếu = null thì đang tạo mục mới; undefined là bình thường
    const [activedItem, setActivedItem] = useState(null)
    const [toggleButtonsMode, setToggleButtonsMode] = useState(0)

    const [normalMachine, setNormalMachine] = useState([])
    const [injectionMachine, setInjectionMachine] = useState([])
    const [mold, setMold] = useState([])

    const [classes, setClasses] = useState([]) // lưu danh sách  loại vật tư để truyền vào propermenu để tạo đối tượng mới
    const [fiveSelectData, setFiveSelectData] = useState([]) // dùng lưu dữ liệu danh sách các options cho 5 select trong trang equipment
    const [moldProperList, setMoldProperList] = useState([]) // lưu danh sách khuôn để truyền vào propermenu để tạo đối tượng mới
    const [injectionMachineProperList, setInjectionMachineProperList] = useState([]) // lưu danh sách máy ép để truyền vào propermenu để tạo đối tượng mới

    const [materialInforList, setMaterialInforList] = useState([])
    const [equipmentModal, setEquipmentModal] = useState({})

    const fetchData = useCallback(() => {
        callApi(
            [
                handler.fetchData.equipment(),
                handler.fetchData.injectionMachine(),
                handler.fetchData.mold(),

                resourceApi.equipment.getEquipmentClasses(),
                hierarchyApi.enterprise.getEnterprise(),
            ],
            (res) => {
                setNormalMachine(res[0].items)
                setInjectionMachine(res[1].items)
                setMold(res[2].items)

                setClasses(getResourceOptionsList(res[3].items, "equipmentClassId"))
                setFiveSelectData(res[4].items)
            },
        )
    }, [callApi])
    useEffect(() => {
        fetchData()
    }, [fetchData])
    useEffect(() => {
        setMoldProperList(getResourceOptionsList(mold, "moldId"))
    }, [mold])
    useEffect(() => {
        setInjectionMachineProperList(getResourceOptionsList(injectionMachine, "equipmentId"))
    }, [injectionMachine])
    const handleAdd = (e) => {
        setInitValue(null)
        handleOpen(e)
    }

    const handleSubmit = (value) => {
        let data
        let callApiFunction
        let successMessage

        if (!initValue) {
            data = handler.createMapper[toggleButtonsMode](value)
            callApiFunction =
                toggleButtonsMode == 0
                    ? resourceApi.equipment.createEquipment(data)
                    : toggleButtonsMode == 1
                    ? InjectionMachineApi.injectionMachine.createInjectionMachine(data)
                    : InjectionMachineApi.mold.createMold(data)
            successMessage = `Tạo ${handler.label[toggleButtonsMode]} thành công`
        } else {
            data = handler.editMapper[toggleButtonsMode](value)
            callApiFunction =
                toggleButtonsMode == 0
                    ? resourceApi.equipment.updateEquipment(data, activedItem.equipmentId)
                    : toggleButtonsMode == 1
                    ? InjectionMachineApi.injectionMachine.updateInjectionMachine(data, activedItem.equipmentId)
                    : InjectionMachineApi.mold.updateMold(data, activedItem.materialRequestId)
            successMessage = `Chỉnh sửa ${handler.label[toggleButtonsMode]} thành công`
        }
        callApi(() => callApiFunction, fetchData, successMessage)
        setInitValue(null)
    }

    const handleEdit = (e) => {
        let tempInitvalue = handler.initValueMapper[toggleButtonsMode](activedItem, classes)
        setInitValue(tempInitvalue)
        handleOpen(e)
    }

    const handleDelete = (row) => {
        const id = toggleButtonsMode == 0 ? row.equipmentId : toggleButtonsMode == 1 ? row.equipmentId : row.moldId
        let callApiFunction
        callApiFunction =
            toggleButtonsMode == 0
                ? () => resourceApi.equipment.deleteEquipment(id)
                : toggleButtonsMode == 1
                ? () => InjectionMachineApi.injectionMachine.deleteInjectionMachine(id)
                : () => InjectionMachineApi.mold.deleteMold(id)

        setDeleteConfirm({
            actived: true,
            title: `Xác nhận xóa ${handler.label[toggleButtonsMode]} ` + id,
            content: `${handler.labelUpperCase[toggleButtonsMode]} ${id} sẽ bị xóa vĩnh viễn và không được hiển thị tại trang này nữa`,
            onConfirm() {
                callApi(
                    callApiFunction,
                    fetchData,
                    `${handler.labelUpperCase[toggleButtonsMode]} ${id} được xóa thành công`,
                )
            },
        })
    }
    const handleTableRowClick = (row, index) => {
        const activedRow =
            toggleButtonsMode == 0
                ? normalMachine[index]
                : toggleButtonsMode == 1
                ? injectionMachine[index]
                : mold[index]
        setActivedItem(activedRow)
    }

    return (
        <>
            <div data-component="ResourceType" className="container flex h-full flex-wrap">
                <div className="relative  h-full grow xl:w-full">
                    <div className="flex w-full">
                        <div className="flex-1">
                            <Button onClick={handleAdd}>{`Thêm ${handler.label[toggleButtonsMode]}`}</Button>
                        </div>
                        <div className="flex-1">
                            {/* <ToggleButtons
                                active={toggleButtonsMode}
                                onClick={setToggleButtonsMode}
                                titles={RESOURCE_PAGE_EQUIPMENT_LIST}
                            /> */}
                        </div>
                        <div className="flex flex-1">
                            <div className="ml-auto"></div>
                            <div>
                                <Link to={`/mes/resource/equipment/class`} className="mr-2">
                                    <h3 className="underline hover:text-primary-1">Quản lý loại thiết bị</h3>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="scroll-y h-[calc(100%-60px)]">
                        <Table
                            activable
                            primary
                            sticky
                            headers={handler.tableColumn[toggleButtonsMode]}
                            body={
                                toggleButtonsMode == 0
                                    ? normalMachine
                                    : toggleButtonsMode == 1
                                    ? injectionMachine
                                    : mold
                            }
                            className="mt-4"
                            onEdit={toggleButtonsMode != 2 ? handleEdit : null}
                            onRowClick={handleTableRowClick}
                            onDeleteRow={handleDelete}
                            enableIdClick
                            idClickFunction={(e, row, index) => {
                                setEquipmentModal({
                                    actived: true,
                                    data: row,
                                })
                            }}
                        />
                    </div>
                </div>
            </div>
            {active && (
                <PoperMenuNew
                    position={position}
                    onClose={handleClose}
                    menuNavigaton={
                        initValue
                            ? handler.editMenuNav[toggleButtonsMode](
                                  classes,
                                  fiveSelectData,
                                  moldProperList,
                                  injectionMachineProperList,
                              )
                            : handler.createMenuNav[toggleButtonsMode](
                                  classes,
                                  fiveSelectData,
                                  moldProperList,
                                  injectionMachineProperList,
                              )
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
            {equipmentModal.actived && (
                <EquipmentDetailModal
                    data={equipmentModal.data}
                    onClose={() => setEquipmentModal({ actived: false })}
                />
            )}
        </>
    )
}

export default ResourceEquipment
