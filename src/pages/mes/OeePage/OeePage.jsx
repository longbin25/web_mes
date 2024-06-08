import { useEffect, useState, useCallback } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Card from "@/components/Card"
import SelectInput from "@/components/SelectInput"
import DateInput from "@/components/DateInput"
import Table from "@/components/Table"
import ToggleButtons from "@/components/ToggleButtons/ToggleButtons"
import Chart from "react-apexcharts"

import { useCallApi } from "@/hooks"
import { paths } from "@/config"
import { MACHINE_LIST, OEE_MODE_LIST } from "@/utils/constants"
import { handleMachinesListData, handleOeeData, handleOeeMode, handleOeePageHeader } from "@/utils/functions"
import { oeeApi, resourceApi } from "@/services/api"
import TextInput from "@/components/TextInput"
import OeeSearchBar from "./OeeSearchBar"

function OeePage() {
    const navigate = useNavigate()
    const callApi = useCallApi()

    const { oeeDuration } = useSelector((state) => state.setting)
    const [oeeModeIndex, setOeeModeIndex] = useState(0)
    const [displayState, setDisplayState] = useState(0)
    const [dayStart, setDayStart] = useState(() => {
        const prevDate = new Date()
        prevDate.setDate(new Date().getDate() - oeeDuration)
        return prevDate.toISOString().slice(0, 10)
    })
    const [dayEnd, setDayEnd] = useState(() => {
        const today = new Date()
        return today.toISOString().slice(0, 10)
    })
    const [timeFrame, setTimeFrame] = useState(1800)

    const [selectedMachine, setSelectedMachine] = useState(["M17"])

    const [oeeData, setOeeData] = useState([])
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        setTableData(oeeData.reverse())
    }, [oeeData])
    const getOeeData = useCallback(() => {
        callApi(
            () => oeeApi.getOee(50),
            (data) => {
                setOeeData(handleOeeData(data[0].shots))
            },
        )
    }, [callApi])
    useEffect(() => {
        getOeeData()
    }, [getOeeData])
    console.log(oeeData)

    const xaxis = oeeData.map((e) => e.timeStamp)
    const yaxis = oeeData.map((e) => e[handleOeeMode(oeeModeIndex).toLowerCase()]).reverse()

    const state = {
        options: {
            xaxis: {
                categories: xaxis,
            },
            yaxis:
                oeeModeIndex !== 5
                    ? {
                          min: 0,
                          max: 100,
                          tickAmount: 5,
                          decimalsInFloat: 1,
                      }
                    : { decimalsInFloat: 1 },
            noData: {
                text: "Loading...",
            },
        },
        series: [
            {
                name: `${handleOeeMode(oeeModeIndex)}`,
                data: yaxis,
            },
        ],
    }
    console.log(state)
    return (
        <>
            <div className="flex h-screen flex-col">
                <OeeSearchBar
                    filter={oeeModeIndex}
                    setFilter={setOeeModeIndex}
                    stateFilter={displayState}
                    setStateFilter={setDisplayState}
                />
                {oeeModeIndex !== 0 && <h2>Giá trị {handleOeeMode(oeeModeIndex)}</h2>}

                {oeeModeIndex !== 0 && displayState != 2 && (
                    <Chart options={state.options} series={state.series} type="line" width="100%" height={700} />
                )}
                {displayState != 1 && (
                    <Table activable primary sticky headers={handleOeePageHeader(oeeModeIndex)} body={tableData} />
                )}
            </div>
        </>
    )
}

export default OeePage
