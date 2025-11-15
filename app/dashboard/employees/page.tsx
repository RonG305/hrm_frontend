import { getEmployees } from "@/components/Employees/actions";
import EmployeesRender from "@/components/Employees/EmployeesRender";
import EmployeesStatsCard from "@/components/Employees/EmployeesStatsCard";
import RoleDemographicsChart from "@/components/Employees/RoleDemographicsChart";

const page = async ({ searchParams }: { searchParams: Promise<{ employment_type?: string }> }) => {
  const params = await searchParams;
  const employees = await getEmployees({ search: params.employment_type || "" });
  return (
    <div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
        <EmployeesStatsCard />
        <RoleDemographicsChart />
      </div>
      <EmployeesRender initialData={employees} currentType={params.employment_type || ""} />
    </div>
  );
};

export default page;
