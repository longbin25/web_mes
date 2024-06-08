import Button from "@/components/Button"
import Confirm from "@/components/Confirm"
import PoperMenuNew from "@/components/PoperMenuNew"
import Table from "@/components/Table"
import ToggleButtons from "@/components/ToggleButtons"
import { useCallApi, usePoperMenuNew } from "@/hooks"
import { CMMSEquipmentAPi, CMMSPersonAPi, CMMSSettingApi } from "@/services/api"
import { CMMMS_SETTING_MODE_LIST } from "@/utils/constants"
import { CMMSCauseMapper, CMMSCorrectionMapper, getResourceOptionsList } from "@/utils/functions"
import {
    getCMMSCauseEditMenuNav,
    getCMMSCauseMenuNav,
    getCMMSCorrectionEditMenuNav,
    getCMMSCorrectionMenuNav,
} from "@/utils/menuNavigation"
import { CMMS_CORRECTION_TABLE_COLUMNS, CMMS_CAUSE_TABLE_COLUMNS } from "@/utils/tableColumns"
import { useCallback, useEffect, useState } from "react"
const handler = {
    label: {
        0: "nguyên nhân",
        1: "cách khắc phục",
    },
    labelUpperCase: {
        0: "Nguyên nhân",
        1: "Cách khắc phục",
    },
    tableColumn: {
        0: CMMS_CAUSE_TABLE_COLUMNS,
        1: CMMS_CORRECTION_TABLE_COLUMNS,
    },
    createMenuNav: {
        0: getCMMSCauseMenuNav,
        1: getCMMSCorrectionMenuNav,
    },
    editMenuNav: {
        0: getCMMSCauseEditMenuNav,
        1: getCMMSCorrectionEditMenuNav,
    },
    createMapper: {
        0: CMMSCauseMapper.clientToAPI,
        1: CMMSCorrectionMapper.clientToAPI,
    },
    editMapper: {
        0: CMMSCauseMapper.edit,
        1: CMMSCorrectionMapper.edit,
    },
    initValueMapper: {
        0: CMMSCauseMapper.initValue,
        1: CMMSCorrectionMapper.initValue,
    },
}
function CMMSCause() {
    const callApi = useCallApi()
    const { active, position, handleClose, handleOpen } = usePoperMenuNew(400)
    const [deleteConfirm, setDeleteConfirm] = useState({}) //State này chứa thông tin về xác nhận xóa vật tư. Khi người dùng chọn xóa một vật tư, thông tin xác nhận xóa sẽ được lưu trữ trong deleteConfirm, bao gồm tiêu đề, nội dung và hàm xác nhận.

    const [cause, setCause] = useState([])
    const [correction, setCorrection] = useState([])
    const [equipmentClassList, setEquipmentClassList] = useState([])

    const [initValue, setInitValue] = useState() // dùng để chứa data đang chỉnh sửa, nếu = null thì đang tạo mục mới; undefined là bình thường
    const [activedItem, setActivedItem] = useState(null)
    const [toggleButtonsMode, setToggleButtonsMode] = useState(0)

    const fetchData = useCallback(() => {
        callApi(
            [
                CMMSSettingApi.causes.getCauses(),
                CMMSSettingApi.corrections.getCorrections(),
                CMMSEquipmentAPi.equipmentClass.getEquipmentClasses(),
            ],
            (res) => {
                setCause(res[0].items)
                setCorrection(res[1].items)
                setEquipmentClassList(getResourceOptionsList(res[2].items, "equipmentClassId"))
            },
        )
    }, [callApi])
    console.log(equipmentClassList)
    useEffect(() => {
        fetchData()
    }, [fetchData])

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
                    ? CMMSSettingApi.causes.createCause(data)
                    : CMMSSettingApi.corrections.createCorrection(data)
            successMessage = `Tạo ${handler.label[toggleButtonsMode]} thành công`
        } else {
            data = handler.editMapper[toggleButtonsMode](value)
            callApiFunction =
                toggleButtonsMode == 0
                    ? CMMSSettingApi.causes.updateCause(data, activedItem.causeId)
                    : CMMSSettingApi.corrections.updateCorrection(data, activedItem.correctionId)
            successMessage = `Chỉnh sửa ${handler.label[toggleButtonsMode]} thành công`
        }
        callApi(() => callApiFunction, fetchData, successMessage)
    }
    const handleEdit = (e) => {
        setInitValue(handler.initValueMapper[toggleButtonsMode](activedItem, equipmentClassList))
        handleOpen(e)
    }
    const handleDelete = (row) => {
        const id = toggleButtonsMode == 0 ? row.causeId : row.correctionId
        const name = toggleButtonsMode == 0 ? row.causeName : row.correctionName
        let callApiFunction
        callApiFunction =
            toggleButtonsMode == 0
                ? () => CMMSSettingApi.causes.deleteCause(id)
                : () => CMMSSettingApi.corrections.deleteCorrection(id)

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
        const activedRow = toggleButtonsMode == 0 ? cause[index] : correction[index]
        setActivedItem(activedRow)
    }

    return (
        <>
            <div data-component="ResourceType" className="container flex h-full flex-wrap">
                <div className="relative h-full grow xl:w-full">
                    <div className="flex">
                        <div className="flex-1">
                            <div className="flex">
                                <Button
                                    onClick={(e) => {
                                        handleAdd(e)
                                    }}
                                >{`Thêm ${handler.label[toggleButtonsMode]}`}</Button>
                            </div>
                        </div>
                        <div className="flex-1">
                            <ToggleButtons
                                active={toggleButtonsMode}
                                onClick={setToggleButtonsMode}
                                titles={CMMMS_SETTING_MODE_LIST}
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
                            body={toggleButtonsMode == 0 ? cause : correction}
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
                            ? handler.editMenuNav[toggleButtonsMode](equipmentClassList)
                            : handler.createMenuNav[toggleButtonsMode](equipmentClassList)
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

export default CMMSCause
