import React, { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import { VisualProvider } from "./context/VisualContext";
import { FileProvider } from "./context/FileContext";
import Loading from "./components/Loading"

const UploadPage = lazy(() => import("./pages/UploadPage/UploadPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const VisualizationPage = lazy(() => import("./pages/VisualizationPage/VisualizationPage"));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const Layout = lazy(() => import("./components/Layout"));
const PersistentLogin = lazy(() => import("./components/PersistentLogin"));
import "./App.css"

function App() {
  return (
    <>
      <FileProvider>
      <VisualProvider>
      <Suspense fallback={<Loading />}
      >
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
        </Suspense>
        </VisualProvider>
      </FileProvider>
      </>
  );
}

export default App;
