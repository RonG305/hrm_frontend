"use client";

import { useRouter, useSearchParams } from "next/navigation";
import EmployeesList from "./EmployeesList";
import { Button } from "../ui/button";

const types = [
  { label: "All", value: "" },
  { label: "Full Time", value: "Full-Time" },
  { label: "Part Time", value: "Part-Time" },
  { label: "Contract", value: "Contract" },
];

export default function EmployeesRender({
  initialData,
  currentType,
}: {
  initialData: any;
  currentType: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("employment_type", val);

    router.push(`/dashboard/employees?${params.toString()}`);
  };

  return (
    <div className="w-full mt-4 space-y-4">
      <div className="flex gap-3 overflow-x-auto thin-scrollbar">
        {types.map((t) => (
          <Button
            key={t.value}
            variant={currentType === t.value ? "default" : "outline"}
            onClick={() => handleChange(t.value)}
            className={`px-4 py-2  border rounded-full `}
          >
            {t.label}
          </Button>
        ))}
      </div>
      <EmployeesList initialData={initialData} currentType={currentType} />
    </div>
  );
}
