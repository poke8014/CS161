import React from 'react';
import { Routes, Route } from "react-router-dom";
import { FileProvider } from './components/FileContext';
import UploadPage from "./pages/UploadPage/UploadPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import VisualizationPage from "./pages/VisualizationPage/VisualizationPage"
import "./App.css"

function App() {
  return (
    <div className="App">
      <FileProvider>
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/visualization" element={<VisualizationPage/>} />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </FileProvider>
    </div>
  );
}

export default App;
