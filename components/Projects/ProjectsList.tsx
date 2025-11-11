'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { CloudDownload } from 'lucide-react'
import { DataTable } from '../common/DataTable'
import { project } from './projects'
import { Badge } from '../ui/badge'

export const columns: ColumnDef<any>[] = [

    {
        accessorKey: "title",
        header: "project title",
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
    },
        {
        accessorKey: "endDate",
        header: "End Date",
    },
    {
        accessorKey: "Description",
        header: "Description",
        cell: ({ row }) => {
            return (
                <span className=' w-[400px] line-clamp-1'>{row.original.description}</span>
            )
        }
    },

    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return (
                <Badge variant={`${row.original.status === 'Completed' ? "success" : row.original.status === 'In Progress' ? "outline" : "default"}`}>{row.original.status}</Badge>
            )
        }

    },

   
]

const ProjectsList = () => {

    return (
        <div>
            <div className='flex items-center justify-end gap-2'>
                <Button variant={"outline"}><CloudDownload />Export Readings</Button>
                {/* <DataExport data={export_data} name='meter_readings' /> */}
            </div>
            <div className='w-full overflow-x-auto'>
                {/* {isLoading && <TableSkeleton />}
                {isError || error && <TableError />} */}

                    <DataTable
                        data={project}
                        columns={columns}
                        searchableColumns={["customer", "meter", "recorded_at"]}
                        title="Meter Readings List"
                        description="View and manage the meter readings"
                    />

            </div>

        </div>
    )
}

export default ProjectsList
