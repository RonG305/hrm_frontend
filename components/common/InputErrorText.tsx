import React from 'react'
import { FieldError } from 'react-hook-form'

const InputErrorText = ({error}: {error: string | FieldError | undefined}) => {
  const errorMessage = typeof error === 'string' ? error : error?.message;
  return (
      <p className='text-sm text-red-500'>{errorMessage}</p>
  )
}

export default InputErrorText