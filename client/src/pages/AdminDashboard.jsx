import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`${import.meta.env.VITE_API_URL}/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  const changeRole = async (id, role) => {
    const token = localStorage.getItem("token");
    await fetch(`${import.meta.env.VITE_API_URL}/admin/users/${id}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Admin Dashboard 👑
      </h1>

      <div className="w-full max-w-6xl overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 text-left">
              <th className="px-6 py-3 w-1/4 font-semibold">Name</th>
              <th className="px-6 py-3 w-1/3 font-semibold">Email</th>
              <th className="px-6 py-3 w-1/6 text-center font-semibold">Role</th>
              <th className="px-6 py-3 w-1/4 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <td className="px-6 py-3">{u.name}</td>
                <td className="px-6 py-3">{u.email}</td>
                <td className="px-6 py-3 text-center capitalize">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.role === "admin"
                        ? "bg-green-600 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-3 text-center space-x-2">
                  <button
                    onClick={() =>
                      changeRole(u._id, u.role === "user" ? "admin" : "user")
                    }
                    className={`px-4 py-1 rounded font-medium transition ${
                      u.role === "user"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    } text-white`}
                  >
                    {u.role === "user" ? "Make Admin" : "Demote"}
                  </button>
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded font-medium transition"
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

export default AdminDashboard;
