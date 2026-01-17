import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const useBoardStore = create((set, get) => ({
  board: null,
  isLoading: false,
  error: null,

  fetchBoard: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/boards/${id}`);
      if (!response.ok) throw new Error("Failed to fetch board");
      const data = await response.json();
      set({ board: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  createBoard: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/boards`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to create board");
      const data = await response.json();
      set({ board: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateBoard: async (id, updates) => {
    const previousBoard = get().board;
    set({ board: { ...previousBoard, ...updates } });

    try {
      const response = await fetch(`${API_URL}/boards/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error("Failed to update board");
      const data = await response.json();
      set({ board: data });
    } catch (error) {
      set({ board: previousBoard, error: error.message });
    }
  },

  deleteBoard: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/boards/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete board");
      set({ board: null, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addTask: async (boardId) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boardId }),
      });
      if (!response.ok) throw new Error("Failed to add task");
      const newTask = await response.json();

      const currentBoard = get().board;
      if (currentBoard) {
        set({
          board: { ...currentBoard, tasks: [...currentBoard.tasks, newTask] },
        });
      }
    } catch (error) {
      console.error(error);
    }
  },

  updateTask: async (taskId, updates) => {
    const currentBoard = get().board;
    if (!currentBoard) return;

    const previousTasks = [...currentBoard.tasks];
    const updatedTasks = previousTasks.map((t) =>
      t._id === taskId ? { ...t, ...updates } : t,
    );

    set({ board: { ...currentBoard, tasks: updatedTasks } });

    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error("Failed to update task");
    } catch (error) {
      set({
        board: { ...currentBoard, tasks: previousTasks },
        error: error.message,
      });
    }
  },

  deleteTask: async (taskId) => {
    const currentBoard = get().board;
    if (!currentBoard) return;

    const previousTasks = [...currentBoard.tasks];
    set({
      board: {
        ...currentBoard,
        tasks: previousTasks.filter((t) => t._id !== taskId),
      },
    });

    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete task");
    } catch (error) {
      set({
        board: { ...currentBoard, tasks: previousTasks },
        error: error.message,
      });
    }
  },
}));

export default useBoardStore;
