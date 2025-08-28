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
    photoUrl: ""
  });

  // API cavabını debug etmək üçün
  console.log("API Response:", data);
  console.log("Is Array:", Array.isArray(data));

  let teachers = [];
  if (Array.isArray(data)) {
    teachers = data;
  } else if (data?.content && Array.isArray(data.content)) {
    teachers = data.content;
  }

  console.log("Processed teachers:", teachers);

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
        photoUrl: form.photoUrl || ""
      };

      if (form.id) {
        await updateTeacher({ id: form.id, ...teacherData });
      } else {
        await createTeacher(teacherData);
      }

      setForm({ id: null, firstName: "", lastName: "", bio: "", photoUrl: "" });
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
      photoUrl: teacher.photoUrl || ""
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

  if (isLoading) return <p>Yüklənir...</p>;
  
  if (error) {
    console.error("API Error:", error);
    return (
      <div>
        <p>Xəta baş verdi:</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Müəllimlər</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Ad"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Soyad"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Bio"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Şəkil URL"
          value={form.photoUrl}
          onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {form.id ? "Yenilə" : "Əlavə et"}
      </button>

      {teachers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Ad</th>
                <th className="border p-2">Soyad</th>
                <th className="border p-2">Bio</th>
                <th className="border p-2">Şəkil</th>
                <th className="border p-2">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="border p-2">{teacher.id}</td>
                  <td className="border p-2">{teacher.firstName}</td>
                  <td className="border p-2">{teacher.lastName}</td>
                  <td className="border p-2 max-w-xs truncate">{teacher.bio}</td>
                  <td className="border p-2">
                    {teacher.photoUrl && (
                      <img 
                        src={teacher.photoUrl} 
                        alt="Teacher" 
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {e.target.style.display = 'none'}}
                      />
                    )}
                  </td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(teacher)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Redaktə
                    </button>
                    <button
                      onClick={() => handleDelete(teacher.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">Heç bir müəllim tapılmadı.</p>
      )}
    </div>
  );
};

export default Teachers;
