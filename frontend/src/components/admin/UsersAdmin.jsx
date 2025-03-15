import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState({ username: "", email: "", role: "" });

  // Fetch Users from Backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Open Update Modal
  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setUpdatedData({ username: user.username, email: user.email, role: user.role });
    setModalOpen(true);
  };

  // Handle Update User
  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${selectedUser._id}`, updatedData);
      Swal.fire("Updated!", "User updated successfully", "success");
      fetchUsers(); // Refresh list
      setModalOpen(false);
    } catch (error) {
      Swal.fire("Error", "Failed to update user", "error");
    }
  };

  // Handle Delete User
  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/users/${userId}`);
          Swal.fire("Deleted!", "User has been deleted.", "success");
          fetchUsers(); // Refresh list
        } catch (error) {
          Swal.fire("Error", "Failed to delete user", "error");
        }
      }
    });
  };

  // DataTable Columns
  const columns = [
    { name: "Username", selector: row => row.username, sortable: true },
    { name: "Email", selector: row => row.email, sortable: true },
    { name: "Role", selector: row => row.role, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button 
            onClick={() => openUpdateModal(row)}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Update
          </button>
          <button 
            onClick={() => handleDeleteUser(row._id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={users}
        pagination
        highlightOnHover
        striped
        persistTableHead
      />

      {/* Update User Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Update User</h2>
            <label className="block mb-2">Username</label>
            <input
              type="text"
              value={updatedData.username}
              onChange={(e) => setUpdatedData({ ...updatedData, username: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={updatedData.email}
              onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <label className="block mb-2">Role</label>
            <select
              value={updatedData.role}
              onChange={(e) => setUpdatedData({ ...updatedData, role: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="user">User</option>
              <option value="publisher">Publisher</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateUser}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersAdmin;
