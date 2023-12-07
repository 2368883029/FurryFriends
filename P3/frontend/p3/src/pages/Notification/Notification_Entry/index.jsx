import React, { useState, useContext} from "react";
import { Link } from "react-router-dom";
import BASE from "../../../constants/baseUrl";
import { APIContext } from "../../../contexts/APIContext";

const NotificationEntry = ({ notification }) => {
    const [read, setRead] = useState(notification.read);
    const notificationTitle = (type) => {
        switch (type) {
            case 'new_application':
                return 'New Application';
            case 'new_comment':
                return 'New Comment';
            case 'status_update':
                return 'Status Update';
            default:
                return 'Notification';
        }
    };
    const { user } = useContext(APIContext);

    const handleClick = () => {
        setRead(true);

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
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
    <div id="notification-card">
        <div className={`card mt-3 ${read ? 'notification-read' : 'notification-unread'}`} onClick={handleClick} style={{ width: '100%', margin: '0 auto' }}>
            <div className="card-body">
                <h5 className="card-title">{notificationTitle(notification.type)}</h5>
                <p className="card-text">{notification.message}</p>
                <p className="card-text"><small className="text-muted">Received on: {formatDate(notification.creation_time)}</small></p>
                <Link to={notification.action_link} className="btn btn-primary">View Details</Link>
            </div>
        </div>    
    </div>
    );
};

export default NotificationEntry;