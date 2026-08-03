type Props = {
  message: string;
  onRetry: () => void;
};

export default function ErrorState({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-center">
      <p className="text-sm text-red-600">{message}</p>

      <button
        type="button"
        onClick={onRetry}
        className="rounded-md bg-[#00535B] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#004249]"
      >
        Retry
      </button>
    </div>
  );
}
