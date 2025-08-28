import { useState } from "react";
import {
  useGetVideosQuery,
  useCreateVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} from "../store/api";

const Videos = () => {
  const { data = [], isLoading, error } = useGetVideosQuery();
  const [createVideo] = useCreateVideoMutation();
  const [updateVideo] = useUpdateVideoMutation();
  const [deleteVideo] = useDeleteVideoMutation();

  const [form, setForm] = useState({ id: null, title: "" });

  const handleSubmit = async () => {
    if (!form.title) return;
    if (form.id) {
      await updateVideo(form);
    } else {
      await createVideo({ title: form.title });
    }
    setForm({ id: null, title: "" });
  };

  if (isLoading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta baş verdi</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Videos</h1>

      <div className="flex space-x-2 mb-4">
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

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v) => (
            <tr key={v.id}>
              <td className="border p-2">{v.id}</td>
              <td className="border p-2">{v.title}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => setForm(v)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteVideo(v.id)}
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

export default Videos;
