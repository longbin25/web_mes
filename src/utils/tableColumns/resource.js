//overview

export const WORKER_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "personId",
        disableSortBy: false,
    },
    {
        Header: "Tên nhân viên",
        accessor: "description",
        disableSortBy: false,
    },
    {
        Header: "Loại nhân viên",
        accessor: "personnelClasses",
        disableSortBy: true,
    },
]

export const EQUIPMENT_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "equipmentClassId",
        disableSortBy: false,
    },
    {
        Header: "Tên thiết bị",
        accessor: "name",
        disableSortBy: false,
    },
]

export const MATERIAL_TABLE_COLUMNS = [
    {
        Header: "ID vật tư",
        accessor: "materialDefinitionId",
        disableSortBy: false,
    },
    {
        Header: "Tên vật tư",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị chính",
        accessor: "primaryUnit",
        disableSortBy: true,
    },
]

//worker
export const WORKER_INFO_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "personId",
        disableSortBy: false,
    },
    {
        Header: "Tên nhân viên",
        accessor: "description",
        disableSortBy: false,
    },
    {
        Header: "Loại nhân viên",
        accessor: "personnelClasses",
        disableSortBy: true,
    },
]

export const WORKER_CLASS_TABLE_COLUMNS = [
    {
        Header: "ID loại nhân viên",
        accessor: "personnelClassId",
        disableSortBy: false,
    },
    {
        Header: "Mô tả",
        accessor: "description",
        disableSortBy: false,
    },
]

//equipment
export const EQUIPMENT_INFO_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "equipmentId",
        disableSortBy: false,
    },
    {
        Header: "Tên thiết bị",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Loại thiết bị",
        accessor: "equipmentClass",
        disableSortBy: false,
    },
    {
        Header: "Vị trí sản xuất",
        accessor: "absolutePath",
        disableSortBy: false,
    },
]
export const PLASTICMATERIAL_INFO_TABLE_COLUMNS = [
    {
        Header: "ID nguyên liệu nhựa",
        accessor: "plasticMaterialId",
        disableSortBy: false,
    },
    {
        Header: "Tên nguyên liệu nhựa",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị chính",
        accessor: "primaryUnit",
        disableSortBy: false,
    },
]
export const PLASTICPRODUCT_INFO_TABLE_COLUMNS = [
    {
        Header: "ID sản phẩm ép",
        accessor: "plasticProductId",
        disableSortBy: false,
    },
    {
        Header: "Tên sản phẩm ép",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị chính",
        accessor: "primaryUnit",
        disableSortBy: false,
    },
]
//equipment
export const MOLD_INFO_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "moldId",
        disableSortBy: false,
    },
    {
        Header: "Tên khuôn",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Loại khuôn",
        accessor: "equipmentClass",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị sản xuất",
        accessor: "workUnit",
        disableSortBy: false,
    },
]
export const EQUIPMENT_CLASS_TABLE_COLUMNS = [
    {
        Header: "ID loại thiết bị",
        accessor: "equipmentClassId",
        disableSortBy: false,
    },
    {
        Header: "Mô tả",
        accessor: "name",
        disableSortBy: false,
    },
]

//material
export const MATERIAL_INFO_TABLE_COLUMNS = [
    {
        Header: "ID vật tư",
        accessor: "materialDefinitionId",
        disableSortBy: false,
    },
    {
        Header: "Tên vật tư",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị chính",
        accessor: "primaryUnit",
        disableSortBy: false,
    },
]

export const MATERIAL_CLASS_TABLE_COLUMNS = [
    {
        Header: "ID loại vật tư",
        accessor: "materialClassId",
        disableSortBy: false,
    },
    {
        Header: "Tên loại vật tư",
        accessor: "name",
        disableSortBy: false,
    },
]

export const SUB_SLOT_TABLE_COLUMNS = [
    {
        Header: "Phân lô",
        accessor: "description",
        disableSortBy: false,
    },
    {
        Header: "Vị trí",
        accessor: "location",
        disableSortBy: false,
    },
    {
        Header: "Trạng thái",
        accessor: "status",
        disableSortBy: false,
    },
    {
        Header: "Số lượng",
        accessor: "value",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị",
        accessor: "unit",
        disableSortBy: true,
    },
]
export const RESOURCE_MATERIAL_ACCORDION_TABLE_HEADER = [
    {
        AccordionTableTitle: "Đơn vị phụ",
        tableHeader: [
            {
                Header: "Id",
                accessor: "unitId",
            },
            {
                Header: "Tên",
                accessor: "unitName",
            },
            {
                Header: "Quy đổi sang đơn vị chính",
                accessor: "conversionValueToPrimaryUnit",
            },
        ],
    },

    {
        AccordionTableTitle: "Công đoạn",
        tableHeader: [
            {
                Header: "Id",
                accessor: "operationId",
            },
            {
                Header: "Tên",
                accessor: "name",
            },
            {
                Header: "Thời gian",
                accessor: "duration",
            },
            {
                Header: "Công đoạn trước",
                accessor: "prerequisiteOperation",
            },
        ],
    },
]
export const RESOURCE_EQUIPMENT_ACCORDION_TABLE_HEADER = [
    {
        AccordionTableRow: "Loại thiết bị",
        tableHeader: [
            {
                Header: "Id",
                accessor: "equipmentId",
            },
            {
                Header: "Tên",
                accessor: "name",
            },
        ],
    },
    {
        AccordionTableRow: "Danh sách thiết bị",
        tableHeader: [
            {
                Header: "Id",
                accessor: "id",
            },
            {
                Header: "Tên",
                accessor: "Name",
            },
            {
                Header: "Loại",
                accessor: "Type",
            },
            {
                Header: "Vị trí",
                accessor: "Location",
            },
        ],
    },
]
//material lot

export const MATERIAL_LOT_TABLE_COLUMNS = [
    {
        Header: "ID vật tư",
        accessor: "materialDefinition",
        disableSortBy: false,
    },
    {
        Header: "Id lot",
        accessor: "materialLotId",
        disableSortBy: false,
    },
    {
        Header: "Số lượng",
        accessor: "quantity",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị vật liệu",
        accessor: "unit",
        disableSortBy: false,
    },
]
export const EQUIPMENT_NORMALMACHINE_PROPERTIES_TABLE_COLUMNS = [
    {
        Header: "Id thuộc tính",
        accessor: "propertyId",
        disableSortBy: false,
    },
    {
        Header: "Mô tả",
        accessor: "description",
        disableSortBy: false,
    },
    {
        Header: "Giá trị",
        accessor: "valueString",
        disableSortBy: false,
    },
    {
        Header: "Kiểu dữ liệu",
        accessor: "valueType",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị",
        accessor: "valueUnitOfMeasure",
        disableSortBy: false,
    },
]
export const CMMS_MATERIAL_DETAIL_MATERIAL_TABLE_COLUMNS = [
    // {
    //     Header: "materialId",
    //     accessor: "materialId",
    //     disableSortBy: false,
    // },
    {
        Header: "SKU",
        accessor: "sku",
        disableSortBy: false,
    },
    {
        Header: "Trạng thái",
        accessor: "status",
        disableSortBy: false,
    },
]
export const CMMS_MATERIAL_DETAIL_HISTORYCARD_TABLE_COLUMNS = [
    // {
    //     Header: "materialHistoryCardId",
    //     accessor: "materialHistoryCardId",
    //     disableSortBy: false,
    // },
    {
        Header: "Số lượng nhập",
        accessor: "input",
        disableSortBy: false,
    },
    {
        Header: "Số lượng xuất",
        accessor: "output",
        disableSortBy: false,
    },
    {
        Header: "Giá trị trước",
        accessor: "before",
        disableSortBy: false,
    },

    {
        Header: "Giá trị sau",
        accessor: "after",
        disableSortBy: false,
    },
    {
        Header: "Thời gian",
        accessor: "timeStamp",
        disableSortBy: false,
    },
    // {
    //     Header: "note",
    //     accessor: "note",
    //     disableSortBy: false,
    // },
]
export const CMMS_MATERIAL_DETAIL_MATERIAL_REQUEST_TABLE_COLUMNS = [
    {
        Header: "Mã yêu cầu vật tư",
        accessor: "code",
        disableSortBy: false,
    },
    // {
    //     Header: "materialRequestId",
    //     accessor: "materialRequestId",
    //     disableSortBy: false,
    // },
    {
        Header: "Số lượng hiện tại",
        accessor: "currentNumber",
        disableSortBy: false,
    },
    {
        Header: "Số lượng cần thêm",
        accessor: "additionalNumber",
        disableSortBy: false,
    },
    {
        Header: "Số lượng mong muốn",
        accessor: "expectedNumber",
        disableSortBy: false,
    },
    // {
    //     Header: "createdAt",
    //     accessor: "createdAt",
    //     disableSortBy: false,
    // },
    // {
    //     Header: "updatedAt",
    //     accessor: "updatedAt",
    //     disableSortBy: false,
    // },
    {
        Header: "Ngày mong muốn",
        accessor: "expectedDate",
        disableSortBy: false,
    },
    {
        Header: "Trạng thái",
        accessor: "status",
        disableSortBy: false,
    },
]
export const CMMS_MATERIAL_INFO_TABLE_COLUMNS = [
    {
        Header: "Mã vật tư bảo trì",
        accessor: "code",
        disableSortBy: false,
    },
    // {
    //     Header: "ID",
    //     accessor: "materialInforId",
    //     disableSortBy: false,
    // },
    {
        Header: "Tên vật tư bảo trì",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Số lượng hiện tại",
        accessor: "currentQuantity",
        disableSortBy: false,
    },
    {
        Header: "Số lượng tối thiểu",
        accessor: "minimumQuantity",
        disableSortBy: false,
    },
    {
        Header: "Tình trạng",
        accessor: "CMMSMaterialStockState",
        disableSortBy: false,
    },

    {
        Header: "Đơn vị",
        accessor: "unit",
        disableSortBy: false,
    },
]
export const CMMS_EQUIPMENT_CLASS_TABLE_COLUMNS = [
    // {
    //     Header: "equipmentClassId",
    //     accessor: "equipmentClassId",
    //     disableSortBy: false,
    // },
    {
        Header: "Tên loại thiết bị",
        accessor: "name",
        disableSortBy: false,
    },
]
export const CMMS_PERSON_TABLE_COLUMNS = [
    // {
    //     Header: "ID",
    //     accessor: "personId",
    //     disableSortBy: false,
    // },

    {
        Header: "ID",
        accessor: "id",
        disableSortBy: false,
    },
    {
        Header: "JOB",
        accessor: "Job",
        disableSortBy: false,
    },
    {
        Header: "Numbers",
        accessor: "Numbers",
        disableSortBy: false,
    },
    {
        Header: "PersonName",
        accessor: "PersonName",
        disableSortBy: false,
    },
]
export const CMMS_EQUIPMENT_TABLE_COLUMNS = [
    // {
    //     Header: "ID",
    //     accessor: "equipmentId",
    //     disableSortBy: false,
    // },
    {
        Header: "Mã thiết bị",
        accessor: "code",
        disableSortBy: false,
    },
    {
        Header: "Loại thiết bị",
        accessor: "equipmentClass",
        disableSortBy: false,
    },
    {
        Header: "Tên thiết bị",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Trạng thái",
        accessor: "status",
        disableSortBy: false,
    },

    {
        Header: "MTBF",
        accessor: "mtbf",
        disableSortBy: false,
    },
    {
        Header: "MTTF",
        accessor: "mttf",
        disableSortBy: false,
    },
    // {
    //     Header: "OEE",
    //     accessor: "oee",
    //     disableSortBy: false,
    // },
]

export const CMMS_EQUIPMENT_MATERIAL_TABLE_COLUMNS = [
    // {
    //     Header: "equipmentMaterialId",
    //     accessor: "equipmentMaterialId",
    //     disableSortBy: false,
    // },
    {
        Header: "Tên vật tư bảo trì",
        accessor: "materialInfor",
        disableSortBy: false,
    },
    {
        Header: "Vòng đời vật tư (phút)",
        accessor: "fullTime",
        disableSortBy: false,
    },
    {
        Header: "Thời gian sử dụng (phút)",
        accessor: "usedTime",
        disableSortBy: false,
    },
    {
        Header: "Thời gian cài đặt",
        accessor: "installedTime",
        disableSortBy: false,
    },
]
export const CMMS_MTBF_TABLE_COLUMNS = [
    {
        Header: "Thời gian",
        accessor: "time",
        disableSortBy: false,
    },
    {
        Header: "Giá trị",
        accessor: "value",
        disableSortBy: false,
    },
]
export const CMMS_MTTF_TABLE_COLUMNS = [
    {
        Header: "Thời gian",
        accessor: "time",
        disableSortBy: false,
    },
    {
        Header: "Giá trị",
        accessor: "value",
        disableSortBy: false,
    },
]
export const CMMS_EQUIPMENTDETAIL_CAUSE_TABLE_COLUMNS = [
    {
        Header: "Sự cố",
        accessor: "name",
        disableSortBy: false,
    },
    {
        Header: "Số lần xảy ra",
        accessor: "value",
        disableSortBy: false,
    },
]
export const CMMS_SCHEDULE_TABLE_COLUMNS = [
    {
        Header: "Mã lịch bảo trì",
        accessor: "code",
        disableSortBy: false,
    },
    {
        Header: "Vấn đề",
        accessor: "problem",
        disableSortBy: false,
    },
    {
        Header: "Thời gian ước tính (phút)",
        accessor: "estProcessingTime",
        disableSortBy: false,
    },
    {
        Header: "Ngày bắt đầu dự định",
        accessor: "plannedStart",
        disableSortBy: false,
    },
]
export const CMMS_CAUSE_TABLE_COLUMNS = [
    {
        Header: "Mã nguyên nhân",
        accessor: "causeCode",
        disableSortBy: false,
    },
    {
        Header: "Nguyên nhân",
        accessor: "causeName",
        disableSortBy: false,
    },
    {
        Header: "Loại thiết bị",
        accessor: "equipmentClass",
        disableSortBy: false,
    },
    {
        Header: "Mức độ nghiêm trọng",
        accessor: "severity",
        disableSortBy: false,
    },
    {
        Header: "Ghi chú",
        accessor: "note",
        disableSortBy: false,
    },
]
export const CMMS_CORRECTION_TABLE_COLUMNS = [
    {
        Header: "Mã cách khắc phục",
        accessor: "correctionCode",
        disableSortBy: false,
    },
    {
        Header: "Cách khắc phục",
        accessor: "correctionName",
        disableSortBy: false,
    },
    {
        Header: "Loại khắc phục",
        accessor: "correctionType",
        disableSortBy: false,
    },
    {
        Header: "Thời gian ước tính (phút)",
        accessor: "estProcessTime",
        disableSortBy: false,
    },
    {
        Header: "Ghi chú",
        accessor: "note",
        disableSortBy: false,
    },
]
export const CMMS_MAINTENANCE_TABLE_COLUMNS = [
    {
        Header: "code",
        accessor: "code",
        disableSortBy: false,
    },
    {
        Header: "createdAt",
        accessor: "createdAt",
        disableSortBy: false,
    },
    {
        Header: "equipment",
        accessor: "equipment",
        disableSortBy: false,
    },
    {
        Header: "equipmentClass",
        accessor: "equipmentClass",
        disableSortBy: false,
    },
    {
        Header: "estProcessTime",
        accessor: "estProcessTime",
        disableSortBy: false,
    },
    {
        Header: "problem",
        accessor: "problem",
        disableSortBy: false,
    },
    {
        Header: "priority",
        accessor: "priority",
        disableSortBy: false,
    },
    {
        Header: "status",
        accessor: "status",
        disableSortBy: false,
    },
]
export const CMMS_REQUEST_TABLE_COLUMNS = [
    {
        Header: "Mã yêu cầu bảo trì",
        accessor: "code",
        disableSortBy: false,
    },
    {
        Header: "Vấn đề",
        accessor: "problem",
        disableSortBy: false,
    },
    {
        Header: "Người chịu trách nhiệm",
        accessor: "responsiblePerson",
        disableSortBy: false,
    },
    {
        Header: "Thiết bị",
        accessor: "equipment",
        disableSortBy: false,
    },
    {
        Header: "Mức độ ưu tiên",
        accessor: "requestedPriority",
        disableSortBy: false,
    },
    {
        Header: "Trạng thái",
        accessor: "status",
        disableSortBy: false,
    },
    {
        Header: "Ngày gửi yêu cầu",
        accessor: "submissionDate",
        disableSortBy: false,
    },
    {
        Header: "Ngày dự kiến hoàn thành",
        accessor: "requestedCompletionDate",
        disableSortBy: false,
    },

    // {
    //     Header: "reviewer",
    //     accessor: "reviewer",
    //     disableSortBy: false,
    // },

    // {
    //     Header: "createdAt",
    //     accessor: "createdAt",
    //     disableSortBy: false,
    // },
    // {
    //     Header: "updatedAt",
    //     accessor: "updatedAt",
    //     disableSortBy: false,
    // },
]
export const MES_MATERIALDETAILPAGE_MATERIALUNIT_TABLE_COLUMNS = [
    {
        Header: "Id",
        accessor: "unitId",
        disableSortBy: false,
    },
    {
        Header: "Tên",
        accessor: "unitName",
        disableSortBy: false,
    },
    {
        Header: "Quy đổi sang đơn vị chính",
        accessor: "conversionValueToPrimaryUnit",
        disableSortBy: false,
    },
]
export const MES_MATERIALDETAILPAGE_OPERATION_TABLE_COLUMNS = [
    {
        Header: "Id",
        accessor: "operationId",
        disableSortBy: false,
    },
    {
        Header: "Tên",
        accessor: "name",
        disableSortBy: false,
    },
    // {
    //     Header: "Khoảng thời gian",
    //     accessor: "duration",
    //     disableSortBy: false,
    // },
    {
        Header: "Công đoạn trước",
        accessor: "prerequisiteOperation",
        disableSortBy: false,
    },
]
export const SETTING_ROLE_TABLE_COLUMNS = [
    {
        Header: "Chức vụ",
        accessor: "displayName",
        disableSortBy: false,
    },
    {
        Header: "Mô tả",
        accessor: "description",
        disableSortBy: false,
    },
]
export const SETTING_USER_TABLE_COLUMNS = [
    {
        Header: "Họ nhân viên",
        accessor: "lastName",
        disableSortBy: false,
    },
    {
        Header: "Tên nhân viên",
        accessor: "firstName",
        disableSortBy: false,
    },
    {
        Header: "Ngày sinh",
        accessor: "dateOfBirth",
        disableSortBy: false,
    },
    {
        Header: "Chức vụ",
        accessor: "roles",
        disableSortBy: false,
    },
]
