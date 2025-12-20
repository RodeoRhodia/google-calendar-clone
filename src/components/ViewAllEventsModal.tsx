import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { type Event } from "../contexts/EventContext";
import { AllDayEvent, TimedEvent } from "./Event";

interface ViewAllEventsModalProps {
    isOpen: boolean;
    onClose: () => void;
    date: string;
    events: Event[];
    onEventClick: (event: Event) => void;
}

export function ViewAllEventsModal({
    isOpen,
    onClose,
    date,
    events,
    onEventClick,
}: ViewAllEventsModalProps) {
    const [isClosing, setIsClosing] = useState(false);

    function handleClose() {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 250);
    }

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                handleClose();
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    function handleEventClick(event: Event) {
        handleClose();
        setTimeout(() => {
            onEventClick(event);
        }, 250);
    }

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div
                className={`bg-black/50 w-full h-full fixed modal-overlay ${isClosing ? "closing" : ""}`}
                onClick={handleClose}
            />
            <div
                className={`bg-white rounded-lg p-4 z-10 min-w-[300px] max-w-[95%] max-h-[80vh] overflow-y-auto modal-content ${isClosing ? "closing" : ""}`}
            >
                <div className="text-2xl mb-4 flex justify-between items-center">
                    <div>{date}</div>
                    <button
                        className="cursor-pointer bg-none border-none text-3xl w-8 h-8 text-center rounded-full hover:bg-gray-200"
                        onClick={handleClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    {events.map((event) =>
                        event.type === "all-day" ? (
                            <AllDayEvent
                                key={event.id}
                                name={event.name}
                                color={event.color}
                                onClick={() => handleEventClick(event)}
                            />
                        ) : (
                            <TimedEvent
                                key={event.id}
                                name={event.name}
                                startTime={event.startTime!}
                                color={event.color}
                                onClick={() => handleEventClick(event)}
                            />
                        )
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}
