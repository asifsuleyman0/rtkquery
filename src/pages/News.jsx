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

  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    imageUrl: "",
    publishedAt: "",
  });

  const data = Array.isArray(response) ? response : response?.content || [];

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

  if (isLoading) return <p className="text-center py-10">Yüklənir...</p>;
  if (error) return <p className="text-center py-10 text-red-600">Xəta baş verdi</p>;

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    return `${d.getDate().toString().padStart(2,"0")}.${(d.getMonth()+1).toString().padStart(2,"0")}.${d.getFullYear().toString().slice(-2)}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Xəbərlər</h1>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 space-y-4">
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
          <input
            type="datetime-local"
            className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={form.publishedAt}
            onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
          />
          <textarea
            className="border p-3 rounded-xl col-span-1 md:col-span-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
        >
          {form.id ? "Yenilə" : "Əlavə et"}
        </button>
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((news) => (
          <div key={news.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            {news.imageUrl ? (
              <img src={news.imageUrl} alt={news.title} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
            )}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold text-gray-800">{news.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">{news.description}</p>
              <p className="text-gray-500 text-xs">{formatDate(news.publishedAt)}</p>
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={() => setForm(news)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl font-medium transition-colors duration-300"
                >
                  Redaktə
                </button>
                <button
                  onClick={() => deleteNews(news.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-medium transition-colors duration-300"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && <p className="text-center text-gray-500 mt-6">Heç bir xəbər tapılmadı.</p>}
    </div>
  );
};

export default News;
