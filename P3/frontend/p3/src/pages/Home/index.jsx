import './homepage.css';
import {Link} from "react-router-dom"


const Home = () => {
    return <>
    {/* navbar */}

    <div id="top-navbar">
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand logolink" to="/homepage">FurryFriends</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="d-flex flex-row justify-content-end align-items-center w-100">
            <div className="g-signin2" data-onsuccess="onSignIn">
            </div>
            <Link to="/login" className="text-dark font-weight-bold my-0 mr-2">Sign In</Link>
          </div>
        </div>
      </nav>
    </div>
    {/* main content */}
    <div className="content">
      <div className="rectangle">
        <h1>Welcome to FurryFriends</h1>
        <p>Find your perfect furry friend today!</p>
        <Link to="/login" className="btn homeBtn">Get Started</Link>
      </div>
    </div>
    {/* App Information Section */}
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card homepageCard">
            <div className="card-body text-center">
              <i className="fas fa-paw fa-2x"></i>
              <h1 className="highlight">1K+</h1>
              <h5 className="card-title">Adoptions a Day</h5>
              <Link to="/login" className="btn homeBtn btn-card">Get Started</Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card homepageCard">
            <div className="card-body text-center">
              <i className="fas fa-users fa-2x"></i>
              <h1 className="highlight">10M+</h1>
              <h5 className="card-title">Satisfied Customers</h5>
              <Link to="/login" className="btn homeBtn btn-card">Get Started</Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card homepageCard">
            <div className="card-body text-center">
              <i className="fas fa-heart fa-2x"></i>
              <h1 className="highlight">10M+</h1>
              <h5 className="card-title">Happy Pets</h5>
              <Link to="/login" className="btn homeBtn btn-card">Get Started</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="row mt-4">
        <div className="col-12 text-center">
          <h3 className="social-h3">Find us on:</h3>
          <Link to="/homepage" className="social-icon"><i className="fab fa-facebook-f"></i></Link>
          <Link to="/homepage" className="social-icon"><i className="fab fa-twitter"></i></Link>
          <Link to="/homepage" className="social-icon"><i className="fab fa-instagram"></i></Link>
        </div>
      </div>
    </div>
    </>;
}

export default Home;