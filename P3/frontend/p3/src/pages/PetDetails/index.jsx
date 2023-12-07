import { useEffect, useState } from 'react';
import './pet-details.css';
import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import { APIContext } from '../../contexts/APIContext';
import BASE from '../../constants/baseUrl';

const PetDetails = () => {
    const [pet, setPet] = useState({
        "id": -1,
        "name": "",
        "breed": "",
        "sex": "",
        "age": -1,
        "size": -1,
        "color": "",
        "status": "",
        "description": "",
        "medical_history": null,
        "other_notes": null,
        "avatar": "",
        "shelter": -1
    });
    const {user} = useContext(APIContext);
    const { id } = useParams();

    user.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyMDAyNjMwLCJpYXQiOjE3MDE5MTYyMzAsImp0aSI6IjFhNmJhNDQ4MGQ3YzQwYzFiMzYzYjIxOWZmZTFmZWUwIiwidXNlcl9pZCI6Mn0.KbEGnzYW-E1lfqOTZZZEHlsYBN5LgQTIex8akaZhNS0";

    function capitalizeFirstLetter(string) {
        if (string === undefined || string === null || string.length <= 0){
            return ""
        }
        return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
    }

    useEffect(() => {
        fetch(`${BASE}/listings/${id}`,{
            headers: {Authorization: `Bearer ${user.token}`}
        }).then(res => res.json()).then(json => {
            setPet(json);
        })
    },[])

    useEffect(() => {
        if (pet.id == -1){
            return;
        }
        fetch(`${BASE}/applications/exists?userId=${user.userId}&listingId=${pet.id}`,{
            headers: {Authorization: `Bearer ${user.token}`}
        }).then(res => res.json()).then(json => {
            let existing_app = json.exists;
            if (existing_app || pet.status === "not_available" || user.isShelter){
                document.getElementById("adopt-button").disabled = true;
            }
        })

    },[pet])

    const handleSubmit  = (e) => {
        e.preventDefault();
        fetch(`${BASE}/applications/`,
        {
            method: "POST",
            body: JSON.stringify({pet: pet.id }),
            headers: {Authorization: `Bearer ${user.token}`,"Content-type": "application/json"}
        }).then(res => {
            if(res.ok){
                document.getElementById("adopt-button").disabled = true;
            }
            return;})
    }

    return <>
    <div className="container-fluid d-flex flex-column justify-content-start align-items-start petDetailsCont">
      <Link to='/petSearch' className="back-button d-flex justify-content-center align-items-center flex-row"><span className="material-symbols-outlined">arrow_back</span>Back</Link>
      <div className="d-flex justify-content-lg-start flex-lg-row align-items-lg-start flex-column justify-content-center align-items-center ">
          <div className="image-cont w-100 w-lg-50">
              <img className="pet-image" src={pet.avatar} alt="corgi dog"/>
          </div>
          <div className="d-flex justify-content-start align-items-start flex-column ml-lg-4 details-body w-100 w-lg-50">
              <h2 className="color-purple m-0">{pet.name}</h2>
              <h4 className="color-dark-grey">{pet.breed}</h4>
                <div id ="status-pill" className={`pet-status-pill ${pet.status === "available" ? "status-available" :"status-unavailable" }`}>{capitalizeFirstLetter(pet.status)}</div>
              <div className="d-flex flex-row justify-content-start align-items-center flex-wrap"> 
                  <div className="pet-feature">Sex: {capitalizeFirstLetter(pet.sex)}</div>
                  <div className="pet-feature">Age: {pet.age}yr</div>
                  <div className="pet-feature">Weight: {pet.size}lbs</div>
              </div>
              <div className="my-3">
                  <h5 className="color-purple m-0">Location</h5>
                  <Link to={`/shelterDetails/${pet.shelter}`} className="m-0 text-dark">Toronto Animal Rescue</Link>
              </div>
              <div className="my-3">
                  <h5 className="color-purple m-0">Description</h5>
                  <p className="m-0">{capitalizeFirstLetter(pet.description)}</p>
              </div>
              <div className="my-3">
                  <h5 className="color-purple m-0">Health</h5>
                  <p className="m-0">{capitalizeFirstLetter(pet.medical_history)}</p>
              </div>
              <div className="my-3">
                  <h5 className="color-purple m-0">Other Notes</h5>
                  <p className="m-0">{capitalizeFirstLetter(pet.other_notes)}</p>
              </div>
              <button id="adopt-button" type="button" className="btn adopt-button" data-toggle="modal" data-target="#adoptModal">Adopt</button>
          </div>
      </div>
  </div>

    {/* Adopt Modal */}
    <div className="modal fade" id="adoptModal" tabIndex="-1" role="dialog" aria-labelledby="adoptModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="adoptModalLabel">Are you sure you want to submit an adoption request?</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body"> 
              <button type="submit" onClick ={(e) => {handleSubmit(e)}} className="btn btn-primary" data-dismiss="modal">Submit</button>
          </div>
        </div>
      </div>
    </div>
    </>
}

export default PetDetails;