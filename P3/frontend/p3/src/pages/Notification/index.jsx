import { useState, useEffect } from "react";
import { useContext } from "react";
import { APIContext } from "../../contexts/APIContext";
import BASE from "../../constants/baseUrl";
import NotificationEntry from "./Notification_Entry";
import "./notification.css";

const Notification = () => {
    const [query, setQuery] = useState({page:1, sort:0, read:0, type:0});
    const [notifications, setNotifications] = useState([]);
    const { user } = useContext(APIContext);
    
    const setSort = () => {
        setQuery({...query, sort: query.sort === 0 ? 1 : 0});
    }

    const setCheck = (e, newQuery) => {
        setQuery(newQuery);
    };

    useEffect(() => {
        let err = 0;
        const { read, page, sort, type } = query;
        console.log(query)
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
        }).then(json => {
            if (err){
                console.log(json);
            } else {
                setNotifications(json);
            }
        })
    }, [query, user.token]);

    return (
        <>
    <div className="message-notification">
    <div className="container-fluid d-flex justify-content-between flex-row flex-wrap align-items-center pt-4">
            <div className="d-flex justify-content-end flex-row align-items-center">
                <button onClick={(event) => setCheck(event, {...query, read: query.read === 0 ? 1: 0, page: 1})} className={`filter-menu-option ${query.read ? 'blue-button' : ''}`} >Read</button>
                <button onClick={(event) => setCheck(event, {...query, type: query.type === 0 ? 1: 0, page: 1})} className={`filter-menu-option ${query.type ? 'blue-button' : ''}`}>Chat Notification</button>
                <div className="menu-divider"></div>
                <div className="btn-group">
                    <button type="button" className="btn dropdown-toggle sort-button m-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sort:
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <button className="dropdown-item" onClick={setSort} type="button">Time</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="notification-container"className="d-flex flex-column align-items-start my-3 w-100">
            {notifications.map((notification) => (
                <NotificationEntry notification={notification}/>
            ))}
        </div>

        <div className='d-flex flex-row justify-content-center align-items-center w-100 py-4'>
            <button className='btn m-2' id="prev-button" onClick={() => setQuery({...query, page: query.page - 1})}>Previous Page</button>
            <button className='btn m-2' id="next-button" onClick={() => setQuery({...query, page: query.page + 1})}>Next Page</button>
        </div>
    </div>
    </>
    )
};

export default Notification;