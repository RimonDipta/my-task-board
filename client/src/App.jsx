import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Board from "./components/Board";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Board />} />{" "}
      <Route path="/board/:id" element={<Board />} />
    </Routes>
  );
}

export default App;
