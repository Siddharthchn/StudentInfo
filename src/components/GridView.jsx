import React from "react";

function GridView({ students, onSelectStudent }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 md:gap-y-6 md:gap-x-4 gap-4">
      {students.map((student, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 p-4 shadow-xl cursor-pointer text-black dark:text-white rounded-md border border-gray-200 dark:border-none flex flex-col gap-[2px]"
          onClick={() => onSelectStudent(student)}
        >
          <h3 className="text-lg font-semibold truncate">
            {student.name.first} {student.name.last}
          </h3>
          <p className="text-sm break-words max-w-full text-ellipsis overflow-hidden">
            {student.email}
          </p>
          <p className="text-sm break-words max-w-full text-ellipsis overflow-hidden">
            ID: {student.login.uuid}
          </p>
        </div>
      ))}
    </div>
  );
}

export default GridView;
