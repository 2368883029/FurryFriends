import "./user-profile.css";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE from '../../constants/baseUrl';
import SideNevigation from "../../components/SideNevBar";
import { APIContext } from "../../contexts/APIContext";
import emptyProfile from '../../imgs/blank-profile.png';
import Popup from "./PopUp";

const PetSeekerDashboard = () => {
    const {user} = useContext(APIContext);
    const [popupStatus, setPopupStatus] = useState(false);
    const navigate = useNavigate();

    const buttons = [
        { route: "/pet-seeker-dashboard", name: "Dashboard", icon: "account_circle" },
        { route: "/pet-seeker-adoption", name: "Adoption", icon: "inventory_2" },
        { route: "/pet-seeker-security", name: "Security", icon: "passkey" },
        { route: "/pet-seeker-help", name: "Help", icon: "help" },
    ];

    const togglePopup = () => {
        setPopupStatus(!popupStatus);
    }

    useEffect(() => {
        if (user.userId === '') {
            navigate(`/login`);
        }
    });

    return (
        <div className="pet-seeker-content">
            <SideNevigation buttons={buttons} />
                    
            <div className="main-content">
                <div className="dashPic">
                    <img src={user.avatar_src ? `${BASE}${user.avatar_src}` : emptyProfile} alt="profile pic"
                    onClick={togglePopup}/>
                    <p>Change Profile Picture</p>
                </div>
                {popupStatus && <Popup onClose={togglePopup} />}
                <div id="welcome-message">Welcome, {user.firstName}</div>
                <div id="pet-card-container"></div>
            </div>
        </div>
    );
};

export default PetSeekerDashboard;