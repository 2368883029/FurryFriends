import "./pop-up.css";
import { APIContext } from "../../../contexts/APIContext";
import BASE from '../../../constants/baseUrl';
import { useState, useEffect, useContext } from "react";

const PopUp = ({onClose}) => {
    const userID = 2;
    const user = {
        username: "test1",
        email: "john_doe@mail.utoronto.ca",
        first_name:"john",
        last_name:"doe",
        location:"Some Location",
        phone_number:"123123123",
        isShelter: false
    }
    const [profilePicture, setProfilePicture] = useState(null);

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        user.profile_picture = profilePicture;

        const data = JSON.stringify(user);
        
        console.log("Handle Submit");
        fetch(`${BASE}/accounts/${userID}/`, {
            method: 'PATCH',
            body: data,
            headers: {
                'Content-Type': 'application/json'
                // Add additional headers if necessary
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log('Profile updated:', json);
            onClose(); // Consider calling onClose here if appropriate
        })
        .catch(error => {
            console.error('Error updating profile:', error);
        });
    };
    
    return (
        <div className="card pop-up-card">
          <div className="card-body">
          <h5 className="card-title">Change your Profile Picture </h5>
            <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange}/>
            <div className="pop-up-btns">
                <button onClick={onClose} className="btn btn-primary">Close</button>
                <button className="btn btn-primary" type="submit">Submit</button>
            </div>
            </form>
          </div>
        </div>
    );
}

export default PopUp;