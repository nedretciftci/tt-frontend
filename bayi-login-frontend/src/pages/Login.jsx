// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { login } from "../services/AuthService";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(email, password); // backend'e istek atar
      const { token, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "ADMIN") {
        navigate("/dashboard/admin");
      } else if (role === "EMPLOYEE") {
        navigate("/dashboard/employee");
      } else {
        setError("Rol tanımlanamadı.");
      }
    } catch (err) {
      setError("Giriş başarısız. Lütfen bilgileri kontrol edin.");
    }
  };

  return (
    <div className="login-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f6f7fa' }}>
      <form onSubmit={handleLogin} style={{
        width: 400,
        background: 'rgba(255,255,255,0.8)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        borderRadius: 16,
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Logo placeholder - replace with your logo image */}
        <img src={logo} alt="Logo" style={{ width: 400, height: 'auto', marginBottom: 32}}
/>
        {/* Username input with blur */}
        <div style={{
          width: '100%',
          marginBottom: 24,
          padding: 0,
          borderRadius: 8,
          background: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}>
          <input
            type="email"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 16,
              padding: 16,
              width: '100%',
              borderRadius: 8,
            }}
          />
        </div>
        {/* Password input with blur */}
        <div style={{
          width: '100%',
          marginBottom: 16,
          padding: 0,
          borderRadius: 8,
          background: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 16,
              padding: 16,
              width: '100%',
              borderRadius: 8,
            }}
          />
        </div>
        {/* Remember Me and Forgot Password on the same line */}
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" id="remember" style={{ marginRight: 8 }} />
            <label htmlFor="remember" style={{ fontSize: 15, color: 'gray', cursor: 'pointer' }}>Remember Me</label>
          </div>
          <button type="button" style={{
            background: 'none',
            border: 'none',
            color: 'gray',
            cursor: 'pointer',
            fontSize: 15,
            textDecoration: 'underline',
            padding: 0,
          }}>
            Forgot Password?
          </button>
        </div>
        <button type="submit" style={{
          width: '100%',
          background: '#005cb9',
          color: '#fff',
          fontWeight: 600,
          fontSize: 20,
          border: 'none',
          borderRadius: 8,
          padding: '14px 0',
          cursor: 'pointer',
          marginBottom: 8,
        }}>
          Login
        </button>
        {error && <p className="error" style={{ color: 'red', marginTop: 8 }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
