import React, { useState } from "react";
import { getAllUsers } from "../services/AuthService";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await getAllUsers(token);
      setUsers(res.data);
    } catch (err) {
      setError("Users not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: 24, margin: '32px auto', maxWidth: 1100 }}>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 18, color: '#b90000' }}>User Management</div>
      <button onClick={fetchUsers} style={{ marginBottom: 18, padding: '8px 18px', fontWeight: 600, background: '#b90000', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Users List</button>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {users.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
            <thead>
              <tr style={{ background: '#f6f7fa' }}>
                <th style={{ padding: 10, border: '1px solid #eee', fontWeight: 700 }}>ID</th>
                <th style={{ padding: 10, border: '1px solid #eee', fontWeight: 700 }}>Username</th>
                <th style={{ padding: 10, border: '1px solid #eee', fontWeight: 700 }}>Email</th>
                <th style={{ padding: 10, border: '1px solid #eee', fontWeight: 700 }}>Password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td style={{ padding: 10, border: '1px solid #eee' }}>{user.id}</td>
                  <td style={{ padding: 10, border: '1px solid #eee' }}>{user.username}</td>
                  <td style={{ padding: 10, border: '1px solid #eee' }}>{user.email}</td>
                  <td style={{ padding: 10, border: '1px solid #eee' }}>{user.password ? '••••••••' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement; 