export default function LoadingComponent() {
  return (
    <div className="flex h-[calc(100%-4rem)] items-center justify-center rounded-lg bg-white/80">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-gray-500" />
    </div>
  );
}
