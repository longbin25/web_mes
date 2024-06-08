import Button from "@/components/Button"
import Confirm from "@/components/Confirm"
import PoperMenuNew from "@/components/PoperMenuNew"
import Table from "@/components/Table"
import { useCallApi, usePoperMenuNew } from "@/hooks"
import { CMMSPersonAPi } from "@/services/api"
import { getCMMSPersonEditMenuNav, getCMMSPersonMenuNav } from "@/utils/menuNavigation"
import { CMMS_PERSON_TABLE_COLUMNS } from "@/utils/tableColumns"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function CMMSPerson() {
    const callApi = useCallApi()
    const navigate = useNavigate()

    const { active, position, handleClose, handleOpen } = usePoperMenuNew(400)
    const [deleteConfirm, setDeleteConfirm] = useState({}) //State này chứa thông tin về xác nhận xóa vật tư. Khi người dùng chọn xóa một vật tư, thông tin xác nhận xóa sẽ được lưu trữ trong deleteConfirm, bao gồm tiêu đề, nội dung và hàm xác nhận.

    const [person, setPerson] = useState([])
    const [initValue, setInitValue] = useState() // dùng để chứa data đang chỉnh sửa, nếu = null thì đang tạo mục mới; undefined là bình thường
    const [activedItem, setActivedItem] = useState(null)

    const fetchData = useCallback(() => {
        callApi(CMMSPersonAPi.person.getPersons, (res) => {
            setPerson(res.items)
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
            callApiFunction = CMMSPersonAPi.person.createPerson(data)
            successMessage = "Tạo nhân viên thành công"
        } else {
            data = value.info
            callApiFunction = CMMSPersonAPi.person.updatePerson(data, activedItem.personId)
            successMessage = "Chỉnh sửa nhân viên thành công"
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
        const personId = row.personId
        const personName = row.personName

        setDeleteConfirm({
            actived: true,
            title: "Xác nhận xóa nhân viên " + personName,
            content: `Nhân viên ${personName} sẽ bị xóa vĩnh viễn và không được hiển thị tại trang này nữa`,
            onConfirm() {
                callApi(
                    () => CMMSPersonAPi.person.deletePerson(personId),
                    fetchData,
                    `Nhân viên ${personName} được xóa thành công`,
                )
            },
        })
    }
    const handleTableRowClick = (row, index) => {
        const activedRow = person[index]
        setActivedItem(activedRow)
    }
    console.log(activedItem)
    console.log(initValue)
    return (
        <>
            <div data-component="ResourceType" className="container flex h-full flex-wrap">
                <div className="relative h-full grow xl:w-full">
                    <div className="flex">
                        <Button onClick={handleAdd}>Thêm nhân viên</Button>
                    </div>
                    <div className="scroll-y mt-2 h-[calc(100%-60px)] p-1 pt-0">
                        <Table
                            activable
                            primary
                            sticky
                            headers={CMMS_PERSON_TABLE_COLUMNS}
                            body={person}
                            className="mt-4"
                            onEdit={handleEdit}
                            onRowClick={handleTableRowClick}
                            onDeleteRow={handleDelete}
                            enableIdClick
                            idClickFunction={(e, row, index) => {
                                console.log(row)
                                navigate(`/cmms/workingTime`, { state: row })
                            }}
                        />
                    </div>
                </div>
            </div>
            {active && (
                <PoperMenuNew
                    position={position}
                    onClose={handleClose}
                    menuNavigaton={initValue ? getCMMSPersonEditMenuNav() : getCMMSPersonMenuNav()}
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

export default CMMSPerson
