import { createContext, useContext } from "react";

export interface Event {
    id: string;
    type: "all-day" | "timed";
    name: string;
    color: "blue" | "red" | "green";
    startTime?: string;
    endTime?: string;
}

export type EventsMap = Record<string, Event[]>;

interface EventContextType {
    events: EventsMap;
    setEvents: React.Dispatch<React.SetStateAction<EventsMap>>;
}

export const EventContext = createContext<EventContextType | null>(null);

export function useEventContext() {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("useEventContext must be used within an EventProvider");
    }
    return context;
}
