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
	startOfDay
} from "date-fns";

type CalendarGridProps = {
    currentDate: Date;
};

export function CalendarGrid({ currentDate }: CalendarGridProps) {
    // Sample data matching the reference HTML
    const daysFixed: DayCellProps[] = [
        // Week 1
        {
            weekName: "Sun",
            dayNumber: 28,
            isNonMonthDay: true,
            isOldDay: true,
            events: [
                {
                    type: "all-day" as const,
                    name: "Short",
                    color: "blue" as const,
                },
                {
                    type: "all-day" as const,
                    name: "Long Event Name That Just Keeps Going",
                    color: "green" as const,
                },
                {
                    type: "timed" as const,
                    name: "Event Name",
                    time: "7am",
                    color: "blue" as const,
                },
            ],
        },
        {
            weekName: "Mon",
            dayNumber: 29,
            isNonMonthDay: true,
            isOldDay: true,
        },
        {
            weekName: "Tue",
            dayNumber: 30,
            isNonMonthDay: true,
            isOldDay: true,
        },
        {
            weekName: "Wed",
            dayNumber: 31,
            isNonMonthDay: true,
            isOldDay: true,
        },
        { weekName: "Thu", dayNumber: 1, isOldDay: true },
        { weekName: "Fri", dayNumber: 2, isOldDay: true },
        { weekName: "Sat", dayNumber: 3, isOldDay: true },

        // Week 2
        { dayNumber: 4, isOldDay: true },
        { dayNumber: 5, isOldDay: true },
        { dayNumber: 6, isOldDay: true },
        { dayNumber: 7, isOldDay: true },
        {
            dayNumber: 8,
            isOldDay: true,
            events: [
                {
                    type: "all-day" as const,
                    name: "Short",
                    color: "blue" as const,
                },
                {
                    type: "all-day" as const,
                    name: "Long Event Name That Just Keeps Going",
                    color: "red" as const,
                },
                {
                    type: "timed" as const,
                    name: "Event Name",
                    time: "7am",
                    color: "red" as const,
                },
            ],
        },
        {
            dayNumber: 9,
            isOldDay: true,
            events: [
                {
                    type: "all-day" as const,
                    name: "Short",
                    color: "green" as const,
                },
                {
                    type: "timed" as const,
                    name: "Event Name",
                    time: "7am",
                    color: "blue" as const,
                },
                {
                    type: "timed" as const,
                    name: "Event Name",
                    time: "8am",
                    color: "green" as const,
                },
                {
                    type: "timed" as const,
                    name: "Event Name",
                    time: "9am",
                    color: "blue" as const,
                },
                {
                    type: "timed" as const,
                    name: "Event Name",
                    time: "10am",
                    color: "blue" as const,
                },
                {
                    type: "timed" as const,
                    name: "Event Name",
                    time: "11am",
                    color: "red" as const,
                },
            ],
            showMoreCount: 2,
        },
        { dayNumber: 10, isOldDay: true },

        // Week 3
        { dayNumber: 11, isOldDay: true },
        { dayNumber: 12, isOldDay: true },
        { dayNumber: 13, isOldDay: true },
        { dayNumber: 14, isToday: true },
        { dayNumber: 15 },
        { dayNumber: 16 },
        { dayNumber: 17 },

        // Week 4
        { dayNumber: 18 },
        {
            dayNumber: 19,
            events: [
                {
                    type: "all-day" as const,
                    name: "Short",
                    color: "blue" as const,
                },
                {
                    type: "all-day" as const,
                    name: "Long Event Name That Just Keeps Going",
                    color: "blue" as const,
                },
                {
                    type: "timed" as const,
                    name: "Event Name",
                    time: "7am",
                    color: "blue" as const,
                },
            ],
        },
        { dayNumber: 20 },
        { dayNumber: 21 },
        { dayNumber: 22 },
        { dayNumber: 23 },
        { dayNumber: 24 },

        // Week 5
        { dayNumber: 25 },
        { dayNumber: 26 },
        { dayNumber: 27 },
        { dayNumber: 28 },
        { dayNumber: 29 },
        { dayNumber: 30 },
        { dayNumber: 1, isNonMonthDay: true },
    ];

    const visibleDatesInterval: Date[] = eachDayOfInterval({
        start: startOfWeek(startOfMonth(currentDate)),
        end: endOfWeek(endOfMonth(currentDate)),
    });

    let days: DayCellProps[] = visibleDatesInterval.map((date, index) => {
        let dayCell: DayCellProps = {
            dayNumber: date.getDate(),
            isNonMonthDay: !isSameMonth(date, currentDate),
			isToday: isToday(date),
			isOldDay: isPast(date) && !isToday(date)
        };

        if (index < 7) {
            dayCell = { ...dayCell, weekName: format(date, "EEE") };
        }

        return dayCell;
    });

    // days = daysFixed;

    return (
        <div className="flex-1 min-h-0 overflow-y-auto grid grid-cols-7 auto-rows-fr bg-border-color gap-px p-px">
            {days.map((day, index) => (
                <DayCell key={index} {...day} />
            ))}
        </div>
    );
}
