import { useState } from "react";
import { format } from "date-fns";
import { DayHeader } from "./DayHeader";
import { AllDayEvent, TimedEvent } from "./Event";
import { AddEventForm } from "./AddEventForm";
import { EditEventForm } from "./EditEventForm";
import { ViewAllEventsModal } from "./ViewAllEventsModal";
import { OverflowContainer } from "./OverflowContainer";
import { type Event } from "../contexts/EventContext";

export interface DayCellProps {
    weekName?: string;
    dayNumber: number;
    isToday?: boolean;
    isNonMonthDay?: boolean;
    isOldDay?: boolean;
    events?: Event[];
    date: Date;
}

export function DayCell({
    weekName,
    dayNumber,
    isToday = false,
    isNonMonthDay = false,
    isOldDay = false,
    events = [],
    date,
}: DayCellProps) {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showAllEvents, setShowAllEvents] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const dateString = format(date, "M/d/yy");

    function handleCellClick(e: React.MouseEvent<HTMLDivElement>) {
        // Don't trigger if clicking on a button (events or overflow button)
        if ((e.target as HTMLElement).closest("button")) {
            return;
        }
        setIsAddModalOpen(true);
    }

    function handleEventClick(event: Event) {
        setSelectedEvent(event);
    }

    function handleViewAllEventsClick() {
        setShowAllEvents(true);
    }

    function handleViewAllEventsClose() {
        setShowAllEvents(false);
    }

    function handleEventFromModalClick(event: Event) {
        setShowAllEvents(false);
        setSelectedEvent(event);
    }

    return (
        <div
            className={`bg-white p-1 overflow-hidden flex flex-col group ${
                isNonMonthDay ? "opacity-75" : ""
            }`}
            onClick={handleCellClick}
        >
            <div className={isOldDay ? "opacity-50" : ""}>
                <DayHeader
                    weekName={weekName}
                    dayNumber={dayNumber}
                    isToday={isToday}
                />
            </div>
            {events.length > 0 && (
                <div
                    className={`flex flex-col grow overflow-hidden ${
                        isOldDay ? "opacity-50" : ""
                    }`}
                >
                    <OverflowContainer
                        items={events}
                        getKey={(event) => event.id}
                        className="flex flex-col gap-2 overflow-hidden"
                        renderItem={(event) =>
                            event.type === "all-day" ? (
                                <AllDayEvent
                                    name={event.name}
                                    color={event.color}
                                    onClick={() => handleEventClick(event)}
                                />
                            ) : (
                                <TimedEvent
                                    name={event.name}
                                    startTime={event.startTime!}
                                    color={event.color}
                                    onClick={() => handleEventClick(event)}
                                />
                            )
                        }
                        renderOverflow={(overflowAmount) =>
                            overflowAmount > 0 ? (
                                <button
                                    className="border-none bg-transparent font-bold text-gray-600 w-full text-sm hover:bg-gray-100 rounded py-1"
                                    onClick={handleViewAllEventsClick}
                                >
                                    +{overflowAmount} More
                                </button>
                            ) : null
                        }
                    />
                </div>
            )}
            {selectedEvent && (
                <EditEventForm
                    isOpen={true}
                    onClose={() => setSelectedEvent(null)}
                    date={dateString}
                    event={selectedEvent}
                />
            )}
            <ViewAllEventsModal
                isOpen={showAllEvents}
                onClose={handleViewAllEventsClose}
                date={dateString}
                events={events}
                onEventClick={handleEventFromModalClick}
            />
            <AddEventForm
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                date={dateString}
            />
        </div>
    );
}
