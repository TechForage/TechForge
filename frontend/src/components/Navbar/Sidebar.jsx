import { ChevronDown } from "lucide-react";
import "./Sidebar.css";

export default function Sidebar({ categories }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Categories</div>

      {categories.map(({ icon: Icon, label }) => (
        <div className="sidebar-item" key={label}>
          <Icon size={18} />
          <span>{label}</span>
          <ChevronDown size={14} className="sidebar-arrow" />
        </div>
      ))}
    </aside>
  );
}