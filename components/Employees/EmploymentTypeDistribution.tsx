import HalfDonutChart from "../common/HalfDonutChart";
import HorizontalBarChart from "../common/HorizontalChart";


export default function EmplymentCategoryDistribution() {

  const roleData = [
    { role: 'Full Time', value: 14 },
    { role: 'Part Time', value: 5 },
    { role: 'Contract', value: 8 },
    { role: 'Internship', value: 4 },
  ];

  return (
      <div className="flex flex-col items-center">
        <HorizontalBarChart data={roleData.map(item => ({ name: item.role, value: item.value }))} title="Employment Type Distribution" height={200} />
      </div>
  );
}
