import './login.css';
import {Link} from "react-router-dom";
import BASE from '../../constants/baseUrl';

const Login = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return <>
    <div id="alert-login" className="alert alert-danger text-center d-none" role="alert">
      Invalid username and password combination!
    </div>
    <div id="alert-signup" className="alert alert-danger text-center d-none" role="alert">
      Invalid username!
    </div>
    <div className='body'>
        <div className="container">
            <div className="login form">
                <header>Login</header>
                <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter your email" />
                <input type="password" placeholder="Enter your password" />
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