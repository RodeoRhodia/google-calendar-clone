import { createPortal } from "react-dom";

interface AddEventFormProps {
    isOpen: boolean;
    onClose: () => void;
    date: string;
}

export function AddEventForm({ isOpen, onClose, date }: AddEventFormProps) {
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
                <form onSubmit={(e) => e.preventDefault()}>
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
