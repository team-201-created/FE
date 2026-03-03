import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100',
  {
    variants: {
      color: {
        primary: 'bg-black-primary text-white',
        secondary: 'bg-white text-black-secondary',
        tertiary: 'bg-gray-white text-black-secondary border border-gray-light',
        quaternary: 'bg-white text-purple-primary border border-purple-primary',
        quinary: 'bg-white text-black-secondary border border-gray-light',
        danger: 'bg-danger text-white',
        success: 'bg-success text-white',
        kakao: 'bg-kakao text-black-primary',
        disabled: 'bg-gray-light text-gray-secondary',
        none: '',
      },
      size: {
        w32h32: 'w-[32px] h-[32px]',
        w78h42: 'w-[78px] h-[42px]',
        w80h40: 'w-[80px] h-[40px]',
        w104h48: 'w-[104px] h-[48px]',
        w113h42: 'w-[113px] h-[42px]',
        w119h40: 'w-[119px] h-[40px]',
        w139h40: 'w-[139px] h-[40px]',
        w147h40: 'w-[147px] h-[40px]',
        w155h46: 'w-[155px] h-[46px]',
        w225h58: 'w-[225px] h-[58px]',
        w239h63: 'w-[239px] h-[63px]',
        w320h44: 'w-[320px] h-[44px]',
        w369h48: 'w-[369px] h-[48px]',
        w376h58: 'w-[376px] h-[58px]',
        w382h48: 'w-[382px] h-[48px]',
        w398h52: 'w-[398px] h-[52px]',
        w579h56: 'w-[579px] h-[56px]',
        w735h52: 'w-[735px] h-[52px]',
        w1086h56: 'w-[1086px] h-[56px]',
        w1482h48: 'w-[1482px] h-[48px]',
        none: '',
      },
      rounded: {
        sm: 'rounded-[10px]',
        md: 'rounded-[14px]',
        lg: 'rounded-[16px]',
        full: 'rounded-full',
        none: '',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'w113h42',
      rounded: 'full',
    },
  }
)
