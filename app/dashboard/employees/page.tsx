import EmployeesList from '@/components/Employees/EmployeesList'
import EmployeesRender from '@/components/Employees/EmployeesRender'
import EmployeesStatsCard from '@/components/Employees/EmployeesStatsCard'
import RoleDemographicsChart from '@/components/Employees/RoleDemographicsChart'

const page = () => {
  return (
    <div>
    <div className='grid md:grid-cols-2 grid-cols-1 gap-3'> 
          <EmployeesStatsCard />
         <RoleDemographicsChart />
  
    </div>
   <EmployeesRender />
    </div>
  )
}

export default page
