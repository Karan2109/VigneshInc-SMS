import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentsData from "../assets/students.json";

// Async thunk to fetch students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    // In a real app, this would be an API call
    return studentsData;
  }
);

const initialState = {
  students: [],
  filteredStudents: [],
  status: "idle",
  error: null,
  currentPage: 1,
  studentsPerPage: 5,
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.unshift(action.payload);
      state.filteredStudents.unshift(action.payload);
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.rollNo !== action.payload
      );
      state.filteredStudents = state.filteredStudents.filter(
        (student) => student.rollNo !== action.payload
      );
    },
    filterStudents: (state, action) => {
      const { searchTerm, classFilter, sectionFilter, attendanceRange } =
        action.payload;

      let filtered = [...state.students];

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(
          (student) =>
            student.name.toLowerCase().includes(term) ||
            student.rollNo.toString().includes(term)
        );
      }

      if (classFilter) {
        filtered = filtered.filter((student) => student.class === classFilter);
      }

      if (sectionFilter) {
        filtered = filtered.filter(
          (student) => student.section === sectionFilter
        );
      }

      if (attendanceRange) {
        filtered = filtered.filter(
          (student) =>
            student.attendance >= attendanceRange.from &&
            student.attendance <= attendanceRange.to
        );
      }

      state.filteredStudents = filtered;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
        state.filteredStudents = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addStudent, deleteStudent, filterStudents, setCurrentPage } =
  studentSlice.actions;
export default studentSlice.reducer;
