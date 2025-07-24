import React, { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      setError("No username found.");
      setLoading(false);
      return;
    }
    fetch(`${process.env.REACT_APP_API_URL}/api/auth/profile/${username}`)
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Profile fetch failed");
        }
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={{ ...styles.card, color: "red" }}>Error: {error}</div>
      </div>
    );
  }

  if (!profile) return null;

  const avatarInitial = profile.username?.charAt(0)?.toUpperCase() || "U";

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.avatar}>{avatarInitial}</div>
        <h2 style={styles.heading}>Welcome, {profile.username}</h2>
        <div style={styles.info}><b>Email:</b> {profile.email}</div>
        <div style={styles.info}><b>Role:</b> {profile.role}</div>

        <button style={styles.button} onClick={() => alert("Edit coming soon!")}>Edit Profile</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f7f9fc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    background: "#fff",
    padding: 32,
    borderRadius: 16,
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    maxWidth: 400,
    width: "100%",
    textAlign: "center",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: "#005cb9",
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px auto",
  },
  heading: {
    marginBottom: 20,
    fontSize: 24,
    color: "#333",
  },
  info: {
    fontSize: 16,
    marginBottom: 12,
    color: "#555",
  },
  button: {
    marginTop: 20,
    background: "#005cb9",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 16,
  },
};

export default Profile;
