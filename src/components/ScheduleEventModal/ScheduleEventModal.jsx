import { createPortal } from "react-dom"
import {
    MdOutlineClose,
    MdAccessTime,
    MdLocationOn,
    MdPeople,
    MdDescription,
    MdOutlineKeyboardArrowRight,
    MdOutlineCheck,
} from "react-icons/md"

import Card from "@/components/Card"
import Button from "@/components/Button"

function ScheduleEventModal({ onConfirm, onClose, data }) {
    const handleConfirm = () => {
        onConfirm()
        onClose()
    }
    console.log("ScheduleEventModal")
    console.log(data)
    return createPortal(
        <div data-component="Confirm" className="container fixed top-0 left-0 right-0 bottom-0 z-10 h-full bg-hoverBg">
            <Card className="absolute top-1/2 left-1/2 min-h-[300px] w-[600px] translate-x-[-50%] translate-y-[-50%]">
                <div className="flex items-center">
                    <h2 className="text-primary-1">{data.title}</h2>
                    <Button small transparent onClick={onClose} className="ml-auto">
                        <MdOutlineClose className="text-xl font-bold" />
                    </Button>
                </div>
                {/* <div className="mb-4 mt-4 flex items-center">
                    <MdDescription className="text-xl font-bold text-primary-1" />
                    <p className="ml-4 w-full text-xl">Mô tả: {data.description}</p>
                </div> */}
                <div className="mb-4 flex items-center">
                    <MdAccessTime className="text-xl font-bold text-primary-1" />
                    <p className="ml-4 text-xl">{data.start}-></p>
                    {/* <MdAccessTime className="text-xl font-bold text-primary-1 ml-4" /> */}
                    <p className=" text-xl">{data.end}</p>
                </div>
                {/* <div className="mb-4 flex items-center">
                    <MdLocationOn className="text-xl font-bold text-primary-1" />
                    <p className="ml-4 text-xl">Vị trí: {data.location}</p>
                </div> */}
                <div className="mb-4 flex items-center">
                    <MdPeople className="text-xl font-bold text-primary-1" />
                    <p className="ml-4 text-xl">Nhân viên: {data.people?.join(",")}</p>
                </div>
            </Card>
        </div>,
        document.querySelector("#root"),
    )
}

export default ScheduleEventModal
