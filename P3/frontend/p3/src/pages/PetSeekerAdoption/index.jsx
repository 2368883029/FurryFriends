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
    const [query, setQuery] = useState({search: "", page: 1, status: "pending", sort: 0})
    const [totalPages, setTotalPages] = useState(1);
    const [pets, setPets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const type = user.isShelter;

    const setCheck = (event, newQuery) => {
        event.preventDefault();
        setQuery(newQuery);
    }

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

    const setSort = () => {
        setQuery({...query, sort: query.sort === 0 ? 1 : 0});
    }

    useEffect(() => {
        let err = 0;
        const {search, page, status, sort} = query;
        fetch(`${BASE}/applications/all/?page=${page}&search=${search}&status=${status}&all=0&sort=${sort}`, {
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
                    <div id="adoption_option" className="d-flex justify-content-end flex-row align-items-center">
                        <button onClick={(event) => setCheck(event, {...query, status: query.status === "" ? "pending": "", page: 1})} className={`filter-menu-option ${query.status === "pending" ? 'blue-button' : ''}`}>Pending only</button>
                    <div/>
                    <div className="menu-divider"></div>
                    <div className="btn-group">
                        <button type="button" className="btn dropdown-toggle sort-button m-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sort:
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <button className="dropdown-item" onClick={setSort} type="button">Newly Mofitication</button>
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