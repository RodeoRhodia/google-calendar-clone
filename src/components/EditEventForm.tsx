import { createPortal } from "react-dom";
import { useEventContext, type Event } from "../contexts/EventContext";

interface EditEventFormProps {
    isOpen: boolean;
    onClose: () => void;
    date: string;
    event: Event;
}

export function EditEventForm({ isOpen, onClose, date, event }: EditEventFormProps) {
    const { setEvents } = useEventContext();
    const dateKey = new Date(date).toISOString().split("T")[0];

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const name = (formData.get("name") as string).trim();
        const allDay = formData.get("all-day") === "on";
        const startTime = formData.get("start-time") as string;
        const endTime = formData.get("end-time") as string;
        const color = formData.get("color") as "blue" | "red" | "green";

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

        const updatedEvent: Event = {
            id: event.id,
            type: allDay ? "all-day" : "timed",
            name,
            color,
            ...(allDay ? {} : { startTime, endTime }),
        };

        setEvents((prev) => ({
            ...prev,
            [dateKey]: prev[dateKey].map((e) =>
                e.id === event.id ? updatedEvent : e
            ),
        }));

        onClose();
    }

    function handleDelete() {
        console.log("Deleted");
        console.log("event.id:", event.id);
        console.log("dateKey:", dateKey);
        console.log("Current events:", JSON.stringify(localStorage.getItem("EVENTS")));

        setEvents((prev) => {
            console.log("prev:", prev);
            console.log("prev[dateKey]:", prev[dateKey]);

            if (!prev[dateKey]) {
                console.error("No events found for dateKey:", dateKey);
                return prev;
            }

            const filtered = prev[dateKey].filter((e) => e.id !== event.id);
            console.log("Filtered events:", filtered);

            return {
                ...prev,
                [dateKey]: filtered,
            };
        });
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
                    <div>Edit Event</div>
                    <small className="text-gray-600">{date}</small>
                    <button
                        className="cursor-pointer bg-none border-none text-3xl w-8 h-8 text-center rounded-full hover:bg-gray-200"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
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
                            defaultValue={event.name}
                            className="py-1 px-2 rounded-md outline outline-gray-400 focus:outline-2 focus:outline-blue-500"
                        />
                    </div>
                    <div className="flex flex-row items-center mb-4">
                        <input
                            type="checkbox"
                            name="all-day"
                            id="all-day"
                            defaultChecked={event.type === "all-day"}
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
                                defaultValue={event.startTime}
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
                                defaultValue={event.endTime}
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
                                    defaultChecked={event.color === "blue"}
                                    className="absolute opacity-0 -left-[9999px]"
                                />
                                <span className="sr-only">Blue</span>
                            </label>
                            <label className="before:content-[''] before:block before:w-7 before:h-7 before:rounded before:cursor-pointer before:opacity-25 has-[:checked]:before:opacity-100 has-[:focus]:before:outline has-[:focus]:before:outline-1 has-[:focus]:before:outline-black before:bg-red-calendar mr-2">
                                <input
                                    type="radio"
                                    name="color"
                                    value="red"
                                    defaultChecked={event.color === "red"}
                                    className="absolute opacity-0 -left-[9999px]"
                                />
                                <span className="sr-only">Red</span>
                            </label>
                            <label className="before:content-[''] before:block before:w-7 before:h-7 before:rounded before:cursor-pointer before:opacity-25 has-[:checked]:before:opacity-100 has-[:focus]:before:outline has-[:focus]:before:outline-1 has-[:focus]:before:outline-black before:bg-green-calendar">
                                <input
                                    type="radio"
                                    name="color"
                                    value="green"
                                    defaultChecked={event.color === "green"}
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
                            Edit
                        </button>
                        <button
                            className="border border-red-calendar bg-red-50 text-red-950 hover:bg-red-100 rounded px-4 py-2 text-base cursor-pointer"
                            type="button"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}
