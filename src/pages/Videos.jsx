import { useState } from "react";
import {
  useGetVideosQuery,
  useCreateVideoMutation,
  useDeleteVideoMutation,
} from "../store/videoApi.js";

const Videos = () => {
  const { data: response, isLoading, error } = useGetVideosQuery();
  const [createVideo] = useCreateVideoMutation();
  const [deleteVideo] = useDeleteVideoMutation();

  const [videoFile, setVideoFile] = useState(null);

  const data = Array.isArray(response)
    ? response
    : response?.data?.videos || [];

  const handleSubmit = async () => {
    if (!videoFile) {
      alert("Video faylı seçilməyib!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("video", videoFile);

      await createVideo(formData);

      setVideoFile(null);
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Xəta baş verdi: " + (err?.data?.message || err.message));
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
          <p className="text-white text-xl animate-pulse">Videolar yüklənir...</p>
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
          <p className="text-red-400">Videolar yüklənmədi</p>
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

      <div className="relative z-10 p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center animate-pulse">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Video İdarəetmə
              </h1>
              <p className="text-gray-400 mt-2">Video fayllarını yüklə və idarə et</p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-lg">{data.length}</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Ümumi Videolar</p>
                  <p className="text-gray-400 text-sm">Yüklənmiş video sayı</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center animate-pulse">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-white font-semibold">Aktiv Status</p>
                  <p className="text-gray-400 text-sm">Sistem işləyir</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">Yüklənmə</p>
                  <p className="text-gray-400 text-sm">Hazırdır</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-6 mb-8 space-y-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-white text-xl font-semibold">Video Yüklə</h3>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative group flex-1">
              <input
                type="file"
                accept="video/*"
                className="border border-white/30 bg-white/10 backdrop-blur-sm w-full p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-purple-500 file:text-white file:cursor-pointer hover:file:from-purple-500 hover:file:to-blue-500"
                onChange={(e) => setVideoFile(e.target.files[0])}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            
            <button
              onClick={handleSubmit}
              className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>Video Yüklə</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
            </button>
          </div>

          {videoFile && (
            <div className="bg-green-500/10 backdrop-blur-sm border border-green-500/30 rounded-2xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-green-300 font-medium">Seçilmiş fayl: {videoFile.name}</p>
                  <p className="text-green-400/80 text-sm">Ölçü: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Table */}
        {data.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border-b border-white/20">
                    <th className="px-6 py-4 text-left text-white font-semibold tracking-wide">#</th>
                    <th className="px-6 py-4 text-left text-white font-semibold tracking-wide">Orijinal Ad</th>
                    <th className="px-6 py-4 text-left text-white font-semibold tracking-wide">Fayl Adı</th>
                    <th className="px-6 py-4 text-left text-white font-semibold tracking-wide">Ölçü</th>
                    <th className="px-6 py-4 text-left text-white font-semibold tracking-wide">Yüklənmə Tarixi</th>
                    <th className="px-6 py-4 text-left text-white font-semibold tracking-wide">Əməliyyatlar</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((video, index) => (
                    <tr 
                      key={video.id} 
                      className="border-b border-white/10 hover:bg-white/10 transition-all duration-300 group"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <td className="px-6 py-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {video.id}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8 5a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zM6 8a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8zM8 10a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm0 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-white font-medium group-hover:text-cyan-300 transition-colors duration-300">
                              {video.original_name}
                            </p>
                            <p className="text-gray-400 text-sm">Video faylı</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-300 group-hover:text-white transition-colors duration-300 font-mono text-sm">
                          {video.filename}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                          <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                            {(video.file_size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-400 text-sm">
                          {new Date(video.uploaded_at).toLocaleString('az-AZ')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteVideo(video.id)}
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-pink-500 hover:to-red-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L7.586 12l-1.293 1.293a1 1 0 001.414 1.414L9 13.414l1.293 1.293a1 1 0 001.414-1.414L10.414 12l1.293-1.293z" clipRule="evenodd" />
                          </svg>
                          <span>Sil</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {data.length === 0 && (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-12 text-center">
            <div className="w-24 h-24 bg-gray-500/20 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </div>
            <h3 className="text-white text-2xl font-semibold mb-3">Hələ ki video yoxdur</h3>
            <p className="text-gray-400 mb-6">İlk videonuzu yükləmək üçün yuxarıdakı formu istifadə edin</p>
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
      `}</style>
    </div>
  );
};

export default Videos;