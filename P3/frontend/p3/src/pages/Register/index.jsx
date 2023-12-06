import './register.css';
import {Link, useNavigate } from "react-router-dom"
import BASE from '../../constants/baseUrl';

const Register = () => {    
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        let formData = event.target.elements;
        let error = false;
        let response = fetch(`${BASE}/accounts/register/`,
        {
            method: "POST",
            body: JSON.stringify({
                username: formData.username.value,
                password1: formData.password1.value,
                password2: formData.password2.value,
                email: formData.email.value,
                isShelter:formData.isShelter.checked,
                phone_number:formData.phone_number.value,
                location: "Toronto"
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => {
            if(!res.ok){
                error = true;
            }
            return res.json()})
        .then((json) => {
            if (error){
                let error = document.getElementById("alert");
                error.classList.remove("d-none");
                let errorMessge = json[Object.keys(json)[0]];
                error.innerText = errorMessge;
            } else {
                // success!!
                navigate("/login");
            }
        })
    }

    return <>
    <div className="alert alert-danger m-0 d-none" role="alert" id="alert">This is a danger alert—check it out!</div>
    <div className='body'>
        <div className="container">
            <div className="registration form">
                <header>Signup</header>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter your username" name="username" required/>
                    <input type="text" placeholder="Enter your email" name="email" required/>
                    <input type="password" placeholder="Create a password" name="password1" required/>
                    <input type="password" placeholder="Confirm your password" name="password2" required />
                    <input type="tel" name="phone_number" placeholder="Phone Number" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" maxLength="10"  title="Ten digit number" required/>    
                    <div className='shelter-box d-flex justify-content-center align-items-center flex-row'>
                        <input className="m-1" type="checkbox" id="isShelter" name="isShelter" ></input>
                        <label className = "m-1" htmlFor="isShelter"> Sign Up as Shelter</label>
                    </div>
                    <input type="submit" className="button" value="Signup" />
                </form>
                <div className="signup">
                <span className="signup"
                    >Already have an account?&nbsp;
                    <Link to="/login">Login</Link>
                </span>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default Register;