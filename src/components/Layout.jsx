import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    const { user, logout } = useContext(AppContext);

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <header className="top-header">
                    <div className="header-title">
                        <h1>Dashboard</h1>
                    </div>
                    <div className="user-profile">
                        <span className="user-name" style={{ marginRight: '10px', fontWeight: '500' }}>
                            {user ? user.name : 'User'}
                        </span>
                        <span className="user-avatar">
                            {user && user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </span>
                        <button onClick={logout} style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer', background: 'transparent', border: '1px solid #ccc', borderRadius: '4px' }}>
                            Logout
                        </button>
                    </div>
                </header>
                <div className="content-area">
                    {children}
                </div>
            </main>
        </div>
    );
}
