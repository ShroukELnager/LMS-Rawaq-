export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex max-w-[80%] items-center gap-1 rounded-2xl rounded-bl-sm bg-[#EDF2F8] px-4 py-3">
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#00535B]" />
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-[#00535B]"
          style={{ animationDelay: '0.15s' }}
        />
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-[#00535B]"
          style={{ animationDelay: '0.3s' }}
        />
      </div>
    </div>
  );
}
