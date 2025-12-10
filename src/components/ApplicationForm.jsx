import { useState, useEffect } from "react";
import API from "../api/axiosConfig";

export default function ApplicationForm({ fetchApplications, editing, setEditing }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("applied");

  useEffect(() => {
    if (editing) {
      setCompany(editing.company);
      setRole(editing.role);
      setStatus(editing.status);
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/applications/${editing._id}`, { company, role, status });
      setEditing(null);
    } else {
      await API.post("/applications", { company, role, status });
    }
    setCompany(""); setRole(""); setStatus("applied");
    fetchApplications();
  };

  return (
    <form onSubmit={handleSubmit} className="app-form">
      <input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} required/>
      <input placeholder="Role" value={role} onChange={e => setRole(e.target.value)} required/>
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>
      <button type="submit">{editing ? "Update" : "Add"}</button>
    </form>
  );
}
