import { useContext, useState } from "react";
import { APIContext } from "../../../contexts/APIContext";
import BASE from "../../../constants/baseUrl";
import "./popup.css";

const PopUp = ({ onClose, tag, setUserInfo, jsonTag }) => {
    const { user, setUser } = useContext(APIContext);
    const [inputParam, setInputParam] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (jsonTag === 'password' && inputParam !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        let data = {
            [jsonTag]: inputParam 
        };

        const jsonString = JSON.stringify(data);

        fetch(`${BASE}/accounts/${user.userId}/`, {
            method: 'PATCH',
            body: jsonString,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`, 
            }
        })
        .then(res => {
            if (!res.ok) throw new Error('Invalid input');
            return res.json();
        })
        .then(json => {
            setUserInfo(json);
            onClose();
        })
        .catch(error => {
            setError(error.message);
        });
    };

    return (
        <div className="card pop-up-card">
            <div className="card-body">
                <h5 className="card-title">Change Profile Information</h5>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    <div className="security-input-1">
                        <p>{tag}</p>
                        <input 
                            type={jsonTag === 'password' ? "password" : "text"}
                            value={inputParam}
                            onChange={e => setInputParam(e.target.value)} 
                        />
                    </div>
                    {jsonTag === 'password' && (
                        <div className="security-input-2">
                            <p>Re-enter password</p>
                            <input 
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)} 
                            />
                        </div>
                    )}
                    <div className="pop-up-btns">
                        <button onClick={onClose} type="button" className="btn btn-primary">Close</button>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PopUp;