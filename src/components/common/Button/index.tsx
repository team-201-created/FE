import React from 'react'
import { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import { buttonVariants } from './Button.variants'

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  color,
  size,
  rounded,
  disabled,
  ...props // 여기서 onClick 등 나머지 버튼의 속성을 받아서 처리 가능함
}) => {
  return (
    <button
      className={cn(
        'cursor-pointer',
        buttonVariants({
          color: disabled ? 'disabled' : color,
          size,
          rounded,
          className,
        })
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

Button.displayName = 'Button'

export default Button
