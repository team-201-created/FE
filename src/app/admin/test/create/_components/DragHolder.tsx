export const DragHolder = () => {
  return (
    <div className="flex h-10 w-6 cursor-grab items-center justify-center text-gray-300 hover:text-gray-400 active:cursor-grabbing">
      <svg width="12" height="18" viewBox="0 0 12 18" fill="currentColor">
        <circle cx="2" cy="2" r="1.5" />
        <circle cx="2" cy="7" r="1.5" />
        <circle cx="2" cy="12" r="1.5" />
        <circle cx="2" cy="17" r="1.5" />
        <circle cx="6" cy="2" r="1.5" />
        <circle cx="6" cy="7" r="1.5" />
        <circle cx="6" cy="12" r="1.5" />
        <circle cx="6" cy="17" r="1.5" />
      </svg>
    </div>
  )
}
