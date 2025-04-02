export const USER_ROLES = {
  ADMIN: "admin",
  STUDENT: "student",
};

export const CLASS_OPTIONS = [
  { value: "", label: "All Classes" },
  { value: "9", label: "Class 9" },
  { value: "10", label: "Class 10" },
  { value: "11", label: "Class 11" },
  { value: "12", label: "Class 12" },
];

export const SECTION_OPTIONS = [
  { value: "", label: "All Sections" },
  { value: "A", label: "Section A" },
  { value: "B", label: "Section B" },
  { value: "C", label: "Section C" },
  { value: "D", label: "Section D" },
];

export const TABLE_HEADERS = [
  { id: "rollNo", label: "Roll No", sortable: true },
  { id: "name", label: "Name", sortable: true },
  { id: "class", label: "Class", sortable: true },
  { id: "section", label: "Section", sortable: true },
  { id: "attendance", label: "Attendance (%)", sortable: true },
  { id: "actions", label: "Actions", sortable: false },
];

export const PAGINATION_OPTIONS = [5, 10, 25, 50];

export const ATTENDANCE_RANGE = {
  min: 0,
  max: 100,
};

export const SORT_DIRECTION = {
  ASC: "asc",
  DESC: "desc",
};

export const DEFAULT_PAGE_SIZE = 5;
