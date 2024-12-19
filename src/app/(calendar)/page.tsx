'use client';

import CalendarBody from './components/CalendarBody';
import CalendarHeader from './components/CalendarHeader';

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col gap-3 bg-slate-400 p-12">
      <CalendarHeader />
      <CalendarBody />
    </div>
  );
}
