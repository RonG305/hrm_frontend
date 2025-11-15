import HalfDonutChart from "../common/HalfDonutChart";
import HorizontalBarChart from "../common/HorizontalChart";
import { Card } from "../ui/card";

export default function RoleDemographicsChart() {
  const data = [
    { name: 'Software developers', value: 80 },
    { name: 'Project managers', value: 55 },
    { name: 'QA engineers', value: 90 },
    { name: 'Designers', value: 40 },
  ];

  return (
    <Card>
      <h2 className="text-xl font-medium mb-4">Role Demographics</h2>
      <HalfDonutChart data={data.map(item => ({ role: item.name, value: item.value }))} height={450} title="Role Demographics (%)" />
    </Card>
  );
}
