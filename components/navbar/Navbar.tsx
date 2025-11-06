import React from 'react'
import { ThemeToggle } from '../theme/ThemeToggle'

const Navbar = () => {
  return (
    <div className='bg-white shadow-md p-4 flex justify-between items-center'>
      Navbar
      <ThemeToggle />
    </div>
  )
}

export default Navbar
