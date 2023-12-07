import "./card.css";
import testing_image from "../../../imgs/dog-landing.jpg";
import { Outlet, Link, useLocation } from "react-router-dom"
import { useContext, useState, useEffect } from 'react';
import { APIContext } from "../../../contexts/APIContext";
import BASE from "../../../constants/baseUrl";
import emptyProfile from '../../../imgs/blank-profile.png';

/**
 */
const AdoptionCard = ({ pet }) => {

    const {user} = useContext(APIContext);
    const pet_creation = pet.creation_time.split('T')[0];
    const pet_update = pet.last_update_time.split('T')[0];

    const detailLink = `/detail/${pet.id}`;
    const chatLink = `/pet-seeker-adoption/${pet.id}/chat`;
    const reviewLink = `/pet-seeker-adoption/${pet.id}/review`;
    const helpLink = `/pet-seeker-adoption/${pet.id}/help`;
    const trackLink = `/pet-seeker-adoption/${pet.id}/track`;

    const [petInfo, setPetInfo] = useState({});

    useEffect(() => {
        let err = 0;
        fetch(`${BASE}/listings/${pet.pet}/`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
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
                setPetInfo(json);
            }
        })
    }, [pet.pet]);

    return (
    <>
    <div className="card mb-3">
      <div className="card-header">
        <div>
          <h6>Order Placed</h6>
          <p>{pet_creation}</p>
        </div>
        <div>
          <h6>Last Update</h6>
          <p>${pet_update}</p>
        </div>
        <div>
          <h6>Ship to</h6>
          <p>{user.firstName} {user.lastName}</p>
        </div>
      </div>
      <div className="row g-0 align-items-center">
        <div className="col-1"></div>
        <div className="col-12 col-md-2">
          <div className="adoption-image">
            {console.log(petInfo)}
            <img src={petInfo.avatar ? petInfo.avatar : emptyProfile} alt="profile pic"/>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card-body">
            <div className="seeker-pet-record">
              <h5>{petInfo.name}</h5>
              <p className="pet-type">{petInfo.breed}</p>
              <p>
                <span className="material-symbols-outlined"> weight </span>
                {petInfo.size}lbs/{petInfo.age} years old
              </p>
              <p>
                <span className="material-symbols-outlined"> home </span>
                Shelter ID: {petInfo.shelter}
              </p>
            </div>
            <a href={detailLink} className="btn btn-secondary btn-petdetail">
              <span className="material-symbols-outlined"> info </span>
              <span>Detail</span>
            </a>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card-body adoption-records-buttons">
            <a href={chatLink} className="btn btn-secondary btn-petdetail">
              <span className="material-symbols-outlined"> contact_page </span>
              <span>Contact Shelter</span>
            </a>
            <a href={reviewLink} className="btn btn-light">
              <span className="material-symbols-outlined"> mode_comment </span>
              <span>Leave Review</span>
            </a>
            <a href={helpLink} className="btn btn-light">
              <span className="material-symbols-outlined"> help </span>
              <span>Get Help</span>
            </a>
            <a href={trackLink} className="btn btn-light">
              <span className="material-symbols-outlined"> pin_drop </span>
              <span>Track Position</span>
            </a>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}

export default AdoptionCard;