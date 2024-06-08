import {
    validateRequiredField,
    validateIdField,
    validateDescField,
    validateNumberField,
} from "@/utils/functions/validate"
import {
    PROPERTIES_TABLE_COLUMNS,
    INJECTION_MACHINE_TABLE_COLUMNS,
    NORMAL_MACHINE_TABLE_COLUMNS,
    MATERIAL_PROP_TABLE_COLUMNS,
    OPERATION_TABLE_COLUMNS,
} from "@/utils/tableColumns"
import {
    CREATE_PROPERTY_SUB_NAV,
    EDIT_PROPERTY_SUB_NAV,
    CREATE_INJECTION_MACHINE_PROPERTIES_SUB_NAV,
    CREATE_NORMAL_MACHINE_PROPERTIES_SUB_NAV,
    CREATE_OPERATION_SUB_NAV,
} from "./common"

//worker
export const getCreateWorkerMenuNav = (workerTypeList) => [
    {
        id: "info",
        title: "Thông tin nhân viên",
        type: "form",
        items: [
            {
                id: "personId",
                type: "text",
                label: "ID nhân viên",
                isError: validateIdField,
            },
            {
                id: "description",
                type: "text",
                label: "Tên nhân viên",
                isError: validateIdField,
            },
            {
                id: "personnelClasses",
                type: "selectMutils",
                label: "Loại nhân viên",
                list: workerTypeList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
]

export const getEditWorkerMenuNav = (workerTypeList) => [
    {
        id: "info",
        title: "Thông tin nhân viên",
        type: "form",
        items: [
            {
                id: "personId",
                type: "text",
                label: "ID nhân viên",
                isError: validateIdField,
            },
            {
                id: "description",
                type: "text",
                label: "Tên nhân viên",
                isError: validateIdField,
            },
            {
                id: "personnelClasses",
                type: "selectMutils",
                label: "Loại nhân viên",
                list: workerTypeList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
    {
        id: "properties",
        title: "Thuộc tính nhân viên",
        type: "table",
        headers: PROPERTIES_TABLE_COLUMNS,
        canAddRecord: false,
        subNav: EDIT_PROPERTY_SUB_NAV,
    },
]

export const getWorkerClassMenuNav = () => [
    {
        id: "info",
        title: "Thông tin loại nhân viên",
        type: "form",
        items: [
            {
                id: "personnelClassId",
                type: "text",
                label: "ID loại nhân viên",
                isError: validateIdField,
            },
            {
                id: "description",
                type: "text",
                label: "Mô tả",
                isError: validateDescField,
            },
        ],
    },
    {
        id: "properties",
        title: "Thuộc tính loại nhân viên",
        type: "table",
        headers: PROPERTIES_TABLE_COLUMNS,
        subNav: CREATE_PROPERTY_SUB_NAV,
    },
]

//equipment
export const getCreateEquipmentMenuNav = (equipmentTypeList, fiveSelectData) => [
    {
        id: "info",
        title: "Thông tin thiết bị",
        type: "form",
        items: [
            {
                id: "equipmentId",
                type: "text",
                label: "ID thiết bị",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên thiết bị",
                isError: validateDescField,
            },
            {
                id: "equipmentClass",
                type: "select",
                label: "Loại thiết bị",
                list: equipmentTypeList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "absolutePath",
                type: "fiveSelectNew",
                label: "Đơn vị sản xuất",
                list: fiveSelectData ?? [],
                isError: validateRequiredField,
            },
        ],
    },
    {
        id: "properties",
        title: "Thuộc tính thiết bị",
        type: "table",
        items: [
            {
                id: "equipmentId",
                type: "text",
                label: "ID thiết bị",
                isError: validateIdField,
            },
        ],
        headers: NORMAL_MACHINE_TABLE_COLUMNS,
        subNav: CREATE_NORMAL_MACHINE_PROPERTIES_SUB_NAV,
    },
]
export const getCreateEquipmentEditMenuNav = (equipmentTypeList, fiveSelectData) => [
    {
        id: "info",
        title: "Chỉnh sửa thông tin thiết bị",
        type: "form",
        items: [
            {
                id: "equipmentId",
                type: "text",
                label: "ID thiết bị",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên thiết bị",
                isError: validateDescField,
            },
            {
                id: "equipmentClass",
                type: "select",
                label: "Loại thiết bị",
                list: equipmentTypeList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "absolutePath",
                type: "fiveSelectNew",
                label: "Đơn vị sản xuất",
                list: fiveSelectData ?? [],
                isError: validateRequiredField,
            },
        ],
    },
    {
        id: "properties",
        title: "Thuộc tính thiết bị",
        type: "table",
        items: [
            {
                id: "equipmentId",
                type: "text",
                label: "ID thiết bị",
                isError: validateIdField,
            },
        ],
        headers: NORMAL_MACHINE_TABLE_COLUMNS,
        subNav: CREATE_NORMAL_MACHINE_PROPERTIES_SUB_NAV,
    },
]
export const getCreateInjectionMachineMenuNav = (moldList, fiveSelectData) => [
    {
        id: "info",
        title: "Thông tin máy ép",
        type: "form",
        items: [
            {
                id: "equipmentId",
                type: "text",
                label: "ID máy ép",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên máy ép",
                isError: validateDescField,
            },
            {
                id: "molds",
                type: "selectMutils",
                label: "Khuôn",
                list: moldList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "valueString",
                type: "text",
                label: "Công suất tối đa",
                isError: validateRequiredField,
            },
            {
                id: "valueUnitOfMeasure",
                type: "select",
                label: "Đơn vị",
                list: [
                    {
                        key: "W",
                        value: "W",
                    },
                    {
                        key: "kW",
                        value: "kW",
                    },
                ],
                isError: validateRequiredField,
            },
        ],
    },
    {
        id: "absolutePath",
        title: "Thông tin máy ép",
        type: "form",
        items: [
            {
                id: "absolutePath",
                type: "fiveSelectNew",
                label: "Đơn vị sản xuất",
                list: fiveSelectData ?? [],
                isError: validateRequiredField,
            },
        ],
    },
]
export const getCreateInjectionMachineEditMenuNav = (moldList, fiveSelectData) => [
    {
        id: "info",
        title: "Chỉnh sửa thông tin máy ép",
        type: "form",
        items: [
            {
                id: "equipmentId",
                type: "text",
                label: "ID máy ép",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên máy ép",
                isError: validateDescField,
            },
            {
                id: "molds",
                type: "selectMutils",
                label: "Khuôn",
                list: moldList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "valueString",
                type: "text",
                label: "Công suất tối đa",
                isError: validateRequiredField,
            },
            {
                id: "valueUnitOfMeasure",
                type: "select",
                label: "Đơn vị",
                list: [
                    {
                        key: "W",
                        value: "W",
                    },
                    {
                        key: "kW",
                        value: "kW",
                    },
                ],
                isError: validateRequiredField,
            },
        ],
    },
    {
        id: "absolutePath",
        title: "Thông tin máy ép",
        type: "form",
        items: [
            {
                id: "absolutePath",
                type: "fiveSelectNew",
                label: "Đơn vị sản xuất",
                list: fiveSelectData ?? [],
                isError: validateRequiredField,
            },
        ],
    },
]
export const getCreateMoldMenuNav = (injectionMachineList, fiveSelectData) => [
    {
        id: "info",
        title: "Thông tin khuôn",
        type: "form",
        items: [
            {
                id: "moldId",
                type: "text",
                label: "ID khuôn",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên khuôn",
                isError: validateDescField,
            },
            {
                id: "cycleBySecond",
                type: "text",
                label: "Chu kì ép của khuôn(s)",
                isError: validateDescField,
            },
            {
                id: "plasticInjectionMachines",
                type: "selectMutils",
                label: "Máy ép",
                list: injectionMachineList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
    {
        id: "absolutePath",
        title: "Thông tin khuôn",
        type: "form",
        items: [
            {
                id: "absolutePath",
                type: "fiveSelectNew",
                label: "Đơn vị sản xuất",
                list: fiveSelectData ?? [],
                isError: validateRequiredField,
            },
        ],
    },
]
export const getEditEquipmentMenuNav = (equipmentTypeList, equipmentWorkUnitList) => [
    {
        id: "info",
        title: "Thông tin thiết bị",
        type: "form",
        items: [
            {
                id: "name",
                type: "text",
                label: "Tên thiết bị",
                isError: validateDescField,
            },
            {
                id: "equipmentClass",
                type: "select",
                label: "Loại thiết bị",
                list: equipmentTypeList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "workUnit",
                type: "selectMutils",
                label: "Đơn vị sản xuất",
                list: equipmentWorkUnitList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
    // {
    //     id: "properties",
    //     title: "Thuộc tính thiết bị",
    //     type: "table",
    //     headers: PROPERTIES_TABLE_COLUMNS,
    //     canAddRecord: false,
    //     subNav: EDIT_PROPERTY_SUB_NAV,
    // },
]

export const getEquipmentClassMenuNav = () => [
    {
        id: "info",
        title: "Thông tin loại thiết bị",
        type: "form",
        items: [
            {
                id: "equipmentClassId",
                type: "text",
                label: "ID loại thiết bị",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Mô tả",
                isError: validateDescField,
            },
        ],
    },
    // {
    //     id: "properties",
    //     title: "Thuộc tính loại thiết bị",
    //     type: "table",
    //     headers: PROPERTIES_TABLE_COLUMNS,
    //     subNav: CREATE_PROPERTY_SUB_NAV,
    // },
]

//material
export const getCreateMaterialMenuNav = (moldProperList, plasticMaterialProperList, materialClassList) => [
    {
        id: "info",
        title: "Thêm vật tư",
        type: "form",
        items: [
            {
                id: "materialDefinitionId",
                type: "text",
                label: "ID vật tư",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên vật tư",
                isError: validateDescField,
            },
            {
                id: "primaryUnit",
                type: "text",
                label: "Đơn vị chính",
                isError: validateDescField,
            },
            {
                id: "materialClass",
                type: "selectMutils",
                label: "Loại vật tư",
                list: materialClassList ?? [],
                isError: validateRequiredField,
            },
            // {
            //     id: "moduleType",
            //     type: "text",
            //     label: "Loại module",
            //     isError: validateDescField,
            // },
        ],
    },
    {
        id: "properties",
        title: "Thuộc tính vật tư",
        type: "table",
        items: [
            {
                id: "equipmentId",
                type: "text",
                label: "ID vật tư",
                isError: validateIdField,
            },
        ],
        headers: MATERIAL_PROP_TABLE_COLUMNS,
        subNav: CREATE_PROPERTY_SUB_NAV,
    },
    // {
    //     id: "info",
    //     title: "Thông tin vật tư",
    //     type: "form",
    //     items: [
    //         {
    //             id: "materialDefinitionId",
    //             type: "text",
    //             label: "ID vật tư",
    //             isError: validateIdField,
    //         },
    //         {
    //             id: "name",
    //             type: "text",
    //             label: "Tên vật tư",
    //             isError: validateDescField,
    //         },
    //         {
    //             id: "primaryUnit",
    //             type: "text",
    //             label: "Đơn vị chính",
    //             isError: validateDescField,
    //         },
    //         {
    //             id: "moduleType",
    //             type: "text",
    //             label: "Loại module",
    //             isError: validateDescField,
    //         },
    //     ],
    // },
    // {
    //     id: "properties",
    //     title: "Thuộc tính vật tư",
    //     type: "table",

    // },
]
export const getCreateMaterialEditMenuNav = (moldProperList, plasticMaterialProperList, materialClassList) => [
    {
        id: "info",
        title: "Chỉnh sửa thông tin vật tư",
        type: "form",
        items: [
            {
                id: "materialDefinitionId",
                type: "text",
                label: "ID vật tư",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên vật tư",
                isError: validateDescField,
            },
            {
                id: "primaryUnit",
                type: "text",
                label: "Đơn vị chính",
                isError: validateDescField,
            },
            {
                id: "materialClass",
                type: "selectMutils",
                label: "Loại vật tư",
                list: materialClassList ?? [],
                isError: validateRequiredField,
            },
            // {
            //     id: "moduleType",
            //     type: "text",
            //     label: "Loại module",
            //     isError: validateDescField,
            // },
        ],
    },
    {
        id: "properties",
        title: "Thuộc tính vật tư",
        type: "table",
        items: [
            {
                id: "equipmentId",
                type: "text",
                label: "ID vật tư",
                isError: validateIdField,
            },
        ],
        headers: MATERIAL_PROP_TABLE_COLUMNS,
        subNav: CREATE_PROPERTY_SUB_NAV,
    },
    // {
    //     id: "info",
    //     title: "Thông tin vật tư",
    //     type: "form",
    //     items: [
    //         {
    //             id: "materialDefinitionId",
    //             type: "text",
    //             label: "ID vật tư",
    //             isError: validateIdField,
    //         },
    //         {
    //             id: "name",
    //             type: "text",
    //             label: "Tên vật tư",
    //             isError: validateDescField,
    //         },
    //         {
    //             id: "primaryUnit",
    //             type: "text",
    //             label: "Đơn vị chính",
    //             isError: validateDescField,
    //         },
    //         {
    //             id: "moduleType",
    //             type: "text",
    //             label: "Loại module",
    //             isError: validateDescField,
    //         },
    //     ],
    // },
    // {
    //     id: "properties",
    //     title: "Thuộc tính vật tư",
    //     type: "table",

    // },
]
export const getCreatePlasticProductsMenuNav = (moldList, plasticMaterialsList) => [
    {
        id: "info",
        title: "Thông tin vật tư máy ép",
        type: "form",
        items: [
            {
                id: "plasticProductId",
                type: "text",
                label: "ID vật tư máy ép",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên vật tư máy ép",
                isError: validateDescField,
            },
            {
                id: "primaryUnit",
                type: "text",
                label: "Đơn vị chính",
                isError: validateDescField,
            },
            {
                id: "molds",
                type: "selectMutils",
                label: "Khuôn",
                list: moldList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "plasticMaterials",
                type: "selectMutils",
                label: "Nguyên liệu nhựa",
                list: plasticMaterialsList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
]
export const getCreatePlasticProductsEditMenuNav = (moldList, plasticMaterialsList) => [
    {
        id: "info",
        title: "Chỉnh sửa thông tin vật tư máy ép",
        type: "form",
        items: [
            {
                id: "plasticProductId",
                type: "text",
                label: "ID vật tư máy ép",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên vật tư máy ép",
                isError: validateDescField,
            },
            {
                id: "primaryUnit",
                type: "text",
                label: "Đơn vị chính",
                isError: validateDescField,
            },
            {
                id: "molds",
                type: "selectMutils",
                label: "Khuôn",
                list: moldList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "plasticMaterials",
                type: "selectMutils",
                label: "Nguyên liệu nhựa",
                list: plasticMaterialsList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
]
export const getCreatePlasticMaterialMenuNav = () => [
    {
        id: "info",
        title: "Thông tin nguyên liệu nhựa",
        type: "form",
        items: [
            {
                id: "plasticMaterialId",
                type: "text",
                label: "ID nguyên liệu nhựa",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên nguyên liệu nhựa",
                isError: validateDescField,
            },
            {
                id: "primaryUnit",
                type: "text",
                label: "Đơn vị chính",
                isError: validateDescField,
            },
        ],
    },
]
export const getCreatePlasticMaterialEditMenuNav = () => [
    {
        id: "info",
        title: "Chỉnh sửa thông tin nguyên liệu nhựa",
        type: "form",
        items: [
            {
                id: "plasticMaterialId",
                type: "text",
                label: "ID nguyên liệu nhựa",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên nguyên liệu nhựa",
                isError: validateDescField,
            },
            {
                id: "primaryUnit",
                type: "text",
                label: "Đơn vị chính",
                isError: validateDescField,
            },
        ],
    },
]
export const getCreateWorkUnitMenuNav = () => [
    {
        id: "info",
        title: "Thêm đơn vị phụ",
        type: "form",
        items: [
            {
                id: "unitId",
                type: "text",
                label: "Id",
                isError: validateIdField,
            },
            {
                id: "unitName",
                type: "text",
                label: "Tên đơn vị phụ",
                isError: validateDescField,
            },
            {
                id: "conversionValueToPrimaryUnit",
                type: "text",
                label: "Quy đổi sang đơn vị chính",
                isError: validateNumberField,
            },
        ],
    },
]
export const getCreateWorkUnitEditMenuNav = () => [
    {
        id: "info",
        title: "Chỉnh sửa đơn vị phụ",
        type: "form",
        items: [
            // {
            //     id: "unitId",
            //     type: "text",
            //     label: "Id",
            //     isError: validateIdField,
            // },
            {
                id: "unitName",
                type: "text",
                label: "Tên đơn vị phụ",
                isError: validateDescField,
            },
            {
                id: "conversionValueToPrimaryUnit",
                type: "text",
                label: "Quy đổi sang đơn vị chính",
                isError: validateNumberField,
            },
        ],
    },
]
// export const getCreateOperationMenuNav = (previousOperation) => [
//     {
//         id: "info",
//         title: "Công đoạn",
//         type: "form",
//         items: [
//             {
//                 id: "operationId",
//                 type: "text",
//                 label: "Id",
//                 isError: validateIdField,
//             },
//             {
//                 id: "name",
//                 type: "text",
//                 label: "Tên",
//                 isError: validateDescField,
//             },
//             {
//                 id: "quantity",
//                 type: "text",
//                 label: "Số lượng",
//                 isError: validateNumberField,
//             },
//             // {
//             //     id: "duration",
//             //     type: "text",
//             //     label: "Khoảng thời gian ",
//             //     isError: validateDescField,
//             // },
//             {
//                 id: "prerequisiteOperation",
//                 type: "selectMutils",
//                 label: "Công đoạn trước",
//                 list: previousOperation ?? [],
//             },
//         ],
//     },
//     {
//         id: "properties",
//         title: "Thuộc tính loại nhân viên",
//         type: "table",
//         headers: OPERATION_TABLE_COLUMNS,
//         subNav: CREATE_OPERATION_SUB_NAV,
//     },
// ]
export const getCreateOperationMenuNav = (previousOperation, equipmentClassId) => [
    {
        id: "info",
        title: "Thêm công đoạn",
        type: "form",
        items: [
            {
                id: "operationId",
                type: "text",
                label: "Id",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên",
                isError: validateDescField,
            },
            {
                id: "quantity",
                type: "text",
                label: "Số lượng",
                isError: validateNumberField,
            },
            {
                id: "prerequisiteOperation",
                type: "selectMutils",
                label: "Công đoạn trước",
                list: previousOperation ?? [],
            },
        ],
    },
    {
        id: "equipmentRequirements",
        title: "Yêu cầu thiết bị",
        type: "table",
        items: [
            // {
            //     id: "equipmentId",
            //     type: "text",
            //     label: "ID thiết bị",
            //     isError: validateIdField,
            // },
        ],
        headers: OPERATION_TABLE_COLUMNS,
        subNav: CREATE_OPERATION_SUB_NAV(equipmentClassId),
    },
]
export const getCreateOperationEditMenuNav = (previousOperation) => [
    {
        id: "info",
        title: "Công đoạn",
        type: "form",
        items: [
            // {
            //     id: "operationId",
            //     type: "text",
            //     label: "Id",
            //     isError: validateIdField,
            // },
            {
                id: "name",
                type: "text",
                label: "Tên",
                isError: validateDescField,
            },
            // {
            //     id: "duration",
            //     type: "text",
            //     label: "Khoảng thời gian ",
            //     isError: validateDescField,
            // },
            {
                id: "prerequisiteOperation",
                type: "selectMutils",
                label: "Công đoạn trước",
                list: previousOperation ?? [],
            },
        ],
    },
]
export const getMaterialClassMenuNav = () => [
    {
        id: "info",
        title: "Thông tin loại vật tư",
        type: "form",
        items: [
            {
                id: "materialClassId",
                type: "text",
                label: "ID loại vật tư",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên loại vật tư",
                isError: validateDescField,
            },
        ],
    },
    // {
    //     id: "properties",
    //     title: "Thuộc tính loại vật tư",
    //     type: "table",
    //     headers: PROPERTIES_TABLE_COLUMNS,
    //     subNav: CREATE_PROPERTY_SUB_NAV,
    // },
]

export const getEditMaterialMenuNav = (materialClasses) => [
    {
        id: "info",
        title: "Thông tin vật tư",
        type: "form",
        items: [
            {
                id: "materialDefinitionId",
                type: "text",
                label: "ID vật tư",
                isError: validateIdField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên vật tư",
                isError: validateDescField,
            },
            {
                id: "primaryUnit",
                type: "text",
                label: "Đơn vị chính",
                isError: validateDescField,
            },
        ],
    },
    // {
    //     id: "properties",
    //     title: "Thuộc tính vật tư",
    //     type: "table",
    //     headers: PROPERTIES_TABLE_COLUMNS,
    //     canAddRecord: false,
    //     subNav: EDIT_PROPERTY_SUB_NAV,
    // },
]
export const getEditWorkUnitMenuNav = (materialClasses) => [
    {
        id: "info",
        title: "Đơn vị phụ",
        type: "form",
        items: [
            {
                id: "unitName",
                type: "text",
                label: "Tên đơn vị phụ",
                isError: validateDescField,
            },
            {
                id: "conversionValueToPrimaryUnit",
                type: "text",
                label: "Quy đổi sang đơn vị chính",
                isError: validateDescField,
            },
        ],
    },
]
export const getEditOperationMenuNav = (previousOperation) => [
    {
        id: "info",
        title: "Công đoạn",
        type: "form",
        items: [
            {
                id: "name",
                type: "text",
                label: "Tên",
                isError: validateDescField,
            },
            {
                id: "duration",
                type: "text",
                label: "Thời gian ",
                isError: validateDescField,
            },
            {
                id: "prerequisiteOperation",
                type: "selectMutils",
                label: "Công đoạn trước",
                list: previousOperation ?? [],
            },
        ],
    },
]
export const getCMMSEquipmentMenuNav = (equipmentClassList) => [
    {
        id: "info",
        title: "Loại thiết bị",
        type: "form",
        items: [
            {
                id: "code",
                type: "text",
                label: "Mã thiết bị",
                isError: validateDescField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên thiết bị",
                isError: validateDescField,
            },
            {
                id: "equipmentClass",
                type: "select",
                label: "Loại thiết bị",
                list: equipmentClassList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
]
export const getCMMSEquipmentEditMenuNav = (equipmentClassList) => [
    {
        id: "info",
        title: "Loại thiết bị",
        type: "form",
        items: [
            {
                id: "name",
                type: "text",
                label: "Tên thiết bị",
                isError: validateRequiredField,
            },
            {
                id: "code",
                type: "text",
                label: "Mã thiết bị",
                isError: validateDescField,
            },
            {
                id: "equipmentClass",
                type: "select",
                label: "Loại thiết bị",
                list: equipmentClassList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
]
export const getCMMSMaterialMenuNav = (materialInforList) => [
    {
        id: "info",
        title: "Thêm vật tư",
        type: "form",
        items: [
            // {
            //     id: "materialInforId",
            //     type: "select",
            //     label: "ID yêu cầu vật tư",
            //     list: materialInforList ?? [],
            //     isError: validateRequiredField,
            // },
            {
                id: "sku",
                type: "text",
                label: "SKU",
                isError: validateRequiredField,
            },
        ],
    },
]
export const getCMMSMaterialEditMenuNav = (materialInforList) => [
    {
        id: "info",
        title: "Chỉnh sửa vật tư",
        type: "form",
        items: [
            // {
            //     id: "materialInforId",
            //     type: "select",
            //     label: "ID yêu cầu vật tư",
            //     list: materialInforList ?? [],
            // },
            {
                id: "status",
                type: "select",
                label: "Trạng thái",
                list: [
                    {
                        key: "inUsed",
                        value: 0,
                    },
                    {
                        key: "expired",
                        value: 1,
                    },
                    {
                        key: "error",
                        value: 2,
                    },
                    {
                        key: "missing",
                        value: 3,
                    },
                    {
                        key: "available",
                        value: 4,
                    },
                ],
                isError: validateRequiredField,
            },
        ],
    },
]
export const getCMMSMaterialInfoMenuNav = () => [
    {
        id: "info",
        title: "Thêm thông tin vật tư",
        type: "form",
        items: [
            {
                id: "code",
                type: "text",
                label: "ID thông tin vật tư",
                isError: validateDescField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên thông tin vật tư",
                isError: validateDescField,
            },
            {
                id: "unit",
                type: "text",
                label: "Đơn vị",
                isError: validateDescField,
            },
            {
                id: "minimumQuantity",
                type: "text",
                label: "Số lượng tối thiểu",
                isError: validateNumberField,
            },
        ],
    },
]
export const getCMMSMaterialInfoEditMenuNav = () => [
    {
        id: "info",
        title: "Chỉnh sửa thông tin vật tư",
        type: "form",
        items: [
            {
                id: "code",
                type: "text",
                label: "ID thông tin vật tư",
                isError: validateDescField,
            },
            {
                id: "name",
                type: "text",
                label: "Tên thông tin vật tư",
            },
            {
                id: "unit",
                type: "text",
                label: "Đơn vị",
            },
            {
                id: "minimumQuantity",
                type: "text",
                label: "Số lượng tối thiểu",
            },
        ],
    },
]
export const getCMMSMaterialRequestMenuNav = (materialInforList) => [
    {
        id: "info",
        title: "Thêm yêu cầu vật tư",
        type: "form",
        items: [
            // {
            //     id: "materialInforId",
            //     type: "select",
            //     label: "ID yêu cầu vật tư",
            //     list: materialInforList ?? [],
            // },
            // {
            //     id: "currentNumber",
            //     type: "text",
            //     label: "currentNumber",
            // },
            {
                id: "additionalNumber",
                type: "text",
                label: "Số lượng cần thêm",
            },
            {
                id: "expectedNumber",
                type: "text",
                label: "Số lượng mong muốn",
            },
            {
                id: "expectedDate",
                type: "datetime-local",
                label: "Ngày mong muốn",
            },
            // {
            //     id: "status",
            //     type: "select",
            //     label: "status",
            //     list: [
            //         {
            //             key: "inProgress",
            //             value: 0,
            //         },
            //         {
            //             key: "completed",
            //             value: 1,
            //         },
            //     ],
            //     isError: validateRequiredField,
            // },
        ],
    },
]
export const getCMMSMaterialRequestEditMenuNav = (materialInforList) => [
    {
        id: "info",
        title: "Chỉnh sửa yêu cầu vật tư",
        type: "form",
        items: [
            // {
            //     id: "materialInforId",
            //     type: "select",
            //     label: "ID yêu cầu vật tư",
            //     list: materialInforList ?? [],
            // },
            {
                id: "currentNumber",
                type: "text",
                label: "Số lượng hiện tại",
            },
            {
                id: "additionalNumber",
                type: "text",
                label: "Số lượng cần thêm",
            },
            {
                id: "expectedNumber",
                type: "text",
                label: "Số lượng mong muốn",
            },
            {
                id: "expectedDate",
                type: "text",
                label: "Ngày mong muốn",
            },
            // {
            //     id: "status",
            //     type: "select",
            //     label: "status",
            //     list: [
            //         {
            //             key: "inProgress",
            //             value: 0,
            //         },
            //         {
            //             key: "completed",
            //             value: 1,
            //         },
            //     ],
            //     isError: validateRequiredField,
            // },
        ],
    },
]
export const getCMMSHistoryCardMenuNav = () => [
    {
        id: "info",
        title: "Thêm thẻ vật tư",
        type: "form",
        items: [
            {
                id: "timeStamp",
                type: "text",
                label: "Thời gian",
            },
            {
                id: "before",
                type: "text",
                label: "Giá trị trước",
            },
            {
                id: "after",
                type: "text",
                label: "Giá trị sau",
            },
            {
                id: "input",
                type: "text",
                label: "Số lượng nhập",
            },
            {
                id: "output",
                type: "text",
                label: "Số lượng xuất",
            },
            {
                id: "note",
                type: "text",
                label: "Ghi chú",
            },
        ],
    },
]
export const getCMMSHistoryCardEditMenuNav = () => [
    {
        id: "info",
        title: "Chỉnh sửa thẻ vật tư",
        type: "form",
        items: [
            {
                id: "timeStamp",
                type: "text",
                label: "Thời gian",
            },
            {
                id: "before",
                type: "text",
                label: "Giá trị trước",
            },
            {
                id: "after",
                type: "text",
                label: "Giá trị sau",
            },
            {
                id: "input",
                type: "text",
                label: "Số lượng nhập",
            },
            {
                id: "output",
                type: "text",
                label: "Số lượng xuất",
            },
            {
                id: "note",
                type: "text",
                label: "Ghi chú",
            },
        ],
    },
]
export const getCMMSEquipmentClassMenuNav = () => [
    {
        id: "info",
        title: "Thêm loại thiết bị",
        type: "form",
        items: [
            {
                id: "name",
                type: "text",
                label: "Tên loại thiết bị",
            },
        ],
    },
]
export const getCMMSEquipmentClassEditMenuNav = () => [
    {
        id: "info",
        title: "Chỉnh sửa loại thiết bị",
        type: "form",
        items: [
            {
                id: "name",
                type: "text",
                label: "Tên loại thiết bị",
            },
        ],
    },
]
export const getCMMSPersonMenuNav = () => [
    {
        id: "info",
        title: "Thêm nhân viên",
        type: "form",
        items: [
            {
                id: "personName",
                type: "text",
                label: "Tên nhân viên",
                isError: validateRequiredField,
            },
        ],
    },
]
export const getCMMSPersonEditMenuNav = () => [
    {
        id: "info",
        title: "Chỉnh sửa nhân viên",
        type: "form",
        items: [
            {
                id: "personName",
                type: "text",
                label: "Tên nhân viên",
                isError: validateRequiredField,
            },
        ],
    },
]
export const getCMMSEquipmentMaterialMenuNav = (materialInforList) => [
    {
        id: "info",
        title: "Thêm vật tư để bảo trì thiết bị",
        type: "form",
        items: [
            {
                id: "materialInforId",
                type: "select",
                label: "ID vật tư",
                list: materialInforList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "fullTime",
                type: "text",
                label: "Vòng đời vật tư (phút)",
                isError: validateNumberField,
            },
            // {
            //     id: "installedTime",
            //     type: "datetime-local",
            //     label: "installedTime",
            //     isError: validateRequiredField,
            // },
        ],
    },
]
export const getCMMSEquipmentMaterialEditMenuNav = (materialInforList) => [
    {
        id: "info",
        title: "Thêm EquipmentMaterial",
        type: "form",
        items: [
            {
                id: "materialInforId",
                type: "select",
                label: "ID yêu cầu vật tư",
                list: materialInforList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "fullTime",
                type: "text",
                label: "Vòng đời vật tư (phút)",
                isError: validateRequiredField,
            },
            {
                id: "usedTime",
                type: "text",
                label: "usedTime",
            },
            {
                id: "installedTime",
                type: "datetime-local",
                label: "Thời gian cài đặt",
            },
        ],
    },
]
export const getCMMSCauseMenuNav = (equipmentClassList) => [
    {
        id: "info",
        title: "Thêm nguyên nhân",
        type: "form",
        items: [
            {
                id: "causeName",
                type: "text",
                label: "Nguyên nhân",
                isError: validateRequiredField,
            },
            {
                id: "equipmentClass",
                type: "select",
                label: "Loại thiết bị",
                list: equipmentClassList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "severity",
                type: "select",
                label: "Mức độ nghiêm trọng",
                list: [
                    {
                        key: "Cấp bách",
                        value: 0,
                    },
                    {
                        key: "Cao",
                        value: 1,
                    },
                    {
                        key: "Bình thường",
                        value: 2,
                    },
                    {
                        key: "Thấp",
                        value: 3,
                    },
                ],
                isError: validateRequiredField,
            },
            {
                id: "note",
                type: "text",
                label: "Ghi chú",
                isError: validateRequiredField,
            },
        ],
    },
]
export const getCMMSCauseEditMenuNav = (equipmentClassList) => [
    {
        id: "info",
        title: "Chỉnh sửa nguyên nhân",
        type: "form",
        items: [
            {
                id: "causeCode",
                type: "text",
                label: "Mã nguyên nhân",
                isError: validateRequiredField,
            },
            {
                id: "causeName",
                type: "text",
                label: "Nguyên nhân",
                isError: validateRequiredField,
            },
            {
                id: "equipmentClass",
                type: "select",
                label: "Loại thiết bị",
                list: equipmentClassList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "severity",
                type: "select",
                label: "Mức độ nghiêm trọng",
                list: [
                    {
                        key: "Cấp bách",
                        value: 0,
                    },
                    {
                        key: "Cao",
                        value: 1,
                    },
                    {
                        key: "Bình thường",
                        value: 2,
                    },
                    {
                        key: "Thấp",
                        value: 3,
                    },
                ],
                isError: validateRequiredField,
            },
            {
                id: "note",
                type: "text",
                label: "Ghi chú",
                isError: validateRequiredField,
            },
        ],
    },
]
export const getCMMSCorrectionMenuNav = () => [
    {
        id: "info",
        title: "Thêm cách khắc phục",
        type: "form",
        items: [
            {
                id: "correctionName",
                type: "text",
                label: "Tên cách khắc phục",
                isError: validateRequiredField,
            },
            {
                id: "correctionType",
                type: "select",
                label: "Loại khắc phục",
                list: [
                    {
                        key: "Sửa chữa",
                        value: 0,
                    },
                    {
                        key: "Thay thế",
                        value: 1,
                    },
                ],
                isError: validateRequiredField,
            },
            {
                id: "estProcessTime",
                type: "text",
                label: "Thời gian ước tính (phút)",
                isError: validateNumberField,
            },
            {
                id: "note",
                type: "text",
                label: "Ghi chú",
                isError: validateRequiredField,
            },
        ],
    },
]
export const getCMMSCorrectionEditMenuNav = () => [
    {
        id: "info",
        title: "Chỉnh sửa cách khắc phục",
        type: "form",
        items: [
            {
                id: "correctionCode",
                type: "text",
                label: "Mã cách khắc phục",
                isError: validateRequiredField,
            },
            {
                id: "correctionName",
                type: "text",
                label: "Tên cách khắc phục",
                isError: validateRequiredField,
            },
            {
                id: "correctionType",
                type: "select",
                label: "Loại khắc phục",
                list: [
                    {
                        key: "Sửa chữa",
                        value: 0,
                    },
                    {
                        key: "Thay thế",
                        value: 1,
                    },
                ],
                isError: validateRequiredField,
            },
            {
                id: "estProcessTime",
                type: "text",
                label: "Thời gian ước tính (phút)",
                isError: validateNumberField,
            },
            {
                id: "note",
                type: "text",
                label: "Ghi chú",
                isError: validateRequiredField,
            },
        ],
    },
]
export const getCMMSMaintenanceRequestMenuNav = (personList) => [
    {
        id: "info",
        title: "Tạo yêu cầu bảo trì phòng ngừa",
        type: "form",
        items: [
            {
                id: "problem",
                type: "text",
                label: "Vấn đề",
            },
            {
                id: "requestedCompletionDate",
                type: "datetime-local",
                label: "requestedCompletionDate",
            },

            {
                id: "requester",
                type: "select",
                label: "Người yêu cầu",
                list: personList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "responsiblePerson",
                type: "select",
                label: "Người phụ trách",
                list: personList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "estProcessingTime",
                type: "text",
                label: "Thời gian ước tính (phút)",
                isError: validateNumberField,
            },
            {
                id: "plannedStart",
                type: "datetime-local",
                label: "plannedStart",
            },
        ],
    },
]
export const getCMMSMaintenanceRequestEditMenuNav = (personList) => [
    {
        id: "info",
        title: "Chỉnh sửa yêu cầu bảo trì",
        type: "form",
        items: [
            {
                id: "problem",
                type: "text",
                label: "Vấn đề",
            },
            {
                id: "requestedCompletionDate",
                type: "datetime-local",
                label: "Ngày dự kiến hoàn thành",
            },

            {
                id: "requester",
                type: "select",
                label: "Người yêu cầu",
                list: personList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "responsiblePerson",
                type: "select",
                label: "Người chịu trách nhiệm",
                list: personList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "estProcessingTime",
                type: "text",
                label: "Thời gian thực hiện ước tính",
                isError: validateNumberField,
            },
            {
                id: "plannedStart",
                type: "datetime-local",
                label: "Ngày bắt đầu theo kế hoạch",
                isError: validateRequiredField,
            },
        ],
    },
]
export const getCMMSScheduleMenuNav = (personList) => [
    {
        id: "info",
        title: "Tạo lịch bảo trì",
        type: "form",
        items: [
            {
                id: "problem",
                type: "text",
                label: "Vấn đề",
                isError: validateRequiredField,
            },
            {
                id: "requester",
                type: "select",
                label: "Người yêu cầu",
                list: personList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "estProcessingTime",
                type: "text",
                label: "Thời gian thực hiện ước tính (phút)",
                isError: validateNumberField,
            },
            {
                id: "startTime",
                type: "datetime-local",
                label: "Thời gian bắt đầu",
                isError: validateRequiredField,
            },
            {
                id: "endTime",
                type: "datetime-local",
                label: "Thời gian kết thúc",
                isError: validateRequiredField,
            },
            {
                id: "maintenanceCycle",
                type: "text",
                label: "Chu kì bảo trì (ngày)",
                isError: validateNumberField,
            },
        ],
    },
]
export const getCMMSMaintenanceResponseEditMenuNav = (causeList, correctionList, personList, materialInforList) => [
    {
        id: "info",
        title: "Chỉnh sửa công việc bảo trì",
        type: "form",
        items: [
            {
                id: "problem",
                type: "text",
                label: "Vấn đề",
            },
            {
                id: "code",
                type: "text",
                label: "Mã yêu cầu",
            },
            // {
            //     id: "status",
            //     type: "text",
            //     label: "status",
            // },
            {
                id: "cause",
                type: "selectMutils",
                label: "Nguyên nhân",
                list: causeList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "correction",
                type: "selectMutils",
                label: "Cách khắc phục",
                list: correctionList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "responsiblePerson",
                type: "select",
                label: "Người chịu trách nhiệm",
                list: personList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
    {
        id: "info2",
        title: "Chỉnh sửa công việc bảo trì",
        type: "form",
        items: [
            {
                id: "estProcessTime",
                type: "text",
                label: "Thời gian ước tính (phút)",
                isError: validateNumberField,
            },
            {
                id: "plannedStart",
                type: "datetime-local",
                label: "Thời gian bắt đầu theo kế hoạch",
            },
            {
                id: "plannedFinish",
                type: "datetime-local",
                label: "Thời gian kết thúc theo kế hoạch",
            },
            // {
            //     id: "actualStartTime",
            //     type: "datetime-local",
            //     label: "actualStartTime",
            // },
            // {
            //     id: "actualFinishTime",
            //     type: "datetime-local",
            //     label: "actualFinishTime",
            // },
            {
                id: "dueDate",
                type: "datetime-local",
                label: "Ngày đến hạn",
            },
            // {
            //     id: "materialInforId",
            //     type: "select",
            //     label: "ID yêu cầu vật tư",
            //     list: materialInforList ?? [],
            //     isError: validateRequiredField,
            // },
        ],
    },
]
export const getSETTINGRoleMenuNav = () => [
    {
        id: "info",
        title: "Thêm chức vụ",
        type: "form",
        items: [
            {
                id: "RoleName",
                type: "text",
                label: "Tên chức vụ",
                isError: validateRequiredField,
            },
            {
                id: "DisplayName",
                type: "text",
                label: "Tên hiển thị",
                isError: validateRequiredField,
            },
            {
                id: "Description",
                type: "text",
                label: "Mô tả",
                isError: validateRequiredField,
            },
        ],
    },
]

export const getSETTINGUserMenuNav = () => [
    {
        id: "info",
        title: "Thêm nhân viên",
        type: "form",
        items: [
            {
                id: "EmployeeId",
                type: "text",
                label: "Tên đăng nhập",
                isError: validateRequiredField,
            },
            {
                id: "LastName",
                type: "text",
                label: "Họ",
                isError: validateRequiredField,
            },
            {
                id: "FirstName",
                type: "text",
                label: "Tên nhân viên",
                isError: validateRequiredField,
            },
            {
                id: "DateOfBirth",
                type: "datetime-local",
                label: "Ngày sinh",
                isError: validateRequiredField,
            },
        ],
    },
]
export const getSETTINGUserEditMenuNav = (roleList) => [
    {
        id: "info",
        title: "Chỉnh sửa chức vụ nhân viên",
        type: "form",
        items: [
            {
                id: "roles",
                type: "selectMutils",
                label: "Chức vụ",
                list: roleList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
]
