import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useSelector } from "react-redux";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const StudentCharts = () => {
  const { students } = useSelector((state) => state.students);

  // Prepare data for class distribution chart
  const classDistribution = students.reduce((acc, student) => {
    const existingClass = acc.find((item) => item.name === student.class);
    if (existingClass) {
      existingClass.value += 1;
    } else {
      acc.push({ name: student.class, value: 1 });
    }
    return acc;
  }, []);

  // Prepare data for attendance by class chart
  const attendanceByClass = students
    .reduce((acc, student) => {
      const existingClass = acc.find((item) => item.name === student.class);
      if (existingClass) {
        existingClass.attendance += student.attendance;
        existingClass.count += 1;
      } else {
        acc.push({
          name: student.class,
          attendance: student.attendance,
          count: 1,
        });
      }
      return acc;
    }, [])
    .map((item) => ({
      name: item.name,
      attendance: parseFloat((item.attendance / item.count).toFixed(2)),
    }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Class Distribution
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={classDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {classDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Average Attendance by Class
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={attendanceByClass}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="attendance" fill="#8884d8" name="Attendance %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StudentCharts;
