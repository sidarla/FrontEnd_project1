import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
    HomeIcon,
    ChartBarIcon,
    PlusCircleIcon,
    ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
    const { logout } = useContext(AppContext);
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
        { name: "Analytics", path: "/analytics", icon: ChartBarIcon }, // Assuming a route for separate analytics or keep it in dashboard
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>InternTracker</h2>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.path}
                                className={`nav-link ${isActive(item.path) ? "active" : ""}`}
                            >
                                <item.icon className="nav-icon" />
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>


        </div>
    );
}
