import React from 'react'
import { Controller, Control, FieldValues } from 'react-hook-form'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import Image from 'next/image'


interface BaseFormFieldProps<T extends FieldValues> {
  name: any
  control: Control<T>
  label?: string
  error?: string
  disabled?: boolean
  className?: string
  required?: boolean
}

interface FormInputFieldProps<T extends FieldValues>
  extends BaseFormFieldProps<T> {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number'
  placeholder?: string
  inputClassName?: string
  labelClassName?: string
  errorClassName?: string
}

export const FormInputField = <T extends FieldValues>({
  name,
  control,
  label,
  error,
  type = 'text',
  placeholder,
  disabled = false,
  className = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  required = false,
}: FormInputFieldProps<T>) => {
  return (
    <div className={cn('flex w-full flex-1 flex-col gap-y-1', className)}>
      {label && (
        <label
          className={cn('text-xs font-medium text-stone-800', labelClassName)}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <div className="relative w-full">
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                'h-11 w-full rounded-lg border px-4 pr-10 text-sm transition-colors md:h-12 md:text-base',
                'disabled:cursor-not-allowed disabled:opacity-50',
                fieldState.error
                  ? 'border-red-500  focus-visible:ring-red-500'
                  : 'border-transparent focus-visible:ring-stone-300',
                inputClassName
              )}
            />

            {fieldState.error && (
              <Image
                height={24}
                width={24}
                src="/svg/error.svg"
                alt="Alert"
                className="pointer-events-none absolute top-[35%] right-3 -translate-y-1/2 text-red-500"
              />
            )}

           
          </div>
          
        )}
      />
    </div>
  )
}
