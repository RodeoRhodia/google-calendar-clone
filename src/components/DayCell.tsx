import { DayHeader } from "./DayHeader";
import { AllDayEvent, TimedEvent } from "./Event";

interface Event {
    type: "all-day" | "timed";
    name: string;
    color: "blue" | "red" | "green";
    time?: string;
}

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
                    {events.map((event, index) =>
                        event.type === "all-day" ? (
                            <AllDayEvent
                                key={index}
                                name={event.name}
                                color={event.color}
                            />
                        ) : (
                            <TimedEvent
                                key={index}
                                name={event.name}
                                time={event.time!}
                                color={event.color}
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
        </div>
    );
}
