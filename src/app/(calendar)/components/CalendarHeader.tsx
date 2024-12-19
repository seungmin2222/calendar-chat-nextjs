export default function CalendarHeader() {
  return (
    <header className="flex h-11 min-h-10 items-center justify-center gap-5 bg-slate-300 text-5xl">
      <button>{'<'}</button>
      <span className="w-44 select-none text-center text-3xl font-semibold">
        2024년 12월
      </span>
      <button>{'>'}</button>
    </header>
  );
}
