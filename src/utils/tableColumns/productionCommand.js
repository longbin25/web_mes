export const PRODUCTION_COMMAND_TABLE_COLUMNS = [
    {
        Header: "Id đơn công đoạn",
        accessor: "workOrderId",
        disableSortBy: false,
    },
    {
        Header: "Id đơn sản xuất",
        accessor: "manufacturingOrder",
        disableSortBy: false,
    },
    {
        Header: "Khu làm việc",
        accessor: "workCenter",
        disableSortBy: false,
    },
    // {
    //     Header: "Trạng thái đơn công đoạn",
    //     accessor: "workOrderStatus",
    //     disableSortBy: false,
    // },
    {
        Header: "Ngày bắt đầu",
        accessor: "startTime",
        disableSortBy: false,
    },
    {
        Header: "Ngày kết thúc",
        accessor: "endTime",
        disableSortBy: false,
    },
    {
        Header: "Ngày đến hạn",
        accessor: "dueDate",
        disableSortBy: false,
    },
]
export const MANUFACTURING_ORDER_TABLE_COLUMNS = [
    {
        Header: "ID đơn sản xuất",
        accessor: "manufacturingOrderId",
        disableSortBy: false,
    },
    // {
    //     Header: "Mô tả",
    //     accessor: "description",
    //     disableSortBy: false,
    // },
    {
        Header: "Số lượng",
        accessor: "quantity",
        disableSortBy: false,
    },
    {
        Header: "Mức độ ưu tiên",
        accessor: "priority",
        disableSortBy: false,
    },
    {
        Header: "Đơn vị",
        accessor: "unit",
        disableSortBy: false,
    },
    {
        Header: "Ngày khả dụng",
        accessor: "availableDate",
        disableSortBy: false,
    },
    {
        Header: "Ngày đến hạn",
        accessor: "dueDate",
        disableSortBy: false,
    },
]
export const PRODUCT_LIST_TABLE_COLUMNS = [
    {
        Header: "ID",
        accessor: "id",
        disableSortBy: false,
    },
    {
        Header: "Tên sản phẩm",
        accessor: "product",
        disableSortBy: false,
    },
]
