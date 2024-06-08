import Button from "@/components/Button"
import Confirm from "@/components/Confirm"
import PoperMenuNew from "@/components/PoperMenuNew"
import Table from "@/components/Table"
import { useCallApi, usePoperMenuNew } from "@/hooks"
import { CMMSPersonAPi, authorizationApi } from "@/services/api"
import { getCMMSPersonEditMenuNav, getCMMSPersonMenuNav, getSETTINGRoleMenuNav } from "@/utils/menuNavigation"
import { CMMS_PERSON_TABLE_COLUMNS, SETTING_ROLE_TABLE_COLUMNS } from "@/utils/tableColumns"
import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function SETTINGRole() {
    const callApi = useCallApi()
    const userData = useSelector((state) => state)

    const { active, position, handleClose, handleOpen } = usePoperMenuNew(400)
    const [deleteConfirm, setDeleteConfirm] = useState({}) //State này chứa thông tin về xác nhận xóa vật tư. Khi người dùng chọn xóa một vật tư, thông tin xác nhận xóa sẽ được lưu trữ trong deleteConfirm, bao gồm tiêu đề, nội dung và hàm xác nhận.

    const [role, setRole] = useState([])
    const [initValue, setInitValue] = useState() // dùng để chứa data đang chỉnh sửa, nếu = null thì đang tạo mục mới; undefined là bình thường
    const [activedItem, setActivedItem] = useState(null)

    const fetchData = useCallback(() => {
        callApi(authorizationApi.role.getRole, (res) => {
            setRole(res)
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
            callApiFunction = authorizationApi.role.createRole(data)
            successMessage = "Tạo chức vụ thành công"
        } else {
            data = value.info
            callApiFunction = CMMSPersonAPi.person.updatePerson(data, activedItem.personId)
            successMessage = "Chỉnh sửa chức vụ thành công"
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
        const id = row.name
        const name = row.name

        setDeleteConfirm({
            actived: true,
            title: "Xác nhận xóa chức vụ " + name,
            content: `Chức vụ ${name} sẽ bị xóa vĩnh viễn và không được hiển thị tại trang này nữa`,
            onConfirm() {
                callApi(() => authorizationApi.role.deleteRole(id), fetchData, `Chức vụ ${name} được xóa thành công`)
            },
        })
    }
    const handleTableRowClick = (row, index) => {
        const activedRow = role[index]
        setActivedItem(activedRow)
    }
    console.log(activedItem)
    return (
        <>
            <div data-component="ResourceType" className="container flex h-full flex-wrap">
                <div className="relative h-full grow xl:w-full">
                    <div className="flex">
                        {userData.auth.role.includes("Admin") ? (
                            <Button onClick={handleAdd}>Thêm chức vụ mới</Button>
                        ) : (
                            <h2>Chỉ có Admin mới có quyền tạo chức vụ mới!</h2>
                        )}
                    </div>
                    <div className="scroll-y mt-2 h-[calc(100%-60px)] p-1 pt-0">
                        <Table
                            activable
                            primary
                            sticky
                            headers={SETTING_ROLE_TABLE_COLUMNS}
                            body={role}
                            className="mt-4"
                            // onEdit={handleEdit}
                            onRowClick={handleTableRowClick}
                            onDeleteRow={userData.auth.role.includes("Admin") && handleDelete}
                        />
                    </div>
                </div>
            </div>
            {active && (
                <PoperMenuNew
                    position={position}
                    onClose={handleClose}
                    menuNavigaton={initValue ? getCMMSPersonEditMenuNav() : getSETTINGRoleMenuNav()}
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

export default SETTINGRole
