export default function ModeIndicator({ mode = 'practice' }) {
  const isPractice = mode === 'practice'
  return (
    <div className="flex justify-center py-2">
      <span
        className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border-2 text-sm font-bold ${
          isPractice
            ? 'border-teal-600 text-teal-600'
            : 'border-amber-500 text-amber-600'
        }`}
      >
        {isPractice ? '📚 Practice Mode' : '⏱️ NAT-I Mock Test'}
      </span>
    </div>
  )
}
