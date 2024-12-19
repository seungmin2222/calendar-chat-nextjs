export default function CalendarWeekdaysHeader() {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="grid grid-cols-7 gap-1">
      {daysOfWeek.map((dayName) => (
        <div key={dayName} className="text-center font-bold text-gray-700">
          {dayName}
        </div>
      ))}
    </div>
  );
}
