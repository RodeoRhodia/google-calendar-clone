import { useEffect, useState } from "react";

export function useLocalStorage<T>(
    key: string,
    initialValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
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
        }
    }, [value, key]);

    return [value, setValue];
}
