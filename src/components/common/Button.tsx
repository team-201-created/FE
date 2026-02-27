import React from 'react'

type ButtonSize =
  | 'w78h42'
  | 'w80h40'
  | 'w104h48'
  | 'w113h42'
  | 'w119h40'
  | 'w139h40'
  | 'w147h40'
  | 'w155h46'
  | 'w225h58'
  | 'w239h63'
  | 'w320h44'
  | 'w369h48'
  | 'w376h58'
  | 'w382h48'
  | 'w398h52'
  | 'w579h56'
  | 'w735h52'
  | 'w1086h56'
  | 'w1482h48'
type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'quinary'
  | 'danger'
  | 'success'
  | 'kakao'
  | 'disabled'
type ButtonRounded = 'sm' | 'md' | 'lg' | 'full'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  size?: ButtonSize
  color?: ButtonColor
  rounded?: ButtonRounded
}

const sizeMap: Record<ButtonSize, { width: string; height: string }> = {
  w78h42: { width: 'w-[78px]', height: 'h-[42px]' },
  w80h40: { width: 'w-[80px]', height: 'h-[40px]' },
  w104h48: { width: 'w-[104px]', height: 'h-[48px]' },
  w113h42: { width: 'w-[113px]', height: 'h-[42px]' },
  w119h40: { width: 'w-[119px]', height: 'h-[40px]' },
  w139h40: { width: 'w-[139px]', height: 'h-[40px]' },
  w147h40: { width: 'w-[147px]', height: 'h-[40px]' },
  w155h46: { width: 'w-[155px]', height: 'h-[46px]' },
  w225h58: { width: 'w-[225px]', height: 'h-[58px]' },
  w239h63: { width: 'w-[239px]', height: 'h-[63px]' },
  w320h44: { width: 'w-[320px]', height: 'h-[44px]' },
  w369h48: { width: 'w-[369px]', height: 'h-[48px]' },
  w376h58: { width: 'w-[376px]', height: 'h-[58px]' },
  w382h48: { width: 'w-[382px]', height: 'h-[48px]' },
  w398h52: { width: 'w-[398px]', height: 'h-[52px]' },
  w579h56: { width: 'w-[579px]', height: 'h-[56px]' },
  w735h52: { width: 'w-[735px]', height: 'h-[52px]' },
  w1086h56: { width: 'w-[1086px]', height: 'h-[56px]' },
  w1482h48: { width: 'w-[1482px]', height: 'h-[48px]' },
}

const colorStyles: Record<ButtonColor, string> = {
  primary: 'bg-[var(--color-main)] text-[var(--color-black-primary)]',
  secondary: 'bg-[var(--color-white)] text-[var(--color-black-secondary)]',
  tertiary:
    'bg-[var(--color-gray-white)] text-[var(--color-black-secondary)] border border-[var(--color-gray-light)]',
  quaternary:
    'bg-[var(--color-white)] text-[var(--color-purple-primary)] border border-[var(--color-purple-primary)]',
  quinary:
    'bg-[var(--color-white)] text-[var(--color-black-secondary)] border border-[var(--color-gray-light)]',
  danger: 'bg-[var(--color-danger)] text-white',
  success: 'bg-[var(--color-success)] text-white',
  kakao: 'bg-[var(--color-kakao)] text-[var(--color-black-primary)]',
  disabled:
    'bg-[var(--color-gray-light)] text-[var(--color-gray-secondary)] disabled:cursor-not-allowed',
}

const roundedStyles: Record<ButtonRounded, string> = {
  sm: 'rounded-[10px]',
  md: 'rounded-[14px]',
  lg: 'rounded-[16px]',
  full: 'rounded-full',
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  size = 'w113h42',
  color = 'primary',
  rounded = 'full',
}) => {
  const { width, height } = sizeMap[size as ButtonSize] ?? {
    width: '',
    height: '',
  }
  const colorClass = disabled ? colorStyles['disabled'] : colorStyles[color]
  const styleClass = `${height} ${width} ${colorClass} ${roundedStyles[rounded]}`
  // primary일 때만 gradient style 적용
  const style =
    !disabled && color === 'primary'
      ? { backgroundImage: 'var(--color-main)' }
      : undefined
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styleClass}
      style={style}
    >
      {children}
    </button>
  )
}

export default Button
