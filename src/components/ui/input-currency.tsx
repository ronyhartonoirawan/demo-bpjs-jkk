"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"

interface IDRCurrencyInputProps {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  placeholder?: string
  className?: string
}

export function InputCurrency({
  value,
  defaultValue = 0,
  onChange,
  placeholder = "0",
  className,
}: IDRCurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState("")
  const [internalValue, setInternalValue] = useState(value ?? defaultValue)

  // Format number as IDR currency
  const formatIDR = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Initialize display value
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value)
      setDisplayValue(formatIDR(value))
    } else {
      setDisplayValue(formatIDR(internalValue))
    }
  }, [value, internalValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Extract only numbers from input
    const numericValue = e.target.value.replace(/\D/g, "")

    // Convert to number
    const numberValue = numericValue ? Number.parseInt(numericValue, 10) : 0

    // Update the internal and display values
    setInternalValue(numberValue)
    setDisplayValue(formatIDR(numberValue))

    // Call onChange with the numeric value
    if (onChange) {
      onChange(numberValue)
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select all text when focused
    e.target.select()
  }

  return (
    <Input
      type="text"
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      placeholder={placeholder}
      className={className}
    />
  )
}

