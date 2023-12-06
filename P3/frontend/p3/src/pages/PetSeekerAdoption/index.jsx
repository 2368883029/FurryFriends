import "./adoption.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE from '../../constants/baseUrl';
import SideNevigation from "../../components/SideNevBar";

const PetSeekerAdoption = () => {
    const navigate = useNavigate();
    const buttons = [
        { route: "/pet-seeker-dashboard", name: "Dashboard", icon: "account_circle" },
        { route: "/pet-seeker-adoption", name: "Adoption", icon: "inventory_2" },
        { route: "/pet-seeker-security", name: "Security", icon: "passkey" },
        { route: "/pet-seeker-help", name: "Help", icon: "help" },
    ];

    return (
        <>
            <SideNevigation buttons={buttons} />
        </>
    );
};

export default PetSeekerAdoption;