import { useEffect, useContext, useState } from "react";
import API from "../api/axiosConfig";
import { AppContext } from "../context/AppContext";
import ApplicationForm from "./ApplicationForm";

export default function ApplicationList() {
  const { applications, setApplications } = useContext(AppContext);
  const [editing, setEditing] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchApplications = async () => {
    const { data } = await API.get("/applications");
    setApplications(data);
  };

  useEffect(() => { fetchApplications(); }, []);

  const deleteApplication = async (id) => {
    await API.delete(`/applications/${id}`);
    setApplications(applications.filter(app => app._id !== id));
  };

  return (
    <div className="application-list">
      <div className="controls" style={{ margin: "1rem 0", display: "flex", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Search by Company"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ padding: "0.5rem" }}
        />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: "0.5rem" }}>
          <option value="all">All Statuses</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <ApplicationForm fetchApplications={fetchApplications} editing={editing} setEditing={setEditing} />
      <div className="cards">
        {applications
          .filter(app => (filterStatus === "all" || app.status === filterStatus) &&
            app.company.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(app => (
            <div key={app._id} className="card">
              <h3>{app.company}</h3>
              <p>{app.role}</p>
              <div className={`status-badge status-${app.status}`}>
                {app.status}
              </div>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => setEditing(app)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteApplication(app._id)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
