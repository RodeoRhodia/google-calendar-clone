import DayCell from './DayCell';

export function CalendarGrid() {
  // Sample data matching the reference HTML
  const days = [
    // Week 1
    { weekName: 'Sun', dayNumber: 28, isNonMonthDay: true, isOldMonthDay: true, events: [
      { type: 'all-day' as const, name: 'Short', color: 'blue' as const },
      { type: 'all-day' as const, name: 'Long Event Name That Just Keeps Going', color: 'green' as const },
      { type: 'timed' as const, name: 'Event Name', time: '7am', color: 'blue' as const },
    ]},
    { weekName: 'Mon', dayNumber: 29, isNonMonthDay: true, isOldMonthDay: true },
    { weekName: 'Tue', dayNumber: 30, isNonMonthDay: true, isOldMonthDay: true },
    { weekName: 'Wed', dayNumber: 31, isNonMonthDay: true, isOldMonthDay: true },
    { weekName: 'Thu', dayNumber: 1, isOldMonthDay: true },
    { weekName: 'Fri', dayNumber: 2, isOldMonthDay: true },
    { weekName: 'Sat', dayNumber: 3, isOldMonthDay: true },

    // Week 2
    { dayNumber: 4, isOldMonthDay: true },
    { dayNumber: 5, isOldMonthDay: true },
    { dayNumber: 6, isOldMonthDay: true },
    { dayNumber: 7, isOldMonthDay: true },
    { dayNumber: 8, isOldMonthDay: true, events: [
      { type: 'all-day' as const, name: 'Short', color: 'blue' as const },
      { type: 'all-day' as const, name: 'Long Event Name That Just Keeps Going', color: 'red' as const },
      { type: 'timed' as const, name: 'Event Name', time: '7am', color: 'red' as const },
    ]},
    { dayNumber: 9, isOldMonthDay: true, events: [
      { type: 'all-day' as const, name: 'Short', color: 'green' as const },
      { type: 'timed' as const, name: 'Event Name', time: '7am', color: 'blue' as const },
      { type: 'timed' as const, name: 'Event Name', time: '8am', color: 'green' as const },
      { type: 'timed' as const, name: 'Event Name', time: '9am', color: 'blue' as const },
      { type: 'timed' as const, name: 'Event Name', time: '10am', color: 'blue' as const },
      { type: 'timed' as const, name: 'Event Name', time: '11am', color: 'red' as const },
    ], showMoreCount: 2},
    { dayNumber: 10, isOldMonthDay: true },

    // Week 3
    { dayNumber: 11, isOldMonthDay: true },
    { dayNumber: 12, isOldMonthDay: true },
    { dayNumber: 13, isOldMonthDay: true },
    { dayNumber: 14, isToday: true },
    { dayNumber: 15 },
    { dayNumber: 16 },
    { dayNumber: 17 },

    // Week 4
    { dayNumber: 18 },
    { dayNumber: 19, events: [
      { type: 'all-day' as const, name: 'Short', color: 'blue' as const },
      { type: 'all-day' as const, name: 'Long Event Name That Just Keeps Going', color: 'blue' as const },
      { type: 'timed' as const, name: 'Event Name', time: '7am', color: 'blue' as const },
    ]},
    { dayNumber: 20 },
    { dayNumber: 21 },
    { dayNumber: 22 },
    { dayNumber: 23 },
    { dayNumber: 24 },

    // Week 5
    { dayNumber: 25 },
    { dayNumber: 26 },
    { dayNumber: 27 },
    { dayNumber: 28 },
    { dayNumber: 29 },
    { dayNumber: 30 },
    { dayNumber: 1, isNonMonthDay: true },
  ];

  return (
    <div className="flex-1 min-h-0 overflow-y-auto grid grid-cols-7 grid-rows-5 bg-border-color gap-px p-px">
      {days.map((day, index) => (
        <DayCell key={index} {...day} />
      ))}
    </div>
  );
}
