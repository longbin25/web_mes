import Button from "@/components/Button"
import Confirm from "@/components/Confirm"
import PoperMenuNew from "@/components/PoperMenuNew"
import Table from "@/components/Table"
import ToggleButtons from "@/components/ToggleButtons"
import { useCallApi, usePoperMenuNew } from "@/hooks"
import { CMMSMaterialAPi, InjectionMachineApi, hierarchyApi, resourceApi } from "@/services/api"
import { RESOURCE_PAGE_MATERIAL_LIST } from "@/utils/constants"
import {
    CMMSMaterialRequestMapper,
    getResourceOptionsList,
    injectionMachineMapper,
    moldMapper,
    normalMachineMapper,
    normalMaterialMapper,
    plasticMaterialMapper,
    plasticProductsMapper,
    returnData,
    statusTextToNumber,
} from "@/utils/functions"
import {
    getCMMSMaterialRequestEditMenuNav,
    getCMMSHistoryCardEditMenuNav,
    getCMMSMaterialEditMenuNav,
    getCreateMaterialMenuNav,
    getCreatePlasticProductsMenuNav,
    getCreatePlasticMaterialMenuNav,
    getCreateMaterialEditMenuNav,
    getCreatePlasticProductsEditMenuNav,
    getCreatePlasticMaterialEditMenuNav,
} from "@/utils/menuNavigation"
import {
    MATERIAL_INFO_TABLE_COLUMNS,
    PLASTICMATERIAL_INFO_TABLE_COLUMNS,
    PLASTICPRODUCT_INFO_TABLE_COLUMNS,
} from "@/utils/tableColumns"
import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const handler = {
    label: {
        0: "vật tư",
        1: "sản phẩm ép",
        2: "nguyên liệu nhựa",
    },
    labelUpperCase: {
        0: "Vật tư",
        1: "Sản phẩm ép",
        2: "Nguyên liệu nhựa",
    },
    tableColumn: {
        0: MATERIAL_INFO_TABLE_COLUMNS,
        1: PLASTICPRODUCT_INFO_TABLE_COLUMNS,
        2: PLASTICMATERIAL_INFO_TABLE_COLUMNS,
    },
    fetchData: {
        material: resourceApi.material.getMaterials,
        plasticProduct: InjectionMachineApi.plasticProduct.getPlasticProduct,
        plasticMaterial: InjectionMachineApi.plasticMaterial.getPlasticMaterial,
        mold: InjectionMachineApi.mold.getMold,
        materialClass: resourceApi.material.getMaterialClasses,
    },
    createMenuNav: {
        0: (moldProperList, plasticMaterialProperList, materialClassList) =>
            getCreateMaterialMenuNav(moldProperList, plasticMaterialProperList, materialClassList),
        1: (moldProperList, plasticMaterialProperList, materialClassList) =>
            getCreatePlasticProductsMenuNav(moldProperList, plasticMaterialProperList, materialClassList),
        2: () => getCreatePlasticMaterialMenuNav(),
    },
    editMenuNav: {
        0: (moldProperList, plasticMaterialProperList, materialClassList) =>
            getCreateMaterialEditMenuNav(moldProperList, plasticMaterialProperList, materialClassList),
        1: (moldProperList, plasticMaterialProperList, materialClassList) =>
            getCreatePlasticProductsEditMenuNav(moldProperList, plasticMaterialProperList, materialClassList),
        2: (moldProperList, plasticMaterialProperList, materialClassList) =>
            getCreatePlasticMaterialEditMenuNav(moldProperList, plasticMaterialProperList, materialClassList),
    },
    createMapper: {
        0: normalMaterialMapper.clientToAPI,
        1: plasticProductsMapper.clientToAPI,
        2: plasticMaterialMapper.clientToAPI,
    },
    editMapper: {
        0: normalMaterialMapper.edit,
        1: plasticProductsMapper.edit,
        2: plasticMaterialMapper.edit,
    },
    initValueMapper: {
        0: normalMaterialMapper.initValue,
        1: plasticProductsMapper.initValue,
        2: plasticMaterialMapper.initValue,
    },
}
function ResourceMaterial() {
    const callApi = useCallApi()
    const navigate = useNavigate()

    const { active, position, handleClose, handleOpen } = usePoperMenuNew(500)
    const [deleteConfirm, setDeleteConfirm] = useState({}) //State này chứa thông tin về xác nhận xóa vật tư. Khi người dùng chọn xóa một vật tư, thông tin xác nhận xóa sẽ được lưu trữ trong deleteConfirm, bao gồm tiêu đề, nội dung và hàm xác nhận.
    const [initValue, setInitValue] = useState() // dùng để chứa data đang chỉnh sửa, nếu = null thì đang tạo mục mới; undefined là bình thường
    const [activedItem, setActivedItem] = useState(null)
    const [toggleButtonsMode, setToggleButtonsMode] = useState(0)

    const [material, setMaterial] = useState([])
    const [plasticProduct, setPlasticProduct] = useState([])
    const [plasticMaterial, setPlasticMaterial] = useState([])

    const [moldProperList, setMoldProperList] = useState([]) // lưu danh sách khuôn để truyền vào propermenu để tạo đối tượng mới
    const [plasticMaterialProperList, setPlasticMaterialProperList] = useState([]) // lưu danh sách khuôn để truyền vào propermenu để tạo đối tượng mới
    const [materialClassList, setMaterialClassList] = useState([])

    const fetchData = useCallback(() => {
        callApi(
            [
                handler.fetchData.material(),
                handler.fetchData.plasticProduct(),
                handler.fetchData.plasticMaterial(),

                handler.fetchData.mold(),
                handler.fetchData.materialClass(),
            ],
            (res) => {
                setMaterial(res[0].items)
                setPlasticProduct(res[1].items)
                setPlasticMaterial(res[2].items)

                setMoldProperList(getResourceOptionsList(res[3].items, "moldId"))
                setMaterialClassList(getResourceOptionsList(res[4].items, "materialClassId"))
            },
        )
    }, [callApi])
 
    useEffect(() => {
        fetchData()
    }, [fetchData])
    useEffect(() => {
        setPlasticMaterialProperList(getResourceOptionsList(plasticMaterial, "plasticMaterialId"))
    }, [plasticMaterial])
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
                    ? resourceApi.material.createMaterial(data)
                    : toggleButtonsMode == 1
                    ? InjectionMachineApi.plasticProduct.createPlasticProduct(data)
                    : InjectionMachineApi.plasticMaterial.createPlasticMaterial(data)
            successMessage = `Tạo ${handler.label[toggleButtonsMode]} thành công`
        } else {
            data = handler.editMapper[toggleButtonsMode](value)

            callApiFunction =
                toggleButtonsMode == 0
                    ? resourceApi.material.updateMaterial(data, activedItem.materialDefinitionId)
                    : toggleButtonsMode == 1
                    ? CMMSMaterialAPi.materialHistoryCard.updateMaterialHistoryCard(
                          data,
                          activedItem.materialHistoryCardId,
                      )
                    : CMMSMaterialAPi.materialRequest.updateMaterialRequest(data, activedItem.materialRequestId)
            successMessage = `Chỉnh sửa ${handler.label[toggleButtonsMode]} thành công`
        }
        callApi(() => callApiFunction, fetchData, successMessage)
        setInitValue(null)
    }

    const handleEdit = (e) => {
        let tempInitvalue = handler.initValueMapper[toggleButtonsMode](activedItem)
        console.log(activedItem)
        console.log(tempInitvalue)
        setInitValue(tempInitvalue)
        handleOpen(e)
    }

    const handleDelete = (row) => {
        const id =
            toggleButtonsMode == 0
                ? row.materialDefinitionId
                : toggleButtonsMode == 1
                ? row.plasticProductId
                : row.plasticMaterialId
        let callApiFunction
        callApiFunction =
            toggleButtonsMode == 0
                ? () => resourceApi.material.deleteMaterial(id)
                : toggleButtonsMode == 1
                ? () => InjectionMachineApi.plasticProduct.deletePlasticProduct(id)
                : () => InjectionMachineApi.plasticMaterial.deletePlasticMaterial(id)

        setDeleteConfirm({
            actived: true,
            title: `Xác nhận xóa ${handler.label[toggleButtonsMode]} ` + id,
            content: `${handler.labelUpperCase[toggleButtonsMode]} ${id} sẽ bị xóa vĩnh viễn và không được hiển thị tại trang này nữa`,
            onConfirm() {
                callApi(
                    callApiFunction,
                    fetchData,
                    `${handler.labelUpperCase[toggleButtonsMode]} ${id} được xóa thành công`,
                )
            },
        })
    }
    const handleTableRowClick = (row, index) => {
        const activedRow =
            toggleButtonsMode == 0
                ? material[index]
                : toggleButtonsMode == 1
                ? plasticProduct[index]
                : plasticMaterial[index]
        setActivedItem(activedRow)
    }

    return (
        <>
            <div data-component="ResourceType" className="container flex h-full flex-wrap">
                <div className="relative h-full grow xl:w-full">
                    <div className="flex w-full">
                        <div className="flex-1">
                            <Button onClick={handleAdd}>{`Thêm ${handler.label[toggleButtonsMode]}`}</Button>
                        </div>
                        <div className="flex-1">
                            {/* <ToggleButtons
                                active={toggleButtonsMode}
                                onClick={setToggleButtonsMode}
                                titles={RESOURCE_PAGE_MATERIAL_LIST}
                            /> */}
                        </div>
                        <div className="flex-1">
                            <div className="flex">
                                <Link to={`/mes/resource/material/class`} className="ml-auto mr-2">
                                    <h3 className="underline hover:text-primary-1">Quản lý loại vật tư</h3>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="scroll-y mt-2 h-[calc(100%-60px)] p-1 pt-0">
                        <Table
                            activable
                            primary
                            sticky
                            headers={handler.tableColumn[toggleButtonsMode]}
                            body={
                                toggleButtonsMode == 0
                                    ? material
                                    : toggleButtonsMode == 1
                                    ? plasticProduct
                                    : plasticMaterial
                            }
                            className="mt-4"
                            onEdit={toggleButtonsMode == 0 ? handleEdit : null}
                            onRowClick={handleTableRowClick}
                            onDeleteRow={handleDelete}
                            enableIdClick
                            idClickFunction={(e, row, index) => {
                                console.log(row)
                                navigate(`/mes/resource/material/detail/${row.materialDefinitionId}`, { state: row })
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
                            ? handler.editMenuNav[toggleButtonsMode](
                                  moldProperList,
                                  plasticMaterialProperList,
                                  materialClassList,
                              )
                            : handler.createMenuNav[toggleButtonsMode](
                                  moldProperList,
                                  plasticMaterialProperList,
                                  materialClassList,
                              )
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

export default ResourceMaterial
