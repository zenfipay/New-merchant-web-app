
import { cn } from '@/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const spinnerVariants = cva(
    "relative",
    {
        variants: {
            size: {
                default: "w-9 h-9",
                sm: "w-5 h-5"
            }
        },
        defaultVariants: {
            size: "default"
        }
    }
)

const innerVariants = cva(
    "absolute inset-0.5 rounded-full",
    {
        variants: {
            variant: {
                whiteBg: "bg-white",
                blurredBg: "bg-[#20195F]/10 backdrop-blur-lg"
            }
        },
        defaultVariants: {
            variant: "whiteBg"
        }
    }
)

type SpinnerProps = VariantProps<typeof spinnerVariants> & VariantProps<typeof innerVariants>


export const Spinner = ({ variant, size }: SpinnerProps) => {
    return (
        <div
            className={cn(spinnerVariants({size}))}
        >
            <div className='absolute inset-0 rounded-full bg-linear-to-tr from-[#99ec64] to-[#20195F] animate-spin' />
            <div className={cn(innerVariants({variant}))} />
        </div>
    )
}

