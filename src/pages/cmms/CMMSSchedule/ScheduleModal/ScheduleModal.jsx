import { createPortal } from "react-dom"
import { MdOutlineClose, MdDescription } from "react-icons/md"

import Card from "@/components/Card"
import Button from "@/components/Button"
import { useState } from "react"
import TextInput from "@/components/TextInput"

function ScheduleModal({ onClose, data, onConfirm, onReject }) {
    const [year, setYear] = useState()

    const handleConfirm = () => {
        onConfirm(year)
        onClose()
    }
    const handleReject = () => {
        onReject(data)
        onClose()
    }
    console.log(data)
    return createPortal(
        <div data-component="Confirm" className="container fixed top-0 left-0 right-0 bottom-0 z-10 h-full bg-hoverBg">
            <Card className="absolute top-1/2 left-1/2 min-h-[250px] min-w-[400px] translate-x-[-50%] translate-y-[-50%]">
                <div className="flex items-center mb-5">
                    <h2 className="mr-5 text-primary-1">Tạo yêu cầu bảo trì từ lịch bảo trì</h2>
                    <Button small transparent onClick={onClose} className="ml-auto">
                        <MdOutlineClose className="text-xl font-bold" />
                    </Button>
                </div>

                <TextInput
                    className="mb-4"
                    id="dueDate"
                    label="Chọn năm lên lịch"
                    type="text"
                    value={year}
                    setValue={setYear}
                />
                <div className="flex items-center justify-center mt-10">
                    <Button  onClick={handleConfirm}>
                        Tạo yêu cầu bảo trì
                    </Button>
                </div>
            </Card>
        </div>,
        document.querySelector("#root"),
    )
}

export default ScheduleModal
