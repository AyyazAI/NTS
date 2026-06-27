export default function ModeIndicator({ mode = 'practice' }) {
  const isPractice = mode === 'practice'
  return (
    <div className="flex justify-center py-2">
      <span
        className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold text-white ${
          isPractice ? 'bg-[#006D5B]' : 'bg-amber-500'
        }`}
      >
        {isPractice ? '📚 Practice Mode' : '⏱️ NAT-I Mock Test'}
      </span>
    </div>
  )
}
