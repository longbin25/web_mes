import {
    validateRequiredField,
    validateIdField,
    validateDescField,
    validateNumberField,
} from "@/utils/functions/validate"

export const getMenuTest = () => [
    {
        id: "info",
        title: "Thêm thông tin",
        type: "form",
        items: [
            {
                id: "PersonName",
                type: "text",
                label: "FullName",
                isError: validateRequiredField,
            },
            {
                id: "Job",
                type: "text",
                label: "Job",
                isError: validateRequiredField,
            },
            {
                id: "Numbers",
                type: "text",
                label: "Numbers",
                isError: validateRequiredField,
            },
        ],
    },
]
export const editMenuTest = () => [
    {
        id: "info",
        title: "Thêm thông tin",
        type: "form",
        items: [
            {
                id: "personName",
                type: "text",
                label: "FullName",
                isError: validateRequiredField,
            },
            {
                id: "Job",
                type: "text",
                label: "Job",
                isError: validateRequiredField,
            },
            {
                id: "Numbers",
                type: "text",
                label: "Numbers",
                isError: validateRequiredField,
            },
        ],
    },
]

export const getMenuTest2 = () => [
    {
        id: "info",
        title: "Thêm thông tin",
        type: "form",
        items: [
            {
                id: "FullName",
                type: "text",
                label: "FullName",
                isError: validateRequiredField,
            },
            {
                id: "Plan",
                type: "text",
                label: "Plan",
                isError: validateRequiredField,
            },
            {
                id: "ProductID",
                type: "text",
                label: "ProductID",
                isError: validateRequiredField,
            },
        ],
    },
]
export const editMenuTest2 = () => [
    {
        id: "info",
        title: "Thêm thông tin",
        type: "form",
        items: [
            {
                id: "FullName",
                type: "text",
                label: "FullName",
                isError: validateRequiredField,
            },
            {
                id: "Plan",
                type: "text",
                label: "Plan",
                isError: validateRequiredField,
            },
            {
                id: "ProductID",
                type: "text",
                label: "ProductID",
                isError: validateRequiredField,
            },
        ],
    },
]