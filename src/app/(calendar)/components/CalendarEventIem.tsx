import { eventDataType } from '../types/calendar';

interface EventItemProps {
  event: eventDataType;
  onClick: (event: eventDataType) => void;
}

const CalendarEventItem: React.FC<EventItemProps> = ({ event, onClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick(event);
  };

  return (
    <div
      className="duration-400 mt-1 flex gap-1 rounded-md bg-slate-200 p-1 text-sm hover:bg-blue-300"
      onClick={handleClick}
    >
      <span className="font-bold">
        {event.name} : {event.title}
      </span>
    </div>
  );
};

export default CalendarEventItem;
