import React from 'react'
import { Table, TableBody,  TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Loader2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const SkeletonDiv = () => {
    return <div className="h-6 bg-gray-200 rounded"></div>;
}

const TableLoader = () => {
    return (
        <Card className="animate-pulse my-4">
              <span className='flex items-center gap-x-3'> <Loader2 className="animate-spin" />Table Loading...</span>
            <Table>
              
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">{SkeletonDiv()}</TableHead>
                        <TableHead>{SkeletonDiv()}</TableHead>
                        <TableHead>{SkeletonDiv()}</TableHead>
                        <TableHead className="text-right">{SkeletonDiv()}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <SkeletonDiv />
                   </TableBody>

            </Table>
        </Card>
    )
}

export default TableLoader
