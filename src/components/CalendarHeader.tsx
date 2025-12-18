export default function CalendarHeader() {
  return (
    <div className="p-4 w-full flex items-center">
      <button className="bg-none border border-border-color rounded px-4 py-2 text-base cursor-pointer transition-colors duration-250 text-gray-800 hover:bg-gray-100 mr-2">
        Today
      </button>
      <div className="mr-2">
        <button className="cursor-pointer bg-none border-none text-xl w-8 h-8 p-0 text-center rounded-full transition-colors duration-250 text-gray-800 hover:bg-gray-100 -mr-2">
          &lt;
        </button>
        <button className="cursor-pointer bg-none border-none text-xl w-8 h-8 p-0 text-center rounded-full transition-colors duration-250 text-gray-800 hover:bg-gray-100">
          &gt;
        </button>
      </div>
      <span className="text-2xl font-bold">June 2023</span>
    </div>
  );
}
