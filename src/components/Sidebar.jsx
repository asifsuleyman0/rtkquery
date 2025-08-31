import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();
  const menu = [
    { name: "Kurslar", path: "/courses" },
    { name: "Müəllimlər", path: "/teachers" },
    { name: "İstifadəçilər", path: "/users" },
    { name: "Xəbərlər", path: "/news" },
    { name: "Videolar", path: "/videos" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block p-2 rounded ${
              pathname === item.path ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
