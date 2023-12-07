import { Link } from "react-router-dom";

const NotificationBox = ({notification}) => {
    const style = {
        "borderRight" : notification.read ? "2px solid black" : "10px solid purple"
    }

    return (
        <>
            <div className="card mt-2" style={style}>
                    <Link to={notification.action_link} className="card-body">
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