import { useState } from "react";
import {
  useGetTeachersQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} from "../store/api";

const Teachers = () => {
  const { data, isLoading, error } = useGetTeachersQuery();
  const [createTeacher] = useCreateTeacherMutation();
  const [updateTeacher] = useUpdateTeacherMutation();
  const [deleteTeacher] = useDeleteTeacherMutation();

  const [form, setForm] = useState({ 
    id: null, 
    firstName: "", 
    lastName: "",
    bio: "",
    photoUrl: "",
    linkedinUrl: ""
  });

  let teachers = Array.isArray(data) ? data : data?.content || [];

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName) {
      alert("Ad və soyad mütləqdir!");
      return;
    }
    
    try {
      const teacherData = {
        firstName: form.firstName,
        lastName: form.lastName,
        bio: form.bio || "",
        photoUrl: form.photoUrl || "",
        linkedinUrl: form.linkedinUrl || ""
      };

      if (form.id) {
        await updateTeacher({ id: form.id, ...teacherData });
      } else {
        await createTeacher(teacherData);
      }

      setForm({ id: null, firstName: "", lastName: "", bio: "", photoUrl: "", linkedinUrl: "" });
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Xəta baş verdi: " + (err?.data?.message || err.message));
    }
  };

  const handleEdit = (teacher) => {
    setForm({
      id: teacher.id,
      firstName: teacher.firstName || "",
      lastName: teacher.lastName || "",
      bio: teacher.bio || "",
      photoUrl: teacher.photoUrl || "",
      linkedinUrl: teacher.linkedinUrl || ""
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu müəllimi silmək istədiyinizdən əminsiniz?")) {
      try {
        await deleteTeacher(id);
      } catch (err) {
        console.error("Delete error:", err);
        alert("Silinmə zamanı xəta baş verdi!");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-4">
            <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-blue-500/20 border-b-blue-500 rounded-full animate-spin mx-auto" style={{animationDirection: 'reverse'}}></div>
          </div>
          <p className="text-white text-xl animate-pulse">Müəllimlər yüklənir...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex items-center justify-center p-6">
        <div className="bg-red-500/10 backdrop-blur-lg border border-red-500/30 rounded-3xl p-8 text-center max-w-md">
          <div className="w-20 h-20 bg-red-500/20 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
            <svg className="w-10 h-10 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zM9 8a1 1 0 000 2v4a1 1 0 002 0V8z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-red-300 text-xl font-semibold mb-2">Xəta baş verdi</h3>
          <p className="text-red-400">Müəllimlər yüklənmədi</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-60 right-32 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce"></div>
        <div className="absolute bottom-32 left-40 w-36 h-36 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-60 right-20 w-28 h-28 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-20 h-full">
            {[...Array(400)].map((_, i) => (
              <div key={i} className="border border-gray-600"></div>
            ))}
          </div>
        </div>

        {/* Floating Particles */}
        {[...Array(25)].map((_, i) => (
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

      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center animate-pulse">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM5 6a5 5 0 1110 0A5 5 0 015 6zM10 12c-3.868 0-7 1.79-7 4v1a1 1 0 001 1h12a1 1 0 001-1v-1c0-2.21-3.132-4-7-4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Müəllimlər
              </h1>
              <p className="text-gray-400 mt-2">Müəllimləri əlavə et və idarə et</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-lg">{teachers.length}</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Ümumi Müəllimlər</p>
                  <p className="text-gray-400 text-sm">Aktiv müəllim sayı</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center animate-pulse">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-white font-semibold">Yeni Əlavələr</p>
                  <p className="text-gray-400 text-sm">Bu həftə</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">Aktiv Status</p>
                  <p className="text-gray-400 text-sm">Sistem işləyir</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-6 mb-8 space-y-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-white text-xl font-semibold">
              {form.id ? "Müəllimi Redaktə Et" : "Yeni Müəllim Əlavə Et"}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative group">
              <input
                className="border border-white/30 bg-white/10 backdrop-blur-sm w-full p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-300"
                placeholder="Ad"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            
            <div className="relative group">
              <input
                className="border border-white/30 bg-white/10 backdrop-blur-sm w-full p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-300"
                placeholder="Soyad"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            
            <div className="relative group">
              <input
                className="border border-white/30 bg-white/10 backdrop-blur-sm w-full p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-300"
                placeholder="LinkedIn URL"
                value={form.linkedinUrl}
                onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <input
                className="border border-white/30 bg-white/10 backdrop-blur-sm w-full p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-300"
                placeholder="Bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            
            <div className="relative group">
              <input
                className="border border-white/30 bg-white/10 backdrop-blur-sm w-full p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-300"
                placeholder="Şəkil URL"
                value={form.photoUrl}
                onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden group"
          >
            <span className="relative z-10">
              {form.id ? "Yenilə" : "Əlavə et"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
          </button>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teachers.map((teacher, index) => (
            <div 
              key={teacher.id} 
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-2xl group"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="relative overflow-hidden">
                {teacher.photoUrl ? (
                  <img 
                    src={teacher.photoUrl} 
                    alt={teacher.firstName} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-white/60 text-sm">Şəkil yoxdur</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                    {teacher.firstName} {teacher.lastName}
                  </h3>
                  <p className="text-gray-300 text-sm line-clamp-3 group-hover:text-gray-200 transition-colors duration-300 mb-3">
                    {teacher.bio || "Bio məlumatı əlavə edilməyib"}
                  </p>
                  {teacher.linkedinUrl && (
                    <a 
                      href={teacher.linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm transition-colors duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEdit(teacher)}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-orange-500 hover:to-yellow-500 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Redaktə
                  </button>
                  <button
                    onClick={() => handleDelete(teacher.id)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {teachers.length === 0 && (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-12 text-center">
            <div className="w-24 h-24 bg-gray-500/20 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM5 6a5 5 0 1110 0A5 5 0 015 6zM10 12c-3.868 0-7 1.79-7 4v1a1 1 0 001 1h12a1 1 0 001-1v-1c0-2.21-3.132-4-7-4z" />
              </svg>
            </div>
            <h3 className="text-white text-2xl font-semibold mb-3">Hələ ki müəllim yoxdur</h3>
            <p className="text-gray-400 mb-6">İlk müəlliminizi əlavə etmək üçün yuxarıdakı formu doldurun</p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto animate-pulse"></div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Teachers;