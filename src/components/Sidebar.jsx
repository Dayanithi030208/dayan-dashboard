import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: "220px",
      height: "100vh",
      background: "#1e1e2f",
      padding: "20px",
      color: "white"
    }}>
      <h2>DAYAN</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/" style={{ color: "white" }}>Dashboard</Link></li>
        <li><Link to="/settings" style={{ color: "white" }}>Settings</Link></li>
        <li><Link to="/login" style={{ color: "white" }}>Login</Link></li>
      </ul>
    </div>
  );
}
