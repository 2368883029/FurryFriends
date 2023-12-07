import { useState } from "react";
import PopUp from "../PopUp";

const SecurityEntry = ({user_value, tag, userInfo, jsonTag, setUserInfo}) => {
    const [isClicked, setIsClicked] = useState(false);

    const changeClickState = () => {
        setIsClicked(!isClicked);
    }

    return (
        <tr>
            <td>{tag}</td>
            <td>{user_value}</td>
            <td><a className="btn btn-primary" onClick={changeClickState}>Edit</a></td>
            {isClicked && <PopUp onClose={changeClickState} tag={tag} userInfo={userInfo} jsonTag={jsonTag} setUserInfo={setUserInfo}/>}
        </tr>
    )
}

export default SecurityEntry;