import './login.css';
import {Link, useNavigate} from "react-router-dom";
import BASE from '../../constants/baseUrl';
import { useContext } from 'react';
import { APIContext } from '../../contexts/APIContext';

const Login = () => {
    const navigate = useNavigate();
    const {user , setUser} = useContext(APIContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        let formData = event.target.elements;
        fetch(`${BASE}/login/`,
        {
            method: "POST",
            body: JSON.stringify({
                username: formData.username.value,
                password: formData.password.value,
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => {
            if (!res.ok){
                throw new Error("Invalid Combination");
            } else{
                return res.json()
            }
        }).then(json => {
            const newobj = {...user,"token":json.access};
            setUser(newobj);
            return fetch(`${BASE}/accounts/current/`,{
                headers: {Authorization: `Bearer ${json.access}`}
        }).then (res => {
            if (!res.ok){
                throw new Error("Received bad token for auth");
            } else{
                return res.json()
            }
        }).then(json => {
            const newobj = {...user,
                "id":json.id,
                "firstName": json.first_name,
                "lastName" : json.last_name,
                "isShelter": json.isShelter,
                'avatar_src' : json.avatar
            };
            setUser(newobj);
            navigate("/petSearch");
        })
        }).catch(error => {
            let alert = document.getElementById("alert");
            alert.classList.remove("d-none");
            alert.innerText = error;
        })
    }

    return <>
    <div id="alert" className="alert alert-danger m-0 d-none" role="alert">- </div>
    <div className='body'>
        <div className="container">
            <div className="login form">
                <header>Login</header>
                <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter your username" name='username' />
                <input type="password" placeholder="Enter your password" name='password' />
                <Link to="/login">Forgot password?</Link>
                <input type="submit" className="button" value="Login" />
                
                </form>
                <div className="signup">
                    <span className="signup">
                        Don't have an account?&nbsp;
                        <Link to="/register">Signup</Link>
                    </span>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default Login;