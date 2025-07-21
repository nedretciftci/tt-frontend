import React, { useState } from "react";
import logo from "../assets/images/header.png";
import { logout as logoutApi } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "";
  const role = localStorage.getItem("role") || "";

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (e) {}
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header style={{
      width: '100%',
      height: 64,
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      padding: '0 32px',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 200,
    }}>
      {/* Logo */}
      <img src={logo} alt="Logo" style={{ height: 40 }} />
      {/* Sağ taraf */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, maxWidth: 220, minWidth: 120, justifyContent: 'flex-end', marginRight: 50 }}>
        <div style={{ textAlign: 'right', marginRight: 8, minWidth: 70, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <div style={{ fontWeight: 600, fontSize: 16, wordBreak: 'break-all', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120 }}>{username}</div>
          <div style={{ fontSize: 13, color: '#888' }}>{role}</div>
        </div>
        <button
          onClick={() => setShowDialog(true)}
          style={{
            background: '#005cb9',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 18px',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            minWidth: 80,
            marginLeft: 4,
          }}
        >
          Logout
        </button>
      </div>
      {/* Logout Dialog */}
      {showDialog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 32,
            minWidth: 320,
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 18, marginBottom: 24 }}>Are you sure you want to logout?</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              <button
                onClick={() => setShowDialog(false)}
                style={{
                  background: '#eee',
                  color: '#333',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 24px',
                  fontWeight: 500,
                  fontSize: 15,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                style={{
                  background: '#d32f2f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 24px',
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: 'pointer',
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 