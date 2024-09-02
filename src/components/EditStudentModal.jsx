import React, { useState, useEffect } from "react";
import { gsap } from "gsap";

function EditStudentModal({ student, onSave, onClose }) {
  const [editedStudent, setEditedStudent] = useState({ ...student });

  useEffect(() => {
    gsap.fromTo(
      ".edit-modal",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.inOut" }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({
      ...prev,
      name: {
        ...prev.name,
        [name]: value,
      },
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg edit-modal relative flex flex-col gap-[8px] w-full max-w-xs md:max-w-xl">
        <button
          className="absolute top-2 right-2 text-gray-600 dark:text-white text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Edit Student Details</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="first"
              value={editedStudent.name.first}
              onChange={handleNameChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="last"
              value={editedStudent.name.last}
              onChange={handleNameChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={editedStudent.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={editedStudent.phone}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Cell</label>
            <input
              type="text"
              name="cell"
              value={editedStudent.cell}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
            onClick={() => onSave(editedStudent)}
          >
            Save
          </button>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditStudentModal;
