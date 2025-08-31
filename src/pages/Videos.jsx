import { useState } from "react";
import {
  useGetVideosQuery,
  useCreateVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} from "../store/videoApi"; // 👉 artıq videoApi-dən gəlir

const Videos = () => {
  const { data: response, isLoading, error } = useGetVideosQuery();
  const [createVideo] = useCreateVideoMutation();
  const [updateVideo] = useUpdateVideoMutation();
  const [deleteVideo] = useDeleteVideoMutation();

  const [form, setForm] = useState({
    id: null,
    courseId: "",
    title: "",
    description: "",
    videoFile: null,
  });

  const data = Array.isArray(response)
    ? response
    : response?.content || response?.data?.videos || [];

  const handleSubmit = async () => {
    if (!form.title || !form.courseId) {
      alert("Title və Course ID mütləqdir!");
      return;
    }

    if (!form.videoFile && !form.id) {
      alert("Fayl seçilməyib!");
      return;
    }

    try {
      if (form.id) {
        // 🔹 Update (fayl lazım deyil, sadəcə text məlumat)
        await updateVideo({
          id: form.id,
          courseId: form.courseId,
          title: form.title,
          description: form.description || "",
        });
      } else {
        // 🔹 Yeni video yükləmə
        const formData = new FormData();
        formData.append("video", form.videoFile);
        formData.append("courseId", form.courseId);
        formData.append("title", form.title);
        formData.append("description", form.description || "");

        await createVideo(formData);
      }

      setForm({
        id: null,
        courseId: "",
        title: "",
        description: "",
        videoFile: null,
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Xəta baş verdi: " + (err?.data?.message || err.message));
    }
  };

  if (isLoading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta baş verdi</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Videos</h1>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Course ID"
          value={form.courseId}
          onChange={(e) => setForm({ ...form, courseId: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="file"
          className="border p-2 rounded"
          onChange={(e) => setForm({ ...form, videoFile: e.target.files[0] })}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {form.id ? "Update" : "Add"}
      </button>

      {/* Video List */}
      {data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Course ID</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="border p-2">{v.id}</td>
                  <td className="border p-2">{v.course?.id || v.courseId}</td>
                  <td className="border p-2">{v.title}</td>
                  <td className="border p-2 max-w-xs truncate">
                    {v.description}
                  </td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() =>
                        setForm({
                          id: v.id,
                          courseId: v.course?.id || v.courseId || "",
                          title: v.title,
                          description: v.description,
                          videoFile: null,
                        })
                      }
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteVideo({ id: v.id })}
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
      )}
    </div>
  );
};

export default Videos;
