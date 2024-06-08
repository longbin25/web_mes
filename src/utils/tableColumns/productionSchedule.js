export const PRODUCTION_SCHEDULE_TABLE_COLUMNS = [
    {
        Header: "Đơn sản xuất",
        accessor: "manufacturingOrder",
    },
    {
        Header: "Đơn công đoạn",
        accessor: "workOrderId",
    },
    {
        Header: "Ngày bắt đầu",
        accessor: "startTime",
    },
    {
        Header: "Ngày kết thúc",
        accessor: "endTime",
    },
    {
        Header: "Ngày đến hạn",
        accessor: "dueDate",
    },
    {
        Header: "Công đoạn trước",
        accessor: "prerequisiteOperations",
    },
    {
        Header: "Khu làm việc",
        accessor: "workCenter",
    },
    {
        Header: "Trạng thái ",
        accessor: "workOrderStatus",
    },
]
