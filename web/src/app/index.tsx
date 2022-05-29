import React from "react";
import { ToastContainer } from "react-toastify";
import Router from "routes";

const App: React.FC = () => {
  return (
    <>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App;