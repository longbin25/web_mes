import Button from "@/components/Button"
import Confirm from "@/components/Confirm"
import PoperMenuNew from "@/components/PoperMenuNew"
import Table from "@/components/Table"
import ToggleButtons from "@/components/ToggleButtons"
import { useCallApi, usePoperMenuNew } from "@/hooks"
import { resourceApi } from "@/services/api"
import { MES_MATERIALDETAILPAGE_MODE_LIST } from "@/utils/constants"
import { MESWorkUnitMapper, MESOperationMapper, poperListMapper, returnData } from "@/utils/functions"
import {
    getCreateOperationMenuNav,
    getCreateOperationEditMenuNav,
    getCreateWorkUnitMenuNav,
    getCreateWorkUnitEditMenuNav,
} from "@/utils/menuNavigation"
import {
    MES_MATERIALDETAILPAGE_MATERIALUNIT_TABLE_COLUMNS,
    MES_MATERIALDETAILPAGE_OPERATION_TABLE_COLUMNS,
} from "@/utils/tableColumns"
import { useCallback, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const handler = {
    label: {
        0: "đơn vị phụ",
        1: "công đoạn",
    },
    labelUpperCase: {
        0: "Đơn vị phụ",
        1: "Công đoạn",
    },
    noData: {
        0: "Hiện tại không có đơn vị phụ nào, vui lòng tạo mới!",
        1: "Hiện tại không có công đoạn nào, vui lòng tạo mới!",
    },
    tableColumn: {
        0: MES_MATERIALDETAILPAGE_MATERIALUNIT_TABLE_COLUMNS,
        1: MES_MATERIALDETAILPAGE_OPERATION_TABLE_COLUMNS,
    },
    createMenuNav: {
        0: () => getCreateWorkUnitMenuNav(),
        1: (previousOperation, equipmentClassId) => getCreateOperationMenuNav(previousOperation, equipmentClassId),
    },
    editMenuNav: {
        0: () => getCreateWorkUnitEditMenuNav(),
        1: (list) => getCreateOperationEditMenuNav(list),
    },
    createMapper: {
        0: returnData,
        1: MESOperationMapper.clientToAPI,
    },
    editMapper: {
        0: MESWorkUnitMapper.edit,
        1: MESOperationMapper.edit,
    },
    initValueMapper: {
        0: MESWorkUnitMapper.initValue,
        1: MESOperationMapper.initValue,
    },
}
function MaterialDetailPage() {
    const callApi = useCallApi()
    const location = useLocation()
    const routeData = location.state // biến lưu data gửi từ trang material

    const { active, position, handleClose, handleOpen } = usePoperMenuNew(400)
    const [deleteConfirm, setDeleteConfirm] = useState({}) //State này chứa thông tin về xác nhận xóa vật tư. Khi người dùng chọn xóa một vật tư, thông tin xác nhận xóa sẽ được lưu trữ trong deleteConfirm, bao gồm tiêu đề, nội dung và hàm xác nhận.

    const [secondaryUnits, setSecondaryUnits] = useState([])
    const [operations, setOperations] = useState([])
    const [equipmentClassList, setEquipmentClassList] = useState([])
    const [previousOperationList, setPreviousOperationList] = useState([]) // dùng trong bảng thêm công đoạn
    const [equipmentClassIdList, setEquipmentClassIdList] = useState([]) // dùng trong bảng thêm công đoạn

    const [initValue, setInitValue] = useState() // dùng để chứa data đang chỉnh sửa, nếu = null thì đang tạo mục mới; undefined là bình thường
    const [activedItem, setActivedItem] = useState(null)
    const [toggleButtonsMode, setToggleButtonsMode] = useState(0)
    const fetchData = useCallback(() => {
        callApi(
            [
                resourceApi.material.getPreviousOperation(routeData.materialDefinitionId),
                resourceApi.equipment.getEquipmentClasses(),
            ],
            (res) => {
                console.log(res)
                setPreviousOperationList(
                    poperListMapper(
                        res[0].items.map((item) => item.operations[0]),
                        "operationId",
                        "name",
                    ),
                )
                setSecondaryUnits(res[0].items[0].secondaryUnits)
                setOperations(res[0].items[0].operations)
                setEquipmentClassIdList(poperListMapper(res[1].items, "equipmentClassId", "name"))
            },
        )
    }, [callApi])
    useEffect(() => {
        fetchData()
    }, [fetchData])
    console.log(equipmentClassIdList)

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
            data = handler.createMapper[toggleButtonsMode](value)
            callApiFunction =
                toggleButtonsMode == 0
                    ? resourceApi.material.createMaterialUnit(data, routeData.materialDefinitionId)
                    : resourceApi.material.createOperation(data, routeData.materialDefinitionId)
            successMessage = `Tạo ${handler.label[toggleButtonsMode]} thành công`
        } else {
            data = handler.editMapper[toggleButtonsMode](value)
            callApiFunction =
                toggleButtonsMode == 0
                    ? resourceApi.material.updateMaterialUnit(data, routeData.materialDefinitionId, activedItem.unitId)
                    : resourceApi.material.updateOperation(
                          data,
                          routeData.materialDefinitionId,
                          activedItem.operationId,
                      )
            successMessage = `Chỉnh sửa ${handler.label[toggleButtonsMode]} thành công`
        }
        callApi(() => callApiFunction, fetchData, successMessage)
    }
    const handleEdit = (e) => {
        setInitValue(handler.initValueMapper[toggleButtonsMode](activedItem, equipmentClassList))
        handleOpen(e)
    }
    const handleDelete = (row) => {
        const id = toggleButtonsMode == 0 ? row.unitId : row.operationId
        const name = toggleButtonsMode == 0 ? row.unitName : row.name
        let callApiFunction
        callApiFunction =
            toggleButtonsMode == 0
                ? () => resourceApi.material.deleteMaterialUnit(routeData.materialDefinitionId, row.unitId)
                : () => resourceApi.material.deleteOperation(routeData.materialDefinitionId, row.operationId)

        setDeleteConfirm({
            actived: true,
            title: `Xác nhận xóa ${handler.label[toggleButtonsMode]} ` + name,
            content: `${handler.labelUpperCase[toggleButtonsMode]} ${name} sẽ bị xóa vĩnh viễn và không được hiển thị tại trang này nữa`,
            onConfirm() {
                callApi(
                    callApiFunction,
                    fetchData,
                    `${handler.labelUpperCase[toggleButtonsMode]} ${name} được xóa thành công`,
                )
            },
        })
    }
    const handleTableRowClick = (row, index) => {
        const activedRow = toggleButtonsMode == 0 ? secondaryUnits[index] : operations[index]
        setActivedItem(activedRow)
    }

    return (
        <>
            <div data-component="ResourceType" className="container flex h-full flex-wrap">
                <div className="relative h-full grow xl:w-full">
                    <div className="flex">
                        <div className="flex-1">
                            <div className="flex">
                                <Button onClick={handleAdd}>{`Thêm ${handler.label[toggleButtonsMode]}`}</Button>
                            </div>
                        </div>
                        <div className="flex-1">
                            <ToggleButtons
                                active={toggleButtonsMode}
                                onClick={setToggleButtonsMode}
                                titles={MES_MATERIALDETAILPAGE_MODE_LIST}
                            />
                        </div>
                        <div className="flex-1"></div>
                    </div>

                    <div className="scroll-y mt-2 h-[calc(100%-60px)] p-1 pt-0">
                        <Table
                            activable
                            primary
                            sticky
                            headers={handler.tableColumn[toggleButtonsMode]}
                            body={toggleButtonsMode == 0 ? secondaryUnits : operations}
                            className="mt-4"
                            onEdit={handleEdit}
                            onRowClick={handleTableRowClick}
                            onDeleteRow={handleDelete}
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
                            ? handler.editMenuNav[toggleButtonsMode](previousOperationList)
                            : handler.createMenuNav[toggleButtonsMode](previousOperationList, equipmentClassIdList)
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
        </>
    )
}

export default MaterialDetailPage
