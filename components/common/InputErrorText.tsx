import React from 'react'

const InputErrorText = ({error}: {error: string | undefined}) => {
  return (
      <p className='text-sm text-red-500'>{error}</p>
  )
}

export default InputErrorText
