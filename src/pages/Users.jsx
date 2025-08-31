import { useGetUsersQuery, useDeleteUserMutation } from "../store/api";

const Users = () => {
  const { data: response, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const data = Array.isArray(response) ? response : response?.content || [];

  const handleDelete = async (id) => {
    if (window.confirm("Bu istifadəçini silmək istədiyinizə əminsiniz?")) {
      try {
        await deleteUser(id).unwrap();
        alert("İstifadəçi uğurla silindi!");
      } catch (err) {
        console.error(err);
        alert("Xəta baş verdi: " + (err?.data?.message || err.message));
      }
    }
  };

  if (isLoading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta baş verdi</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">First Name</th>
                <th className="border p-2">Last Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="border p-2">{u.firstName}</td>
                  <td className="border p-2">{u.lastName}</td>
                  <td className="border p-2">{u.email}</td>
                  <td className="border p-2">{u.phone}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(u.id)}
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
      ) : (
        <p>Heç bir istifadəçi tapılmadı</p>
      )}
    </div>
  );
};

export default Users;
