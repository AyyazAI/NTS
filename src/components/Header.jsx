export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <span className="font-black text-xl tracking-tight text-gray-900">Taleemi</span>
        <span className="font-black text-xl tracking-tight text-teal-600">Markaz</span>
      </div>
      <span className="text-xs font-bold text-gray-600 tracking-widest uppercase">NTS Prep</span>
    </header>
  )
}
