import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import BASE from "../../constants/baseUrl";
import { APIContext } from "../../contexts/APIContext";

const NotificationBox = ({notification}) => {
    const [clicked, setClicked] = useState(notification.read);
    const {user} = useContext(APIContext);

    const handleClick = () => {
        setClicked(true);
        let err = 0;
        
        fetch(`${BASE}/notifications/${notification.id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`, 
            },
        }).then(res => {
            if(!res.ok){
                err = 1;
            }
            return res.json();
        }).then(json => {
            if (err){
                console.log(json);
            }
        })
    }

    const style = {
        "borderRight" : clicked ? "2px solid black" : "10px solid purple"
    }

    return (
        <>
            <div className="card mt-2" style={style}>
                    <Link to={notification.action_link} className="card-body" onClick={handleClick}>
                    <h5 className="card-title">{
                        notification.type = 'new_application' ? 'New Application' :
                        notification.type = 'new_comment' ? 'New Comment' :
                        notification.type = 'status_update' ? 'Status Update' :
                        "New Message"
                    }</h5>
                    <p className="card-text">{notification.message}</p>
                    </Link>
            </div>
        </>
    )
}

export default NotificationBox;