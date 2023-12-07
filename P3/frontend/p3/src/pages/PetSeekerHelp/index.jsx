import "./seeker.css";
import { useState, useEffect,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE from '../../constants/baseUrl';
import SideNevigation from "../../components/SideNevBar";
import { APIContext } from "../../contexts/APIContext";

const PetSeekerHelp = () => {
    const {user} = useContext(APIContext);
    const navigate = useNavigate();
    const buttons = [
        { route: "/pet-seeker-dashboard", name: "Dashboard", icon: "account_circle" },
        { route: "/pet-seeker-adoption", name: user.isShelter ? "Listings" : "Adoption", icon: "inventory_2" },
        { route: "/pet-seeker-security", name: "Security", icon: "passkey" },
        { route: "/pet-seeker-help", name: "Help", icon: "help" },
    ];

    return (
        <>
        <div className="helpContent">
            <SideNevigation buttons={buttons} />
        </div>
            
        </>
    );
};

export default PetSeekerHelp;