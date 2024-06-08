import Button from "@/components/Button"
import Confirm from "@/components/Confirm"
import PoperMenuNew from "@/components/PoperMenuNew"
import Table from "@/components/Table"
import { useCallApi, usePoperMenuNew } from "@/hooks"
import { CMMSEquipmentAPi } from "@/services/api"
import { useCallback, useEffect, useState } from "react"
import { getResourceOptionsList, CMMSEquipmentMapper, getValuesByKey } from "@/utils/functions"

import { Link, useNavigate } from "react-router-dom"
import { getCMMSEquipmentMenuNav, getCMMSEquipmentEditMenuNav } from "@/utils/menuNavigation"
import { CMMS_EQUIPMENT_TABLE_COLUMNS } from "@/utils/tableColumns"

function CMMSEquipment() {
    const callApi = useCallApi()
    const navigate = useNavigate()

    const { active, position, handleClose, handleOpen } = usePoperMenuNew(400)

    const [deleteConfirm, setDeleteConfirm] = useState({}) //State này chứa thông tin về xác nhận xóa vật tư. Khi người dùng chọn xóa một vật tư, thông tin xác nhận xóa sẽ được lưu trữ trong deleteConfirm, bao gồm tiêu đề, nội dung và hàm xác nhận.
    const [initValue, setInitValue] = useState() // dùng để chứa data đang chỉnh sửa, nếu = null thì đang tạo mục mới; undefined là bình thường
    const [activedItem, setActivedItem] = useState(null)

    const [equipment, setEquipment] = useState([])
    const [equipmentShowData, setEquipmentShowData] = useState([])
    const [equipmentClassList, setEquipmentClassList] = useState([])
    const [equipmentMaterialList, setEquipmentMaterialList] = useState([])

    const fetchData = useCallback(() => {
        callApi(
            [
                CMMSEquipmentAPi.equipment.getEquipments(),
                CMMSEquipmentAPi.equipmentClass.getEquipmentClasses(),
                // CMMSEquipmentAPi.equipmentMaterial.getEquipmentMaterials(),
            ],
            (res) => {
                setEquipment(res[0].items)
                setEquipmentClassList(getResourceOptionsList(res[1].items, "equipmentClassId"))
                // setEquipmentMaterialList(getResourceOptionsList(res[2].items, "equipmentMaterialId"))
            },
        )
    }, [callApi])
    useEffect(() => {
        fetchData()
    }, [fetchData])
    useEffect(() => {
        setEquipmentShowData(CMMSEquipmentMapper.apiToClient(equipment))
    }, [equipment])
    console.log(equipmentShowData)
    const handleAddEquipment = (e) => {
        setInitValue(null)
        handleOpen(e)
    }
    const handleSubmit = (value) => {
        console.log(value)
        let data
        let callApiFunction
        let successMessage

        if (!initValue) {
            data = CMMSEquipmentMapper.clientToAPI(value) // Or any other specific data handling for the last case
            callApiFunction = CMMSEquipmentAPi.equipment.createEquipment(data)
            successMessage = "Tạo thiết bị thành công"
        } else {
            console.log("edit equipment")
        }
        callApi(() => callApiFunction, fetchData, successMessage)
    }
    const handleEdit = (e) => {
        setInitValue({
            info: {
                ...activedItem,
                equipmentClass: getValuesByKey(activedItem.equipmentClass, equipmentClassList),
            },
        })
        handleOpen(e)
    }

    const handleDeleteRow = (row) => {
        const code = row.code
        setDeleteConfirm({
            actived: true,
            title: "Xác nhận xóa thiết bị " + code,
            content: `Thiết bị ${code} sẽ bị xóa vĩnh viễn và không được hiển thị tại trang này nữa`,
            onConfirm() {
                callApi(
                    () => CMMSEquipmentAPi.equipment.deleteEquipment(row.equipmentId),
                    fetchData,
                    `Thiết bị ${code} được xóa thành công`,
                )
            },
        })
    }
    const handleTableRowClick = (row, index) => {
        const activedRow = equipment[index]
        setActivedItem(activedRow)
    }
    return (
        <>
            <div data-component="ResourceType" className="container flex h-full flex-wrap">
                <div className="relative h-full grow xl:w-full">
                    <div className="flex">
                        <Button onClick={handleAddEquipment}>Thêm thiết bị</Button>
                        <Link to={"/cmms/equipment/class"} className="text-pri ml-auto  mr-10 ">
                            <h3 className="text-pri ml-auto  mr-4 underline hover:text-primary-1">Loại thiết bị</h3>
                        </Link>
                    </div>
                    <div className="scroll-y mt-2 h-[calc(100%-60px)] p-1 pt-0">
                        <Table
                            activable
                            primary
                            sticky
                            headers={CMMS_EQUIPMENT_TABLE_COLUMNS}
                            body={equipmentShowData}
                            onEdit={handleEdit}
                            onRowClick={handleTableRowClick}
                            onDeleteRow={handleDeleteRow}
                            className="mt-4"
                            enableIdClick
                            idClickFunction={(e, row, index) => {
                                console.log(row)
                                navigate(`/cmms/equipment/detail/${row.code}`, { state: row })
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
                            ? getCMMSEquipmentEditMenuNav(equipmentClassList)
                            : getCMMSEquipmentMenuNav(equipmentClassList)
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

export default CMMSEquipment
