"use client";
import { userAtom } from "@/atoms/userAtom";
import { CheckCircle, Clock, Loader2, Pencil, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);

      try {
        let response = await fetch(
          "http://localhost:5000/api/tasks/getAllTasks",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.status === 200) {
          let data = await response.json();
          // console.log(data);
          setTasks(data);
        } else {
          toast.error("Failed to load tasks");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    getTasks();
  }, []);

  const addTask = async () => {
    // Validate that newTaskTime is a non-empty string and is a valid integer
    if (
      newTask.trim() !== "" &&
      newTaskTime.trim() !== "" &&
      Number.isInteger(parseInt(newTaskTime))
    ) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { text: newTask, time: newTaskTime, completed: completed },
      ]);

      const add = await fetch("http://localhost:5000/api/tasks/addTask", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newTask,
          time: newTaskTime,
          completed: completed,
        }),
      });

      const res = await add.json();
      toast.success(res.msg);
      // console.log(res);
      setNewTask("");
      setNewTaskTime("");
    } else {
      // Handle validation error
      toast.error("Validation failed for newTaskTime");
      // You might want to display an error message to the user or take other actions
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const del = await fetch(
        `http://localhost:5000/api/tasks/deleteTask/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const deleteResponse = await del.json();
      // console.log(deleteResponse);

      if (del.status === 200) {
        toast.success(deleteResponse.msg);
        const response = await fetch(
          "http://localhost:5000/api/tasks/getAllTasks",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setTasks(data);
        } else {
          toast.error("Failed to load tasks:", response.statusText);
          // You might want to handle this error, e.g., show a user-friendly message
        }
      } else {
        toast.error("Failed to delete task");
        // You might want to handle this error, e.g., show a user-friendly message
      }
    } catch (error) {
      toast.error("Error during task deletion:", error);
      // You might want to handle this error, e.g., show a user-friendly message
    }
  };

  const toggleCompletion = async (taskId) => {
    // setTasks((prevTasks) =>
    //   prevTasks.map((task) =>
    //     task.id === taskId ? { ...task, completed: !task.completed } : task
    //   )
    // );
    try {
      const complete = await fetch(
        "http://localhost:5000/api/tasks/completed/" + taskId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const res = await complete.json();
      // console.log(res);

      if (complete.status === 200) {
        toast.success(res.msg);
        const response = await fetch(
          "http://localhost:5000/api/tasks/getAllTasks",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setTasks(data);
        } else {
          toast.error("Failed to load tasks:", response.statusText);
          // You might want to handle this error, e.g., show a user-friendly message
        }
      }
    } catch (error) {
      toast(error.message);
    }
  };

  const isTaskExpired = (task) => {
    return task.completed && parseInt(task.time) * 60 * 60 === 0;
  };

  return (
    <div
      className="container mx-auto pt-10"
      style={{
        backgroundImage: 'url("/bg.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Task Manager</h1>
      </div>

      <div className="mb-8 flex items-center">
        <input
          type="text"
          className="border border-gray-300 p-2 w-64 rounded-l"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="text"
          className="border border-gray-300 p-2 w-24 rounded-r ml-2"
          placeholder="Time"
          value={newTaskTime}
          onChange={(e) => setNewTaskTime(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      {!loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {tasks && tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div
                key={index}
                className={`border p-4 rounded-md bg-white ${
                  task.completed ? "opacity-50 bg-green-300" : ""
                } ${
                  isTaskExpired(task) ? "opacity-50 bg-red-300" : ""
                } shadow-md transition duration-300 transform hover:scale-95`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold">{task.text}</span>
                  <div className="flex gap-2">
                    <button
                      className={`bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-full ${
                        task.completed ? "hidden" : ""
                      }`}
                      onClick={() => toggleCompletion(task._id)}
                    >
                      <CheckCircle size={20} />
                    </button>
                    <button
                      className={`  font-bold py-1 px-2 rounded-full text-blue-500 ${
                        task.completed ? "hidden" : ""
                      }`}
                      onClick={() => {}}
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteTask(task._id)}
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center text-sm ">
                  <span className="mr-1 flex">
                    <Clock size={16} />
                  </span>
                  <span>{task.time} hours</span>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-2xl text-black">No tasks yet...</h1>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full ">
          <h1 className="font-medium text-gray-800 dark:text-gray-200">
            <Loader2 size={80} className="animate-spin text-blue-500" />
          </h1>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
