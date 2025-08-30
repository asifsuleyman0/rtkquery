import React from "react";
import { useGetContactFormsQuery, useDownloadCvQuery } from "../api";
import { saveAs } from "file-saver";

const Cv = () => {
  const { data: contacts = [], isLoading, isError } = useGetContactFormsQuery();

  const handleDownload = async (id, filename) => {
    const { data: blob } = await useDownloadCvQuery(id, { skip: false });
    if (blob) saveAs(blob, filename);
    else alert("CV yüklənmədi!");
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading contact forms.</p>;
  if (!contacts.length) return <p>No contact forms found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Forms CVs</h1>
      <table className="w-full border border-gray-300 border-collapse">
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
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
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
