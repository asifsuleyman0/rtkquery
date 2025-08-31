import { useState } from "react";
import {
  useGetVideosQuery,
  useCreateVideoMutation,
  useDeleteVideoMutation,
} from "../store/videoApi.js"; // ✅ videoApi istifadə olunur

const Videos = () => {
  const { data: response, isLoading, error } = useGetVideosQuery();
  const [createVideo] = useCreateVideoMutation();
  const [deleteVideo] = useDeleteVideoMutation();

  const [videoFile, setVideoFile] = useState(null);

  const data = Array.isArray(response)
    ? response
    : response?.data?.videos || [];

  const handleSubmit = async () => {
    if (!videoFile) {
      alert("Video faylı seçilməyib!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("video", videoFile);

      await createVideo(formData);

      setVideoFile(null);
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Xəta baş verdi: " + (err?.data?.message || err.message));
    }
  };

  if (isLoading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta baş verdi</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Videolar</h1>

      {/* Upload Form */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="file"
          className="border p-2 rounded"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Yüklə
        </button>
      </div>

      {/* Video List */}
      {data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Original Name</th>
                <th className="border p-2">Filename</th>
                <th className="border p-2">Size (MB)</th>
                <th className="border p-2">Uploaded At</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="border p-2">{v.id}</td>
                  <td className="border p-2">{v.original_name}</td>
                  <td className="border p-2">{v.filename}</td>
                  <td className="border p-2">
                    {(v.file_size / (1024 * 1024)).toFixed(2)} MB
                  </td>
                  <td className="border p-2">
                    {new Date(v.uploaded_at).toLocaleString()}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => deleteVideo(v.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Sil
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
