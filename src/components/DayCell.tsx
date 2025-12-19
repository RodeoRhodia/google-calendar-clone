import { useState } from "react";
import { format } from "date-fns";
import { DayHeader } from "./DayHeader";
import { AllDayEvent, TimedEvent } from "./Event";
import { EditEventForm } from "./EditEventForm";
import { type Event } from "../contexts/EventContext";

export interface DayCellProps {
    weekName?: string;
    dayNumber: number;
    isToday?: boolean;
    isNonMonthDay?: boolean;
    isOldDay?: boolean;
    events?: Event[];
    showMoreCount?: number;
    date: Date;
}

export function DayCell({
    weekName,
    dayNumber,
    isToday = false,
    isNonMonthDay = false,
    isOldDay = false,
    events = [],
    showMoreCount,
    date,
}: DayCellProps) {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const dateString = format(date, "M/d/yy");

    return (
        <div
            className={`bg-white p-1 overflow-hidden flex flex-col group ${
                isNonMonthDay ? "opacity-75" : ""
            }`}
        >
            <div className={isOldDay ? "opacity-50" : ""}>
                <DayHeader
                    weekName={weekName}
                    dayNumber={dayNumber}
                    isToday={isToday}
                    date={date}
                />
            </div>
            {events.length > 0 && (
                <div
                    className={`flex flex-col gap-2 grow overflow-hidden ${
                        isOldDay ? "opacity-50" : ""
                    }`}
                >
                    {events.map((event) =>
                        event.type === "all-day" ? (
                            <AllDayEvent
                                key={event.id}
                                name={event.name}
                                color={event.color}
                                onClick={() => setSelectedEvent(event)}
                            />
                        ) : (
                            <TimedEvent
                                key={event.id}
                                name={event.name}
                                startTime={event.startTime!}
                                color={event.color}
                                onClick={() => setSelectedEvent(event)}
                            />
                        )
                    )}
                </div>
            )}
            {showMoreCount && (
                <button className="border-none bg-none font-bold text-gray-600 cursor-pointer w-full">
                    +{showMoreCount} More
                </button>
            )}
            {selectedEvent && (
                <EditEventForm
                    isOpen={true}
                    onClose={() => setSelectedEvent(null)}
                    date={dateString}
                    event={selectedEvent}
                />
            )}
        </div>
    );
}
