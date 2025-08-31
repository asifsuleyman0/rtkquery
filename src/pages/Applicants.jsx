import React from "react";
import { useGetContactFormsQuery } from "../store/api";

const Applicants = () => {
  const { data: applicants = [], isLoading, error } = useGetContactFormsQuery();

  if (isLoading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta baş verdi</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">CV List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Full Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">CV</th>
              <th className="px-4 py-2 border">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant, index) => (
              <tr key={applicant.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">
                  {applicant.firstName} {applicant.lastName}
                </td>
                <td className="px-4 py-2 border">{applicant.email}</td>
                <td className="px-4 py-2 border">{applicant.phoneNumber}</td>
                <td className="px-4 py-2 border text-blue-600 underline">
                  <a
                    href={`/${applicant.cvUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View CV
                  </a>
                </td>
                <td className="px-4 py-2 border">
                  {new Date(applicant.submittedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applicants;
