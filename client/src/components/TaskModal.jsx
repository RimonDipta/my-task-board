import React, { useState, useEffect } from "react";
import CloseRingIcon from "../assets/close_ring_duotone-1.svg";
import TimeAtackIcon from "../assets/Time_atack_duotone.svg";
import DoneIcon from "../assets/Done_round_duotone.svg";
import WontDoIcon from "../assets/close_ring_duotone.svg";
import TrashIcon from "../assets/Trash.svg";
import DoneRoundIcon from "../assets/Done_round.svg";

export default function TaskModal({ task, isOpen, onClose, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    status: "todo",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name,
        description: task.description || "",
        icon: task.icon || "👨‍💻",
        status: task.status,
      });
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task._id, formData);
    onClose();
  };

  const handleDelete = () => {
    onDelete(task._id);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center md:justify-end items-center p-3 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />
      <div
        className={`bg-white w-full max-w-[552px] h-[calc(100vh-1.5rem)] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative transform transition-transform duration-300 ${isOpen ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-y-0 md:translate-x-full"}`}
      >
        <div className="pt-4 px-6 pb-4 flex items-start justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Task details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
          >
            <img src={CloseRingIcon} alt="Close" className="w-5 h-5" />
          </button>
        </div>

        <form
          id="task-form"
          onSubmit={handleSubmit}
          className="px-6 pb-5 pt-0 overflow-y-auto space-y-5 flex-1"
        >
          <div className="space-y-1.5">
            <label className="text-[0.75rem] font-medium text-gray-400">
              Task name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full text-base font-normal text-gray-900 border-2 border-gray-200 rounded-lg px-[14px] py-[10px] focus:border-[#3662E3] outline-none transition-colors"
              placeholder="Enter task name"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[0.75rem] font-medium text-gray-400">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full text-base text-gray-500 border-2 border-gray-200 rounded-lg px-[14px] py-[10px] focus:border-[#3662E3] outline-none min-h-[150px] resize-none placeholder:text-gray-300 transition-colors"
              placeholder="Enter a short description"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[0.75rem] font-medium text-gray-400">
              Icon
            </label>
            <div className="flex gap-3">
              {["👨‍💻", "💬", "☕", "🏋️", "📚", "⏰"].map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`rounded-lg flex items-center justify-center text-[20px] p-3 transition-colors ${
                    formData.icon === icon
                      ? "bg-[#F5D565]"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[0.75rem] font-medium text-gray-400">
              Status
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  id: "in-progress",
                  label: "In Progress",
                  icon: TimeAtackIcon,
                  color: "bg-[#E9A23B]",
                },
                {
                  id: "completed",
                  label: "Completed",
                  icon: DoneIcon,
                  color: "bg-[#32D657]",
                },
                {
                  id: "wont-do",
                  label: "Won't do",
                  icon: WontDoIcon,
                  color: "bg-[#DD524C]",
                },
              ].map((status) => (
                <button
                  key={status.id}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, status: status.id })
                  }
                  className={`p-[2px] pr-3 rounded-2xl flex items-center justify-between border-2 transition-all h-[52px] ${
                    formData.status === status.id
                      ? "border-[#3662E3]"
                      : "border-white ring-1 ring-gray-100 hover:ring-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-xl flex items-center justify-center ${status.color ? "" : "bg-gray-200"} `}
                    >
                      {status.icon ? (
                        <div className={`p-2 rounded-lg ${status.color}`}>
                          <img
                            src={status.icon}
                            className="w-5 h-5"
                            alt={status.label}
                          />
                        </div>
                      ) : (
                        <div className="p-2 bg-gray-200 rounded-lg">
                          <div className="w-5 h-5 bg-white rounded-full opacity-50" />
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-[0.875rem] text-gray-900">
                      {status.label}
                    </span>
                  </div>

                  {formData.status === status.id && (
                    <div className="w-6 h-6 bg-[#3662E3] rounded-full flex items-center justify-center shrink-0">
                      <img
                        src={DoneRoundIcon}
                        className="w-4 h-4 brightness-0 invert"
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </form>

        <div className="px-6 pb-5 pt-4 flex gap-4 justify-end shrink-0 bg-white border-t border-gray-100/50">
          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-2 rounded-full bg-[#97A3B6] text-white text-[0.875rem] font-medium hover:bg-gray-500 transition-colors flex items-center gap-2"
          >
            Delete
            <img src={TrashIcon} alt="Delete" className="w-5 h-5" />
          </button>

          <button
            type="submit"
            form="task-form"
            className="px-6 py-2 rounded-full bg-[#3662E3] text-white text-[0.875rem] font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            Save
            <img src={DoneRoundIcon} alt="Save" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
