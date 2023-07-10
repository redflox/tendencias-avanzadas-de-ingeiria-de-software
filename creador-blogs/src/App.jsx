import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadFile from './components/UploadFile';
import FormXSD from './components/FormXSD';
import Navbar from './components/Navbar';
import BlogGenerator from './components/BlogGenerator';

function App() {  
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<BlogGenerator />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/form" element={<FormXSD />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
