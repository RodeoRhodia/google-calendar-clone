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
        <div className="p-4 w-full flex items-center">
            <button onClick={jumpToCurrentMonth} className="bg-none border border-border-color rounded px-4 py-2 text-base cursor-pointer transition-colors duration-250 text-gray-800 hover:bg-gray-100 mr-2">
                Today
            </button>
            <div className="mr-2">
                <button onClick={showPreviousMonth} className="cursor-pointer bg-none border-none text-xl w-8 h-8 p-0 text-center rounded-full transition-colors duration-250 text-gray-800 hover:bg-gray-100 -mr-2">
                    &lt;
                </button>
                <button onClick={showNextMonth} className="cursor-pointer bg-none border-none text-xl w-8 h-8 p-0 text-center rounded-full transition-colors duration-250 text-gray-800 hover:bg-gray-100">
                    &gt;
                </button>
            </div>
            <span className="text-2xl font-bold">{displayMonthAndYear}</span>
        </div>
    );
}
