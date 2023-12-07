import { useState, useContext, useEffect} from "react";
import { APIContext } from "../../contexts/APIContext";
import BASE from "../../constants/baseUrl";
import NotificationBox from "../Notification_box";

const Notification_DropDown = () => {
    const [notifications, setNotifications] = useState([]);
    const [query, setQuery] = useState({read:0, page: 1, sort: 0, type:0});
    const {user, setUser} = useContext(APIContext);
    const [activeCard, setActiveCard] = useState('notification-set1');

    const handleCardChange = (cardId, type) => {
        setActiveCard(cardId);
        setQuery({ ...query, type });
    };

    useEffect(() => {
        let err = 0;
        const { read, page, sort, type } = query;
        fetch(`${BASE}/notifications/?page=${page}&read=${read}&sort=${sort}&type=${type}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`, 
            },
        }).then(res => {
            if(!res.ok){
                err = 1;
            }
            return res.json();
        })
        .then(json => {
            if (err){
                console.log(json);
            } else {
                setNotifications(json);
            }
        })
    }, [query]);

    return (
        <>
        <div
            className="dropdown-menu scrollable-dropdown offset-dropdown-menu"
            aria-labelledby="dropdownMenuButton"
        >
            <div className="dropdown-header d-flex justify-content-between">
                <button
                    id="btn-1"
                    className={`btn btn-sm btn-light ${activeCard === 'notification-set1' ? 'active-btn' : ''}`}
                    onClick={() => handleCardChange('notification-set1', 1)}
                >
                    Chat
                </button>
                <button
                    id="btn-2"
                    className={`btn btn-sm btn-light ${activeCard === 'notification-set' ? 'active-btn' : ''}`}
                    onClick={() => handleCardChange('notification-set2', 0)}
                >
                    System Notification
                </button>
            </div>
            <div className="dropdown-content">
                <div id="notification-set1" style={{ display: activeCard === 'notification-set1' ? 'block' : 'none' }}>
                    {console.log(notifications)}
                    {notifications?.map((notification) => (
                        <NotificationBox key={notification.id} notification={notification}/>
                    ))}
                </div>
                <div id="notification-set2" style={{ display: activeCard === 'notification-set2' ? 'block' : 'none' }}>
                    {notifications?.map((notification) => (
                        <NotificationBox key={notification.id} notification={notification}/>
                    ))}
                </div>
            </div>
        </div>
    </>
    )
}

export default Notification_DropDown;