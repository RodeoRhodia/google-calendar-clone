import { format, addMonths, subMonths } from "date-fns";

type CalendarHeaderProps = {
    currentDate: Date;
    setCurrentDate: (date: Date | ((prevDate: Date) => Date)) => void;
};

export function CalendarHeader({ currentDate, setCurrentDate,}: CalendarHeaderProps) {
    const displayMonthAndYear = format(currentDate, "LLLL yyyy");

    function showPreviousMonth() {
        setCurrentDate((currentMonth) => {
            return subMonths(currentMonth, 1);
        });
    }

    function showNextMonth() {
        setCurrentDate((currentMonth) => {
            return addMonths(currentMonth, 1);
        });
    }

	function jumpToCurrentMonth() {
		setCurrentDate(new Date());
	}

    return (
        <div className="p-4 w-full flex items-center justify-between">
            <div className="flex items-center">
                <button onClick={jumpToCurrentMonth} className="bg-none border border-border-color rounded px-4 py-2 text-base cursor-pointer transition-colors duration-250 text-gray-800 hover:bg-gray-100 mr-2">
                    Today
                </button>
                <div className="mr-2">
                    <button onClick={showPreviousMonth} className="cursor-pointer bg-none border-none text-xl w-8 h-8 p-0 mr-2 text-center rounded-full transition-colors duration-250 text-gray-800 hover:bg-gray-100">
                        &lt;
                    </button>
                    <button onClick={showNextMonth} className="cursor-pointer bg-none border-none text-xl w-8 h-8 p-0 text-center rounded-full transition-colors duration-250 text-gray-800 hover:bg-gray-100">
                        &gt;
                    </button>
                </div>
                <span className="text-2xl font-bold">{displayMonthAndYear}</span>
            </div>
            <a
                href="https://github.com/RodeoRhodia/google-calendar-clone"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group p-2 rounded-full transition-colors duration-250 hover:bg-gray-100"
                aria-label="Built By Lanz - View on GitHub"
            >
                <svg
                    className="w-6 h-6 text-gray-800"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-3 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Built By Lanz
                </span>
            </a>
        </div>
    );
}
