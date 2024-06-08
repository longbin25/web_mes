import {
    validateRequiredField,
    validateNumberField,
    validateDateInput,
    validateIdField,
    validateDescField,
} from "@/utils/functions"
import { OPERATION_TABLE_COLUMNS } from "../tableColumns"
import { CREATE_OPERATION_SUB_NAV } from "./common"

export const getProductionCommandMenuNav = (prerequisiteOperations, fourSelectData, equipmentClassId) => [
    {
        id: "info",
        title: "Đơn công đoạn mới",
        type: "form",
        items: [
            {
                id: "workOrderId",
                type: "text",
                label: "ID đơn công đoạn",
                isError: validateIdField,
            },
            {
                id: "dueDate",
                type: "datetime-local",
                label: "Ngày đến hạn",
                isError: validateRequiredField,
            },
            {
                id: "startTime",
                type: "datetime-local",
                label: "Ngày bắt đầu",
                isError: validateRequiredField,
            },
            {
                id: "endTime",
                type: "datetime-local",
                label: "Ngày kết thúc",
                isError: validateRequiredField,
            },
            // {
            //     id: "workOrderStatus",
            //     type: "text",
            //     label: "Trạng thái đơn công đoạn",
            //     isError: validateDescField,
            // },
            {
                id: "prerequisiteOperations",
                type: "select",
                label: "Công đoạn trước",
                list: prerequisiteOperations ?? [],
                isError: validateRequiredField,
            },
        ],
    },
    {
        id: "fourSelect",
        title: "Đơn công đoạn mới",
        type: "form",
        items: [
            {
                id: "workCenter",
                type: "fourSelect",
                label: "work center",
                isError: validateIdField,
                list: fourSelectData ?? [],
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
export const getCreateManufacturingOrderMenuNav = (materialDefinitionList) => [
    {
        id: "info",
        title: "Đơn sản xuất mới",
        type: "form",
        items: [
            {
                id: "manufacturingOrderId",
                type: "text",
                label: "ID đơn sản xuất",
                isError: validateIdField,
            },
            {
                id: "materialDefinitionId",
                type: "select",
                label: "ID định nghĩa vật tư",
                list: materialDefinitionList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "quantity",
                type: "text",
                label: "Số lượng",
                isError: validateNumberField,
            },
            {
                id: "unit",
                type: "text",
                label: "Đơn vị",
                isError: validateDescField,
            },
            {
                id: "dueDate",
                type: "datetime-local",
                label: "Ngày đến hạn",
                isError: validateRequiredField,
            },
            {
                id: "availableDate",
                type: "datetime-local",
                label: "Ngày có thể thực hiện",
                isError: validateRequiredField,
            },
            {
                id: "priority",
                type: "select",
                label: "Mức độ ưu tiên",
                list: [
                    {
                        key: 1,
                        value: 1,
                    },
                    {
                        key: 2,
                        value: 2,
                    },
                    {
                        key: 3,
                        value: 3,
                    },
                    {
                        key: 4,
                        value: 4,
                    },
                    {
                        key: 5,
                        value: 5,
                    },
                    {
                        key: 6,
                        value: 6,
                    },
                    {
                        key: 7,
                        value: 7,
                    },
                    {
                        key: 8,
                        value: 8,
                    },
                    {
                        key: 9,
                        value: 9,
                    },
                    {
                        key: 10,
                        value: 10,
                    },
                ],
                isError: validateRequiredField,
            },
        ],
    },
]
export const getCreateInjectionManufacturingOrderMenuNav = (materialDefinitionList, equipmentList) => [
    {
        id: "info",
        title: "Đơn sản xuất máy ép mới",
        type: "form",
        items: [
            {
                id: "manufacturingOrderId",
                type: "text",
                label: "ID đơn sản xuất máy ép",
                isError: validateIdField,
            },
            {
                id: "materialDefinitionId",
                type: "select",
                label: "ID định nghĩa vật tư",
                list: materialDefinitionList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "quantity",
                type: "text",
                label: "Số lượng",
                isError: validateNumberField,
            },
            {
                id: "unit",
                type: "text",
                label: "Đơn vị",
                isError: validateDescField,
            },
            {
                id: "dueDate",
                type: "datetime-local",
                label: "Ngày đến hạn",
                // isError: validateDateInput,
            },
            {
                id: "availableDate",
                type: "datetime-local",
                label: "Ngày có thể thực hiện",
                // isError: validateDateInput,
            },
            {
                id: "priority",
                type: "text",
                label: "Mức độ ưu tiên",
                isError: validateNumberField,
            },
            {
                id: "equipments",
                type: "select",
                label: "Danh sách máy ép",
                list: equipmentList ?? [],
                isError: validateRequiredField,
            },
        ],
    },
]
export const getEditManufacturingOrderMenuNav = (materialDefinitionList) => [
    {
        id: "info",
        title: "Chỉnh sửa đơn sản xuất",
        type: "form",
        items: [
            {
                id: "manufacturingOrderId",
                type: "text",
                label: "ID đơn sản xuất",
                isError: validateIdField,
            },
            {
                id: "materialDefinitionId",
                type: "select",
                label: "ID định nghĩa vật tư",
                list: materialDefinitionList ?? [],
                isError: validateRequiredField,
            },
            {
                id: "quantity",
                type: "text",
                label: "Số lượng",
                isError: validateNumberField,
            },
            {
                id: "unit",
                type: "text",
                label: "Đơn vị",
                isError: validateDescField,
            },
            {
                id: "dueDate",
                type: "datetime-local",
                label: "Ngày đến hạn",
                isError: validateRequiredField,
            },
            {
                id: "availableDate",
                type: "datetime-local",
                label: "Ngày có thể thực hiện",
                isError: validateRequiredField,
            },
            {
                id: "priority",
                type: "select",
                label: "Mức độ ưu tiên",
                list: [
                    {
                        key: 1,
                        value: 1,
                    },
                    {
                        key: 2,
                        value: 2,
                    },
                    {
                        key: 3,
                        value: 3,
                    },
                    {
                        key: 4,
                        value: 4,
                    },
                    {
                        key: 5,
                        value: 5,
                    },
                    {
                        key: 6,
                        value: 6,
                    },
                    {
                        key: 7,
                        value: 7,
                    },
                    {
                        key: 8,
                        value: 8,
                    },
                    {
                        key: 9,
                        value: 9,
                    },
                    {
                        key: 10,
                        value: 10,
                    },
                ],
                isError: validateRequiredField,
            },
        ],
    },
]
