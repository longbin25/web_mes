//Không yêu cầu chọn đủ
import { useEffect, useRef, useState } from "react"
import { getResourceOptionsList } from "@/utils/functions"

import SelectInput from "../../SelectInput/SelectInput"
// hàm chuyển dữ liệu từ dạng gửi từ api thành dạng sử dụng được
function findObjectById(array, itemIdKey, targetId) {
    if (Array.isArray(array)) {
        if (targetId === undefined) {
            return undefined
        } else if (Array.isArray(targetId)) {
            // Trường hợp targetId là một mảng
            return array.find((item) => item[itemIdKey] === targetId[0])
        } else {
            // Trường hợp targetId là giá trị đơn
            return array.find((item) => item[itemIdKey] === targetId)
        }
    }
    return undefined
}

function FiveSelectNew({ id, value = [], setValue, list = [], isError, setValidateRows }) {
    const [enterpriseOptionLists, setEnterpriseOptionLists] = useState([])
    const [siteOptionLists, setSiteOptionLists] = useState([])
    const [areaOptionLists, setAreaOptionLists] = useState([])
    const [workcenterOptionLists, setWorkcenterOptionLists] = useState([])
    const [workunitOptionLists, setWorkunitOptionLists] = useState([])

    const [enterpriseValue, setEnterpriseValue] = useState()
    const [siteValue, setSiteValue] = useState()
    const [areaValue, setAreaValue] = useState()
    const [workcenterValue, setWorkcenterValue] = useState()
    const [workUnitValue, setWorkUnitValue] = useState()


    const siteList = useRef()
    const areaList = useRef()
    const workcenterList = useRef()

    useEffect(() => {
        let data = ""
        if (workUnitValue != undefined) {
            data = workUnitValue[0]
        } else if (workcenterValue != undefined) {
            data = enterpriseValue + "/" + siteValue + "/" + areaValue + "/" + workcenterValue
        } else if (areaValue != undefined) {
            data = enterpriseValue + "/" + siteValue + "/" + areaValue
        } else if (siteValue != undefined) {
            data = enterpriseValue + "/" + siteValue
        } else if (enterpriseValue != undefined) {
            data = enterpriseValue
        }
        setValue([data], id)
    }, [enterpriseValue, siteValue, areaValue, workcenterValue, workUnitValue])
    useEffect(() => {
        setEnterpriseOptionLists(getResourceOptionsList(list, "enterpriseId"))
    }, [])
    // tạo options cho site
    useEffect(() => {
        if (findObjectById(list, "enterpriseId", enterpriseValue)) {
            siteList.current = findObjectById(list, "enterpriseId", enterpriseValue).sites
            setSiteOptionLists(getResourceOptionsList(siteList.current, "siteId"))
        }
    }, [enterpriseValue])
    useEffect(() => {
        if (findObjectById(siteList.current, "siteId", siteValue)) {
            areaList.current = findObjectById(siteList.current, "siteId", siteValue).areas
            setAreaOptionLists(getResourceOptionsList(areaList.current, "areaId"))
        }
    }, [siteValue])
    useEffect(() => {
        if (findObjectById(areaList.current, "areaId", areaValue)) {
            workcenterList.current = findObjectById(areaList.current, "areaId", areaValue).workCenters
            setWorkcenterOptionLists(getResourceOptionsList(workcenterList.current, "workCenterId"))
        }
    }, [areaValue])
    useEffect(() => {
        if (findObjectById(workcenterList.current, "workCenterId", workcenterValue)) {
            workcenterList.current = findObjectById(workcenterList.current, "workCenterId", workcenterValue).workUnits
            setWorkunitOptionLists(getResourceOptionsList(workcenterList.current, "absolutePath"))
        }
    }, [workcenterValue])
    return (
        <>
            {/* <h1>five select new</h1> */}

            <SelectInput
                label="Doanh nghiệp"
                list={enterpriseOptionLists}
                value={enterpriseValue}
                setValue={setEnterpriseValue}
            />
            <SelectInput label="Địa điểm" list={siteOptionLists} value={siteValue} setValue={setSiteValue} />
            <SelectInput label="Khu vực" list={areaOptionLists} value={areaValue} setValue={setAreaValue} />
            <SelectInput
                label="Trung tâm sản xuất"
                list={workcenterOptionLists}
                value={workcenterValue}
                setValue={setWorkcenterValue}
            />
            <SelectInput
                id={id}
                setValidateRows={setValidateRows}
                label="Đơn vị sản xuất"
                list={workunitOptionLists}
                // value={value}
                // setValue={setValue}
                value={workUnitValue}
                setValue={setWorkUnitValue}
                isError={isError}
            />
        </>
    )
}

export default FiveSelectNew
