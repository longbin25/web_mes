import { createPortal } from "react-dom"
import { MdOutlineClose, MdDescription } from "react-icons/md"

import Card from "@/components/Card"
import Button from "@/components/Button"
import Table from "@/components/Table"
import { EQUIPMENT_NORMALMACHINE_PROPERTIES_TABLE_COLUMNS } from "@/utils/tableColumns"
import HerapinCapMachine from "@/assets/machineImage/HerapinCapMachine.png"
import NoImagePlaceholder from "@/assets/machineImage/NoImagePlaceholder.png"

function EquipmentDetailModal({ onClose, data, onConfirm, onReject }) {
    console.log(data)
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
            <Card className="absolute top-1/2 left-1/2 min-h-[500px] min-w-[1600px] translate-x-[-50%] translate-y-[-50%]">
                <div className="mb-4 flex items-center">
                    <h2 className="text-primary-1">Thông tin chi tiết thiết bị: {data.name}</h2>
                    <Button small transparent onClick={onClose} className="ml-auto">
                        <MdOutlineClose className="text-xl font-bold" />
                  
                    </Button>
                </div>
                <div className="flex h-full">
                    <div className="">
                        <h3 className="text-primary-1">Hình ảnh thiết bị</h3>
                        {data.name == "Herapin Cap Machine 01" ? (
                            <img className="mt-4 h-80" src={HerapinCapMachine} alt="" />
                        ) : (
                            <img className="mt-4 h-80" src={NoImagePlaceholder} alt="" />
                        )}
                    </div>
                    <div className="h- ml-4 border border-primary-1"></div>
                    <div className="ml-4 flex-1">
                        <h3 className="text-primary-1">Thuộc tính của thiết bị</h3>

                        {data.properties.length > 0 ? (
                            <Table
                                // activable
                                // primary
                                // sticky
                                headers={EQUIPMENT_NORMALMACHINE_PROPERTIES_TABLE_COLUMNS}
                                body={data.properties}
                                className="mt-4"
                            />
                        ) : (
                            <h2>Thiết bị này chưa có thuộc tính nào...</h2>
                        )}
                    </div>
                </div>
            </Card>
        </div>,
        document.querySelector("#root"),
    )
}

export default EquipmentDetailModal
