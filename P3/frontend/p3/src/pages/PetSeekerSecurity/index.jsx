import "./security.css";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE from '../../constants/baseUrl';
import SideNevigation from "../../components/SideNevBar";
import { APIContext } from "../../contexts/APIContext";
import SecurityEntry from "./SecurityEntry";

const PetSeekerSecurity = () => {
    const navigate = useNavigate();
    // const user = useContext(APIContext);
    const user ={
        name: "test",
        email: "test",
        phone_number: "test",
        password: "test",
        address: "test",
        securityQuestion: "test"
    }
    const buttons = [
        { route: "/pet-seeker-dashboard", name: "Dashboard", icon: "account_circle" },
        { route: "/pet-seeker-adoption", name: "Adoption", icon: "inventory_2" },
        { route: "/pet-seeker-security", name: "Security", icon: "passkey" },
        { route: "/pet-seeker-help", name: "Help", icon: "help" },
    ];

    return (
        <div className="seciroty-content">
        <div className=""></div>
            <SideNevigation buttons={buttons} />
            <div className="main-content">
                <div className="title">Login & Security</div>
                <div className="subtitle">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare
                    elit tortor, id congue velit tempus ut.
                </div>
   <div className="table-responsive">
      <table className="table align-middle">
         <tbody>
            <SecurityEntry user_value={user.name} tag={"Name"}/>
            <SecurityEntry user_value={user.email} tag={"Email"}/>
            <SecurityEntry user_value={user.phone_number} tag={"Phone Number"}/>
            <SecurityEntry user_value={user.password} tag={"Password"}/>
            <SecurityEntry user_value={user.address} tag={"Address"}/>
            <SecurityEntry user_value={user.securityQuestion} tag={"Security Question"}/>
         </tbody>
      </table>
   </div>
</div>
</div>
    );
};

export default PetSeekerSecurity;