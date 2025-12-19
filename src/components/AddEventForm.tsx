import { createPortal } from "react-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AddEventFormProps {
    isOpen: boolean;
    onClose: () => void;
    date: string;
}

interface Event {
    type: "all-day" | "timed";
    name: string;
    color: "blue" | "red" | "green";
    startTime?: string;
    endTime?: string;
}

type EventsMap = Record<string, Event[]>;

export function AddEventForm({ isOpen, onClose, date }: AddEventFormProps) {
    const [, setEvents] = useLocalStorage<EventsMap>("EVENTS", {});

    function submitEventForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const name = (formData.get("name") as string).trim();
        const allDay = formData.get("all-day") === "on";
        const startTime = formData.get("start-time") as string;
        const endTime = formData.get("end-time") as string;
        const color = formData.get("color") as "blue" | "red" | "green";

        // Validation
        if (!name) {
            alert("Name is required");
            return;
        }

        if (!allDay) {
            if (!startTime) {
                alert("Start time is required");
                return;
            }
            if (!endTime) {
                alert("End time is required");
                return;
            }
        }

        // Create event object
        const event: Event = {
            type: allDay ? "all-day" : "timed",
            name,
            color,
            ...(allDay ? {} : { startTime, endTime }),
        };

        // Format date as YYYY-MM-DD
        const dateKey = new Date(date).toISOString().split("T")[0];

        // Console log all fields
        console.log("Form fields:", {
            name,
            allDay,
            startTime,
            endTime,
            color,
        });
        console.log("Event object:", event);
        console.log("Date key:", dateKey);

        // Save to localStorage
        setEvents((prev) => ({
            ...prev,
            [dateKey]: [...(prev[dateKey] || []), event],
        }));

        console.log("Event saved to localStorage!");
        onClose();
    }

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div
                className="bg-black/50 w-full h-full fixed"
                onClick={onClose}
            />
            <div className="bg-white rounded-lg p-4 z-10 min-w-[300px] max-w-[95%]">
                <div className="text-2xl mb-6 flex justify-between items-center">
                    <div>Add Event</div>
                    <small className="text-gray-600">{date}</small>
                    <button
                        className="cursor-pointer bg-none border-none text-3xl w-8 h-8 text-center rounded-full hover:bg-gray-200"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={submitEventForm}>
                    <div className="flex flex-col mb-4">
                        <label
                            htmlFor="name"
                            className="font-bold text-xs text-gray-500"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="py-1 px-2 rounded-md outline outline-gray-400 focus:outline-2 focus:outline-blue-500"
                        />
                    </div>
                    <div className="flex flex-row items-center mb-4">
                        <input
                            type="checkbox"
                            name="all-day"
                            id="all-day"
                            className="cursor-pointer"
                        />
                        <label
                            htmlFor="all-day"
                            className="pl-2 cursor-pointer font-bold text-xs text-gray-500"
                        >
                            All Day?
                        </label>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col mb-4 flex-grow mr-2">
                            <label
                                htmlFor="start-time"
                                className="font-bold text-xs text-gray-500"
                            >
                                Start Time
                            </label>
                            <input
                                type="time"
                                name="start-time"
                                id="start-time"
                                className="py-1 px-2"
                            />
                        </div>
                        <div className="flex flex-col mb-4 flex-grow">
                            <label
                                htmlFor="end-time"
                                className="font-bold text-xs text-gray-500"
                            >
                                End Time
                            </label>
                            <input
                                type="time"
                                name="end-time"
                                id="end-time"
                                className="py-1 px-2"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="font-bold text-xs text-gray-500">
                            Color
                        </label>
                        <div className="flex">
                            <label className="before:content-[''] before:block before:w-7 before:h-7 before:rounded before:cursor-pointer before:opacity-25 has-[:checked]:before:opacity-100 has-[:focus]:before:outline has-[:focus]:before:outline-1 has-[:focus]:before:outline-black before:bg-blue-calendar mr-2">
                                <input
                                    type="radio"
                                    name="color"
                                    value="blue"
                                    defaultChecked
                                    className="absolute opacity-0 -left-[9999px]"
                                />
                                <span className="sr-only">Blue</span>
                            </label>
                            <label className="before:content-[''] before:block before:w-7 before:h-7 before:rounded before:cursor-pointer before:opacity-25 has-[:checked]:before:opacity-100 has-[:focus]:before:outline has-[:focus]:before:outline-1 has-[:focus]:before:outline-black before:bg-red-calendar mr-2">
                                <input
                                    type="radio"
                                    name="color"
                                    value="red"
                                    className="absolute opacity-0 -left-[9999px]"
                                />
                                <span className="sr-only">Red</span>
                            </label>
                            <label className="before:content-[''] before:block before:w-7 before:h-7 before:rounded before:cursor-pointer before:opacity-25 has-[:checked]:before:opacity-100 has-[:focus]:before:outline has-[:focus]:before:outline-1 has-[:focus]:before:outline-black before:bg-green-calendar">
                                <input
                                    type="radio"
                                    name="color"
                                    value="green"
                                    className="absolute opacity-0 -left-[9999px]"
                                />
                                <span className="sr-only">Green</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex">
                        <button
                            className="border border-green-calendar bg-green-50 text-green-950 hover:bg-green-100 rounded px-4 py-2 text-base cursor-pointer mr-2"
                            type="submit"
                        >
                            Add
                        </button>
                        {/* <button
                            className="border border-red-calendar bg-red-50 text-red-950 hover:bg-red-100 rounded px-4 py-2 text-base cursor-pointer"
                            type="button"
                        >
                            Delete
                        </button> */}
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}
