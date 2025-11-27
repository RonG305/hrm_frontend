import { getAllAttendanceRecords } from '@/components/Attendance/actions'
import AttendanceReportsList from '@/components/Attendance/AllAttandancesReports';
import React from 'react'

const page = async() => {
  const attendance_reports = await getAllAttendanceRecords();
  console.log(attendance_reports);
  return  <AttendanceReportsList initialData={attendance_reports} />
}

export default page
