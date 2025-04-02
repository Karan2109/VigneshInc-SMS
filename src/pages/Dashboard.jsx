import React from "react";
import StudentCharts from "../components/students/StudentCharts";

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <StudentCharts />
    </div>
  );
};

export default Dashboard;
