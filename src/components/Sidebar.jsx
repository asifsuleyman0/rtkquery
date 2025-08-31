import { Link, useLocation } from "react-router-dom";
import { FaBook, FaChalkboardTeacher, FaUsers, FaNewspaper, FaVideo } from "react-icons/fa";

const Sidebar = () => {
  const { pathname } = useLocation();
  const menu = [
    { name: "Kurslar", path: "/courses", icon: <FaBook /> },
    { name: "Müəllimlər", path: "/teachers", icon: <FaChalkboardTeacher /> },
    { name: "İstifadəçilər", path: "/users", icon: <FaUsers /> },
    { name: "Xəbərlər", path: "/news", icon: <FaNewspaper /> },
    { name: "Videolar", path: "/videos", icon: <FaVideo /> },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 flex flex-col h-screen shadow-xl rounded-r-2xl">
      <h2 className="text-2xl font-bold mb-8 text-center tracking-wide border-b border-gray-700 pb-3">Admin Panel</h2>
      <nav className="flex-1 space-y-3 mt-4">
        {menu.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300
                ${isActive ? "bg-blue-600 shadow-lg" : "hover:bg-gray-700 hover:shadow-md"}`}>
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto text-gray-400 text-sm text-center pt-4 border-t border-gray-700">
        &copy; 2025 Digacc.az
      </div>
    </div>
  );
};

export default Sidebar;
