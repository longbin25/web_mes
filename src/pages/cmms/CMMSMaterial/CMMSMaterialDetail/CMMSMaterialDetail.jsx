import Button from "@/components/Button"
import Confirm from "@/components/Confirm"
import PoperMenuNew from "@/components/PoperMenuNew"
import Table from "@/components/Table"
import ToggleButtons from "@/components/ToggleButtons"
import { useCallApi, usePoperMenuNew } from "@/hooks"
import { CMMSMaterialAPi } from "@/services/api"
import { CMMMS_MATERIAL_DETAIL_MODE_LIST } from "@/utils/constants"
import {
    CMMSMaterialHistoryCardMapper,
    CMMSMaterialDetailMapper,
    CMMSMaterialRequestMapper,
    getResourceOptionsList,
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
} from "@/utils/menuNavigation"
import {
    CMMS_MATERIAL_DETAIL_HISTORYCARD_TABLE_COLUMNS,
    CMMS_MATERIAL_DETAIL_MATERIAL_REQUEST_TABLE_COLUMNS,
    CMMS_MATERIAL_DETAIL_MATERIAL_TABLE_COLUMNS,
} from "@/utils/tableColumns"
import { useCallback, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import CMMSMaterialRequestModal from "./CMMSMaterialRequestModal"

const handler = {
    label: {
        0: "yêu cầu vật tư",
        1: "vật tư",
        2: "thẻ vật tư",
    },
    labelUpperCase: {
        0: "Yêu cầu vật tư",
        1: "Vật tư",
        2: "Thẻ vật tư",
    },
    tableColumn: {
        0: CMMS_MATERIAL_DETAIL_MATERIAL_REQUEST_TABLE_COLUMNS,
        1: CMMS_MATERIAL_DETAIL_MATERIAL_TABLE_COLUMNS,
        2: CMMS_MATERIAL_DETAIL_HISTORYCARD_TABLE_COLUMNS,
    },
    createMenuNav: {
        0: getCMMSMaterialRequestMenuNav,
        1: getCMMSMaterialMenuNav,
        2: getCMMSHistoryCardMenuNav,
    },
    editMenuNav: {
        0: getCMMSMaterialRequestEditMenuNav,
        1: getCMMSMaterialEditMenuNav,
        2: getCMMSHistoryCardEditMenuNav,
    },
    createMapper: {
        0: CMMSMaterialRequestMapper.clientToAPI,
        1: CMMSMaterialDetailMapper.clientToAPI,
        2: returnData,
    },
    editMapper: {
        0: CMMSMaterialRequestMapper.edit,
        1: CMMSMaterialDetailMapper.edit,
        2: returnData,
    },
    apiToClientMapper: {
        0: CMMSMaterialRequestMapper.apiToClient,
        1: CMMSMaterialDetailMapper.edit,
        2: CMMSMaterialHistoryCardMapper.apiToClient,
    },
}
function CMMSMaterialDetail() {
    const callApi = useCallApi()
    const location = useLocation()
    const routeData = location.state // biến lưu data gửi từ trang CMMSMaterial

    const { active, position, handleClose, handleOpen } = usePoperMenuNew(500)
    const [deleteConfirm, setDeleteConfirm] = useState({}) //State này chứa thông tin về xác nhận xóa vật tư. Khi người dùng chọn xóa một vật tư, thông tin xác nhận xóa sẽ được lưu trữ trong deleteConfirm, bao gồm tiêu đề, nội dung và hàm xác nhận.
    const [initValue, setInitValue] = useState() // dùng để chứa data đang chỉnh sửa, nếu = null thì đang tạo mục mới; undefined là bình thường
    const [activedItem, setActivedItem] = useState(null)
    const [toggleButtonsMode, setToggleButtonsMode] = useState(0)
    const [materialRequestModal, setMaterialRequestModal] = useState({})

    const [historyCard, setHistoryCard] = useState([])
    const [materialRequest, setMaterialRequest] = useState([])
    const [material, setMaterial] = useState([])

    const [materialRequestShowData, setMaterialRequestShowData] = useState([])
    const [historyCardShowData, setHistoryCardShowData] = useState([])

    const [materialInforList, setMaterialInforList] = useState([])

    const fetchData = useCallback(() => {
        callApi(
            [
                CMMSMaterialAPi.materialHistoryCard.getMaterialHistoryCards(routeData.materialInforId),
                CMMSMaterialAPi.materialRequest.getMaterialRequests(routeData.materialInforId),
                CMMSMaterialAPi.materialInfor.getMaterialInfors(),
                CMMSMaterialAPi.material.getMaterials(routeData.materialInforId),
            ],
            (res) => {
                setHistoryCard(res[0].items)
                setHistoryCardShowData(handler.apiToClientMapper[2](res[0].items))
                setMaterialRequest(res[1].items)
                setMaterialRequestShowData(handler.apiToClientMapper[0](res[1].items))
                setMaterialInforList(getResourceOptionsList(res[2].items, "materialInforId"))
                setMaterial(res[3].items)
            },
        )
    }, [callApi])
    useEffect(() => {
        fetchData()
    }, [fetchData])
    console.log(materialRequestShowData)
    const handleAdd = (e) => {
        setInitValue(null)
        handleOpen(e)
    }

    const handleSubmit = (value) => {
        console.log("rawdata")
        console.log(value)
        let data
        let callApiFunction
        let successMessage

        if (!initValue) {
            data = handler.createMapper[toggleButtonsMode](value)
            callApiFunction =
                toggleButtonsMode == 1
                    ? CMMSMaterialAPi.material.createMaterial(data, routeData.materialInforId)
                    : toggleButtonsMode == 2
                    ? CMMSMaterialAPi.materialHistoryCard.createMaterialHistoryCard(data, routeData.materialInforId)
                    : CMMSMaterialAPi.materialRequest.createMaterialRequest(data, routeData.materialInforId)
            successMessage = `Tạo ${handler.label[toggleButtonsMode]} thành công`
        } else {
            data = handler.editMapper[toggleButtonsMode](value)
            console.log(data)
            callApiFunction =
                toggleButtonsMode == 1
                    ? CMMSMaterialAPi.material.updateMaterial(data, routeData.materialInforId, activedItem.materialId)
                    : toggleButtonsMode == 2
                    ? CMMSMaterialAPi.materialHistoryCard.updateMaterialHistoryCard(
                          data,
                          routeData.materialInforId,
                          activedItem.materialHistoryCardId,
                      )
                    : CMMSMaterialAPi.materialRequest.updateMaterialRequest(
                          data,
                          routeData.materialInforId,
                          activedItem.materialRequestId,
                      )
            successMessage = `Chỉnh sửa ${handler.label[toggleButtonsMode]} thành công`
        }
        callApi(() => callApiFunction, fetchData, successMessage)
        setInitValue(null)
    }

    const handleEdit = (e) => {
        let tempInitvalue =
            toggleButtonsMode == 1
                ? {
                      info: {
                          status: [statusTextToNumber(activedItem.status, "EMaterialStatus")],
                      },
                  }
                : toggleButtonsMode == 2
                ? {
                      info: {
                          ...activedItem,
                      },
                  }
                : {
                      info: {
                          ...activedItem,
                          status: [statusTextToNumber(activedItem.status, "EMaterialRequestStatus")],
                      },
                  }

        setInitValue(tempInitvalue)
        handleOpen(e)
    }

    const handleDelete = (row) => {
        const id =
            toggleButtonsMode == 1
                ? row.materialId
                : toggleButtonsMode == 2
                ? row.materialHistoryCardId
                : row.materialRequestId
        const name = toggleButtonsMode == 0 ? row.code : ""
        let callApiFunction
        callApiFunction =
            toggleButtonsMode == 1
                ? () => CMMSMaterialAPi.material.deleteMaterial(routeData.materialInforId, id)
                : toggleButtonsMode == 2
                ? () => CMMSMaterialAPi.materialHistoryCard.deleteMaterialHistoryCard(routeData.materialInforId, id)
                : () => CMMSMaterialAPi.materialRequest.deleteMaterialRequest(routeData.materialInforId, id)

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
        const activedRow =
            toggleButtonsMode == 1
                ? material[index]
                : toggleButtonsMode == 2
                ? historyCard[index]
                : materialRequest[index]
        setActivedItem(activedRow)
    }
    const handleMaterialRequestModalConfirm = (data) => {
        let callApiFunction
        let successMessage
        callApiFunction = CMMSMaterialAPi.materialRequest.updateMaterialRequest(
            {
                status: 1,
            },
            routeData.materialInforId,
            data.materialRequestId,
        )
        successMessage = `Đã duyệt yêu cầu vật tư bảo trì`
        callApi(() => callApiFunction, fetchData, successMessage)
    }
    return (
        <>
            <div data-component="ResourceType" className="container flex h-full flex-wrap">
                <div className="relative h-full grow xl:w-full">
                    <div className="flex">
                        <div className="flex-1">
                            <Button onClick={handleAdd}>{`Thêm ${handler.label[toggleButtonsMode]}`}</Button>
                        </div>
                        <div className="flex-1">
                            <ToggleButtons
                                active={toggleButtonsMode}
                                onClick={setToggleButtonsMode}
                                titles={CMMMS_MATERIAL_DETAIL_MODE_LIST}
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
                                toggleButtonsMode == 1
                                    ? material
                                    : toggleButtonsMode == 2
                                    ? historyCardShowData
                                    : materialRequestShowData
                            }
                            className="mt-4"
                            onEdit={handleEdit}
                            onRowClick={handleTableRowClick}
                            onDeleteRow={handleDelete}
                            enableIdClick={toggleButtonsMode == 0}
                            idClickFunction={(e, row, index) => {
                                setMaterialRequestModal({
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
                            ? handler.editMenuNav[toggleButtonsMode](materialInforList)
                            : handler.createMenuNav[toggleButtonsMode](materialInforList)
                    }
                    onClick={handleSubmit}
                    initValue={initValue ? initValue : undefined}
                    // activateValidation={false}
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
            {materialRequestModal.actived && (
                <CMMSMaterialRequestModal
                    data={materialRequestModal.data}
                    onClose={() => setMaterialRequestModal({ actived: false })}
                    onConfirm={handleMaterialRequestModalConfirm}
                    // onReject={handleRequestDetailModalReject}
                />
            )}
        </>
    )
}

export default CMMSMaterialDetail
