import { useState } from 'react'

interface HandleNameChangeInterface {
  target: HTMLInputElement;
}

export const useField = (type: string) => {
  const [value, setValue] = useState('')

  const onChange = (event: HandleNameChangeInterface) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}