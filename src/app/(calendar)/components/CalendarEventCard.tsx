import { EventDataObjectType } from '../types/calendar';

export default function CalendarEventCard({ event }: EventDataObjectType) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 transition-all duration-[400ms] hover:border-gray-200 hover:shadow-lg">
      <div className="absolute inset-0 -left-80 -top-72 h-96 w-96 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 blur-3xl transition-all duration-[400ms] group-hover:translate-x-12" />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-tight text-gray-900">
            {event.title}
          </h3>
          <div className="rounded-full bg-gray-50 px-3 py-1 text-sm font-medium text-gray-600">
            {event.name}
          </div>
        </div>
        <div className="mb-4 rounded-lg bg-gradient-to-r from-gray-50 to-white p-3">
          <p className="text-sm leading-relaxed text-gray-600">
            {event.description}
          </p>
        </div>
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="h-1 w-1 rounded-full bg-blue-400" />
            <span className="font-medium">
              {`${event.year}년 ${event.month}월 ${event.day}일`}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-1 w-1 rounded-full bg-indigo-400" />
            <span className="font-medium">
              {`${event.startTime} - ${event.endTime}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
