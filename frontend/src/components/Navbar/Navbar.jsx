import React from "react";
import "./Navbar.css";
import { Search, User, Package } from "lucide-react";

export default function Navbar() {
  return (   
    <div>
       <nav className="navbar">
          <div className="brand">
            <span className="brand-mark">
              <Package size={16} color="#fff" />
            </span>
            TechForge
          </div>

          <div className="nav-links">
            <a href="#" className="active">Home</a>
            <a href="#">Shop Now</a>
            <a href="#">New Arrivals</a>
            <a href="#">Deals</a>
          </div>

          <div className="search-box">
            <Search size={14} />
            <input placeholder="Search for a product…" />
          </div>

          <div className="nav-right">
            <span className="icon-btn"><User size={16} /></span>
            <div className="profile">
              <span className="avatar" />
              <div className="profile-text">
                <div className="profile-name">Ana Cole</div>
                <div className="profile-sub">Pro member</div>
              </div>
            </div>
          </div>
        </nav>
    </div>  
   
);
}