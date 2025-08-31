import { useState } from "react";
import {
  useGetCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} from "../store/api";

const Courses = () => {
  const { data = [], isLoading, error } = useGetCoursesQuery();
  const [createCourse] = useCreateCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();

  const [form, setForm] = useState({ id: null, title: "", description: "", imageUrl: "" });

  const handleSubmit = async () => {
    if (!form.title) return;
    try {
      if (form.id) {
        await updateCourse(form);
      } else {
        await createCourse(form);
      }
      setForm({ id: null, title: "", description: "", imageUrl: "" });
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  if (isLoading) return <p className="text-center py-10">Yüklənir...</p>;
  if (error) return <p className="text-center py-10 text-red-600">Xəta baş verdi: {error.message || "API xətası"}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">Kurslar</h1>

      {/* Form */}
      <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
          >
            {form.id ? "Update" : "Add"}
          </button>
        </div>
        <textarea
          className="border p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Description"
          rows="3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <img
              src={c.imageUrl || "https://via.placeholder.com/300x180?text=No+Image"}
              alt={c.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold text-gray-800">{c.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">{c.description || "N/A"}</p>
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={() => setForm(c)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl font-medium transition-colors duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCourse(c.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-medium transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
