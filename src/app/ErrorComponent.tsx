interface ErrorComponentProps {
  message: string;
  onRetry: () => void;
}

const ErrorComponent = ({ message, onRetry }: ErrorComponentProps) => {
  return (
    <div className="flex h-[calc(100%-4rem)] items-center justify-center rounded-lg bg-white/80">
      <div className="text-center">
        <p className="font-medium text-red-500">{message}</p>
        <button
          onClick={onRetry}
          className="mt-2 text-sm text-gray-600 hover:text-gray-900"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;
