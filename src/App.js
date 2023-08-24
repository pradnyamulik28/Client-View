import "./App.css";
import React from "react";
import ClientLogin from "./client_mobile/ClientLogin";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DocFolder from './client_mobile/DocFolder';
import FileDownload from "./client_mobile/FileDownload";
import PasswordCheck from "./client_mobile/PasswordCheck"

function App() {
 
  return (
    <Router>    
      <Routes>
      <Route path="/" element={<ClientLogin />} />
      <Route path="/passwordcheck" element={<PasswordCheck />} />
      <Route exact path="/folder" element={<DocFolder />} />
     <Route exact path="/viewfile" element={<FileDownload />} />
    </Routes>
  </Router>
  );
}

export default App;
