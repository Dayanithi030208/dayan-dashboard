import { useEffect, useState } from "react";
import API from "../api/api";

export default function Activity() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    fetchActivities();
  }, [limit]);

  async function fetchActivities() {
    setLoading(true);
    try {
      const res = await API.get(`/api/activity/list?limit=${limit}`);
      setRows(res.data);
    } catch (err) {
      console.error("Failed to fetch activities", err);
      // handle error (maybe redirect to /login if 401)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Activity</h1>

      <div style={{ marginBottom: 12 }}>
        <label>Limit:</label>
        <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Timestamp</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Domain</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>URL</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Duration (s)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td style={{ border: "1px solid #eee", padding: 8 }}>
                  {new Date(r.timestamp).toLocaleString()}
                </td>
                <td style={{ border: "1px solid #eee", padding: 8 }}>{r.domain}</td>
                <td style={{ border: "1px solid #eee", padding: 8 }}>
                  <a href={r.url} target="_blank" rel="noreferrer">{r.url}</a>
                </td>
                <td style={{ border: "1px solid #eee", padding: 8 }}>{r.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
