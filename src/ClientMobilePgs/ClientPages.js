import "../App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ClientLogin from "./ClientLogin/ClientLogin";
import ClientDocFolder from './ClientDocFolder/ClientDocFolder';
import ClientFileView from "./ClientFileView/ClientFileView";
import ClientPassCheck from "./ClientPassCheck/ClientPassCheck"

function ClientPages() {
  return (
    <Router>    
      <Routes>
      <Route path="/" element={<ClientLogin />} />
      <Route path="/clientpasscheck" element={<ClientPassCheck />} />
      <Route exact path="/clientdocfolder" element={<ClientDocFolder />} />
     <Route exact path="/clientfileview" element={<ClientFileView />} />
    </Routes>
  </Router>
  );
}

export default ClientPages;
