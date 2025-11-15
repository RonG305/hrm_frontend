import React from 'react'
import { DropdownMenu, DropdownMenuLabel } from '../ui/dropdown-menu'
import { DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Button } from '../ui/button'
import { MoreHorizontal } from 'lucide-react'

const ActionDropdown = ({ children }: { children: React.ReactNode }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className='border bg-card z-50 w-[150px] shadow-sm rounded-md flex gap-3 cursor-pointer flex-col p-2'>
        <DropdownMenuLabel className='text-muted-foreground'>Actions</DropdownMenuLabel>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ActionDropdown
