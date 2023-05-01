import React from 'react';
import { Routes, Route } from "react-router-dom";
import { FileProvider } from "./context/FileContext";
import UploadPage from "./pages/UploadPage/UploadPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import VisualizationPage from "./pages/VisualizationPage/VisualizationPage"
import HomePage from './pages/HomePage/HomePage';
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth"
import PersistentLogin from "./components/PersistentLogin";
import "./App.css"

function App() {
  return (
    <div className="App">
      <FileProvider>
        <Routes>
          <Route path="/" element={<Layout />}>

          <Route path="login" element={<LoginPage />} />
          
          <Route element={<PersistentLogin/>}>

            <Route path='/' element={<HomePage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="visualization" element={<VisualizationPage/>} />

          </Route>

            <Route path="*" element={<p>Not found</p>} />
          </Route>
        </Routes>
      </FileProvider>
    </div>
  );
}

export default App;
