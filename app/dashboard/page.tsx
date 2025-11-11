import DashboardStatsCards from '@/components/dashboard/DashboardStatsCards'
import ProjectsList from '@/components/Projects/ProjectsList'

const page = () => {
  return (
    <div>
      {/* <Button>Primary</Button>
      <Button variant={"secondary"}>Secondary</Button>
      <Button variant={"accent"}>Accent</Button>
      <Button variant={"destructive"}>Destructive</Button>
      <Button variant={"outline"}>Outline</Button> */}
      <DashboardStatsCards />
      <ProjectsList />
    </div>
  )
}

export default page
