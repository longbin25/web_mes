import Button from "@/components/Button"
import Confirm from "@/components/Confirm"
import PoperMenuNew from "@/components/PoperMenuNew"
import Table from "@/components/Table"
import { useCallApi, usePoperMenuNew } from "@/hooks"
import { CMMSEquipmentAPi, CMMSMaterialAPi } from "@/services/api"
import { CMMSMaterialMapper } from "@/utils/functions"
import { getCMMSMaterialInfoEditMenuNav, getCMMSMaterialInfoMenuNav } from "@/utils/menuNavigation"
import { CMMS_MATERIAL_INFO_TABLE_COLUMNS } from "@/utils/tableColumns"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function CMMSMaterial() {
    const callApi = useCallApi()
    const navigate = useNavigate()
    const { active, position, handleClose, handleOpen } = usePoperMenuNew(400)
    const [deleteConfirm, setDeleteConfirm] = useState({}) //State này chứa thông tin về xác nhận xóa vật tư. Khi người dùng chọn xóa một vật tư, thông tin xác nhận xóa sẽ được lưu trữ trong deleteConfirm, bao gồm tiêu đề, nội dung và hàm xác nhận.

    const [materialInfor, setMaterialInfor] = useState([])
    const [initValue, setInitValue] = useState() // dùng để chứa data đang chỉnh sửa, nếu = null thì đang tạo mục mới; undefined là bình thường
    const [activedItem, setActivedItem] = useState(null)

    const fetchData = useCallback(() => {
        callApi(CMMSMaterialAPi.materialInfor.getMaterialInfors, (res) => {
            setMaterialInfor(CMMSMaterialMapper.apiToClient(res.items))
        })
    }, [callApi])
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
            data = value.info
            callApiFunction = CMMSMaterialAPi.materialInfor.createMaterialInfor(data)
            successMessage = "Tạo thông tin vật tư thành công"
        } else {
            data = value.info
            callApiFunction = CMMSMaterialAPi.materialInfor.updateMaterialInfor(data, activedItem.materialInforId)
            successMessage = "Chỉnh sửa thông tin vật tư thành công"
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
        const id = row.materialInforId
        const name = row.name
        setDeleteConfirm({
            actived: true,
            title: "Xác nhận xóa thông tin vật tư " + name,
            content: `Thông tin vật tư ${name} sẽ bị xóa vĩnh viễn và không được hiển thị tại trang này nữa`,
            onConfirm() {
                callApi(
                    () => CMMSMaterialAPi.materialInfor.deleteMaterialInfor(id),
                    fetchData,
                    `Thông tin vật tư ${name} được xóa thành công`,
                )
            },
        })
    }
    const handleTableRowClick = (row, index) => {
        const activedRow = materialInfor[index]
        setActivedItem(activedRow)
    }

    return (
        <>
            <div data-component="ResourceType" className="container flex h-full flex-wrap">
                <div className="relative h-full grow xl:w-full">
                    <div className="flex">
                        <Button onClick={handleAdd}>Thêm thông tin vật tư</Button>
                    </div>
                    <div className="scroll-y mt-2 h-[calc(100%-60px)] p-1 pt-0">
                        <Table
                            activable
                            primary
                            sticky
                            headers={CMMS_MATERIAL_INFO_TABLE_COLUMNS}
                            body={materialInfor}
                            className="mt-4"
                            onEdit={handleEdit}
                            onRowClick={handleTableRowClick}
                            onDeleteRow={handleDelete}
                            enableIdClick
                            idClickFunction={(e, row, index) => {
                                console.log(row)
                                navigate(`/cmms/material/${row.code}`, { state: row })
                            }}
                        />
                    </div>
                </div>
            </div>
            {active && (
                <PoperMenuNew
                    position={position}
                    onClose={handleClose}
                    menuNavigaton={initValue ? getCMMSMaterialInfoEditMenuNav() : getCMMSMaterialInfoMenuNav()}
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

export default CMMSMaterial
