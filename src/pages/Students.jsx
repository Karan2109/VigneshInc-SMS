import React from "react";
import StudentFilters from "../components/students/StudentFilters";
import StudentTable from "../components/students/StudentTable";

const Students = () => {
  return (
    <div className="p-4">
      <StudentFilters />
      <StudentTable />
    </div>
  );
};

export default Students;
