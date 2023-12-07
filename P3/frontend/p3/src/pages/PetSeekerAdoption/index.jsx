import "./adoption.css";
import { useState, useEffect } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import BASE from '../../constants/baseUrl';
import SideNevigation from "../../components/SideNevBar";
import AdoptionList from "./AdoptionList";
import { useContext } from "react";
import { APIContext } from "../../contexts/APIContext";


const PetSeekerAdoption = () => {
    const {user} = useContext(APIContext);
    const buttons = [
        { route: "/pet-seeker-dashboard", name: "Dashboard", icon: "account_circle" },
        { route: "/pet-seeker-adoption", name: user.isShelter ? "Listings" : "Adoption", icon: "inventory_2" },
        { route: "/pet-seeker-security", name: "Security", icon: "passkey" },
        { route: "/pet-seeker-help", name: "Help", icon: "help" },
    ];
    const [query, setQuery] = useState({search: "", page: 1, status: "pending"})
    const [totalPages, setTotalPages] = useState(1);
    const [pets, setPets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const type = user.isShelter;

    useEffect(() => {
        if (user.userId === '') {
            navigate(`/login`);
        }
    },  [user.userId, navigate]);
    
    const handleSearch = () => {
        setQuery({...query, search: searchTerm});
    }

    const handleInputChanged = (e) => {
        setSearchTerm(e.target.value);
    }

    const changePage = (newPage) => {
        setQuery(prevQuery => ({ ...prevQuery, page: newPage }));
    };

    useEffect(() => {
        let err = 0;
        const {search, page, status} = query;
        fetch(`${BASE}/applications/all/?page=${page}&search=${search}&status=&all=0`, {
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
                setPets(json.results);
                console.log(json.results);
                setTotalPages(json.max_pages);
            }
        })
    }, [query]);


    return (
        <>
            <div className="adoption-content">
                <SideNevigation buttons={buttons} />
                <div className="main-content">
                    <div className="pet-order-search">
                        <div>Your Adoptions</div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Your Orders"
                                aria-label="Search"
                                onChange={handleInputChanged}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <AdoptionList pets={pets} type={type} />
                    <div >
                    <p>
                        {query.page > 1 && <button className="btn btn-outline-secondary" onClick={() => changePage(query.page - 1)}>Previous</button>}
                        {query.page < totalPages && <button className="btn btn-outline-secondary" onClick={() => changePage(query.page + 1)}>Next</button>}
                    </p>
                    <p>Page {query.page} out of {totalPages}</p>
                </div>
                </div>
            </div>
        </>
    );
};

export default PetSeekerAdoption;