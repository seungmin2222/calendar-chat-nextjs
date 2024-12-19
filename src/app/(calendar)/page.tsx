'use client'

import CalendarBody from './components/CalendarBody'
import CalendarHeader from './components/CalendarHeader'

export default function Home() {
  return (
    <div className="h-full w-full bg-slate-400 py-10 pr-10">
      <CalendarHeader />
      <CalendarBody />
    </div>
  )
}
