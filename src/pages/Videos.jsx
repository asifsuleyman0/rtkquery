import { useState } from "react";
import {
  useGetVideosQuery,
  useCreateVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} from "../store/api";

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
    videoUrl: "",
    filePath: "",
    fileSize: "",
  });

  // Backend-dən gələn data Content Array formatında gəlirsə onu çıxar
  const data = Array.isArray(response) ? response : response?.content || [];

  const handleSubmit = async () => {
    if (!form.title || !form.courseId) {
      alert("Title və Course mütləqdir!");
      return;
    }

    const videoData = {
      course: { id: form.courseId },
      title: form.title,
      description: form.description || "",
      videoUrl: form.videoUrl || "",
      filePath: form.filePath || "",
      fileSize: form.fileSize || null,
    };

    try {
      if (form.id) {
        await updateVideo({ id: form.id, ...videoData });
      } else {
        await createVideo(videoData);
      }
      setForm({
        id: null,
        courseId: "",
        title: "",
        description: "",
        videoUrl: "",
        filePath: "",
        fileSize: "",
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
          className="border p-2 rounded"
          placeholder="Video URL"
          value={form.videoUrl}
          onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="File Path"
          value={form.filePath}
          onChange={(e) => setForm({ ...form, filePath: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="File Size"
          value={form.fileSize}
          onChange={(e) => setForm({ ...form, fileSize: e.target.value })}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {form.id ? "Update" : "Add"}
      </button>

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
                  <td className="border p-2">{v.course?.id}</td>
                  <td className="border p-2">{v.title}</td>
                  <td className="border p-2 max-w-xs truncate">{v.description}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() =>
                        setForm({
                          id: v.id,
                          courseId: v.course?.id || "",
                          title: v.title,
                          description: v.description,
                          videoUrl: v.videoUrl,
                          filePath: v.filePath,
                          fileSize: v.fileSize,
                        })
                      }
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
      )}
    </div>
  );
};

export default Videos;
