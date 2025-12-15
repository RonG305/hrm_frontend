import React from 'react'


const statsCards = [
    {
        title: "Total Employees",
        value: 150,
        icon: "users",
        bgColor: "bg-blue-500",
    },
    {
        title: "Active Projects",
        value: 12,
        icon: "briefcase",
        bgColor: "bg-green-500",
    },
    {
        title: "Pending Tasks",
        value: 34,
        icon: "check-square",
        bgColor: "bg-yellow-500",
    },
    {
        title: "Completed Trainings",
        value: 8,
        icon: "book-open",
        bgColor: "bg-purple-500",
    },  

    {
        title: "New Hires This Month",
        value: 5,
        icon: "user-plus",
        bgColor: "bg-red-500",
    
    },
    {
        title: "Open Leave Requests",
        value: 7,
        icon: "calendar",
        bgColor: "bg-teal-500",
    },
    {
        title: "Overdue Reviews",
        value: 3,
        icon: "star-half",
        bgColor: "bg-indigo-500",
    },
    {
        title: "Average Attendance",
        value: "95%",
        icon: "clock",
        bgColor: "bg-pink-500",
    },
    {
        title: "Employee Satisfaction",
        value: "88%",
        icon: "smile",
        bgColor: "bg-orange-500",
    },
    {
        title: "Training Hours",
        value: 120,
        icon: "graduation-cap",
        bgColor: "bg-cyan-500",
    }
]

const StatisticalCards = () => {
  return (
    <div className='grid grid-cols-3 gap-2'>
       {statsCards.map((card, index) => (
            <div key={index} className={`p-4 rounded-lg shadow-md text-white ${card.bgColor} mb-4`}>
                <div className="flex items-center">
                    <div className="text-3xl mr-4">
                        <i className={`icon-${card.icon}`}></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">{card.title}</h3>
                        <p className="text-2xl">{card.value}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default StatisticalCards
