import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useBoardStore from "../store/useBoardStore";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

import Logo from "../assets/Logo.svg";
import AddIcon from "../assets/Add_round_duotone.svg";
import EditIcon from "../assets/Edit_duotone.svg";

export default function Board() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    board,
    isLoading,
    error,
    fetchBoard,
    createBoard,
    updateBoard,
    addTask,
    updateTask,
    deleteTask,
  } = useBoardStore();

  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBoard(id);
    } else {
      createBoard().then((newBoard) => {
        if (newBoard) navigate(`/board/${newBoard._id}`);
      });
    }
  }, [id, fetchBoard, createBoard, navigate]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading board...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  if (!board) return null;

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCreateTask = async () => {
    await addTask(board._id);
  };

  const handleSaveTask = (taskId, updates) => {
    updateTask(taskId, updates);
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  const saveBoardTitle = (e) => {
    if (e.key === "Enter" || e.type === "blur") {
      setIsEditingTitle(false);
      updateBoard(board._id, { name: e.target.value });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-[552px] mx-auto pt-12 pb-12 px-4 sm:px-0">
        {/* Header */}
        <div className="mb-10">
          <div className="flex gap-4 items-center group">
            <div className="p-0 shrink-0">
              <img src={Logo} alt="Logo" className="w-10 h-10" />
            </div>
            <div className="flex-1">
              {isEditingTitle ? (
                <input
                  autoFocus
                  defaultValue={board.name}
                  onBlur={saveBoardTitle}
                  onKeyDown={saveBoardTitle}
                  className="text-[2.5rem] font-normal text-gray-900 w-full border-b pb-1 focus:outline-none"
                />
              ) : (
                <h1
                  onClick={() => setIsEditingTitle(true)}
                  className="text-[2.5rem] font-normal text-gray-900 cursor-pointer hover:bg-gray-50 rounded px-2 -ml-2 transition-colors inline-flex items-center gap-2"
                >
                  {board.name}
                  <img src={EditIcon} alt="Edit" className="w-6 h-6" />
                </h1>
              )}
            </div>
          </div>
          <div>
            <input
              defaultValue={board.description || ""}
              onBlur={(e) =>
                updateBoard(board._id, { description: e.target.value })
              }
              className="text-gray-900 mt-3 bg-transparent text-base text-[1rem] w-full focus:outline-none hover:bg-gray-50 rounded px-2 -ml-2"
              placeholder="Enter board description"
            />
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-5">
          {board.tasks &&
            board.tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                isSelected={selectedTask?._id === task._id}
              />
            ))}

          {/* Add New Task Button */}
          <button
            onClick={handleCreateTask}
            className="w-full p-4 rounded-2xl bg-[#F5E8D5] flex items-center gap-4 hover:bg-[#E9A23B]/20 transition-colors group cursor-pointer text-left"
          >
            <div className="p-3 bg-[#E9A23B] rounded-lg text-white group-hover:bg-[#E9A23B] transition-colors">
              <img src={AddIcon} alt="Add" className="w-6 h-6" />
            </div>
            <span className="font-semibold text-[1rem] text-gray-900">
              Add new task
            </span>
          </button>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
