import DashboardStatsCards from '@/components/dashboard/DashboardStatsCards'
import { PerformanceAnalytics } from '@/components/dashboard/PerformanceAnalytics';
import ProjectsList from '@/components/Projects/ProjectsList'
import { fetchData } from '@/lib/api'

const page = async () => {
  const data  = await fetchData('/projects/list/');

  if(data?.error) {
    return <div className='text-center text-red-500'>Error loading projects: {data.error}</div>
  }
  return (
    <div>
      {/* <Button>Primary</Button>
      <Button variant={"secondary"}>Secondary</Button>
      <Button variant={"accent"}>Accent</Button>
      <Button variant={"destructive"}>Destructive</Button>
      <Button variant={"outline"}>Outline</Button> */}
      <DashboardStatsCards />
      <PerformanceAnalytics />
      <ProjectsList initialData={data} />
    </div>
  )
}

export default page
