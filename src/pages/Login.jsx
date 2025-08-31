import { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      onLogin();
    } else {
      alert("İstifadəçi adı və ya şifrə yanlışdır");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl p-8 w-80 space-y-6 relative overflow-hidden"
      >
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>

        <h2 className="text-2xl font-extrabold text-gray-800 text-center mb-4 tracking-wide">
          Admin Login
        </h2>

        <input
          className="border border-gray-300 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
          type="text"
          placeholder="İstifadəçi adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border border-gray-300 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
          type="password"
          placeholder="Şifrə"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
        >
          Daxil ol
        </button>
      </form>
    </div>
  );
};

export default Login;
