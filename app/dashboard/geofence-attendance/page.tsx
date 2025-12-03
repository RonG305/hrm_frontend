"use client";
import { MarkAttendance } from "@/components/Attendance/MarkAttendance";
import LocationMap from "@/components/common/Maps/Map";
import { Card } from "@/components/ui/card";
import React from "react";

const page = () => {
  return (
    <div>
      <Card className="mb-4 p-4">
        <div className="flex md:flex-row flex-col items-center justify-between gap-2">
          <div>
          <h2 className="font-semibold text-lg">Geofence Attendance Map</h2>
          <p className="text-sm text-gray-600">
            Mark your attendance within the designated geofence area.
          </p>
        </div>
        <div className=" relative z-10 mt-4">
          <MarkAttendance />
        </div>
        </div>
      </Card>
      <div className="relative z-0">
        <LocationMap />
      </div>
    </div>
  );
};

export default page;
