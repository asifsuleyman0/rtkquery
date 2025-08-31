import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      onLogin();
    } else {
      alert("İstifadəçi adı və ya şifrə yanlışdır");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl p-10 w-96 space-y-6 transform transition-all duration-500 hover:scale-105"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>

        <div className="space-y-4">
          <input
            className="border border-gray-300 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            type="text"
            placeholder="İstifadəçi adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="relative">
            <input
              className="border border-gray-300 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pr-12"
              type={showPassword ? "text" : "password"}
              placeholder="Şifrə"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-full p-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
        >
          Daxil ol
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          &copy; 2025 Sənin Şirkət
        </p>
      </form>
    </div>
  );
};

export default Login;
