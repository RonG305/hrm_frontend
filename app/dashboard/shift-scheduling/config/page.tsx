import ErrorMessagePage from '@/components/common/ErrorMessagePage';
import { getAllWorkSchedules } from '@/components/WorkManagement/WorkScheduling/actions'
import WorkScheduleList from '@/components/WorkManagement/WorkScheduling/WorkSchelingConfigList';
import React from 'react'

const page = async() => {
    const  data = await getAllWorkSchedules();
    if(data?.error) {
        return <ErrorMessagePage errorMessage={data.error} />
    }
  return <WorkScheduleList initialData={data} />
}

export default page
