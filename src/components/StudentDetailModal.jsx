import React, { useEffect } from "react";
import { gsap } from "gsap";

function StudentDetailModal({ student, onClose }) {
  useEffect(() => {
    gsap.fromTo(
      ".modal",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.inOut" }
    );
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg modal relative flex flex-col gap-[8px]">
        <button
          className="absolute top-2 right-2 text-gray-600 dark:text-white text-lg"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold">
          {student.name.first} {student.name.last}
        </h2>
        <p>Email: {student.email}</p>
        <p>ID: {student.login.uuid}</p>
        <p>Location: {student.location.city}, {student.location.country}</p>
        <p>Phone: {student.phone}</p>
        <p>Cell: {student.cell}</p>
      </div>
    </div>
  );
}

export default StudentDetailModal;
