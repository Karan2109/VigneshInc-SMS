import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterStudents } from "../../store/studentSlice";

const StudentFilters = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);
  const [filters, setFilters] = useState({
    searchTerm: "",
    classFilter: "",
    sectionFilter: "",
    attendanceFrom: "",
    attendanceTo: "",
  });

  // Get unique classes and sections for dropdowns
  const uniqueClasses = [...new Set(students.map((student) => student.class))];
  const uniqueSections = [
    ...new Set(students.map((student) => student.section)),
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      filterStudents({
        searchTerm: filters.searchTerm,
        classFilter: filters.classFilter,
        sectionFilter: filters.sectionFilter,
        attendanceRange:
          filters.attendanceFrom || filters.attendanceTo
            ? {
                from: filters.attendanceFrom
                  ? parseFloat(filters.attendanceFrom)
                  : 0,
                to: filters.attendanceTo
                  ? parseFloat(filters.attendanceTo)
                  : 100,
              }
            : null,
      })
    );
  };

  const handleReset = () => {
    setFilters({
      searchTerm: "",
      classFilter: "",
      sectionFilter: "",
      attendanceFrom: "",
      attendanceTo: "",
    });
    dispatch(
      filterStudents({
        searchTerm: "",
        classFilter: "",
        sectionFilter: "",
        attendanceRange: null,
      })
    );
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Filter Students
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="searchTerm"
              className="block text-sm font-medium text-gray-700"
            >
              Search (Name/Roll No)
            </label>
            <input
              type="text"
              name="searchTerm"
              id="searchTerm"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={filters.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="classFilter"
              className="block text-sm font-medium text-gray-700"
            >
              Class
            </label>
            <select
              name="classFilter"
              id="classFilter"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={filters.classFilter}
              onChange={handleChange}
            >
              <option value="">All Classes</option>
              {uniqueClasses.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="sectionFilter"
              className="block text-sm font-medium text-gray-700"
            >
              Section
            </label>
            <select
              name="sectionFilter"
              id="sectionFilter"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={filters.sectionFilter}
              onChange={handleChange}
            >
              <option value="">All Sections</option>
              {uniqueSections.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="attendanceRange"
              className="block text-sm font-medium text-gray-700"
            >
              Attendance Range (%)
            </label>
            <div className="flex space-x-2 mt-1">
              <input
                type="number"
                name="attendanceFrom"
                placeholder="From"
                min="0"
                max="100"
                className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={filters.attendanceFrom}
                onChange={handleChange}
              />
              <input
                type="number"
                name="attendanceTo"
                placeholder="To"
                min="0"
                max="100"
                className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={filters.attendanceTo}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Reset
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentFilters;
