'use client'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export function InputWithIcon({
  startIcon,
  endIcon,
  className,
  ...props
}: InputWithIconProps) {
  return (
    <div className="relative w-full">
      {/* Icon absolutely positioned on the left */}
      {startIcon && (
        <div className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
          {startIcon}
        </div>
      )}

      <Input {...props} className={cn('pl-10', className)} />
      {/* Show endIcon only if input length > 1 */}
      {endIcon && typeof props.value === 'string' && props.value.length > 0 && (
        <div className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground">
          {endIcon}
        </div>
      )}
    </div>
  )
}

InputWithIcon.displayName = 'InputWithIcon'
