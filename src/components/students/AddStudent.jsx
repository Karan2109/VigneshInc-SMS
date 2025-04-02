import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../../store/studentSlice";

const AddStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    class: "",
    section: "",
    attendance: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newStudent = {
      ...formData,
      rollNo: parseInt(formData.rollNo),
      attendance: parseFloat(formData.attendance),
    };

    // Simulate API call delay
    setTimeout(() => {
      dispatch(addStudent(newStudent));
      navigate("/students", { state: { success: true } });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Add New Student</h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill in the details to register a new student
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Roll Number */}
              <div>
                <label
                  htmlFor="rollNo"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Roll Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="rollNo"
                  id="rollNo"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  value={formData.rollNo}
                  onChange={handleChange}
                />
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Class */}
              <div>
                <label
                  htmlFor="class"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Class <span className="text-red-500">*</span>
                </label>
                <select
                  name="class"
                  id="class"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  value={formData.class}
                  onChange={handleChange}
                >
                  <option value="">Select Class</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
              </div>

              {/* Section */}
              <div>
                <label
                  htmlFor="section"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Section <span className="text-red-500">*</span>
                </label>
                <select
                  name="section"
                  id="section"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  value={formData.section}
                  onChange={handleChange}
                >
                  <option value="">Select Section</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                </select>
              </div>

              {/* Attendance */}
              <div>
                <label
                  htmlFor="attendance"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Attendance (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="attendance"
                  id="attendance"
                  min="0"
                  max="100"
                  step="0.1"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  value={formData.attendance}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => navigate("/students")}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  "Add Student"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
