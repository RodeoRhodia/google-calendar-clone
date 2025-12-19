import { useEffect, useRef, useState } from "react";

export function useLocalStorage<T>(
    key: string,
    initialValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
    // Track if update came from an event to prevent ping-pong loops
    const isFromEvent = useRef(false);

    const [value, setValue] = useState<T>(() => {
        const localValue = localStorage.getItem(key);
        if (localValue == null) {
            return typeof initialValue === "function"
                ? (initialValue as () => T)()
                : initialValue;
        }
        return JSON.parse(localValue) as T;
    });

    useEffect(() => {
        if (value === undefined) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
            // Only dispatch if this update was NOT from an event
            if (!isFromEvent.current) {
                window.dispatchEvent(
                    new CustomEvent("localStorageUpdate", { detail: { key } })
                );
            }
            isFromEvent.current = false;
        }
    }, [value, key]);

    // Listen for updates from other components
    useEffect(() => {
        const handleStorageUpdate = (e: Event) => {
            const customEvent = e as CustomEvent<{ key: string }>;
            if (customEvent.detail.key === key) {
                const localValue = localStorage.getItem(key);
                if (localValue != null) {
                    isFromEvent.current = true;
                    setValue(JSON.parse(localValue) as T);
                }
            }
        };

        window.addEventListener("localStorageUpdate", handleStorageUpdate);
        return () => {
            window.removeEventListener("localStorageUpdate", handleStorageUpdate);
        };
    }, [key]);

    return [value, setValue];
}
