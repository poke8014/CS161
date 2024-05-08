import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { VisualProvider } from "./context/VisualContext";
import { FileProvider } from "./context/FileContext";
import Loading from "./components/Loading";
import PersistentLogin from "./components/PersistentLogin";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./components/Layout";
const UploadPage = lazy(() => import("./pages/UploadPage/UploadPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const VisualizationPage = lazy(() =>
  import("./pages/VisualizationPage/VisualizationPage")
);
import "./App.css";

function App() {
  return (
    <>
      <FileProvider>
        <VisualProvider>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="login" element={<LoginPage />} />

                <Route path="/" element={<PersistentLogin />}>
                  <Route index element={<HomePage />} />
                  <Route path="upload" element={<UploadPage />} />

                  <Route path="visualization" element={<VisualizationPage />} />
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
