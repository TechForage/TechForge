import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ categories }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Categories</div>

      {categories.map(({ icon: Icon, label, route }) => (
  <Link key={route} to={route}>
    <div className="sidebar-item">
      <Icon size={18} />
      <span>{label}</span>
    </div>
  </Link>
))}
    </aside>
  );
}