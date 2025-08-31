import { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Courses from "./pages/Courses";
import Teachers from "./pages/Teachers";
import Users from "./pages/Users";
import News from "./pages/News";
import Videos from "./pages/Videos";
import Login from "./pages/Login";
import Applicants from "./pages/Applicants";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const refetchApplicants = useRef(null); // Applicants səhifəsinin refetch funksiyasını saxlayırıq

  if (!isAuth) return <Login onLogin={() => setIsAuth(true)} />;

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar onRefresh={(path) => {
          if (path === "/applicants" && refetchApplicants.current) {
            refetchApplicants.current(); // Sidebar klikləndikdə refetch çağırılır
          }
        }} />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/courses" />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/users" element={<Users />} />
            <Route path="/news" element={<News />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/applicants" element={<Applicants refetchApplicants={refetchApplicants} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
