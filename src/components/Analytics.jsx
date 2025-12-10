import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

export default function Analytics() {
  const [trends, setTrends] = useState([]);
  const [recentApps, setRecentApps] = useState([]);

  useEffect(() => {
    API.get("/analytics/trends").then(res => setTrends(res.data));
    API.get("/applications").then(res => {
      // Sort by date desc and take top 5
      const sorted = res.data.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));
      setRecentApps(sorted.slice(0, 10));
    });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    return new Date(dateString).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <div className="analytics">
      <h3 className="analytics-title">Application Trends</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="_id"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip
              cursor={{ fill: '#f1f5f9', radius: 4 }}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                padding: '8px 12px'
              }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={32}>
              {trends.map((entry, index) => {
                let color = "var(--primary-color)";
                if (entry._id.toLowerCase() === 'applied') color = "#0369a1"; // Blue
                if (entry._id.toLowerCase() === 'interview') color = "#b45309"; // Amber
                if (entry._id.toLowerCase() === 'offer') color = "#15803d"; // Green
                if (entry._id.toLowerCase() === 'rejected') color = "#b91c1c"; // Red
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h3 className="analytics-title" style={{ marginTop: '2rem' }}>Recent Activity</h3>
      <div className="activity-feed">
        {recentApps.length === 0 ? (
          <p style={{ color: "var(--text-secondary)", textAlign: "center" }}>No recent activity.</p>
        ) : (
          <ul className="activity-list">
            {recentApps.map((app) => (
              <li key={app._id} className="activity-item">
                <div className="activity-icon status-dot" data-status={app.status}></div>
                <div className="activity-details">
                  <span className="activity-date">{formatDate(app.appliedAt)}</span>
                  <div className="activity-content">
                    <strong>{app.company}</strong>
                    <span className="activity-role"> - {app.role}</span>
                  </div>
                  <span className={`activity-status status-${app.status}`}>{app.status}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
