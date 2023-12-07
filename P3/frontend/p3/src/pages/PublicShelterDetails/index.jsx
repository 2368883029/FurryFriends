import { useState, useEffect, useContext,useRef } from "react";
import { Link ,useParams } from "react-router-dom";
import BASE from '../../constants/baseUrl';
import { APIContext } from "../../contexts/APIContext";
import emptyProfile from '../../imgs/blank-profile.png';
import './shelterDetails.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax



const PublicShelterDetails = () => {
    const {user} = useContext(APIContext);
    const [shelter, setShelter] = useState({});
    const { id } = useParams();
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(9);

    useEffect(()=> {
        fetch(`${BASE}/accounts/${id}/`,{
            headers: {Authorization: `Bearer ${user.token}`}
        }).then(res => res.json()).then(json => {
            setShelter(json);
        })
    }, [])

    useEffect(() => {
        if (shelter.location !== "" && shelter.location !== undefined && shelter.location !== null){
            if (map.current) return; // initialize map only once
            let token = 'pk.eyJ1Ijoia2lyYW4xMzciLCJhIjoiY2xwdmxkNzhxMDYxbTJqcDlzd3hoZ2JpaSJ9.jqNtixucEvi-Cb9536tj6A';
            mapboxgl.accessToken = token;
            console.log(shelter.location)
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${shelter.location}.json?proximity=ip&access_token=${token}`).then(res =>res.json())
            .then(json => {
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
    },[shelter]);


    return<>
    <div class="shelterDetailsContent mb-4">
        <h1> Shelter Details</h1>
        <div class="shelterPic">
          <img src={shelter.avatar ? `${shelter.avatar}` : emptyProfile} alt="shelter pic"/>
        </div>
        <h5>Toronto Animal Rescue</h5>
        <div ref={mapContainer} className="map-container" />
        <p className="mb-0"><b>Phone Number: </b>{shelter.phone_number ?? "N/A"}</p>
        <p><b>Email:</b> {shelter.email ?? "N/A"}</p>
      </div>
    </>
}

export default PublicShelterDetails;