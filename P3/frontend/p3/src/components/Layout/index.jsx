import { Outlet, Link, useLocation } from "react-router-dom"
import { useContext } from 'react';
import { APIContext } from '../../contexts/APIContext';
import BASE from '../../constants/baseUrl';
import emptyProfile from '../../imgs/blank-profile.png';
import './navbar.css';
import Notification_DropDown from "../Notification_DropDown";

const Layout = () => {
    const location = useLocation();
    const url = location.pathname;
    const {user} = useContext(APIContext);

    return <>
        <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand logolink" to="/petSearch">FurryFriends</Link>
        <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
            <li className={url.startsWith("/petSearch") ? "nav-item active" : "nav-item"}>
                <Link className="nav-link" to="/petSearch">Search <span className="sr-only">(current)</span></Link>
            </li>
            <li className={url.startsWith("/how-it-works") ? "nav-item active" : "nav-item"}>
                <Link className="nav-link" to="/how-it-works" >How it Works</Link>
            </li>
        </ul>
        <div className="dropdown notification-dropdown">
            <div
            className="dropdown-toggle"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            role="menu">
            <Link to="." className="notif-icon-container mt-2 mt-lg-0">
            <span className="material-symbols-outlined notif-icon"
                >notifications</span>
            <span className="notif-badge"></span>
            </Link>
        </div>
        <Notification_DropDown />
        </div>
        <div className="vertical-rule"></div>
        <div className="d-flex flex-row justify-content-center align-items-center">
            <p className="text-dark font-weight-bold my-0 mr-2">{user.firstName} {user.lastName}</p>
            <div className="btn-group">
                <div className="dropdown-toggle profilePic" data-toggle="dropdown" role="menu">
                    <img src={user.avatar_src ? `${BASE}${user.avatar_src}` : emptyProfile} alt="profile pic"/>
                </div>
                <div className="dropdown-menu right-align-dropdown">
                    <Link to="/pet-seeker-dashboard" className="dropdown-item">View Profile</Link>
                    <Link to="/pet-seeker-adoption" className="dropdown-item">My Pets</Link>
                    <Link to="homepage" className="dropdown-item">Logout</Link>
                </div>
            </div>
        </div>
        </div>
    </nav>
    <main>
        <Outlet/>
    </main>
    </>;
}

export default Layout;