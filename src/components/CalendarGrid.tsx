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

            let dayCell: DayCellProps = {
                dayNumber: date.getDate(),
                isNonMonthDay: !isSameMonth(date, currentDate),
                isToday: isToday(date),
                isOldDay: isPast(date) && !isToday(date),
                date,
                events: dayEvents,
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
