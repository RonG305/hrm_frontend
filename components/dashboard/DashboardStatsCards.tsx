import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { dashboardStats } from "./dashboardStats";
import { Icon } from "@iconify/react";
import { Progress } from "../ui/progress";

const DashboardStatsCards = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
      <Card>
        <CardTitle>Average KPI</CardTitle>
        <div>
          <p className="text-muted-foreground">9/10 Employees standard</p>
          <p className="text-accent">{dashboardStats.averageKPI.description}</p>
        </div>
      </Card>

      <Card>
        <CardTitle>Employee</CardTitle>
        <div>
          <p className="text-muted-foreground">Total Employees</p>
          <h3 className="text-4xl md:text-4xl font-medium">48</h3>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-x-4">
              <h4 className="text-xl  font-medium">784 </h4>
              <p className="text-success text-xs  bg-success-light px-2 rounded">
                {((784 / 1105) * 100).toFixed(2)} %
              </p>
            </div>
            <p className="text-muted-foreground text-sm">Male Employees</p>
          </div>
          <div>
            <div className="flex items-center gap-x-4">
              <h4 className="text-xl  font-medium">321 </h4>
              <p className="text-success text-xs  bg-success-light px-2 rounded">
                {((321 / 1105) * 100).toFixed(2)} %
              </p>
            </div>
            <p className="text-muted-foreground text-sm">Female Employees</p>
          </div>
        </div>
      </Card>

      <Card>
        <CardTitle>Todays used Devices</CardTitle>
        <div>
         <div>
           <h4 className="text-2xl md:text-4xl  font-medium">43 </h4>
          <p className="text-muted-foreground"> Employees Checked in today</p>
         </div>
          <div className="flex items-center justify-between gap-2 my-2">
            <div>
              <div className="flex flex-col items-start gap-x-4">
                <h4 className="text-sm text-muted-foreground  font-medium">
                  Mobile{" "}
                </h4>
                <p className="text-xl font-medium">74%</p>
              </div>
              <p className="text-muted-foreground text-sm">84 Employees</p>
            </div>
            <div>
              <div className="flex flex-col items-start gap-x-4">
                <h4 className="text-sm text-muted-foreground  font-medium">
                  Desktop{" "}
                </h4>
                <p className="text-xl font-medium">26%</p>
              </div>
              <p className="text-muted-foreground text-sm">29 Employees</p>
            </div>
          </div>
          <div>
            <Progress value={74} className="h-3 rounded-full" />
          </div>
        </div>
      </Card>

      <Card>
        <CardTitle>Projects</CardTitle>
        <div>
          <h4 className="text-2xl md:text-4xl  font-medium">1023 </h4>
          <p className="text-muted-foreground"> Total Projects</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xl  font-medium">784</h4>
            <p className="text-muted-foreground text-sm">Ongoing Projects</p>
          </div>
          <div>
            <h4 className="text-xl  font-medium">321</h4>
            <p className="text-muted-foreground text-sm">Completed Projects</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardStatsCards;
