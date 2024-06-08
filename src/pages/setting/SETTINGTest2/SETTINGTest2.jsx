import Button from "@/components/Button"
import Confirm from "@/components/Confirm"
import PoperMenuNew from "@/components/PoperMenuNew"
import Table from "@/components/Table"
import { useCallApi, usePoperMenuNew } from "@/hooks"
import { getCMMSPersonEditMenuNav, getCMMSPersonMenuNav } from "@/utils/menuNavigation"
import { CMMS_PERSON_TABLE_COLUMNS } from "@/utils/tableColumns"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {testApi} from "@/services/api"
import { test_data, test_data_1, test_data_2 } from "@/utils/tableColumns/test"
import { editMenuTest, editMenuTest2, getMenuTest, getMenuTest2 } from "@/utils/menuNavigation/test"
import ToggleButtons from "@/components/ToggleButtons"
import { test_control } from "@/utils/constants"
import testApi2 from "@/services/api/test_2/test_2"


function SETTINGTest2() {
    const callApi = useCallApi()
    const navigate = useNavigate()

    const { active, position, handleClose, handleOpen } = usePoperMenuNew(400)
    const [deleteConfirm, setDeleteConfirm] = useState({}) //State này chứa thông tin về xác nhận xóa vật tư. Khi người dùng chọn xóa một vật tư, thông tin xác nhận xóa sẽ được lưu trữ trong deleteConfirm, bao gồm tiêu đề, nội dung và hàm xác nhận.

    const [person, setPerson] = useState([])
    const [person2, setPerson2] = useState([])

    const [initValue, setInitValue] = useState() // dùng để chứa data đang chỉnh sửa, nếu = null thì đang tạo mục mới; undefined là bình thường
    const [activedItem, setActivedItem] = useState(null)
    const [activedItem2, setActivedItem2] = useState(null)
    const [controlStatus, setControlStatus] = useState(0)

    const fetchData = useCallback(() => {
        callApi([testApi.getMemberName(), testApi2.getMemberName()], (res) => {
            setPerson(res[0])
            setPerson2(res[1])
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
            callApiFunction = testApi.createMemberName(data)
            successMessage = "Tạo nhân viên thành công"
        } else {
            data = value.info
            callApiFunction = testApi.updateMemberName(data, activedItem.id)
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
const handleSubmit2 = (value) => {
        let data
        let callApiFunction
        let successMessage

        if (!initValue) {
            data = value.info
            callApiFunction = testApi2.createMemberName(data)
            successMessage = "Tạo nhân viên thành công"
        } else {
            data = value.info
            callApiFunction = testApi2.updateMemberName(data, activedItem2.id)
            successMessage = "Chỉnh sửa nhân viên thành công"
        }
        callApi(() => callApiFunction, fetchData, successMessage)
    }
    const handleEdit2 = (e) => {
        setInitValue({
            info: activedItem2,
        })
        handleOpen(e)
    }

    const handleDelete = (row) => {
        const personId = row.id
        const personName = row.personName
        setDeleteConfirm({
            actived: true,
            title: "Xác nhận xóa nhân viên " + personName,
            content: `Nhân viên ${personName} sẽ bị xóa vĩnh viễn và không được hiển thị tại trang này nữa`,
            onConfirm() {
                callApi(
                    () => testApi.deleteMemberName(personId),
                    fetchData,
                    `Nhân viên ${personName} được xóa thành công`,
                )
            },
        })
    }
    const handleDelete2 = (row) => {
        const personId = row.id
        const personName = row.FullName
        setDeleteConfirm({
            actived: true,
            title: "Xác nhận xóa nhân viên " + personName,
            content: `Nhân viên ${personName} sẽ bị xóa vĩnh viễn và không được hiển thị tại trang này nữa`,
            onConfirm() {
                callApi(
                    () => testApi2.deleteMemberName(personId),
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
    const handleTableRowClick2 = (row, index) => {
        const activedRow = person2[index]
        setActivedItem2(activedRow)
    }

    // console.log(activedItem)
    // console.log(initValue)
    return (
        <>
        <ToggleButtons 
                active={controlStatus}
                onClick={setControlStatus}
                titles={test_control}
            />
            <div data-component="ResourceType" className="container flex h-full flex-wrap">
                <div className="relative h-full grow xl:w-full">
                    <div className="flex">
                        <Button onClick={handleAdd}>Thêm nhân viên</Button>
                    </div>
                    <div className="scroll-y mt-2 h-[calc(100%-60px)] p-1 pt-0">
                    {
                controlStatus ? 
                        <Table
                            activable
                            primary
                            sticky
                            headers={test_data_1}
                            body={person}   //mảng dữ liệu
                            className="mt-4"
                            onEdit={handleEdit}
                            onRowClick={handleTableRowClick}
                            onDeleteRow={handleDelete}
                            enableIdClick
                            idClickFunction={(e, row, index) => {
                                console.log(row)
                                navigate(`/setting/Test`, { state: row })
                            }}
                        />
                        :
                        <Table
                            activable
                            primary
                            sticky
                            headers={test_data_2}
                            body={person2}   //mảng dữ liệu
                            className="mt-4"
                            onEdit={handleEdit2}
                            onRowClick={handleTableRowClick2}
                            onDeleteRow={handleDelete2}
                            enableIdClick
                            idClickFunction={(e, row, index) => {
                                console.log(row)
                                navigate(`/setting/Test`, { state: row })
                            }}
                        />
                        }
                        
                    </div>
                </div>
            </div>
            {active && (
                <PoperMenuNew
                    position={position}
                    onClose={handleClose}
                    menuNavigaton={initValue ?  ( controlStatus ? editMenuTest() : editMenuTest2()) : ( controlStatus ? getMenuTest() : getMenuTest2())}
                    onClick={ controlStatus ? handleSubmit : handleSubmit2}
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

export default SETTINGTest2
