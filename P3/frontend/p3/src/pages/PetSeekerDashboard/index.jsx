import "./user-profile.css";
import { useState, useEffect, useContext,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE from '../../constants/baseUrl';
import SideNevigation from "../../components/SideNevBar";
import { APIContext } from "../../contexts/APIContext";
import emptyProfile from '../../imgs/blank-profile.png';
import Popup from "./PopUp";
import './shelter-listing.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax



const PetSeekerDashboard = () => {
    const {user} = useContext(APIContext);
    const [popupStatus, setPopupStatus] = useState(false);
    const navigate = useNavigate();
    const [shelterListings, setShelterListings] = useState([]);
    const [page, setPage] = useState(1);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(9);
     
    

    const buttons = [
        { route: "/pet-seeker-dashboard", name: "Dashboard", icon: "account_circle" },
        { route: "/pet-seeker-adoption", name: user.isShelter ? "Listings" : "Adoption", icon: "inventory_2" },
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
        // get shelter listings
        if (user.isShelter){
            fetch(`${BASE}/listings/all/?page=${page}&shelterId=${user.userId}`,{
                headers: {Authorization: `Bearer ${user.token}`}
            }).then(res => res.json()).then(json => {
                let prev = document.getElementById("prev-button");
                let next = document.getElementById("next-button");
                json.previous === null ? prev.classList.add("d-none") : prev.classList.remove("d-none");
                json.next === null ? next.classList.add("d-none") : next.classList.remove("d-none");
                setShelterListings(json.results);
            })
        }
    },[page]);

    const pagination = () => {
        if (user.isShelter){
            return <>
            <div className='d-flex flex-row justify-content-center align-items-center w-100 py-4'>
                <button className='btn m-2' id="prev-button" onClick = {()=> {setPage(page - 1)}} >Previous Page</button>
                <button className='btn m-2' id="next-button" onClick = {()=> {setPage(page + 1)}} >Next Page </button>
            </div>
        </>
        }
    }

    useEffect(() => {
        if (user.location !== ""){
            if (map.current) return; // initialize map only once
            let token = 'pk.eyJ1Ijoia2lyYW4xMzciLCJhIjoiY2xwdmxkNzhxMDYxbTJqcDlzd3hoZ2JpaSJ9.jqNtixucEvi-Cb9536tj6A';
            mapboxgl.accessToken = token;
            
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${user.location}.json?proximity=ip&access_token=${token}`).then(res =>res.json())
            .then(json => {
                console.log(json.features);
                if (json.features.length > 0){
                    let long = json.features[0].center[0];
                    let lat = json.features[0].center[1];
                    map.current = new mapboxgl.Map({
                        container: mapContainer.current,
                        style: 'mapbox://styles/mapbox/streets-v12',
                        center: [long, lat],
                        zoom: zoom
                        });
                        
                        const marker1 = new mapboxgl.Marker()
                        .setLngLat([long, lat])
                        .addTo(map.current);
                }
                
            })
        }
    },[]);

    return (<>

        <div className="pet-seeker-content">
            
            <SideNevigation buttons={buttons} />
                    
            <div className="main-content">
            
                <div className="dashPic">
                    <img src={user.avatar_src ? `${BASE}${user.avatar_src}` : emptyProfile} alt="profile pic" onClick={() => {togglePopup()}}/>
                </div>
                <p>Change Profile Picture</p>
                {popupStatus && <Popup onClose={() => {togglePopup()}} />}
                <div id="welcome-message">Welcome, {user.firstName}</div>
                <div ref={mapContainer} className="map-container" />
                <div id="pet-card-container"></div>
                {user.isShelter ? <h1>Your Listings</h1> : <></>}
                <div className="align-cards shelterDash">
                    
                    {shelterListings.map((l)=> {
                        return <div className="card">
                            <div className="pet-image">
                                <img src={l.avatar ?? emptyProfile} alt="Avatar" className="w-100"/>
                            </div>
                            <div className="pet-card-name">{l.name}</div>
                            <div className="pet-card-information">{l.breed}</div>
                            <div className="additional-pet-info">
                                <p className="d-flex flex-row align-items-center justify-content-start"><span className="material-symbols-outlined"> weight </span>{l.size}lbs/{l.age} years old</p>
                                <Link to={`/petDetails/${l.id}`} className="btn btn-secondary btn-petdetail d-flex flex-row align-items-center justify-content-start">
                                    <span className="material-symbols-outlined m-2"> info </span>
                                    <span>More Details</span>
                                </Link>
                            </div>
                        </div>
                    })}
                    {pagination()}
    
                </div>
            </div>
        </div>
        </>
    );
};

export default PetSeekerDashboard;