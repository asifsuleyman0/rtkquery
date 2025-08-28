import { useState } from "react";
import {
  useGetTeachersQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} from "../store/api";

const Teachers = () => {
  const { data = [], isLoading, error } = useGetTeachersQuery();
  const [createTeacher] = useCreateTeacherMutation();
  const [updateTeacher] = useUpdateTeacherMutation();
  const [deleteTeacher] = useDeleteTeacherMutation();

  const [form, setForm] = useState({ id: null, name: "" });

  const handleSubmit = async () => {
    if (!form.name) return;
    if (form.id) {
      await updateTeacher(form);
    } else {
      await createTeacher({ name: form.name });
    }
    setForm({ id: null, name: "" });
  };

  if (isLoading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta baş verdi</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Teachers</h1>

      <div className="flex space-x-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 rounded"
        >
          {form.id ? "Update" : "Add"}
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t) => (
            <tr key={t.id}>
              <td className="border p-2">{t.id}</td>
              <td className="border p-2">{t.name}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => setForm(t)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTeacher(t.id)}
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

export default Teachers;
