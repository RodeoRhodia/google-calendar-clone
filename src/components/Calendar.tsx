import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { useState, useRef, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { EventContext, type EventsMap } from "../contexts/EventContext";
import { addDays, format } from "date-fns";
import {
    sampleEventsOneDayAfter,
    sampleEventsTwoDaysAfter,
    sampleEventsThreeDaysAfter,
    sampleEventsFourDaysAfter,
    sampleEventsFiveDaysAfter,
    sampleEventsSixDaysAfter,
    sampleEventsSevenDaysAfter,
    sampleEventsEightDaysAfter
} from "../utils/sampleEvents";

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [events, setEvents] = useLocalStorage<EventsMap>("EVENTS", {});

    const hasCheckedRef = useRef(false);
    const shouldPopulateSamples = useRef(false);

    if (!hasCheckedRef.current) {
        if (localStorage.getItem("DATE_FIRST_LOADED_APP") === null) {
            console.log("First time loading the app");
            shouldPopulateSamples.current = true;
        }
        hasCheckedRef.current = true;
    }

    const [dateFirstLoaded] = useLocalStorage<Date>(
        "DATE_FIRST_LOADED_APP",
        new Date()
    );

    useEffect(() => {
        if (shouldPopulateSamples.current) {
            const today = new Date();
            const sampleEventsMap: EventsMap = {
                [format(addDays(today, 1), "yyyy-MM-dd")]: sampleEventsOneDayAfter,
                [format(addDays(today, 2), "yyyy-MM-dd")]: sampleEventsTwoDaysAfter,
                [format(addDays(today, 3), "yyyy-MM-dd")]: sampleEventsThreeDaysAfter,
                [format(addDays(today, 4), "yyyy-MM-dd")]: sampleEventsFourDaysAfter,
                [format(addDays(today, 5), "yyyy-MM-dd")]: sampleEventsFiveDaysAfter,
                [format(addDays(today, 6), "yyyy-MM-dd")]: sampleEventsSixDaysAfter,
                [format(addDays(today, 7), "yyyy-MM-dd")]: sampleEventsSevenDaysAfter,
                [format(addDays(today, 8), "yyyy-MM-dd")]: sampleEventsEightDaysAfter,
            };
            setEvents(sampleEventsMap);
            shouldPopulateSamples.current = false;
        }
    }, [setEvents, dateFirstLoaded]);

    return (
        <EventContext.Provider value={{ events, setEvents }}>
            <div className="h-full flex flex-col text-gray-800">
                <CalendarHeader
                    currentDate={currentDate}
                    setCurrentDate={setCurrentDate}
                />
                <CalendarGrid currentDate={currentDate} />
            </div>
        </EventContext.Provider>
    );
}
