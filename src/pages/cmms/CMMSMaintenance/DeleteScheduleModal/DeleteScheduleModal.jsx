import { createPortal } from "react-dom"
import { MdOutlineClose, MdDescription } from "react-icons/md"

import Card from "@/components/Card"
import Button from "@/components/Button"
import { useCallback, useEffect, useState } from "react"
import TextInput from "@/components/TextInput"
import SelectInput from "@/components/SelectInput"
import { useCallApi } from "@/hooks"
import { CMMSEquipmentAPi } from "@/services/api"
import { poperListMapper } from "@/utils/functions"

function DeleteScheduleModal({ onClose, data, onConfirm, onReject }) {
    const callApi = useCallApi()

    const [year, setYear] = useState()
    const [equipment, setEquipment] = useState()
    const [equipmentClass, setEquipmentClass] = useState([])

    const [equipmentClassList, setEquipmentClassList] = useState([])

    const fetchData = useCallback(() => {
        callApi([CMMSEquipmentAPi.equipmentClass.getEquipmentClasses()], (res) => {
            setEquipmentClassList(poperListMapper(res[0].items, "equipmentClassId", "name"))
        })
    }, [callApi])

    useEffect(() => {
        fetchData()
    }, [fetchData])
    const handleConfirm = () => {
        onConfirm(equipmentClass[0], year)
        onClose()
    }
    const handleReject = () => {
        onReject(data)
        onClose()
    }
    console.log(equipment)
    console.log(year)
    return createPortal(
        <div data-component="Confirm" className="container fixed top-0 left-0 right-0 bottom-0 z-10 h-full bg-hoverBg">
            <Card className="absolute top-1/2 left-1/2 min-h-[250px] min-w-[400px] translate-x-[-50%] translate-y-[-50%]">
                <div className="mb-5 flex items-center">
                    <h2 className="mr-5 text-primary-1">Xóa yêu cầu bảo trì theo lịch</h2>
                    <Button small transparent onClick={onClose} className="ml-auto">
                        <MdOutlineClose className="text-xl font-bold" />
                    </Button>
                </div>
                <SelectInput
                    className="mb-4"
                    id="equipmentClass"
                    label="Loại thiết bị"
                    value={equipmentClass}
                    setValue={setEquipmentClass}
                    list={equipmentClassList}
                />

                <TextInput
                    className="mb-4"
                    id="dueDate"
                    label="Chọn năm xóa lịch bảo trì"
                    type="text"
                    value={year}
                    setValue={setYear}
                />
                <div className="mt-10 flex items-center justify-center">
                    <Button onClick={handleConfirm}>Xóa yêu cầu bảo trì</Button>
                </div>
            </Card>
        </div>,
        document.querySelector("#root"),
    )
}

export default DeleteScheduleModal
