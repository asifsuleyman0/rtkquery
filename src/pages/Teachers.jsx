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

  if (isLoading) return <p className="text-center py-10">Yüklənir...</p>;
  if (error) return <p className="text-center py-10 text-red-600">Xəta baş verdi</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Müəllimlər</h1>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ad"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <input
            className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Soyad"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
          <input
            className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="LinkedIn"
            value={form.linkedinUrl}
            onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
          />
          <input
            className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none md:col-span-2"
            placeholder="Bio"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
          <input
            className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none md:col-span-2"
            placeholder="Şəkil URL"
            value={form.photoUrl}
            onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
        >
          {form.id ? "Yenilə" : "Əlavə et"}
        </button>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="relative">
              {teacher.photoUrl ? (
                <img src={teacher.photoUrl} alt={teacher.firstName} className="w-full h-48 object-cover"/>
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
              )}
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold text-gray-800">{teacher.firstName} {teacher.lastName}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">{teacher.bio || "N/A"}</p>
              {teacher.linkedinUrl && (
                <a href={teacher.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm underline">
                  LinkedIn
                </a>
              )}
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={() => handleEdit(teacher)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl font-medium transition-colors duration-300"
                >
                  Redaktə
                </button>
                <button
                  onClick={() => handleDelete(teacher.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-medium transition-colors duration-300"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {teachers.length === 0 && <p className="text-center text-gray-500 mt-6">Heç bir müəllim tapılmadı.</p>}
    </div>
  );
};

export default Teachers;
