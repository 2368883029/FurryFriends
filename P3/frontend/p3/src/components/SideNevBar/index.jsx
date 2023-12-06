import { Outlet, Link, useLocation } from "react-router-dom"
import { useContext } from 'react';
import { APIContext } from '../../contexts/APIContext';
import "./side-nevigation.css";

/**
 * buttons: {route: string, name: string, icon: string}
 */
const SideNevigation = ({buttons}) => {
    const location = useLocation();
    const currentRoute = location.pathname;

    return <>
    <div id="side-navbar">
      <div className="sidenav">
        <nav className="top-group nav nav-pills">
          {buttons.map((button, index) => (
            <Link
              key={index}
              to={button.route}
              className={`nav-link btn d-flex align-items-center ${button.route === currentRoute ? 'active' : ''}`}
            >
              <span className="material-symbols-outlined"> {button.icon} </span>
              <span className="text">{button.name}</span>
            </Link>
          ))}
          <hr className="opacity-75 my-1" />
        </nav>
        <div className="bottom-group flex-column nav nav-pills">
          <Link to="/homepage" className="nav-link btn d-flex align-items-center">
            <span className="material-symbols-outlined">logout</span>
            <span className="text">Exit</span>
          </Link>
        </div>
      </div>
    </div>
    </>
}

export default SideNevigation;