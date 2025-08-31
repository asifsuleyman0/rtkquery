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
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-20 left-32 w-28 h-28 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 h-full">
            {[...Array(144)].map((_, i) => (
              <div key={i} className="border border-gray-600 animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Login Form */}
      <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-96 space-y-6 relative overflow-hidden border border-white/20">
        {/* Glowing Border Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5 -z-10">
          <div className="w-full h-full bg-white/10 backdrop-blur-lg rounded-3xl"></div>
        </div>

        {/* Animated Background Shapes */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-spin"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-30"></div>

        {/* Header */}
        <div className="text-center relative">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center animate-bounce">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-white text-center mb-2 tracking-wide">
            Admin Panel
          </h2>
          <p className="text-gray-300 text-sm">Sistem İdarəetmə Paneli</p>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div className="relative group">
            <input
              className="border border-white/30 bg-white/10 backdrop-blur-sm w-full p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-300"
              type="text"
              placeholder="İstifadəçi adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          
          <div className="relative group">
            <input
              className="border border-white/30 bg-white/10 backdrop-blur-sm w-full p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-300"
              type="password"
              placeholder="Şifrə"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="relative w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden group"
        >
          <span className="relative z-10">Panel-ə Daxil Ol</span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
        </button>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-400 text-xs">Məxfi məlumatları qoruyun</p>
          
          {/* Animated Security Icons */}
          <div className="flex justify-center space-x-4 mt-3">
            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Scanning Line Effect */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse opacity-50"></div>
      </div>
    </div>
  );
};

export default Login;