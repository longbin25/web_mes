import { createPortal } from "react-dom"
import { MdOutlineClose, MdDescription } from "react-icons/md"

import Card from "@/components/Card"
import Button from "@/components/Button"
import { useSelector } from "react-redux"

function CMMSMaterialRequestModal({ onClose, data, onConfirm, onReject }) {
    const userData = useSelector((state) => state)

    const handleConfirm = () => {
        onConfirm(data)
        onClose()
    }
    const handleReject = () => {
        onReject(data)
        onClose()
    }

    return createPortal(
        <div data-component="Confirm" className="container fixed top-0 left-0 right-0 bottom-0 z-10 h-full bg-hoverBg">
            <Card className="absolute top-1/2 left-1/2 min-h-[400px] w-[1000px] translate-x-[-50%] translate-y-[-50%]">
                <div className="flex items-center">
                    <h2 className="text-primary-1">{data?.problem}</h2>
                    <Button small transparent onClick={onClose} className="ml-auto">
                        <MdOutlineClose className="text-xl font-bold" />
                    </Button>
                </div>
                <div className="flex">
                    <div className="">
                        <h2>Thông tin về yêu cầu vật tư</h2>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-60 text-xl font-bold">Vật tư yêu cầu</p>
                            <p className="text-xl">{data?.code} </p>
                        </div>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-60 text-xl font-bold">Số lượng hiện tại</p>
                            <p className="text-xl">{data?.currentNumber} </p>
                        </div>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-60 text-xl font-bold">Số lượng cần thêm</p>
                            <p className="text-xl">{data?.additionalNumber} </p>
                        </div>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-60 text-xl font-bold">Số lượng mong muốn</p>
                            <p className="text-xl">{data?.expectedNumber} </p>
                        </div>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-60 text-xl font-bold">Trạng thái:</p>
                            <p className="text-xl">{data?.status} </p>
                        </div>
                    </div>
                    <div className="ml-7 border border-primary-1"></div>
                    <div className="ml-7">
                        <h2>Thông tin về thời gian</h2>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-60 text-xl font-bold">Ngày mong muốn</p>
                            <p className="text-xl">{data?.expectedDate} </p>
                        </div>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-60 text-xl font-bold">Thời gian tạo</p>
                            <p className="text-xl">{data?.createdAt} </p>
                        </div>
                        <div className="mb-4 mt-4 flex items-center">
                            <p className="ml-4 w-60 text-xl font-bold">Thời gian cập nhật</p>
                            <p className="text-xl">{data?.updatedAt} </p>
                        </div>
                    </div>
                </div>

                <div className=" flex">
                    {/* {data.status != "Completed" && (
                        <>
                            <Button className="ml-auto mr-4 w-[120px]" onClick={handleConfirm}>
                                Duyệt
                            </Button>
                            <Button onClick={handleReject} className="w-[120px]">
                                Từ chối
                            </Button>
                        </>
                    )} */}
                    {userData.auth.role.includes("Admin", "Manager") && data.status != "Completed" ? (
                        <>
                            <Button className="ml-auto mr-4 w-[120px]" onClick={handleConfirm}>
                                Duyệt
                            </Button>
                            <Button onClick={handleReject} className="w-[120px]">
                                Từ chối
                            </Button>
                        </>
                    ) : (
                        <>
                            {userData.auth.role.includes("Admin", "Manager") == false && (
                                <h2 className="ml-auto mt-8 text-primary-1">
                                    Chỉ có quản lý mới có quyền duyệt yêu cầu vật tư!
                                </h2>
                            )}
                        </>
                    )}
                </div>
            </Card>
        </div>,
        document.querySelector("#root"),
    )
}

export default CMMSMaterialRequestModal
