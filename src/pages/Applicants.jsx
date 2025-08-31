import React from "react";
import { useGetContactFormsQuery } from "../store/api";

const Applicants = () => {
  const { data: applicants = [], isLoading, error } = useGetContactFormsQuery();

  if (isLoading) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
        <div className="flex items-center justify-center h-64">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-blue-500/20 border-b-blue-500 rounded-full animate-spin animate-reverse"></div>
          </div>
          <span className="ml-4 text-white text-xl">Yüklənir...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex items-center justify-center">
        <div className="bg-red-500/10 backdrop-blur-lg border border-red-500/30 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
            <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zM9 8a1 1 0 000 2v4a1 1 0 002 0V8z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-red-300 text-lg">Xəta baş verdi</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce"></div>
        <div className="absolute bottom-32 left-40 w-28 h-28 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-20 h-full">
            {[...Array(400)].map((_, i) => (
              <div key={i} className="border border-gray-600"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center animate-pulse">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                CV Siyahısı
              </h2>
              <p className="text-gray-400 mt-1">Müraciət edən namizədlər</p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-blue-400 font-bold">{applicants.length}</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Ümumi</p>
                  <p className="text-gray-400 text-sm">Müraciətlər</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center animate-pulse">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-white font-semibold">Aktiv</p>
                  <p className="text-gray-400 text-sm">Status</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 002 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2.5 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">Yeni</p>
                  <p className="text-gray-400 text-sm">Bu həftə</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border-b border-white/20">
                  <th className="px-6 py-4 text-left text-white font-semibold tracking-wide">#</th>
                  <th className="px-6 py-4 text-left text-white font-semibold tracking-wide">Ad Soyad</th>
                  <th className="px-6 py-4 text-left text-white font-semibold tracking-wide">Email</th>
                  <th className="px-6 py-4 text-left text-white font-semibold tracking-wide">Telefon</th>
                  <th className="px-6 py-4 text-left text-white font-semibold tracking-wide">CV</th>
                  <th className="px-6 py-4 text-left text-white font-semibold tracking-wide">Tarix</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant, index) => (
                  <tr 
                    key={applicant.id} 
                    className="border-b border-white/10 hover:bg-white/10 transition-all duration-300 group"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          {applicant.firstName?.charAt(0)}{applicant.lastName?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{applicant.firstName} {applicant.lastName}</p>
                          <p className="text-gray-400 text-sm">Namizəd</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {applicant.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {applicant.phoneNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                        <a
                            href={`https://digacc-5.onrender.com/api/contact-forms/${applicant.id}/cv`} // API URL
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span>CV Bax</span>
                        </a>
                        </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-400 text-sm">
                        {new Date(applicant.submittedAt).toLocaleString('az-AZ')}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {applicants.length === 0 && (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-12 text-center mt-6">
            <div className="w-20 h-20 bg-gray-500/20 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
              <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Hələ ki müraciət yoxdur</h3>
            <p className="text-gray-400">Yeni müraciətlər burada görünəcək</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes animate-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Applicants;