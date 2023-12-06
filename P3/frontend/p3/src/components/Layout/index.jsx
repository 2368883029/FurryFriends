import { Outlet, Link, useLocation } from "react-router-dom"
import { useContext } from 'react';
import { APIContext } from '../../contexts/APIContext';
import BASE from '../../constants/baseUrl';
import emptyProfile from '../../imgs/blank-profile.png';
import './navbar.css';

const Layout = () => {
    const location = useLocation();
    const url = location.pathname;
    const {user} = useContext(APIContext);

    function showCard(event, cardId) {
        event.stopPropagation();
    
        document.getElementById("notification-set1").style.display = "none";
        document.getElementById("notification-set2").style.display = "none";
        document.getElementById(cardId).style.display = "block";
    
        if (cardId === "notification-set1") {
          document.getElementById("btn-1").style.borderBottomWidth = "5px";
          document.getElementById("btn-2").style.borderBottomWidth = "0px";
        } else {
          document.getElementById("btn-1").style.borderBottomWidth = "0px";
          document.getElementById("btn-2").style.borderBottomWidth = "5px";
        }
    }

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
            <div
            className="dropdown-menu scrollable-dropdown offset-dropdown-menu"
            aria-labelledby="dropdownMenuButton">
            <div className="dropdown-header d-flex justify-content-between">
                <button
                id="btn-1"
                className="btn btn-sm btn-light"
                onClick={(e) => {showCard(e,'notification-set1')}}>
                Chat
                </button>
                <button
                id="btn-2"
                className="btn btn-sm btn-light"
                onClick={(e) => {showCard(e,'notification-set2')}}>
                System Notification
                </button>
            </div>
            <div className="dropdown-content">
                <div id="notification-set1">
                <div className="card mt-2">
                    <Link to="/chat-demo" className="card-body">
                    <h5 className="card-title">From Toronto Pet Shleter</h5>
                    <p className="card-text">Hi, this is a demo message</p>
                    </Link>
                </div>
                <div className="card mt-2">
                    <div className="card-body">
                    <h5 className="card-title">From Anna</h5>
                    <p className="card-text">Hi, this is Anna</p>
                    </div>
                </div>
                <Link to="/chat-demo" className="card mt-2">
                    <div className="card-body">
                    <h5 className="card-title">From Toronto Pet Shleter</h5>
                    <p className="card-text">Hi, this is a demo message</p>
                    </div>
                </Link>
                <Link to="/chat-demo" className="card mt-2">
                    <div className="card-body">
                    <h5 className="card-title">From Toronto Pet Shleter</h5>
                    <p className="card-text">Hi, this is a demo message</p>
                    </div>
                </Link>
                </div>
                <div id="notification-set2" style={{display:'none'}}>
                <Link to="/pet-seeker-payment" className="card mt-2">
                    <div className="card-body">
                    <h5 className="card-title">Renew your credit card</h5>
                    <p className="card-text">
                        Your Credit card was expired, please renew ASAP
                    </p>
                    </div>
                </Link>
                <Link to="/pet-seeker-security" className="card mt-2">
                    <div className="card-body">
                    <h5 className="card-title">Update your Email</h5>
                    <p className="card-text">Please update your Email Address</p>
                    </div>
                </Link>
                </div>
            </div>
            </div>
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