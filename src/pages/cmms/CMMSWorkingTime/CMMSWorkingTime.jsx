import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react"
import "@schedule-x/theme-default/dist/index.css"
import { viewWeek, viewDay, viewMonthGrid, viewMonthAgenda } from "@schedule-x/calendar"
import { createEventModalPlugin } from "@schedule-x/event-modal"
// import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop"

import { useCallApi } from "@/hooks"
import { CMMSPersonAPi } from "@/services/api"
import { useCallback, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { CMMSWorkingTimeMapper, getResourceOptionsList, getValuesByKey, poperListMapper } from "@/utils/functions"
import ScheduleEventModal from "@/components/ScheduleEventModal"

function CMMSWorkingTime() {
    const callApi = useCallApi()
    const location = useLocation()
    const routeData = location.state
    const [workingTime, setWorkingTime] = useState([])
    const [scheduleEventModal, setScheduleEventModal] = useState({})
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
            leisure: {
                colorName: "leisure",
                lightColors: {
                    main: "#1c7df9",
                    container: "#d2e7ff",
                    onContainer: "#002859",
                },
            },
            alarm: {
                colorName: "alarm",
                lightColors: {
                    main: "#D24545",
                    container: "#E6BAA3",
                    onContainer: "#002859",
                },
            },
        },
        events: [],
        plugins: [createEventModalPlugin()],
    })

    useEffect(() => {
        callApi([CMMSPersonAPi.workingTime.getWorkingTimesByPerson(routeData.personId)], (res) => {
            console.log(res)
            const newWorkingTime = CMMSWorkingTimeMapper.apiToClient(res[0].items)
            setWorkingTime(newWorkingTime)
            setCalendarState((prevState) => ({
                ...prevState,
                events: newWorkingTime,
            }))
        })
    }, [callApi, routeData.personId])
    console.log(workingTime)
    console.log(calendarState)
    return (
        <>
            {/* <CalendarComponent calendarState={calendarState} /> */}
            {calendarState.events.length > 0 && <CalendarComponent calendarState={calendarState} />}
            {scheduleEventModal.actived && (
                <ScheduleEventModal
                    onConfirm={scheduleEventModal.onConfirm}
                    data={scheduleEventModal.data}
                    onClose={() => setScheduleEventModal({ actived: false })}
                />
            )}
        </>
    )
}

export default CMMSWorkingTime
function CalendarComponent({ calendarState }) {
    return (
        <ScheduleXCalendar
            calendarApp={useCalendarApp(calendarState)}
            // customComponents={{
            //     timeGridEvent: CustomTimeGridEvent,
            //     dateGridEvent: CustomDateGridEvent,
            // }}
        />
    )
}
