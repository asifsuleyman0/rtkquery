import { useGetContactFormsQuery } from "../api";
import { saveAs } from "file-saver";

const Cv = () => {
  const { data: contacts, isLoading, isError } = useGetContactFormsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading contact forms.</p>;

  const handleDownload = async (id, filename) => {
    try {
      const res = await fetch(`https://digacc-5.onrender.com/api/contact-forms/${id}/cv`);
      if (!res.ok) throw new Error("CV download failed");
      const blob = await res.blob();
      saveAs(blob, filename); 
    } catch (err) {
      console.error(err);
      alert("CV yüklənmədi!");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Forms CVs</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">CV</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id}>
              <td className="border border-gray-300 p-2">{c.firstName} {c.lastName}</td>
              <td className="border border-gray-300 p-2">{c.email}</td>
              <td className="border border-gray-300 p-2">{c.phoneNumber}</td>
              <td className="border border-gray-300 p-2">
                {c.cvUrl ? (
                  <button
                    className="px-2 py-1 bg-blue-600 text-white rounded"
                    onClick={() => handleDownload(c.id, `${c.firstName}_${c.lastName}_CV.pdf`)}
                  >
                    Download
                  </button>
                ) : (
                  "No CV"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cv;
