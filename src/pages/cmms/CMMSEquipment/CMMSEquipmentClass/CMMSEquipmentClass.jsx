import Button from "@/components/Button"
import Confirm from "@/components/Confirm"
import PoperMenuNew from "@/components/PoperMenuNew"
import Table from "@/components/Table"
import { useCallApi, usePoperMenuNew } from "@/hooks"
import { CMMSEquipmentAPi } from "@/services/api"
import { getCMMSEquipmentClassEditMenuNav, getCMMSEquipmentClassMenuNav } from "@/utils/menuNavigation"
import { CMMS_EQUIPMENT_CLASS_TABLE_COLUMNS } from "@/utils/tableColumns"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function CMMSEquipmentClass() {
    const callApi = useCallApi()
    const navigate = useNavigate()
    
    const { active, position, handleClose, handleOpen } = usePoperMenuNew(400)
    const [deleteConfirm, setDeleteConfirm] = useState({}) //State này chứa thông tin về xác nhận xóa vật tư. Khi người dùng chọn xóa một vật tư, thông tin xác nhận xóa sẽ được lưu trữ trong deleteConfirm, bao gồm tiêu đề, nội dung và hàm xác nhận.

    const [equipmentClass, setEquipmentClass] = useState([])
    const [initValue, setInitValue] = useState() // dùng để chứa data đang chỉnh sửa, nếu = null thì đang tạo mục mới; undefined là bình thường
    const [activedItem, setActivedItem] = useState(null)

    const fetchData = useCallback(() => {
        callApi(CMMSEquipmentAPi.equipmentClass.getEquipmentClasses, (res) => {
            setEquipmentClass(res.items)
        })
    }, [callApi])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleAddClass = (e) => {
        setInitValue(null)
        handleOpen(e)
    }
    const handleSubmit = (value) => {
        let data
        let callApiFunction
        let successMessage

        if (!initValue) {
            data = value.info
            callApiFunction = CMMSEquipmentAPi.equipmentClass.createEquipmentClass(data)
            successMessage = "Tạo loại thiết bị thành công"
        } else {
            data = value.info
            callApiFunction = CMMSEquipmentAPi.equipmentClass.updateEquipmentClass(data, activedItem.equipmentClassId)
            successMessage = "Chỉnh sửa loại thiết bị thành công"
        }
        callApi(() => callApiFunction, fetchData, successMessage)
    }
    const handleEdit = (e) => {
        setInitValue({
            info: activedItem,
        })
        handleOpen(e)
    }
    const handleDelete = (row) => {
        const equipmentClassId = row.equipmentClassId

        setDeleteConfirm({
            actived: true,
            title: "Xác nhận xóa loại thiết bị " + equipmentClassId,
            content: `Loại thiết bị ${equipmentClassId} sẽ bị xóa vĩnh viễn và không được hiển thị tại trang này nữa`,
            onConfirm() {
                callApi(
                    () => CMMSEquipmentAPi.equipmentClass.deleteEquipmentClass(equipmentClassId),
                    fetchData,
                    `Loại thiết bị ${equipmentClassId} được xóa thành công`,
                )
            },
        })
    }
    const handleTableRowClick = (row, index) => {
        const activedRow = equipmentClass[index]
        setActivedItem(activedRow)
    }
    console.log(activedItem)
    console.log(initValue)
    return (
        <>
            <div data-component="ResourceType" className="container flex h-full flex-wrap">
                <div className="relative h-full grow xl:w-full">
                    <div className="flex">
                        <Button onClick={handleAddClass}>Thêm loại thiết bị</Button>
                    </div>
                    <div className="scroll-y mt-2 h-[calc(100%-60px)] p-1 pt-0">
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
                    </div>
                </div>
            </div>
            {active && (
                <PoperMenuNew
                    position={position}
                    onClose={handleClose}
                    menuNavigaton={initValue ? getCMMSEquipmentClassEditMenuNav() : getCMMSEquipmentClassMenuNav()}
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

export default CMMSEquipmentClass
