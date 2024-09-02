import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import GridView from "./components/GridView";
import TileView from "./components/TileView";
import StudentDetailModal from "./components/StudentDetailModal";
import EditStudentModal from "./components/EditStudentModal"; // Import the new modal component
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isTileView, setIsTileView] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleEditStudent = (student) => {
    setEditingStudent(student); 
  };

  const handleSaveStudent = (editedStudent) => {
    setStudents((prevStudents) =>
      prevStudents.map((s) =>
        s.login.uuid === editedStudent.login.uuid ? editedStudent : s
      )
    );
    setEditingStudent(null);
  };

  const handleDeleteStudent = (student) => {
    setStudents((prevStudents) =>
      prevStudents.filter((s) => s.login.uuid !== student.login.uuid)
    );
  };
  

  return (
    <Router>
      <div
        className={`font-sans min-h-screen pb-6 md:pb-0 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <Navbar />

        <div className="md:px-8 px-4 py-4">
          <div className="flex justify-between mb-8 mt-4">
            <button
              onClick={() => setIsTileView(!isTileView)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {isTileView ? "Switch to Grid View" : "Switch to Tile View"}
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-gray-800 text-white rounded"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          {loading ? (
            <div className="text-center text-3xl font-medium">Loading...</div>
          ) : isTileView ? (
            <TileView
              students={students}
              onSelectStudent={setSelectedStudent}
              onEditStudent={handleEditStudent}
              onDeleteStudent={handleDeleteStudent}
            />
          ) : (
            <GridView
              students={students}
              onSelectStudent={setSelectedStudent}
            />
          )}
        </div>

        {selectedStudent && (
          <StudentDetailModal
            student={selectedStudent}
            onClose={() => setSelectedStudent(null)}
          />
        )}

        {editingStudent && (
          <EditStudentModal
            student={editingStudent}
            onSave={handleSaveStudent}
            onClose={() => setEditingStudent(null)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
