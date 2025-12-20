import { useEffect, useState } from "react";
import { DayCell, type DayCellProps } from "./DayCell";
import {
    eachDayOfInterval,
    startOfWeek,
    startOfMonth,
    endOfWeek,
    endOfMonth,
    format,
    isSameMonth,
    isToday,
    isPast,
} from "date-fns";
import { useEventContext } from "../contexts/EventContext";
import { compareTimesFor12Hour } from "../utils/timeConversion";

type CalendarGridProps = {
    currentDate: Date;
};

export function CalendarGrid({ currentDate }: CalendarGridProps) {
    const { events } = useEventContext();
    const [days, setDays] = useState<DayCellProps[]>([]);

    function populateDays() {
        const visibleDatesInterval: Date[] = eachDayOfInterval({
            start: startOfWeek(startOfMonth(currentDate)),
            end: endOfWeek(endOfMonth(currentDate)),
        });

        const newDays: DayCellProps[] = visibleDatesInterval.map((date, index) => {
            const dateKey = format(date, "yyyy-MM-dd");
            const dayEvents = events[dateKey] || [];

			const allDayEvents = dayEvents.filter(event => event.type === "all-day");
			let timedEvents = dayEvents.filter(event => event.type === "timed");
			timedEvents = timedEvents.sort((event1, event2) =>
				compareTimesFor12Hour(
					event1?.startTime ?? "",
					event2?.startTime ?? ""
				)
			);
			
            let dayCell: DayCellProps = {
                dayNumber: date.getDate(),
                isNonMonthDay: !isSameMonth(date, currentDate),
                isToday: isToday(date),
                isOldDay: isPast(date) && !isToday(date),
                date,
                events: [...allDayEvents, ...timedEvents],
            };

            if (index < 7) {
                dayCell = { ...dayCell, weekName: format(date, "EEE") };
            }

            return dayCell;
        });

        setDays(newDays);
    }

    useEffect(() => {
        populateDays();
    }, [currentDate, events]);

    return (
        <div className="flex-1 min-h-0 overflow-y-auto grid grid-cols-7 auto-rows-fr bg-border-color gap-px p-px">
            {days.map((day, index) => (
                <DayCell key={index} {...day} />
            ))}
        </div>
    );
}
