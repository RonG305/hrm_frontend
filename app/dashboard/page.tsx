import DashboardStatsCards from '@/components/dashboard/DashboardStatsCards'
import { ChartPieDonutActive } from '@/components/dashboard/Doughnurt';
import { ChartBarHorizontal } from '@/components/dashboard/HorizontalBars';
import { ChartBarMultiple } from '@/components/dashboard/MultipleBars';
import { PerformanceAnalytics } from '@/components/dashboard/PerformanceAnalytics';
import { PerformanceStats } from '@/components/dashboard/PerformanceStats';
import { ChartRadialStacked } from '@/components/dashboard/RdialChart';
import StatisticalCards from '@/components/dashboard/StatisticsCards/StatisticalCards';
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
      <div className='flex items-center gap-2 mb-2'>
        <div className='lg:w-3/4 md:w-1/2'>
          <PerformanceStats />
        </div>
      <div className='lg:w-1/4 md:w-1/2 mb-2'>
        <ChartPieDonutActive />
      </div>
      </div>
     <div className='grid md:grid-cols-2 grid-cols-1 gap-2 mb-2'>
       <StatisticalCards />
          <ChartBarMultiple />
      {/* <ChartRadialStacked /> */}
     </div>
   
      {/* <ChartBarHorizontal /> */}
      <ProjectsList initialData={data} />
    </div>
  )
}

export default page
