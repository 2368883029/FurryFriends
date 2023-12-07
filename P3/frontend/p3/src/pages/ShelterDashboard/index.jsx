import { useState, useEffect, useContext } from "react";
import SideNevigation from "../../components/SideNevBar";
import { APIContext } from "../../contexts/APIContext";
import BASE from '../../constants/baseUrl';
import { useParams, Link } from 'react-router-dom';
import './pet-seeker-dashboard.css';
import './shelter-dashboard.css';
import './pet-seeker-nevigation.css';

const ShelterDashboard = () => {
    const {user} = useContext(APIContext);
    const { tab } = useParams();
    const buttons = [
        { route: "/shelter/profile", name: "Profile", icon: "account_circle" },
        { route: "/shelter/listings", name: "Listings", icon: "inventory_2" },
        { route: "/shelter/account", name: "Account", icon: "passkey" },
    ];

    return <>
    
    <div class="content">
    <SideNevigation buttons={buttons} />
      <div class="main-content">
        <div class="shelterPic">
          <img src={`${BASE}${user.avatar_src}`} alt="shelter pic" />
        </div>
        <div className="shelter-rating"></div>
        <div> <a href="../html/shelter-detail.html">{user.firstName}</a></div>
        
        <div class="align-cards">
          <div class="card">
            <div class="pet-image">
              <img src="../imgs/corgi-dog.jpg" alt="Avatar" style={{width: "100%"}}/>
            </div>
            <div class="pet-card-name">
              Goodest Boi
            </div>
            <div class="pet-card-information">
              Male Corgi
            </div>
            <div class="additional-pet-info">
              <p>
                <span class="material-symbols-outlined"> weight </span>4.5lbs/2 years old
              </p>
              <p>
                <span class="material-symbols-outlined"> home </span>Toronto Animal Rescue
              </p>
              <a href="" class="btn btn-secondary btn-petdetail">
                <span class="material-symbols-outlined"> info </span>
                <span>More Details</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
}

export default ShelterDashboard;