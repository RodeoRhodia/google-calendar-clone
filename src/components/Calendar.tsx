import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { useState } from "react";

export default function Calendar() {
	const [currentDate, setCurrentDate] = useState<Date>(new Date());

    return (
        <div className="h-full flex flex-col text-gray-800">
            <CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate}/>
            <CalendarGrid currentDate={currentDate}/>
        </div>
    );
}
