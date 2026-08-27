export function BrandLogo({
  className = '',
  size = 'md',
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const scale =
    size === 'lg'
      ? 'text-6xl sm:text-7xl md:text-8xl'
      : size === 'sm'
        ? 'text-3xl'
        : 'text-5xl sm:text-6xl'

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        className={`font-display leading-none text-primary drop-shadow-sm ${scale}`}
        style={{ letterSpacing: '0.01em' }}
      >
        Coca-Cola
      </span>
    </div>
  )
}
