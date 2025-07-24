import React from "react";
import { Link } from "react-router-dom";

const employeeMenu = [
  { label: "Dashboard", path: "/employee/dashboard" },
  { label: "Sales", path: "/employee/sales" },
  { label: "Tasks", path: "/employee/tasks" },
  { label: "Profile", path: "/employee/profile" },
];

const adminMenu = [
  { label: "Admin Dashboard", path: "/admin/dashboard" },
  { label: "User Management", path: "/admin/users" },
  { label: "Reports", path: "/admin/reports" },
  { label: "System Settings", path: "/admin/settings" },
];

const Menu = ({ open = false, onClose }) => {
  const role = (localStorage.getItem("role") || "employee").toLowerCase();
  const isAdmin = role === "admin";
  const menuItems = isAdmin ? adminMenu : employeeMenu;
  // Color logic: admin = red, employee = blue
  const bgColor = isAdmin ? "#b90000" : "#005cb9";
  const hoverColor = isAdmin ? "#d32f2f" : "#1976d2";
  const textColor = "#fff";

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: open ? "rgba(0,0,0,0.18)" : "transparent",
          zIndex: open ? 2000 : -1,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s",
        }}
        onClick={onClose}
      />
      {/* Drawer */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 220,
          minHeight: "100vh",
          background: bgColor,
          color: textColor,
          display: "flex",
          flexDirection: "column",
          padding: "32px 0 0 0",
          zIndex: 2100,
          boxShadow: "2px 0 12px rgba(0,0,0,0.06)",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 32, textAlign: "center", letterSpacing: 1 }}>
          {isAdmin ? "Admin Menu" : "Menu"}
        </div>
        {menuItems.map((item, i) => {
          if (item.label === "Profile") {
            return (
              <Link
                key={i}
                to="/profile"
                style={{
                  color: textColor,
                  textDecoration: "none",
                  padding: "14px 32px",
                  fontSize: 17,
                  fontWeight: 500,
                  borderRadius: 8,
                  margin: "0 12px 8px 12px",
                  background: "none",
                  transition: "background 0.2s",
                  display: "block",
                }}
                onMouseOver={e => (e.currentTarget.style.background = hoverColor)}
                onMouseOut={e => (e.currentTarget.style.background = "none")}
                onClick={onClose}
              >
                {item.label}
              </Link>
            );
          }
          // Admin User Management special case
          if (isAdmin && item.label === "User Management") {
            return (
              <Link
                key={i}
                to="/admin/users"
                style={{
                  color: textColor,
                  textDecoration: "none",
                  padding: "14px 32px",
                  fontSize: 17,
                  fontWeight: 500,
                  borderRadius: 8,
                  margin: "0 12px 8px 12px",
                  background: "none",
                  transition: "background 0.2s",
                  display: "block",
                }}
                onMouseOver={e => (e.currentTarget.style.background = hoverColor)}
                onMouseOut={e => (e.currentTarget.style.background = "none")}
                onClick={onClose}
              >
                {item.label}
              </Link>
            );
          }
          // Default: anchor for other items
          return (
            <a
              key={i}
              href={item.path}
              style={{
                color: textColor,
                textDecoration: "none",
                padding: "14px 32px",
                fontSize: 17,
                fontWeight: 500,
                borderRadius: 8,
                margin: "0 12px 8px 12px",
                background: "none",
                transition: "background 0.2s",
                display: "block",
              }}
              onMouseOver={e => (e.currentTarget.style.background = hoverColor)}
              onMouseOut={e => (e.currentTarget.style.background = "none")}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </>
  );
};

export default Menu; 