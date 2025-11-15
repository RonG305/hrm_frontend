import React from 'react'
import { DataTable } from '../common/DataTable'

const UserTaksList = () => {
  const columns = [
    {
      accessorKey: 'title',
      header: 'Task Name',
    },
    {
      accessorKey: 'assigned_by',
      header: 'assigned by',
    },
    {
      accessorKey: 'due_date',
      header: 'Due By',
    }
  ]
  return (
    <div>
      <DataTable 
        columns={columns}
        title='All your tasks'
        description='List of all your tasks , both assigned to you and the one you assigned to your fellows'
        data={[]}
        />
    </div>
  )
}

export default UserTaksList
