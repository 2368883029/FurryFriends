import "./security.css";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE from '../../constants/baseUrl';
import SideNevigation from "../../components/SideNevBar";
import { APIContext } from "../../contexts/APIContext";
import SecurityEntry from "./SecurityEntry";

const PetSeekerSecurity = () => {
    const navigate = useNavigate();
    const {user} = useContext(APIContext);
    const [userInfo, setUserInfo] = useState({});
  
    const buttons = [
        { route: "/pet-seeker-dashboard", name: "Dashboard", icon: "account_circle" },
        { route: "/pet-seeker-adoption", name: "Adoption", icon: "inventory_2" },
        { route: "/pet-seeker-security", name: "Security", icon: "passkey" },
        { route: "/pet-seeker-help", name: "Help", icon: "help" },
    ];

    useEffect(() => {
        let err = 0;
        fetch(`${BASE}/accounts/${user.userId}/`, {
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`, 
            }
        }).then(res => {
            if(!res.ok){
                err = 1;
            }
            return res.json();
        }).then(json => {
            if (err){
                console.log(json);
            } else {
                setUserInfo(json);
            }
        })
    }, user)

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
            <SecurityEntry user_value={userInfo.username} tag={"User Name"} userInfo={userInfo} jsonTag={"username"} setUserInfo={setUserInfo}/>
            <SecurityEntry user_value={userInfo.phone_number} tag={"Phone Number"} userInfo={userInfo} jsonTag={"phone_number"} setUserInfo={setUserInfo}/>
            <SecurityEntry user_value={"***************"} tag={"Password"} userInfo={userInfo} jsonTag={"password"} setUserInfo={setUserInfo}/>
            <SecurityEntry user_value={userInfo.location} tag={"Address"} userInfo={userInfo} jsonTag={"location"} setUserInfo={setUserInfo}/>
            <SecurityEntry user_value={userInfo.first_name} tag={"first name"} userInfo={userInfo} jsonTag={"first_name"} setUserInfo={setUserInfo}/>
            <SecurityEntry user_value={userInfo.last_name} tag={"last name"} userInfo={userInfo} jsonTag={"last_name"} setUserInfo={setUserInfo}/>
         </tbody>
      </table>
   </div>
</div>
</div>
    );
};

export default PetSeekerSecurity;