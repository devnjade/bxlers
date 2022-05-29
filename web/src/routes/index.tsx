import { Mint } from "pages";
import React from "react";
import { Routes, Route } from "react-router-dom";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Mint />} />
    </Routes>
  )
}

export default Router;