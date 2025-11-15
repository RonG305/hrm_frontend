import React from "react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import ChartsPage from "./EmploymentTypeDistribution";

const employmentypeStats = [
  {
    type: "Full Time",
    count: 255,
    abbreviation: "FT",
  },

  {
    type: "Part Time",
    count: 120,
    abbreviation: "PT",
  },
  {
    type: "Contract",
    count: 420,
    abbreviation: "CT",
  },
  {
    type: "Internship",
    count: 50,
    abbreviation: "IN",
  },
];

const getRandomAvatarColor = () => {
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

const EmployeesStatsCard = () => {
  return (
    <Card>
      <h3 className="lg:text-xl text-lg font-medium">Total Employees</h3>
      <div className="flex items-center gap-2">
        <h2 className="lg:text-3xl text-xl">675</h2>
        <p className="text-muted-foreground">Employees</p>
      </div>
      <ChartsPage />
      <div className=" grid md:grid-cols-2 grid-cols-1 gap-3 ">
        {employmentypeStats.map((item) => (
          <div key={item.type} className="mt-4 bg-card border p-2 rounded-md">
            <div className="flex items-center  gap-x-2 mb-1">
              <Avatar className={` bg-[${getRandomAvatarColor()}] font-medium`}>
                <AvatarFallback>
                  {item.abbreviation}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-base font-medium text-muted-foreground">{item.type} Employees</h3>
            </div>
            <div className="flex items-center gap-2">
              <h2 className="lg:text-2xl text-xl">{item.count}</h2>
              <p className=" text-sm">Employees</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default EmployeesStatsCard;
