interface AllDayEventProps {
    name: string;
    color: "blue" | "red" | "green";
}

export function AllDayEvent({ name, color }: AllDayEventProps) {
    const colorClasses = {
        blue: "bg-blue-calendar",
        red: "bg-red-calendar",
        green: "bg-green-calendar",
    };

    return (
        <button
            className={`flex items-center overflow-hidden whitespace-nowrap cursor-pointer shrink-0 bg-none w-full border-none text-base p-0 text-white px-1 py-0.5 rounded ${colorClasses[color]}`}
        >
            <div className="overflow-hidden">{name}</div>
        </button>
    );
}

interface TimedEventProps {
    name: string;
    time: string;
    color: "blue" | "red" | "green";
}

export function TimedEvent({ name, time, color }: TimedEventProps) {
    const colorClasses = {
        blue: "bg-blue-calendar",
        red: "bg-red-calendar",
        green: "bg-green-calendar",
    };

    return (
        <button className="flex items-center overflow-hidden whitespace-nowrap cursor-pointer shrink-0 bg-none w-full border-none text-base p-0">
            <div
                className={`rounded-full w-2 h-2 shrink-0 mr-2 ${colorClasses[color]}`}
            />
            <div className="text-gray-500 mr-2">{time}</div>
            <div className="text-gray-800">{name}</div>
        </button>
    );
}
