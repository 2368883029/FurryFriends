import "./pop-up.css";
import { APIContext } from "../../../contexts/APIContext";
import BASE from '../../../constants/baseUrl';
import { useState, useEffect, useContext } from "react";

const PopUp = ({onClose}) => {
    const {user, setUser} = useContext(APIContext);
    const [profilePicture, setProfilePicture] = useState(null);

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(user);

        console.log("Handle Submit");
        fetch(`${BASE}/accounts/${user.userId}/`, {
            method: 'PATCH',
            body: new FormData(e.target),
            headers: { Authorization: `Bearer ${user.token}` }
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                let avatar_src = json.avatar.replace(BASE, "");
                setUser({ ...user, avatar_src: avatar_src });
                onClose();
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
            <input type="file" name="avatar" onChange={handleFileChange}/>
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