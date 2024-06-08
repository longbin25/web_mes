import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react"
import "@schedule-x/theme-default/dist/index.css"
import { viewWeek, viewDay, viewMonthGrid, viewMonthAgenda } from "@schedule-x/calendar"
import { createEventModalPlugin } from "@schedule-x/event-modal"

import { useState, useEffect, useCallback } from "react"
import ApexChart from "react-apexcharts"

import ToggleButtons from "@/components/ToggleButtons"
import { mutilSeriesRangeBarChartConfig } from "@/config"
import { useCallApi } from "@/hooks"
import { orderApi } from "@/services/api"
import { convertISOToLocaleDate, convertDataProductionSchedule, MESProductionScheduleMapper } from "@/utils/functions"
import { PRODUCTION_SCHEDULE_TABLE_COLUMNS } from "@/utils/tableColumns"
import Table from "@/components/Table/Table"
import DisplayToggleProductionSchedule from "./DisplayToggleProductionSchedule/DisplayToggleProductionSchedule"

function ProductionSchedule() {
    const callApi = useCallApi()

    const [workOrder, setWorkOrder] = useState([])
    const [workOrderShowData, setWorkOrderShowData] = useState([])
    const [chartData, setChartData] = useState([])

    const [actived, setActived] = useState(0)
    const [statusFilter, setStatusFilter] = useState(0)
    const [keyValue, setKeyValue] = useState(0)
    const [event, setEvent] = useState([])
    const [calendarState, setCalendarState] = useState({
        defaultView: viewMonthGrid.name,
        views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
        // callbacks: {
        //     onEventClick(calendarEvent) {
        //         // setScheduleEventModal(calendarEvent)
        //         setScheduleEventModal({
        //             actived: true,
        //             onConfirm: () => {
        //                 console.log("confirm")
        //             },
        //             data: calendarEvent,
        //         })
        //     },
        // },
        calendars: {
            unstarted: {
                colorName: "unstarted",
                lightColors: {
                    main: "#D24545",
                    container: "#D24545",
                    onContainer: "#ffffff",
                },
            },
            running: {
                colorName: "running",
                lightColors: {
                    main: "#2C7865",
                    container: "#2C7865",
                    onContainer: "#ffffff",
                },
            },
            complete: {
                colorName: "complete",
                lightColors: {
                    main: "#387ADF",
                    container: "#387ADF",
                    onContainer: "#ffffff",
                },
            },
        },
        events: [],
        plugins: [createEventModalPlugin()],
    })
    const fetchWorkOrders = useCallback(() => {
        callApi([orderApi.workOrder.getWorkOrders("")], ([workOrder]) => {
            setWorkOrder(workOrder.items)
            setChartData(convertDataProductionSchedule(workOrder.items, statusFilter))
        })
    }, [callApi])
    useEffect(() => {
        fetchWorkOrders()
    }, [fetchWorkOrders])
    useEffect(() => {
        setChartData(convertDataProductionSchedule(workOrder, statusFilter))
    }, [statusFilter])
    useEffect(() => {
        let result
        switch (statusFilter) {
            case 0:
                result = workOrder
                break
            case 1:
                result = workOrder.filter((item) => item.workOrderStatus == 2)
                break
            case 2:
                result = workOrder.filter((item) => item.workOrderStatus == 3)
                break
            case 3:
                result = workOrder.filter((item) => item.workOrderStatus == 4)
                break
            default:
                result = workOrder
                break
        }
        console.log(result)
        setWorkOrderShowData(MESProductionScheduleMapper.apiToClient(result))
        setEvent(MESProductionScheduleMapper.schedule(result, statusFilter))
        setCalendarState((prevState) => ({
            ...prevState,
            events: MESProductionScheduleMapper.schedule(result, statusFilter),
        }))
    }, [workOrder, statusFilter])
    console.log(calendarState)
    return (
        <div data-component="ProductionSchedule" className="h-full w-full">
            <div>
                <DisplayToggleProductionSchedule
                    filter={actived}
                    setFilter={setActived}
                    status={statusFilter}
                    setStatus={setStatusFilter}
                    keyValue={keyValue}
                    setKeyValue={setKeyValue}
                />
            </div>
            <div className="h-[calc(100%-40px)] w-full pt-5">
                {actived == 0 && (
                    <ApexChart
                        series={chartData}
                        options={mutilSeriesRangeBarChartConfig}
                        type="rangeBar"
                        height={chartData.length * 100}
                        width="100%"
                    />
                )}
                {actived == 1 && (
                    <div key={keyValue}>
                        <CalendarComponent calendarState={calendarState} event={event} />
                    </div>
                )}
                {actived == 2 && (
                    <Table
                        activable
                        primary
                        sticky
                        headers={PRODUCTION_SCHEDULE_TABLE_COLUMNS}
                        body={workOrderShowData}
                    />
                )}
            </div>
        </div>
    )
}

export default ProductionSchedule
function CalendarComponent({ calendarState, event }) {
    const calendar = useCalendarApp(calendarState)
    // console.log(calendar.events.getAll())
    // calendar.events.
    return <ScheduleXCalendar calendarApp={calendar} />
}
