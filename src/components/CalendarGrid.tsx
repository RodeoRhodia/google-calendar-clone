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

type CalendarGridProps = {
    currentDate: Date;
};

export function CalendarGrid({ currentDate }: CalendarGridProps) {
    const visibleDatesInterval: Date[] = eachDayOfInterval({
        start: startOfWeek(startOfMonth(currentDate)),
        end: endOfWeek(endOfMonth(currentDate)),
    });

    let days: DayCellProps[] = visibleDatesInterval.map((date, index) => {
        let dayCell: DayCellProps = {
            dayNumber: date.getDate(),
            isNonMonthDay: !isSameMonth(date, currentDate),
			isToday: isToday(date),
			isOldDay: isPast(date) && !isToday(date),
            date,
        };

        if (index < 7) {
            dayCell = { ...dayCell, weekName: format(date, "EEE") };
        }

        return dayCell;
    });

    return (
        <div className="flex-1 min-h-0 overflow-y-auto grid grid-cols-7 auto-rows-fr bg-border-color gap-px p-px">
            {days.map((day, index) => (
                <DayCell key={index} {...day} />
            ))}
        </div>
    );
}
