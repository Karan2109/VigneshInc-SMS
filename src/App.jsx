import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Login from "./components/auth/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./components/students/AddStudent";
import ProtectedRoute from "./components/layout/ProtectedRoute";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 md:pl-64">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/students" element={<Students />} />
                </Route>
                <Route element={<ProtectedRoute roles={["admin"]} />}>
                  <Route path="/add-student" element={<AddStudent />} />
                </Route>
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
