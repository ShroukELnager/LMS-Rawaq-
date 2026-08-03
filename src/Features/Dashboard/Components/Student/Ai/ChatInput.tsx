import Send from '@/assets/icons/send.svg';

type Props = {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
};

export default function ChatInput({ value, loading, onChange, onSend }: Props) {
  return (
    <div className="p-[16px] border-t border-t-[1px] border-t-[#BEC8CA33]">
      <div className="relative flex items-center border border-[#BEC8CA80] rounded-[8px]">
        <div className="w-full">
          <textarea
            rows={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ask anything about your group..."
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            className="min-h-[48px] h-[96px] max-h-[96px] w-full resize-none overflow-y-auto rounded-[8px] p-[12px] leading-6 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50"
          />
        </div>

        <button
          type="button"
          onClick={onSend}
          disabled={loading || !value.trim()}
          className="absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-full bg-[#CCE2E4] transition hover:bg-[#B9DADD] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send color="#00535B" className="size-4" />
        </button>
      </div>
    </div>
  );
}
