import React from "react";

const Footer = () => (
  <footer style={{
    width: '100%',
    textAlign: 'center',
    padding: '16px 0',
    background: 'transparent',
    color: '#99a1b3',
    fontSize: 15,
    position: 'fixed',
    left: 0,
    bottom: 0,
    zIndex: 100,
  }}>
    © 2025 <a href="https://www.turktelekom.com.tr/" style={{ color: '#99a1b3', textDecoration: 'underline' }}>Türk Telekom</a>
  </footer>
);

export default Footer; 