import React from "react";

function TileView({ students, onSelectStudent, onEditStudent, onDeleteStudent }) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {students.map((student, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 p-4 shadow-lg cursor-pointer text-black dark:text-white rounded-md border border-gray-200 dark:border-none"
          onClick={() => onSelectStudent(student)}
        >
          <h3 className="text-lg font-semibold truncate">
            {student.name.first} {student.name.last}
          </h3>
          <p className="text-sm break-words max-w-full text-ellipsis overflow-hidden">
            {student.email}
          </p>
          <div className="flex justify-end mt-2">
            <button
              className="text-blue-500 dark:text-blue-300"
              onClick={(e) => {
                e.stopPropagation();
                onEditStudent(student);
              }}
            >
              Edit
            </button>
            <button
              className="text-red-500 dark:text-red-300 ml-2"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteStudent(student);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TileView;
