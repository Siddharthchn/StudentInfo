import React, { useState } from "react";

// Dummy student data
const students = Array.from({ length: 10 }, (_, id) => ({
  id: id + 1,
  name: `Student ${id + 1}`,
  email: `student${id + 1}@example.com`,
  age: 20 + id,
  location: "City " + (id + 1),
  details: `This is detailed information about Student ${id + 1}.`
}));

function App() {
  const [view, setView] = useState("grid"); // "grid" or "tile"
  const [selectedStudent, setSelectedStudent] = useState(null);

  const toggleView = () => setView(view === "grid" ? "tile" : "grid");

  const selectStudent = (student) => setSelectedStudent(student);

  const closeDetails = () => setSelectedStudent(null);

  return (
    <div className="App">
      <header className="bg-gray-800 text-white p-4">
        <nav className="flex justify-between items-center">
          <div className="hamburger-menu lg:hidden">
            <button className="text-white">☰</button>
            <ul className="hidden">
              <li className="p-2">Home</li>
              <li className="p-2">Services</li>
              <li className="p-2">About</li>
              <li className="p-2">Contact</li>
            </ul>
          </div>
          <ul className="hidden lg:flex space-x-4">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">Services</li>
            <li className="hover:underline cursor-pointer">About</li>
            <li className="hover:underline cursor-pointer">Contact</li>
          </ul>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={toggleView}
          >
            Toggle to {view === "grid" ? "Tile" : "Grid"} View
          </button>
        </nav>
      </header>

      <main className="p-4">
        {selectedStudent ? (
          <div className="student-details bg-white p-6 rounded shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl mb-4">{selectedStudent.name}</h2>
            <p>Email: {selectedStudent.email}</p>
            <p>Age: {selectedStudent.age}</p>
            <p>Location: {selectedStudent.location}</p>
            <p>{selectedStudent.details}</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={closeDetails}
            >
              Back to Tiles
            </button>
          </div>
        ) : (
          <div
            className={`${
              view === "grid"
                ? "grid grid-cols-5 gap-4"
                : "flex flex-wrap justify-center"
            }`}
          >
            {students.map((student) => (
              <div
                key={student.id}
                className="student-card bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-100"
                onClick={() => selectStudent(student)}
              >
                <h3 className="text-lg font-bold">{student.name}</h3>
                <p>{student.email}</p>
                {view === "tile" && (
                  <div className="tile-actions flex space-x-2 mt-2">
                    <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                      Edit
                    </button>
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                      Flag
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
