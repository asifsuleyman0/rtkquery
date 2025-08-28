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

  const [form, setForm] = useState({ id: null, title: "", description: "" });

  const handleSubmit = async () => {
    if (!form.title) return;
    try {
      if (form.id) {
        await updateCourse(form);
      } else {
        await createCourse({ title: form.title, description: form.description });
      }
      setForm({ id: null, title: "", description: "" });
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  if (isLoading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta baş verdi: {error.message || "API xətası"}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Courses</h1>

      <div className="flex flex-col space-y-2 mb-4">
        <div className="flex space-x-2">
          <input
            className="border p-2 flex-1"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 rounded"
          >
            {form.id ? "Update" : "Add"}
          </button>
        </div>
        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          rows="3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((c) => (
            <tr key={c.id}>
              <td className="border p-2">{c.id}</td>
              <td className="border p-2">{c.title}</td>
              <td className="border p-2 max-w-xs">
                <div className="truncate" title={c.description}>
                  {c.description || 'N/A'}
                </div>
              </td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => setForm(c)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCourse(c.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Courses;