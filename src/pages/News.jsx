import { useState } from "react";
import {
  useGetNewsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} from "../store/api";

const News = () => {
  const { data: response = [], isLoading, error } = useGetNewsQuery();
  const [createNews] = useCreateNewsMutation();
  const [updateNews] = useUpdateNewsMutation();
  const [deleteNews] = useDeleteNewsMutation();

  // form state
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    imageUrl: "",
    publishedAt: "",
  });

  const data = Array.isArray(response)
    ? response
    : response?.content || response;

  const handleSubmit = async () => {
    if (!form.title || !form.description) {
      alert("Title və Description mütləqdir!");
      return;
    }

    const payload = {
      title: form.title,
      description: form.description,
      imageUrl: form.imageUrl,
      publishedAt: form.publishedAt || new Date().toISOString(),
    };

    if (form.id) {
      await updateNews({ id: form.id, ...payload });
    } else {
      await createNews(payload);
    }
    setForm({ id: null, title: "", description: "", imageUrl: "", publishedAt: "" });
  };

  if (isLoading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta baş verdi</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">News</h1>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />
        <input
          type="datetime-local"
          className="border p-2 rounded"
          value={form.publishedAt}
          onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
        />
        <textarea
          className="border p-2 rounded col-span-1 md:col-span-3"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-3"
        >
          {form.id ? "Update" : "Add"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Published At</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((n) => (
              <tr key={n.id} className="hover:bg-gray-50">
                <td className="border p-2">{n.id}</td>
                <td className="border p-2">{n.title}</td>
                <td className="border p-2">{n.description}</td>
                <td className="border p-2">
                  {n.imageUrl && (
                    <img
                      src={n.imageUrl}
                      alt={n.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="border p-2">
                  {n.publishedAt
                    ? new Date(n.publishedAt).toLocaleString()
                    : ""}
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => setForm(n)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNews(n.id)}
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
    </div>
  );
};

export default News;
