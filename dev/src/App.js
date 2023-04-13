import UploadPage from "./pages/UploadPage/UploadPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import VisualizationPage from "./pages/VisualizationPage/VisualizationPage"
import { Routes, Route } from "react-router-dom";
import "./App.css"
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth"
import PersistentLogin from "./components/PersistentLogin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>

        <Route path="login" element={<LoginPage />} />
        
        <Route element={<PersistentLogin/>}>

          <Route path="/" element={<UploadPage />} />
          <Route path="visualization" element={<VisualizationPage/>} />

        </Route>

          <Route path="*" element={<p>Not found</p>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
