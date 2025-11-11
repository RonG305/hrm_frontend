import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import EmployeesList from "./EmployeesList";

const EmployeesRender = () => {
  return (
    <div className="w-full md:w-auto thin-scrollbar mt-4">
      <Tabs defaultValue="all_employees" className="w-full">
        <TabsList>
          <TabsTrigger value="all_employees">All Employees</TabsTrigger>
          <TabsTrigger value="full_time">Full Time</TabsTrigger>
          <TabsTrigger value="part_time">Part Time</TabsTrigger>
          <TabsTrigger value="contract">Contract</TabsTrigger>
        </TabsList>
        <TabsContent value="all_employees">
          <EmployeesList />
        </TabsContent>
        <TabsContent value="full_time">
          List full time employees here.
        </TabsContent>
        <TabsContent value="part_time">
          List part time employees here.
        </TabsContent>
        <TabsContent value="contract">
          List contract employees here.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeesRender;
