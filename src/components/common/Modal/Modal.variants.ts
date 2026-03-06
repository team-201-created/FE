import { cva } from 'class-variance-authority'

export const modalVariants = cva('relative w-full bg-white flex flex-col', {
  variants: {
    type: {
      center: 'm-4',
      bottomSheet: 'mt-auto rounded-t-[32px] rounded-b-none',
    },
    size: {
      xs: 'max-w-[320px]',
      sm: 'max-w-[400px]',
      md: 'max-w-[448px]',
      ml: 'max-w-[512px]',
      lg: 'max-w-[672px]',
      full: 'max-w-full h-full rounded-none',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-[16px]',
      md: 'rounded-[24px]',
      lg: 'rounded-[32px]',
    },
  },
  compoundVariants: [
    {
      type: 'bottomSheet',
      className: 'max-w-full',
    },
  ],
  defaultVariants: {
    type: 'center',
    size: 'md',
    rounded: 'md',
  },
})
