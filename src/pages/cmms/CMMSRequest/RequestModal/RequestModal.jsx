import { createPortal } from "react-dom"
import { MdOutlineClose, MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft, MdOutlineCheck } from "react-icons/md"

import Card from "@/components/Card"
import Button from "@/components/Button"
import { CMMSEquipmentAPi, CMMSMaintenanceRequestApi, CMMSPersonAPi } from "@/services/api"
import { useCallApi } from "@/hooks"
import TextInput from "@/components/TextInput"
import { useCallback, useEffect, useState } from "react"
import { poperListMapper } from "@/utils/functions"
import SelectInput from "@/components/SelectInput"

function RequestModal({ onClose, data, handleConfirm }) {
    const callApi = useCallApi()
    const [toggleMode, setToggleMode] = useState(0)

    const [problem, setProblem] = useState()
    const [estProcessingTime, setEstProcessingTime] = useState()
    const [requestedCompletionDate, setRequestedCompletionDate] = useState()
    const [plannedStart, setPlannedStart] = useState()
    const [requester, setRequester] = useState()
    const [reviewer, setReviewer] = useState()
    const [responsiblePerson, setResponsiblePerson] = useState()
    const [equipmentClass, setEquipmentClass] = useState([])
    const [equipment, setEquipment] = useState()

    const [personList, setPersonList] = useState([])
    const [equipmentClassList, setEquipmentClassList] = useState([])
    const [equipmentList, setEquipmentList] = useState([])

    const fetchData = useCallback(() => {
        callApi([CMMSPersonAPi.person.getPersons(), CMMSEquipmentAPi.equipmentClass.getEquipmentClasses()], (res) => {
            setPersonList(poperListMapper(res[0].items, "personId", "personName"))
            setEquipmentClassList(poperListMapper(res[1].items, "equipmentClassId", "name"))
        })
    }, [callApi])

    useEffect(() => {
        callApi([CMMSEquipmentAPi.equipment.getEquipmentByEquipmentClassId(equipmentClass[0])], (res) => {
            setEquipmentList(poperListMapper(res[0].items, "equipmentId", "name"))
        })
    }, [equipmentClass])

    useEffect(() => {
        fetchData()
    }, [fetchData])
    const handleSubmit = () => {
        const data = {
            problem: problem,
            estProcessingTime: estProcessingTime,
            requestedCompletionDate: requestedCompletionDate,
            plannedStart: plannedStart,
            requester: requester[0],
            reviewer: reviewer[0],
            responsiblePerson: responsiblePerson[0],
            equipmentClass: equipmentClass[0],
            equipment: equipment[0],
        }
        handleConfirm(data)
        onClose()
    }
    const hanldeCloseButton = () => {
        if (toggleMode == 0) {
            onClose()
        }
        if (toggleMode == 1) {
            setToggleMode(0)
        }
    }

    return createPortal(
        <div data-component="Confirm" className="container fixed top-0 left-0 right-0 bottom-0 z-10 h-full bg-hoverBg">
            <Card className="absolute top-1/2 left-1/2 min-h-[400px] min-w-[600px] translate-x-[-50%] translate-y-[-50%]">
                <div className="flex items-center">
                    <h2>Tạo yêu cầu</h2>
                    <Button small transparent onClick={hanldeCloseButton} className="ml-auto">
                        <MdOutlineClose className="text-xl font-bold" />
                    </Button>
                </div>
                <div className="h-full">
                    {toggleMode == 0 && (
                        <div className="">
                            <TextInput
                                className="mb-4"
                                id="problem"
                                label="Vấn đề"
                                value={problem}
                                setValue={setProblem}
                            />
                            <SelectInput
                                className="mb-4"
                                id="equipmentClass"
                                label="Loại thiết bị"
                                value={equipmentClass}
                                setValue={setEquipmentClass}
                                list={equipmentClassList}
                            />
                            <SelectInput
                                className="mb-4"
                                id="equipment"
                                label="Thiết bị"
                                value={equipment}
                                setValue={setEquipment}
                                list={equipmentList}
                            />
                        </div>
                    )}
                    {toggleMode == 1 && (
                        <div className="">
                            <SelectInput
                                className="mb-4"
                                id="requester"
                                label="Người yêu cầu"
                                value={requester}
                                setValue={setRequester}
                                list={personList}
                            />
                            <SelectInput
                                className="mb-4"
                                id="reviewer"
                                label="Người xem xét"
                                value={reviewer}
                                setValue={setReviewer}
                                list={personList}
                            />
                            <SelectInput
                                className="mb-4"
                                id="responsiblePerson"
                                label="Người phụ trách"
                                value={responsiblePerson}
                                setValue={setResponsiblePerson}
                                list={personList}
                            />

                            <TextInput
                                className="mb-4"
                                id="estProcessingTime"
                                label="Thời gian ước tính (phút)"
                                value={estProcessingTime}
                                setValue={setEstProcessingTime}
                            />
                            <TextInput
                                className="mb-4"
                                id="requestedCompletionDate"
                                label="Ngày dự kiến hoàn thành"
                                type="datetime-local"
                                value={requestedCompletionDate}
                                setValue={setRequestedCompletionDate}
                            />
                            <TextInput
                                className="mb-4"
                                id="plannedStart"
                                label="Ngày bắt đầu theo kế hoạch"
                                type="datetime-local"
                                value={plannedStart}
                                setValue={setPlannedStart}
                            />
                        </div>
                    )}
                    {toggleMode == 0 && (
                        <Button
                            onClick={() => {
                                setToggleMode(1)
                            }}
                            className="mx-auto mt-auto text-center text-3xl"
                        >
                            {toggleMode == 1 ? <MdOutlineCheck /> : <MdOutlineKeyboardArrowRight />}
                        </Button>
                    )}
                    {toggleMode == 1 && (
                        <Button onClick={handleSubmit} className="mx-auto mt-auto  text-center text-3xl">
                            <MdOutlineCheck />
                        </Button>
                    )}
                </div>
            </Card>
        </div>,
        document.querySelector("#root"),
    )
}

export default RequestModal
