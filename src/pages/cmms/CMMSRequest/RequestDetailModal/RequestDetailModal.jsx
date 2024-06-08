import { createPortal } from "react-dom"
import { MdOutlineClose, MdDescription } from "react-icons/md"

import Card from "@/components/Card"
import Button from "@/components/Button"
import { useSelector } from "react-redux"

function RequestDetailModal({ onClose, data, onConfirm, onReject }) {
    const userData = useSelector((state) => state)

    const handleConfirm = () => {
        onConfirm(data)
        onClose()
    }
    const handleReject = () => {
        onReject(data)
        onClose()
    }
    console.log(data)
    return createPortal(
        <div data-component="Confirm" className="container fixed top-0 left-0 right-0 bottom-0 z-10 h-full bg-hoverBg">
            <Card className="absolute top-1/2 left-1/2 min-h-[500px] min-w-[1200px] translate-x-[-50%] translate-y-[-50%]">
                <div className="flex items-center">
                    <h2 className="text-primary-1">{data?.problem}</h2>
                    <Button small transparent onClick={onClose} className="ml-auto">
                        <MdOutlineClose className="text-xl font-bold" />
                    </Button>
                </div>
                <div className="flex">
                    <div className="">
                        <h2>Thông tin về yêu cầu</h2>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-80 text-xl font-bold">Mã yêu cầu</p>
                            <p className="text-xl">{`${data?.code}`} </p>
                        </div>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-80 text-xl font-bold">Loại thiết bị </p>
                            <p className="text-xl"> {data?.equipmentClass}</p>
                        </div>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-80 text-xl font-bold">Thiết bị </p>
                            <p className="text-xl"> {data?.equipment}</p>
                        </div>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-80 text-xl font-bold">Thời gian thực hiện ước tính </p>
                            <p className="text-xl"> {data?.estProcessingTime}</p>
                        </div>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-80 text-xl font-bold">Mức độ ưu tiên </p>
                            <p className="text-xl"> {data?.requestedPriority}</p>
                        </div>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-80 text-xl font-bold">Trạng thái </p>
                            <p className="text-xl"> {data?.status}</p>
                        </div>
                        <h2>Nhân viên liên quan</h2>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-80 text-xl font-bold">Người yêu cầu </p>
                            <p className="text-xl"> {data?.requester?.personName}</p>
                        </div>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-80 text-xl font-bold">Người xem xét </p>
                            <p className="text-xl"> {data?.reviewer?.personName}</p>
                        </div>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-80 text-xl font-bold">Người chịu trách nhiệm </p>
                            <p className="text-xl"> {data?.responsiblePerson?.personName}</p>
                        </div>
                    </div>
                    <div className="ml-5 border border-primary-2"></div>
                    <div className="ml-5">
                        <h2>Thông tin về thời gian</h2>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-80 text-xl font-bold">Ngày gửi yêu cầu </p>
                            <p className="text-xl"> {data?.submissionDate}</p>
                        </div>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-80 text-xl font-bold">Ngày bắt đầu theo kế hoạch </p>
                            <p className="text-xl"> {data?.plannedStart}</p>
                        </div>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-80 text-xl font-bold">Ngày dự kiến hoàn thành </p>
                            <p className="text-xl"> {data?.requestedCompletionDate}</p>
                        </div>
                        {/* <div className="mb-4 mt-4 flex items-center">
                            <p className="w-80 ml-4 w-full text-xl">createdAt {data?.createdAt}</p>
                        </div>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="w-80 ml-4 w-full text-xl">updatedAt {data?.updatedAt}</p>
                        </div> */}
                    </div>
                </div>
                {userData.auth.role.includes("Admin", "Manager") ? (
                    <>
                        <div className=" flex">
                            <Button className="ml-auto mr-4 w-[120px]" onClick={handleConfirm}>
                                Duyệt
                            </Button>
                            <Button onClick={handleReject} className="w-[120px]">
                                Từ chối
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="ml-auto mt-8 text-primary-1">
                            Chỉ có quản lý mới có quyền duyệt yêu cầu bảo trì!
                        </h2>
                    </>
                )}
            </Card>
        </div>,
        document.querySelector("#root"),
    )
}

export default RequestDetailModal
