import { useState } from "react";
import { format } from "date-fns";
import { AddEventForm } from "./AddEventForm";

interface DayHeaderProps {
    weekName?: string;
    dayNumber: number;
    isToday?: boolean;
    date: Date;
}

export function DayHeader({
    weekName,
    dayNumber,
    isToday = false,
    date,
}: DayHeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="mb-1 flex flex-col items-center relative">
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
                <button
                    className="opacity-0 absolute bg-none border-none rounded-full w-6 h-6 flex justify-center items-center right-0 top-0 text-xl cursor-pointer text-gray-800 hover:bg-gray-100 group-hover:opacity-100 focus:opacity-100"
                    onClick={() => setIsModalOpen(true)}
                >
                    +
                </button>
            </div>
            <AddEventForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                date={format(date, "M/d/yy")}
            />
        </>
    );
}
