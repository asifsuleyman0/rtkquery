// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ onRefresh }) => {
  const { pathname } = useLocation();
  const menu = [
    { name: "Kurslar", path: "/courses" },
    { name: "Müəllimlər", path: "/teachers" },
    { name: "İstifadəçilər", path: "/users" },
    { name: "Xəbərlər", path: "/news" },
    { name: "Videolar", path: "/videos" },
    { name: "CV siyahısı", path: "/applicants" },
  ];

  const handleClick = (path) => {
    if (onRefresh) onRefresh(path); // click olduqda səhifəyə xəbər veririk
  };

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white p-6 flex flex-col shadow-xl">
      <h2 className="text-2xl font-extrabold mb-6 tracking-wider text-center text-yellow-400">
        Admin Panel
      </h2>
      <nav className="space-y-3 flex-1">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => handleClick(item.path)}
            className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 transform
              ${
                pathname === item.path
                  ? "bg-yellow-500 text-gray-900 shadow-inner scale-105"
                  : "hover:bg-yellow-600 hover:text-gray-100 hover:scale-105"
              }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-auto text-gray-400 text-sm text-center">
        &copy; {new Date().getFullYear()} Admin Panel
      </div>
    </div>
  );
};

export default Sidebar;
