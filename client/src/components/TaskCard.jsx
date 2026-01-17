import React from "react";

import TimeAtackIcon from "../assets/Time_atack_duotone.svg";
import DoneIcon from "../assets/Done_round_duotone.svg";
import WontDoIcon from "../assets/close_ring_duotone.svg";

export default function TaskCard({ task, onEdit, isSelected }) {
  const statusStyles = {
    todo: {
      bg: "#E3E8EF",
      text: "text-gray-800",
      icon: null,
      iconBg: "transparent",
    },
    "in-progress": {
      bg: "#F5D565",
      text: "text-gray-800",
      icon: TimeAtackIcon,
      iconBg: "#E9A23B",
    },
    completed: {
      bg: "#A0ECB1",
      text: "text-gray-800",
      icon: DoneIcon,
      iconBg: "#32D657",
    },
    "wont-do": {
      bg: "#F7D4D3",
      text: "text-gray-800",
      icon: WontDoIcon,
      iconBg: "#DD524C",
    },
  };

  const currentStyle = statusStyles[task.status] || statusStyles["todo"];

  return (
    <div
      className={`p-4 rounded-2xl border flex items-start gap-5 hover:shadow-md transition-all cursor-pointer group hover:border-[#3662E3] hover:ring-1 hover:ring-[#3662E3] ${
        isSelected
          ? "border-[#3662E3] ring-1 ring-[#3662E3]"
          : "border-gray-100"
      }`}
      style={{ backgroundColor: currentStyle.bg }}
      onClick={() => onEdit(task)}
    >
      <div className="p-3 bg-white rounded-lg text-[18px] shrink-0">
        {task.icon || "📝"}
      </div>

      <div className="flex-1 min-w-0 py-2">
        <h2 className="font-semibold text-[1.25rem] text-gray-900 truncate">
          {task.name}
        </h2>
        {task.description && (
          <p className="text-gray-900 text-sm mt-1 line-clamp-2 pr-5">
            {task.description}
          </p>
        )}
      </div>

      {currentStyle.icon && (
        <div
          className="shrink-0 p-3 rounded-lg"
          style={{ backgroundColor: currentStyle.iconBg }}
        >
          <img src={currentStyle.icon} alt={task.status} className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
