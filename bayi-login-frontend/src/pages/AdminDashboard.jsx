import React, { useState } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import { getAllUsers } from "../services/AuthService";

const MenuButton = ({ onClick }) => {
  const role = (localStorage.getItem("role") || "employee").toLowerCase();
  const iconColor = role === "admin" ? "#b90000" : "#005cb9";
  return (
    <button style={{
      background: 'none',
      border: 'none',
      padding: 0,
      marginRight: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      height: 40,
      width: 40,
      justifyContent: 'center',
    }} aria-label="Menu" onClick={onClick}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="5" width="28" height="3.5" rx="1.75" fill={iconColor}/>
        <rect y="12.25" width="28" height="3.5" rx="1.75" fill={iconColor}/>
        <rect y="19.5" width="28" height="3.5" rx="1.75" fill={iconColor}/>
      </svg>
    </button>
  );
};

// Stat cards mock data
const stats = [
  { label: "Monthly Revenue", value: "$120,000" },
  { label: "Monthly Sales", value: "850" },
  { label: "Active Employees", value: "18" },
  { label: "New Customers", value: "12" },
];

// Mock data for 30 days revenue
const last30Days = Array.from({ length: 30 }, (_, i) => 10000 + Math.round(Math.sin(i/5)*2000 + Math.random()*1500));
const days = Array.from({ length: 30 }, (_, i) => `${i+1}`);

// Mock sales categories for donut
const salesCategories = [
  { label: "Bills", value: 42000 },
  { label: "Top-up", value: 32000 },
  { label: "Device Sales", value: 26000 },
  { label: "Other", value: 20000 },
];

const StatCard = ({ label, value }) => (
  <div style={{
    flex: 1,
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 2px 12px rgba(185,0,0,0.08)',
    padding: 28,
    margin: '0 12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 180,
    minHeight: 110,
    justifyContent: 'center',
  }}>
    <div style={{ fontSize: 28, fontWeight: 700, color: '#b90000', marginBottom: 8 }}>{value}</div>
    <div style={{ fontSize: 16, color: '#888', fontWeight: 500 }}>{label}</div>
  </div>
);

const LineChart = ({ data, labels }) => (
  <svg width="100%" height="180" viewBox="0 0 600 180" style={{ background: '#fff', borderRadius: 12 }}>
    {/* Axis */}
    <line x1="40" y1="10" x2="40" y2="160" stroke="#eee" strokeWidth="2" />
    <line x1="40" y1="160" x2="590" y2="160" stroke="#eee" strokeWidth="2" />
    {/* Data */}
    {data.length > 1 && (
      <polyline
        fill="none"
        stroke="#b90000"
        strokeWidth="3"
        points={data.map((v, i) => `${40 + (i * 18)},${160 - (v - 9000) / 100}`).join(' ')}
      />
    )}
    {/* Dots */}
    {data.map((v, i) => (
      <circle key={i} cx={40 + (i * 18)} cy={160 - (v - 9000) / 100} r="3" fill="#b90000" />
    ))}
    {/* Labels (every 5 days) */}
    {labels.map((d, i) => i % 5 === 0 && (
      <text key={i} x={40 + (i * 18)} y={175} fontSize="11" textAnchor="middle" fill="#888">{d}</text>
    ))}
  </svg>
);

const DonutChart = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let acc = 0;
  const colors = ["#b90000", "#d32f2f", "#ff7043", "#ffc107"];
  // Calculate legend data for horizontal layout
  const legendItems = data.map((d, i) => ({
    color: colors[i % colors.length],
    label: `${d.label} (${Math.round((d.value/total)*100)}%)`
  }));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <svg width="180" height="180" viewBox="0 0 180 180">
        {data.map((d, i) => {
          const start = acc;
          const angle = (d.value / total) * 2 * Math.PI;
          acc += angle;
          const x1 = 90 + 80 * Math.sin(start);
          const y1 = 90 - 80 * Math.cos(start);
          const x2 = 90 + 80 * Math.sin(acc);
          const y2 = 90 - 80 * Math.cos(acc);
          const largeArc = angle > Math.PI ? 1 : 0;
          return (
            <path
              key={i}
              d={`M90,90 L${x1},${y1} A80,80 0 ${largeArc} 1 ${x2},${y2} Z`}
              fill={colors[i % colors.length]}
              stroke="#fff"
              strokeWidth="2"
            />
          );
        })}
        {/* Center circle for donut effect */}
        <circle cx="90" cy="90" r="45" fill="#fff" />
      </svg>
      {/* Horizontal legend */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 18, flexWrap: 'wrap', gap: 24 }}>
        {legendItems.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', margin: '0 8px' }}>
            <div style={{ width: 16, height: 16, background: item.color, borderRadius: 4, marginRight: 8 }} />
            <span style={{ fontSize: 15, color: '#333', fontWeight: 500 }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mock employee performance data
const employeePerformance = [
  { name: "emp1", sales: 58000 },
  { name: "emp5", sales: 45000 },
  { name: "emp3", sales: 32000 },
  { name: "emp2", sales: 27000 },
  { name: "emp4", sales: 21000 },
];

const EmployeeBarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.sales));
  const colors = ["#b90000", "#d32f2f", "#ff7043", "#ffc107", "#1976d2"];
  return (
    <div style={{ width: '100%', padding: '12px 0' }}>
      {data.slice(0, 5).map((emp, i) => (
        <div key={emp.name} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ width: 60, fontWeight: 500, color: '#333', fontSize: 16 }}>{emp.name}</span>
          <div style={{
            height: 22,
            width: 180,
            background: '#eee',
            borderRadius: 8,
            margin: '0 12px',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}>
            <div style={{
              width: `${Math.round((emp.sales / max) * 100)}%`,
              height: '100%',
              background: colors[i % colors.length],
              borderRadius: 8,
              transition: 'width 0.3s',
            }} />
          </div>
          <span style={{ fontWeight: 600, color: colors[i % colors.length], fontSize: 16 }}>{`($${Math.round(emp.sales/1000)}k)`}</span>
        </div>
      ))}
      <div style={{ color: '#888', fontSize: 18, marginLeft: 60 }}>...</div>
    </div>
  );
};

// Mock recent activities
const activities = [
  { type: 'sale', user: 'emp1', detail: 'Sold 3 devices', time: '2 min ago' },
  { type: 'inventory', user: 'emp2', detail: 'Received 50 SIM cards', time: '10 min ago' },
  { type: 'new_employee', user: 'emp6', detail: 'Joined as new employee', time: '30 min ago' },
  { type: 'sale', user: 'emp3', detail: 'Processed bill payment', time: '1 hour ago' },
  { type: 'inventory', user: 'emp4', detail: 'Received 20 phones', time: '2 hours ago' },
  { type: 'sale', user: 'emp5', detail: 'Sold 10 top-ups', time: '3 hours ago' },
];

const ActivityIcon = ({ type }) => null;

const RecentActivities = ({ data }) => (
  <div style={{ width: '100%', padding: '12px 0' }}>
    {data.map((act, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 12, fontSize: 16, color: '#333' }}>
        <ActivityIcon type={act.type} />
        <span style={{ fontWeight: 600, marginRight: 8 }}>{act.user}</span>
        <span style={{ marginRight: 8 }}>{act.detail}</span>
        <span style={{ color: '#888', fontSize: 14 }}>({act.time})</span>
      </div>
    ))}
  </div>
);

const AdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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
      setError("Kullanıcılar alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f6f7fa' }}>
      <Header />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
      {/* Welcome + Menu Row: menu button and welcome text side by side */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 72, marginLeft: 16, marginBottom: 32 }}>
        {!menuOpen && <MenuButton onClick={() => setMenuOpen(true)} />}
        <div style={{ fontSize: 28, fontWeight: 700, color: '#222', marginLeft: 18 }}>
          Welcome, <span style={{ color: (localStorage.getItem("role")||"").toLowerCase()==="admin" ? '#b90000' : '#005cb9' }}>{localStorage.getItem("username") || "Admin"}</span>
        </div>
      </div>
      <div style={{ padding: '0 32px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Stat Cards Row */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 0, marginBottom: 36, justifyContent: 'space-between' }}>
          {stats.map((s, i) => <StatCard key={i} label={s.label} value={s.value} />)}
        </div>
        {/* Bottom two large cards */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 32, marginTop: 8 }}>
          {/* Last 30 Days Revenue Chart */}
          <div style={{ flex: 1.2, background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px rgba(185,0,0,0.08)', padding: 32, minHeight: 260, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 18, color: '#b90000' }}>Last 30 Days Revenue</div>
            <LineChart data={last30Days} labels={days} />
          </div>
          {/* Sales Categories Donut Chart */}
          <div style={{ flex: 1, background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px rgba(185,0,0,0.08)', padding: 32, minHeight: 260, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 18, color: '#b90000' }}>Sales Categories</div>
            <DonutChart data={salesCategories} />
          </div>
        </div>
        {/* New bottom two cards */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 32, marginTop: 36, marginBottom: 0 }}>
          {/* Employee Performance */}
          <div style={{ flex: 1, background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px rgba(185,0,0,0.08)', padding: 32, minHeight: 180, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 18, color: '#b90000' }}>Employee Performance</div>
            <EmployeeBarChart data={employeePerformance} />
          </div>
          {/* Recent Activities */}
          <div style={{ flex: 1, background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px rgba(185,0,0,0.08)', padding: 32, minHeight: 180, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 18, color: '#b90000' }}>Recent Activities</div>
            <RecentActivities data={activities} />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard;