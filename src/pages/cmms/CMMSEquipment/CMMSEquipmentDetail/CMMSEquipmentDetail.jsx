import Button from "@/components/Button"
import Confirm from "@/components/Confirm"
import PoperMenuNew from "@/components/PoperMenuNew"
import Table from "@/components/Table"
import ToggleButtons from "@/components/ToggleButtons"
import { useCallApi, usePoperMenuNew } from "@/hooks"
import { CMMSEquipmentAPi, CMMSMaterialAPi } from "@/services/api"
import { CMMSEquipmentMaterialMapper, getResourceOptionsList } from "@/utils/functions"
import { getCMMSEquipmentMaterialEditMenuNav, getCMMSEquipmentMaterialMenuNav } from "@/utils/menuNavigation"
import {
    CMMS_EQUIPMENTDETAIL_CAUSE_TABLE_COLUMNS,
    CMMS_EQUIPMENT_MATERIAL_TABLE_COLUMNS,
    CMMS_MTBF_TABLE_COLUMNS,
    CMMS_MTTF_TABLE_COLUMNS,
} from "@/utils/tableColumns"
import { useCallback, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
const handler = {
    tableColumn: {
        0: CMMS_EQUIPMENT_MATERIAL_TABLE_COLUMNS,
        1: CMMS_MTBF_TABLE_COLUMNS,
        2: CMMS_MTTF_TABLE_COLUMNS,
        3: CMMS_EQUIPMENTDETAIL_CAUSE_TABLE_COLUMNS,
    },
}
function CMMSEquipmentDetail() {
    const callApi = useCallApi()
    const location = useLocation()
    const routeData = location.state // biến lưu data gửi từ trang CMMSEquipment
    console.log(routeData.errors)
    const { active, position, handleClose, handleOpen } = usePoperMenuNew(400)
    const [deleteConfirm, setDeleteConfirm] = useState({}) //State này chứa thông tin về xác nhận xóa vật tư. Khi người dùng chọn xóa một vật tư, thông tin xác nhận xóa sẽ được lưu trữ trong deleteConfirm, bao gồm tiêu đề, nội dung và hàm xác nhận.

    const [initValue, setInitValue] = useState() // dùng để chứa data đang chỉnh sửa, nếu = null thì đang tạo mục mới; undefined là bình thường
    const [activedItem, setActivedItem] = useState(null)
    const [toggleButtonsMode, setToggleButtonsMode] = useState(0)

    const [equipmentMaterial, setEquipmentMaterial] = useState([])
    const [MTBF, setMTBF] = useState([])
    const [MTTF, setMTTF] = useState([])
    const [cause, setCause] = useState([])
    const [equipmentMaterialShowData, setEquipmentMaterialShowData] = useState([])
    const [materialInforList, setMaterialInforList] = useState([])

    const fetchData = useCallback(() => {
        callApi(
            [
                CMMSEquipmentAPi.equipmentMaterial.getEquipmentMaterialsByEquipmentId(routeData.equipmentId),
                CMMSMaterialAPi.materialInfor.getMaterialInfors(),
            ],
            (res) => {
                setEquipmentMaterial(res[0].items)
                setEquipmentMaterialShowData(CMMSEquipmentMaterialMapper.apiToClient(res[0].items))
                setMaterialInforList(getResourceOptionsList(res[1].items, "materialInforId"))
            },
        )
    }, [callApi])

    useEffect(() => {
        fetchData()
    }, [fetchData])
    useEffect(() => {
        setMTBF(CMMSEquipmentMaterialMapper.apiToClientMTBF(routeData.mtbfData.history))
        setMTTF(CMMSEquipmentMaterialMapper.apiToClientMTTF(routeData.mttfData.history))
        setCause(routeData.errors)
    }, [])
    const handleAddClass = (e) => {
        setInitValue(null)
        handleOpen(e)
    }
    const handleSubmit = (value) => {
        let data
        let callApiFunction
        let successMessage

        if (!initValue) {
            data = CMMSEquipmentMaterialMapper.clientToAPI(value)
            callApiFunction = CMMSEquipmentAPi.equipmentMaterial.createEquipmentMaterialByEquipmentId(
                data,
                routeData.equipmentId,
            )
            successMessage = "Tạo vật tư bảo trì thiết bị thành công"
        } else {
            data = CMMSEquipmentMaterialMapper.clientToAPI(value)
            callApiFunction = CMMSEquipmentAPi.equipmentMaterial.updateEquipmentMaterial(
                data,
                activedItem.equipmentMaterialId,
            )
            successMessage = "Chỉnh sửa vật tư bảo trì thiết bị thành công"
        }
        callApi(() => callApiFunction, fetchData, successMessage)
    }
    const handleEdit = (e) => {
        setInitValue({
            info: {
                ...activedItem,
                materialInforId: [activedItem.materialInfor.materialInforId],
            },
        })
        handleOpen(e)
    }

    const handleDelete = (row) => {
        setDeleteConfirm({
            actived: true,
            title: "Xác nhận xóa vật tư bảo trì thiết bị",
            content: `Vật tư bảo trì thiết bị sẽ bị xóa vĩnh viễn và không được hiển thị tại trang này nữa`,
            onConfirm() {
                callApi(
                    () => CMMSEquipmentAPi.equipmentMaterial.deleteEquipmentMaterial(row.equipmentMaterialId),
                    fetchData,
                    `Vật tư bảo trì thiết bị được xóa thành công`,
                )
            },
        })
    }
    const handleTableRowClick = (row, index) => {
        const activedRow = equipmentMaterial[index]
        setActivedItem(activedRow)
    }

    return (
        <>
            <div data-component="ResourceType" className="container flex h-full flex-wrap">
                <div className="relative h-full grow xl:w-full">
                    <div className="flex">
                        <div className="flex-1">
                            {toggleButtonsMode == 0 && (
                                <Button onClick={handleAddClass}>Thêm vật tư bảo trì thiết bị</Button>
                            )}
                        </div>
                        <div className="flex-1">
                            <ToggleButtons
                                active={toggleButtonsMode}
                                onClick={setToggleButtonsMode}
                                titles={["Vật tư bảo trì thiết bị", "Lịch sử MTBF", "Lịch sử MTTF", "Lịch sử lỗi"]}
                                width="250px"
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
                            body={
                                toggleButtonsMode == 0
                                    ? equipmentMaterialShowData
                                    : toggleButtonsMode == 1
                                    ? MTBF
                                    : toggleButtonsMode == 2
                                    ? MTTF
                                    : cause
                            }
                            className="mt-4"
                            onRowClick={handleTableRowClick}
                            onEdit={toggleButtonsMode == 0 ? handleEdit : null}
                            onDeleteRow={toggleButtonsMode == 0 ? handleDelete : null}
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
                            ? getCMMSEquipmentMaterialEditMenuNav(materialInforList)
                            : getCMMSEquipmentMaterialMenuNav(materialInforList)
                    }
                    onClick={handleSubmit}
                    initValue={initValue ? initValue : undefined}
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

export default CMMSEquipmentDetail
