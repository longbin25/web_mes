import Button from "@/components/Button"
import Card from "@/components/Card"
import { useCallApi } from "@/hooks"
import { CMMSMaintenanceRequestApi } from "@/services/api"
import { convertDateFormat, getCurrentDateTime } from "@/utils/functions"
import { HiPencil } from "react-icons/hi"
import { RiDeleteBin4Line } from "react-icons/ri"
import { toast } from "react-toastify"
const handler = {
    buttonText: {
        Assigned: "Bắt đầu bảo trì",
        InProgress: "Kết thúc bảo trì",
        Review: "Hoàn thành bảo trì",
    },
    statusTextToNum: {
        Assigned: 1,
        InProgress: 2,
        Review: 3,
    },
    sendData: {
        Assigned: {
            actualStartTime: getCurrentDateTime(),
            status: 1,
        },
        InProgress: {
            status: 2,
        },
        Review: {
            actualFinishTime: getCurrentDateTime(),
            status: 3,
        },
    },
    buttonColor: {
        Assigned: "!bg-[#2C7865]",
        InProgress: "!bg-[#FFAF45]",
        Review: "!bg-[#387ADF]",
    },
}
function getMatchingKeys(obj) {
    const matchingKeys = []

    if (obj.plannedFinish == null) {
        matchingKeys.push("plannedFinish")
    }
    if (obj.cause.length == 0) {
        matchingKeys.push("cause")
    }
    if (obj.correction.length == 0) {
        matchingKeys.push("correction")
    }
    if (obj.materials.length == 0) {
        matchingKeys.push("materials")
    }
    if (obj.dueDate == null) {
        matchingKeys.push("dueDate")
    }
    return matchingKeys
}
function MaintenanceResponseCard({ data, fetchData, setMaintenanceDetailModal, handleDelete, handleEdit }) {
    const callApi = useCallApi()
    const handleSubmit = (status) => {
        if (getMatchingKeys(data).length == 0) {
            handleStartMaintenance(status)
        } else {
            toast.error(`Vui lòng điền đầy đủ ${getMatchingKeys(data).join(", ")}`)
        }
    }
    const handleStartMaintenance = (status) => {
        let callApiFunction
        let successMessage
        let sendData = {
            Assigned: {
                actualStartTime: getCurrentDateTime(),
                status: 1,
            },
            InProgress: {
                status: 2,
            },
            Review: {
                actualFinishTime: getCurrentDateTime(),
                status: 3,
            },
        }
        callApiFunction = CMMSMaintenanceRequestApi.maintenanceResponses.updateMaintenanceResponse(
            sendData[status],
            data.maintenanceResponseId,
        )
        successMessage = handler.buttonText[data.status]
        callApi(() => callApiFunction, fetchData, successMessage)
    }
    const handleTitleClick = () => {
        setMaintenanceDetailModal({
            actived: true,
            data: data,
        })
    }
    return (
        <>
            <Card className="mb-5 min-h-[200px]">
                <div className="flex">
                    <h2 onClick={handleTitleClick} className="w-fit cursor-pointer underline">
                        {data.problem}
                    </h2>
                    {/* <div className=" ml-auto flex">
                        <div
                            className="ml-auto h-10 w-10  cursor-pointer rounded-full p-2 text-2xl text-warning-1 shadow-level1 hover:shadow-sub"
                            onClick={() => {
                                handleDelete(data)
                            }}
                        >
                            <RiDeleteBin4Line />
                        </div>
                        <div
                            className=" ml-4 h-10 w-10  cursor-pointer rounded-full p-2 text-2xl text-warning-1 shadow-level1 hover:shadow-sub"
                            onClick={() => {
                                handleEdit(data)
                            }}
                        >
                            <HiPencil />
                        </div>
                    </div> */}
                    {data.status == "Assigned" && (
                        <div
                            className=" ml-auto h-10 w-10 cursor-pointer rounded-full p-2 text-2xl text-warning-1 shadow-level1 hover:shadow-sub"
                            onClick={() => {
                                handleDelete(data)
                            }}
                        >
                            <RiDeleteBin4Line />
                        </div>
                    )}
                </div>

                <div className="flex">
                    <div className="flex-1">
                        <div className="flex">
                            <p className="w-60 font-bold">Mã yêu cầu</p>

                            <p> {data.code}</p>
                        </div>
                        <div className="flex">
                            <p className="w-60 font-bold">Mức độ ưu tiên</p>

                            <p> {data.priority}</p>
                        </div>
                        <div className="flex">
                            <p className="w-60 font-bold">Trạng thái</p>

                            <p> {data.status}</p>
                        </div>
                        <div className="flex">
                            <p className="w-60 font-bold">Thời gian ước tính (phút)</p>

                            <p> {data.estProcessTime}</p>
                        </div>
                        <div className="flex">
                            <p className="w-60 font-bold">Người chịu trách nhiệm</p>

                            <p> {data.responsiblePerson?.personName}</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex">
                            <p className="w-40 font-bold">Nguyên nhân</p>
                            <p> {data.cause.join(", ")}</p>
                        </div>
                        <div className="flex">
                            <p className="w-40 font-bold">Cách khắc phục</p>
                            <p> {data.correction.join(", ")}</p>
                        </div>
                        <div className="flex">
                            <p className="w-40 font-bold">Vật tư bảo trì</p>
                            <p> {data.materials.map((item) => item.sku).join(", ")}</p>
                        </div>
                        <div className="flex">
                            <p className="w-40 font-bold">Loại thiết bị</p>
                            <p> {data.equipmentClass?.name}</p>
                        </div>
                        <div className="flex">
                            <p className="w-40 font-bold">Thiết bị</p>
                            <p> {data.equipment?.name}</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex">
                            <p className="w-72 font-bold">Thời gian bắt đầu theo kế hoạch</p>
                            <p> {convertDateFormat(data.plannedStart)}</p>
                        </div>
                        <div className="flex">
                            <p className="w-72 font-bold">Thời gian kết thúc theo kế hoạch</p>
                            <p> {convertDateFormat(data.plannedFinish)}</p>
                        </div>
                        <div className="flex">
                            <p className="w-72 font-bold">Thời gian bắt đầu thực tế</p>
                            <p> {convertDateFormat(data.actualStartTime)}</p>
                        </div>
                        <div className="flex">
                            <p className="w-72 font-bold">Thời gian kết thúc thực tế</p>
                            <p> {convertDateFormat(data.actualFinishTime)}</p>
                        </div>
                        <div className="flex">
                            <p className="w-72 font-bold">Ngày đến hạn</p>
                            <p> {convertDateFormat(data.dueDate)}</p>
                        </div>
                        <div className="flex">
                            <p className="w-72 font-bold">Thời gian tạo yêu cầu</p>
                            <p> {convertDateFormat(data.createdAt)}</p>
                        </div>
                    </div>
                    {/* <p>updatedAt: {data.updatedAt}</p> */}
                    {/* <div className="flex-1">
                        <p>image: {data.image}</p>
                        <p>note: {data.note}</p>
                        <p>inspectionReports: {data.inspectionReports}</p>
                    </div> */}
                    <div className="flex-2 flex flex-col">
                        {data.status != "Completed" ? (
                            <Button
                                onClick={() => {
                                    handleSubmit(data.status)
                                }}
                                className={`${handler.buttonColor[data.status]} mt-auto  min-w-[200px]`}
                            >
                                {handler.buttonText[data.status]}
                            </Button>
                        ) : (
                            <div className="min-w-[200px]"></div>
                        )}
                    </div>
                </div>
            </Card>
        </>
    )
}
export default MaintenanceResponseCard
