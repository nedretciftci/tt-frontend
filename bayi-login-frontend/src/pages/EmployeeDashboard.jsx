import React from "react";
import Header from "../components/Header";
// import logo from "../assets/images/logo.png"; // logo no longer needed here

const stats = [
  { label: "Daily Revenue", value: "$12,500" },
  { label: "Sales Count", value: "87" },
  { label: "New Customers", value: "5" },
  { label: "Monthly Target", value: "72%" },
];
const weeklySales = [3200, 4100, 3800, 5000, 4200, 6100, 4700];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const tasks = [
  { title: "Call customer", date: "2024-06-12" },
  { title: "Send report", date: "2024-06-13" },
  { title: "Meeting", date: "2024-06-14" },
];

const StatCard = ({ label, value }) => (
  <div style={{
    flex: 1,
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    padding: 28,
    margin: '0 12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 180,
    minHeight: 110,
    justifyContent: 'center',
  }}>
    <div style={{ fontSize: 28, fontWeight: 700, color: '#005cb9', marginBottom: 8 }}>{value}</div>
    <div style={{ fontSize: 16, color: '#888', fontWeight: 500 }}>{label}</div>
  </div>
);

const BarChart = ({ data, labels }) => (
  <div style={{ width: '100%', height: 180, display: 'flex', alignItems: 'flex-end', gap: 16, padding: '24px 0 0 0' }}>
    {data.map((val, i) => (
      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 28,
          height: `${val / 70}px`, // scale for mock
          background: '#005cb9',
          borderRadius: 8,
          marginBottom: 8,
          transition: 'height 0.3s',
        }} />
        <div style={{ fontSize: 13, color: '#888' }}>{labels[i]}</div>
      </div>
    ))}
  </div>
);

const TaskCard = ({ tasks }) => (
  <div style={{ width: '100%' }}>
    {tasks.map((task, i) => (
      <div key={i} style={{
        background: '#f6f7fa',
        borderRadius: 10,
        padding: '14px 18px',
        marginBottom: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 16,
        fontWeight: 500,
      }}>
        <span>{task.title}</span>
        <span style={{ color: '#005cb9', fontSize: 15 }}>{task.date}</span>
      </div>
    ))}
  </div>
);

const MenuButton = () => (
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
  }} aria-label="Menu">
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="5" width="28" height="3.5" rx="1.75" fill="#005cb9"/>
      <rect y="12.25" width="28" height="3.5" rx="1.75" fill="#005cb9"/>
      <rect y="19.5" width="28" height="3.5" rx="1.75" fill="#005cb9"/>
    </svg>
  </button>
);

const EmployeeDashboard = () => (
  <div style={{ minHeight: '100vh', background: '#f6f7fa' }}>
    <Header />
    <div style={{ padding: '100px 32px 32px 32px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Welcome + Menu Row */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32, marginLeft: 0 }}>
        {/* Left align under logo: add left margin to match logo's left edge */}
        <div style={{ width: 72 }} />
        <MenuButton />
        <div style={{ fontSize: 28, fontWeight: 700, color: '#222' }}>
          Welcome, <span style={{ color: '#005cb9' }}>{localStorage.getItem("username") || "User"}</span>
        </div>
      </div>
      {/* Stat Cards */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 0, marginBottom: 36, justifyContent: 'space-between' }}>
        {stats.map((s, i) => <StatCard key={i} label={s.label} value={s.value} />)}
      </div>
      {/* Bottom two large cards */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 32, marginTop: 8 }}>
        {/* Weekly Sales Performance */}
        <div style={{ flex: 1.2, background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: 32, minHeight: 260, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 18, color: '#222' }}>Weekly Sales Performance</div>
          <BarChart data={weeklySales} labels={days} />
        </div>
        {/* Upcoming Tasks */}
        <div style={{ flex: 1, background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: 32, minHeight: 260, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 18, color: '#222' }}>Upcoming Tasks</div>
          <TaskCard tasks={tasks} />
        </div>
      </div>
    </div>
  </div>
);

export default EmployeeDashboard; 