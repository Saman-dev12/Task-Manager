import React, { useState } from "react";

const TaskCard = ({ task, onDelete, onComplete, onEdit, onTimeChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task?.text);

  const handleSaveEdit = () => {
    onEdit(editedText);
    setIsEditing(false);
  };

  return (
    <div
      className={`w-96 p-4 bg-white rounded shadow-md ${
        task?.status === "Completed" ? "opacity-50" : ""
      }`}
    >
      {isEditing ? (
        <div className="flex items-center justify-between">
          <input
            type="text"
            className="w-full p-2 mb-2 border rounded"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button
            className="p-2 bg-green-500 text-white rounded"
            onClick={handleSaveEdit}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div>{task?.text}</div>
          <div>
            {task?.status === "Pending" && (
              <>
                <button
                  className="p-2 bg-blue-500 text-white rounded mr-2"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
                <button
                  className="p-2 bg-yellow-500 text-white rounded mr-2"
                  onClick={() => onTimeChange(prompt("Enter time in hours:"))}
                >
                  Time
                </button>
                <button
                  className="p-2 bg-green-500 text-white rounded mr-2"
                  onClick={onComplete}
                >
                  Complete
                </button>
              </>
            )}
            <button
              className="p-2 bg-red-500 text-white rounded"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      <div className="mt-2">
        Status:{" "}
        <span
          className={`text-${
            task?.status === "Pending"
              ? "yellow"
              : task?.status === "Completed"
              ? "green"
              : "red"
          }-500`}
        >
          {task?.status}
        </span>
      </div>
      {task?.status === "Pending" && (
        <div className="mt-2">Time: {task?.time} hours</div>
      )}
    </div>
  );
};

export default TaskCard;
