import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [issues, setIssues] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("Fetched Users:", data);

      // Handle both { success, data } and raw array
      if (Array.isArray(data)) setUsers(data);
      else if (data.success && Array.isArray(data.data)) setUsers(data.data);
      else setUsers([]);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Issues
  const fetchIssues = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/issues`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setIssues(data);
      else if (data.success && Array.isArray(data.data)) setIssues(data.data);
      else setIssues([]);
    } catch (err) {
      console.error("Error fetching issues:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete User
  const deleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`${API_URL}/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // ✅ Change Role
  const changeRole = async (id, role) => {
    try {
      await fetch(`${API_URL}/admin/users/${id}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });
      fetchUsers();
    } catch (err) {
      console.error("Error changing role:", err);
    }
  };

  // ✅ Change Issue Status
  const changeIssueStatus = async (id, status) => {
    try {
      await fetch(`${API_URL}/issues/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      fetchIssues();
    } catch (err) {
      console.error("Error updating issue:", err);
    }
  };

  // ✅ Fetch based on tab
  useEffect(() => {
    if (activeTab === "users") fetchUsers();
    else fetchIssues();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-400 mb-10">
        Admin Dashboard 👑
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => setActiveTab("users")}
          className={`px-6 py-2 rounded-lg font-semibold ${
            activeTab === "users"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 hover:bg-gray-600"
          } transition`}
        >
          Manage Users
        </button>
        <button
          onClick={() => setActiveTab("issues")}
          className={`px-6 py-2 rounded-lg font-semibold ${
            activeTab === "issues"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 hover:bg-gray-600"
          } transition`}
        >
          Manage Issues
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-blue-300 animate-pulse">
          Loading {activeTab}...
        </p>
      )}

      {/* USERS TAB */}
      {!loading && activeTab === "users" && (
        <div className="overflow-x-auto w-full max-w-6xl mx-auto shadow-xl rounded-xl border border-gray-700">
          <table className="w-full text-sm text-gray-200">
            <thead className="bg-gray-800">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-center">Role</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr
                    key={u._id}
                    className="border-t border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="py-3 px-6">{u.name}</td>
                    <td className="py-3 px-6">{u.email}</td>
                    <td className="text-center py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          u.role === "admin"
                            ? "bg-green-600 text-white"
                            : "bg-gray-600 text-white"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="text-center py-3 space-x-2">
                      <button
                        onClick={() =>
                          changeRole(u._id, u.role === "user" ? "admin" : "user")
                        }
                        className={`px-3 py-1 rounded font-semibold transition ${
                          u.role === "user"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-yellow-500 hover:bg-yellow-600 text-black"
                        }`}
                      >
                        {u.role === "user" ? "Make Admin" : "Demote"}
                      </button>
                      <button
                        onClick={() => deleteUser(u._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-400 italic"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ISSUES TAB */}
      {!loading && activeTab === "issues" && (
        <div className="overflow-x-auto w-full max-w-6xl mx-auto shadow-xl rounded-xl border border-gray-700">
          <table className="w-full text-sm text-gray-200">
            <thead className="bg-gray-800">
              <tr>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Reporter</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.length > 0 ? (
                issues.map((i) => (
                  <tr
                    key={i._id}
                    className="border-t border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="py-3 px-6">{i.title}</td>
                    <td className="py-3 px-6">{i.category}</td>
                    <td className="py-3 px-6">
                      {i.createdBy?.name || "Unknown"}
                    </td>
                    <td className="text-center py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          i.status === "Resolved"
                            ? "bg-green-600"
                            : i.status === "In Progress"
                            ? "bg-yellow-500 text-black"
                            : "bg-red-600"
                        }`}
                      >
                        {i.status}
                      </span>
                    </td>
                    <td className="text-center py-3 space-x-2">
                      {["Pending", "In Progress", "Resolved"].map((status) => (
                        <button
                          key={status}
                          onClick={() => changeIssueStatus(i._id, status)}
                          className={`px-3 py-1 rounded text-xs font-semibold transition ${
                            status === i.status
                              ? "bg-blue-600 text-white"
                              : "bg-gray-700 hover:bg-gray-600"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-400 italic"
                  >
                    No issues reported yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
