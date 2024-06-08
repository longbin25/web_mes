import { createPortal } from "react-dom"
import { MdOutlineClose } from "react-icons/md"

import Card from "@/components/Card"
import Button from "@/components/Button"
import { useCallApi } from "@/hooks"
import {
    CMMSEquipmentAPi,
    CMMSMaintenanceRequestApi,
    CMMSMaterialAPi,
    CMMSPersonAPi,
    CMMSSettingApi,
} from "@/services/api"
import { useCallback, useEffect, useState } from "react"
import SelectInput from "@/components/SelectInput"
import { getResourceOptionsList, getValuesByKey, poperListMapper } from "@/utils/functions"
import TextInput from "@/components/TextInput"

function MaintenanceDetailModal({ onClose, data, hanldeMaintenanceDetailModalConfirm, causeList, correctionList }) {
    const callApi = useCallApi()
    const [cause, setCause] = useState([])
    const [correction, setCorrection] = useState([])
    const [responsiblePerson, setResponsiblePerson] = useState([])

    const [materialInfor, setMaterialInfor] = useState([])
    const [personList, setPersonList] = useState([])

    const [material, setMaterial] = useState()
    const [materialInforList, setMaterialInforList] = useState([])
    const [materialList, setMaterialList] = useState([])
    const [plannedFinish, setPlannedFinish] = useState(data.plannedFinish)
    const [dueDate, setDueDate] = useState(data.dueDate)
    const [equipmentMaterial, setEquipmentMaterial] = useState([])
    const fetchData = useCallback(() => {
        callApi(
            [
                CMMSEquipmentAPi.equipmentMaterial.getEquipmentMaterialsByEquipmentId(data?.equipment?.equipmentId),
                CMMSPersonAPi.person.getPersons(),
            ],
            (res) => {
                console.log(res)
                setEquipmentMaterial(res[0].items.map((item) => item.materialInfor))
                setPersonList(poperListMapper(res[1].items, "personId", "personName"))
                // setMaterialInforList(poperListMapper(res.items, "materialInforId", "name"))
            },
        )
    }, [callApi])
    console.log(data)

    useEffect(() => {
        fetchData()
    }, [fetchData])
    useEffect(() => {
        setCause(getValuesByKey(data.cause, causeList))
    }, [causeList])
    useEffect(() => {
        if (data.responsiblePerson) {
            setResponsiblePerson([data.responsiblePerson.personId])
        }
    }, [personList])
    useEffect(() => {
        setCorrection(getValuesByKey(data.correction, correctionList))
    }, [correctionList])

    const handleConfirm = () => {
        let sendData = {
            cause: cause,
            correction: correction,
            materials: materialInfor,
            plannedFinish: plannedFinish,
            dueDate: dueDate,
            responsiblePerson: responsiblePerson[0],
        }
        hanldeMaintenanceDetailModalConfirm(sendData, data.maintenanceResponseId)
        onClose()
    }
    console.log(materialInfor)
    return createPortal(
        <div data-component="Confirm" className="container fixed top-0 left-0 right-0 bottom-0 z-10 h-full bg-hoverBg">
            <Card className="absolute top-1/2 left-1/2 min-h-[300px] w-[500px] translate-x-[-50%] translate-y-[-50%]">
                <div className="flex h-full flex-col">
                    <div className="flex items-center">
                        {/* <h2 className="text-primary-1">Chỉnh sửa :</h2> */}
                        <h2 className="text-primary-1">{data?.problem}</h2>
                        <Button small transparent onClick={onClose} className="ml-auto">
                            <MdOutlineClose className="text-xl font-bold" />
                        </Button>
                    </div>
                    <SelectInput
                        className="mb-4"
                        id="cause"
                        label="Nguyên nhân"
                        value={cause}
                        setValue={setCause}
                        list={causeList}
                        mutilChoises
                    />
                    <SelectInput
                        className="mb-4"
                        id="correction"
                        label="Cách khắc phục"
                        value={correction}
                        setValue={setCorrection}
                        list={correctionList}
                        mutilChoises
                    />
                    <SelectInput
                        className="mb-4"
                        id="correction"
                        label="Người chịu trách nhiệm"
                        value={responsiblePerson}
                        setValue={setResponsiblePerson}
                        list={personList}
                    />

                    {/* <SelectInput
                        className="mb-4"
                        id="materialInfor"
                        label="materialInfor"
                        value={materialInfor}
                        setValue={setMaterialInfor}
                        list={materialInforList}
                    />
                    <SelectInput
                        className="mb-4"
                        id="material"
                        label="material"
                        value={material}
                        setValue={setMaterial}
                        list={materialList}
                        mutilChoises
                    /> */}
                    <TextInput
                        className="mb-4"
                        id="plannedFinish"
                        label="Thời gian kết thúc theo kế hoạch"
                        type="datetime-local"
                        value={plannedFinish}
                        setValue={setPlannedFinish}
                    />
                    <TextInput
                        className="mb-4"
                        id="dueDate"
                        label="Ngày đến hạn"
                        type="datetime-local"
                        value={dueDate}
                        setValue={setDueDate}
                    />
                    {equipmentMaterial.length > 0 &&
                        equipmentMaterial.map((item) => (
                            <SelectInput
                                className="mb-4"
                                id="materialInfor"
                                label={item.name}
                                value={materialInfor}
                                setValue={setMaterialInfor}
                                list={poperListMapper(item.materials, "materialId", "sku")}
                                mutilChoises
                            />
                        ))}
                    {equipmentMaterial.length == 0 && <h3>Thiết bị chưa có vật tư dùng để bảo trì...</h3>}
                    <div className="flex items-center justify-center">
                        <Button className=" mr-4 mt-10 " onClick={handleConfirm}>
                            Xác nhận
                        </Button>
                    </div>
                </div>
            </Card>
        </div>,
        document.querySelector("#root"),
    )
}

export default MaintenanceDetailModal
