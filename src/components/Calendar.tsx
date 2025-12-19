import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { EventContext, type EventsMap } from "../contexts/EventContext";

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [events, setEvents] = useLocalStorage<EventsMap>("EVENTS", {});

    return (
        <EventContext.Provider value={{ events, setEvents }}>
            <div className="h-full flex flex-col text-gray-800">
                <CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate}/>
                <CalendarGrid currentDate={currentDate}/>
            </div>
        </EventContext.Provider>
    );
}
