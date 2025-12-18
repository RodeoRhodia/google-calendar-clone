import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';

export default function Calendar() {
  return (
    <div className="h-full flex flex-col text-gray-800">
      <CalendarHeader />
      <CalendarGrid />
    </div>
  );
}
