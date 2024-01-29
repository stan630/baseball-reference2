import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Roster from "./pages/Roster";
import './App.css'
import AddPlayer from "./pages/AddPlayer";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <ToastContainer position="top-center" /> */}
        <Routes>
          <Route exact path="/" element={<Roster />} />
          <Route path="/add" element={<AddPlayer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
