/**
 * Converts 24-hour time format to 12-hour format with am/pm
 * @param time24 - Time in 24-hour format (HH:mm) e.g., "13:00", "09:30"
 * @returns Time in 12-hour format (h:mmam/pm) e.g., "1:00pm", "9:30am"
 */
export function convertTo12Hour(time24: string): string {
    if (!time24 || !time24.includes(":")) {
        console.warn(`Invalid 24-hour time format: ${time24}`);
        return time24; // Return as-is to prevent crashes
    }

    const [hoursStr, minutes] = time24.split(":");
    const hours24 = parseInt(hoursStr, 10);

    // Determine am/pm
    const period = hours24 >= 12 ? "pm" : "am";

    // Convert to 12-hour format
    // 0 -> 12, 1-11 stay same, 12 stays 12, 13-23 -> 1-11
    let hours12 = hours24 % 12;
    if (hours12 === 0) hours12 = 12;

    return `${hours12}:${minutes}${period}`;
}

/**
 * Converts 12-hour time format with am/pm to 24-hour format
 * @param time12 - Time in 12-hour format (h:mmam/pm) e.g., "1:00pm", "9:30am"
 * @returns Time in 24-hour format (HH:mm) e.g., "13:00", "09:30"
 */
export function convertTo24Hour(time12: string): string {
    if (!time12 || !time12.match(/\d+:\d+(am|pm)$/)) {
        console.warn(`Invalid 12-hour time format: ${time12}`);
        return "00:00"; // Safe default
    }

    // Extract am/pm from the end
    const isPM = time12.endsWith("pm");
    const timeWithoutPeriod = time12.replace(/am|pm$/, "");

    const [hoursStr, minutes] = timeWithoutPeriod.split(":");
    let hours = parseInt(hoursStr, 10);

    // Convert to 24-hour format
    if (isPM) {
        if (hours !== 12) hours += 12; // 1pm->13, but 12pm stays 12
    } else {
        if (hours === 12) hours = 0; // 12am->0, but 1am stays 1
    }

    // Pad hours with leading zero if needed
    const hours24 = hours.toString().padStart(2, "0");

    return `${hours24}:${minutes}`;
}

/**
 * Compares two 12-hour format times for sorting
 * @param time1 - First time in 12-hour format
 * @param time2 - Second time in 12-hour format
 * @returns Negative if time1 < time2, 0 if equal, positive if time1 > time2
 */
export function compareTimesFor12Hour(time1: string, time2: string): number {
    // Convert both to 24-hour format for accurate comparison
    const time1_24 = convertTo24Hour(time1);
    const time2_24 = convertTo24Hour(time2);

    // Use lexicographic comparison (works because 24-hour is HH:mm)
    return time1_24.localeCompare(time2_24);
}

/**
 * Validates that start time is strictly before end time (for timed events)
 * @param startTime - Start time in 24-hour format (HH:mm) e.g., "13:00", "09:30"
 * @param endTime - End time in 24-hour format (HH:mm) e.g., "14:00", "10:30"
 * @returns true if start time is before end time, false otherwise (including if they're equal)
 */
export function isStartTimeBeforeEndTime(startTime: string, endTime: string): boolean {
    if (!startTime || !endTime) {
        return false;
    }

    // Convert to 12-hour format first (since that's what we'll be storing)
    const startTime12 = convertTo12Hour(startTime);
    const endTime12 = convertTo12Hour(endTime);

    // Convert back to 24-hour for comparison
    const start24 = convertTo24Hour(startTime12);
    const end24 = convertTo24Hour(endTime12);

    // Start time must be strictly less than end time (not equal)
    return start24 < end24;
}
