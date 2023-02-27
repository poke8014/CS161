import UploadPage from "./pages/UploadPage/UploadPage";
import LoginPage from "./pages/loginPage/LoginPage";
import { Routes, Route } from "react-router-dom";
import "./App.css"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    </div>
  );
}

export default App;
