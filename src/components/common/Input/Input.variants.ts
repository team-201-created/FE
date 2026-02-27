import { cva } from 'class-variance-authority'

export const inputVariants = cva(
  'w-full h-[50px] px-4 rounded-[10px] transition-colors outline-none duration-300 ease-in-out placeholder:text-gray-secondary disabled:cursor-not-allowed disabled:bg-gray-white border-2',
  {
    variants: {
      status: {
        default: 'border-gray-light focus:border-gray',
        error: 'border-danger',
        success: 'border-success',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  }
)

export const helperVariants = cva(
  'text-xs px-1 transition-colors duration-300',
  {
    variants: {
      status: {
        default: 'text-gray',
        error: 'text-danger',
        success: 'text-success',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  }
)
