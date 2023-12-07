import './pet-search.css';
import { useState , useEffect} from "react";
import { useContext } from 'react';
import { APIContext } from '../../contexts/APIContext';
import BASE from '../../constants/baseUrl';

const PetSearch = () => {
    const [query, setQuery] = useState({page:1,name:"",status:"Available",sort:"name"});
    const [shelters, setShelters] = useState([])
    const {user} = useContext(APIContext);

    const getShelters = () => {
        fetch(`${BASE}/accounts/all/`,{
            headers: {Authorization: `Bearer ${user.token}`}
        }).then(res => res.json()).then(json => {
            let shelters_arr = [];
            Object.keys(json).forEach((i) => {
                let shelter = json[i];
                shelters_arr.push({"id" : shelter.id, "username":shelter.username});
            });
            setShelters(shelters_arr);
            return;
        })
    }

    useEffect(() => {
        getShelters();
    },[])

    // useEffect(() => {
    //     let url = `${BASE}/listings/all/?`;
    //     Object.keys(query).forEach((key)=> {
    //         console.log(key);
    //         url = url.concat("", `${key}=${query.key}&`);
    //     });
    //     console.log(url);
    //     // fetch(url,{
    //     //     headers: {Authorization: `Bearer ${user.token}`}
    //     // }).then(res => res.json()).then(json => {
    //     //     let shelters_arr = [];
    //     //     Object.keys(json).forEach((i) => {
    //     //         let shelter = json[i];
    //     //         shelters_arr.push({"id" : shelter.id, "username":shelter.username});
    //     //     });
    //     //     setShelters(shelters_arr);
    //     //     return;
    //     // })
    // },[query]);

    return <>
    <div className="container-fluid d-flex justify-content-between flex-row flex-wrap align-items-center pt-4">
        <div className="w-50 d-flex justify-content-start align-items-center flex-row">
            <input type="search" className="search-bar p-1" placeholder="Search Name" aria-label="Search" />
        </div>
        <div className="d-flex justify-content-end flex-row align-items-center">
            <button id="filter-button" type="button" className="btn filter-button d-flex justify-content-center align-items-center m-0" data-toggle="modal" data-target="#filterModal">Filter <span className="material-symbols-outlined">filter_list</span></button>
            <div className="menu-divider"></div>
            <div className="btn-group">
                <button type="button" className="btn dropdown-toggle sort-button m-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >Sort: Name (A-Z)</button>
                <div className="dropdown-menu dropdown-menu-right">
                    <button className="dropdown-item" type="button">Age (Youngest)</button>
                </div>
            </div>
        </div>
    </div>

    {/* Filter Modal */}
    <div className="modal fade" id="filterModal" tabIndex="-1" role="dialog" aria-labelledby="filterModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title" id="filterModalLabel">Filter Options</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div className="modal-body d-flex flex-column justify-content-start align-items-start">
                <div className="d-flex flex-row justify-content-start align-items-center w-100 m-3">
                    <p className="w-25 m-0 font-weight-bold">Sex</p>
                    <div className="d-flex justify-content-start align-items-center flex-fill">
                        <button className="filter-menu-option" >Male</button>
                        <button className="filter-menu-option">Female</button>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-start align-items-center w-100 m-3">
                    <p className="w-25 m-0 font-weight-bold">Status</p>
                    <div className="d-flex justify-content-start align-items-center flex-fill">
                        <button className="filter-menu-option" >Available</button>
                        <button className="filter-menu-option">Not Available</button>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-start align-items-center w-100 m-3">
                    <p className="w-25 m-0 font-weight-bold">Age(years)</p>
                    <div className="d-flex justify-content-start align-items-center flex-fill">
                        <button className="filter-menu-option" >0+</button>
                        <button className="filter-menu-option">2+</button>
                        <button className="filter-menu-option" >3+</button>
                        <button className="filter-menu-option">4+</button>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-start align-items-center w-100 m-3">
                    <p className="w-25 m-0 font-weight-bold">Shelter</p>
                    <div className="d-flex justify-content-start align-items-center flex-fill">
                        {shelters.map((s) => {
                            return <button className="filter-menu-option" key ={s.id}>{s.username}</button>
                        })}
                        
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    <div id="pet-card-container" className="d-flex flex-row justify-content-center align-items-start flex-wrap my-3">



    </div>
    </>
}

export default PetSearch;