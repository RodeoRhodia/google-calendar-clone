interface DayHeaderProps {
    weekName?: string;
    dayNumber: number;
    isToday?: boolean;
}

export function DayHeader({
    weekName,
    dayNumber,
    isToday = false,
}: DayHeaderProps) {
    return (
        <div className="mb-1 flex flex-col items-center">
            {weekName && (
                <div className="uppercase text-xs font-bold text-gray-500">
                    {weekName}
                </div>
            )}
            <div
                className={`text-sm w-6 h-6 flex justify-center items-center ${
                    isToday ? "bg-blue-calendar rounded-full text-white" : ""
                }`}
            >
                {dayNumber}
            </div>
        </div>
    );
}
