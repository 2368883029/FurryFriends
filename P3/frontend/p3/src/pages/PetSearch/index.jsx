import './pet-search.css';
import { useState , useEffect} from "react";
import { useContext } from 'react';
import { APIContext } from '../../contexts/APIContext';
import BASE from '../../constants/baseUrl';
import { Link } from 'react-router-dom';

const PetSearch = () => {
    const [query, setQuery] = useState({page:1,name:"",status:"available",sort:"name"});
    const [shelters, setShelters] = useState([])
    const {user} = useContext(APIContext);
    const [listings, setListings] = useState([]);



    useEffect(() => {
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
    },[])

    useEffect(() => {
        let url = `${BASE}/listings/all/?`;
        Object.keys(query).forEach((key)=> {
            url = url.concat("", `${key}=${query[key]}&`);
        }); 
        fetch(url,{
            headers: {Authorization: `Bearer ${user.token}`}
        }).then(res => res.json()).then(json => {
            // handle page buttons
            let prev = document.getElementById("prev-button");
            let next = document.getElementById("next-button");
            json.previous === null ? prev.classList.add("d-none") : prev.classList.remove("d-none");
            json.next === null ? next.classList.add("d-none") : next.classList.remove("d-none");

            setListings(json.results);
        });
    },[query]);

    function getShelterName(arr,shelterName){
        arr = arr.filter((s) => s["id"] === shelterName);
        return arr.length > 0 ? arr[0]["username"] : ""
    }

    function setCheck(event,addQuery){
        let curr = event.target;
        let isChecked = curr.classList.contains("checked");

        let parent = event.target.parentNode;
        for (const child of parent.children){
            child.classList.remove("checked");
        }
        
        if (!isChecked){
            curr.classList.add("checked");
            setQuery(addQuery);
        } else {
            let key = event.target.getAttribute("filtertype");
            delete addQuery[key];
            setQuery(addQuery);
        }
    }

    return <>
    <div className="container-fluid d-flex justify-content-between flex-row flex-wrap align-items-center pt-4 searchBarCont">
        <div className="w-50 d-flex justify-content-start align-items-center flex-row">
            <input type="search" className="search-bar p-1" onChange = {(event) => {setQuery({...query, name:event.target.value,page:1})}}placeholder="Search Name" aria-label="Search" />
        </div>
        <div className="d-flex justify-content-end flex-row align-items-center">
            <button id="filter-button" type="button" className="btn filter-button d-flex justify-content-center align-items-center m-0" data-toggle="modal" data-target="#filterModal">Filter <span className="material-symbols-outlined">filter_list</span></button>
            <div className="menu-divider"></div>
            <div className="btn-group">
                <button type="button" className="btn dropdown-toggle sort-button m-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >Sort: </button>
                <div className="dropdown-menu dropdown-menu-right">
                    <button className="dropdown-item" onClick= {() => {setQuery({...query, sort:"name",page:1})}} type="button">Name (A-Z)</button>
                    <button className="dropdown-item" onClick= {() => {setQuery({...query, sort:"age",page:1})}} type="button">Age (Youngest)</button>
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
                        <button onClick = {(event)=> {setCheck(event,{...query,sex:"male",page:1})}} filtertype = "sex" className="filter-menu-option" >Male</button>
                        <button onClick = {(event)=> {setCheck(event,{...query,sex:"female",page:1})}} filtertype = "sex"  className="filter-menu-option">Female</button>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-start align-items-center w-100 m-3">
                    <p className="w-25 m-0 font-weight-bold">Status</p>
                    <div className="d-flex justify-content-start align-items-center flex-fill">
                        <button className="filter-menu-option" onClick = {(event)=> {setCheck(event,{...query,status:"available",page:1})}}filtertype = "status" >Available</button>
                        <button className="filter-menu-option"onClick = {(event)=> {setCheck(event,{...query,status:"not_available",page:1})}}filtertype = "status" >Not Available</button>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-start align-items-center w-100 m-3">
                    <p className="w-25 m-0 font-weight-bold">Age(years)</p>
                    <div className="d-flex justify-content-start align-items-center flex-fill">
                        <button className="filter-menu-option" filtertype = "age" onClick = {(event)=> {setCheck(event,{...query,age:0,page:1})}}>0+</button>
                        <button className="filter-menu-option" filtertype = "age" onClick = {(event)=> {setCheck(event,{...query,age:1,page:1})}}>1+</button>
                        <button className="filter-menu-option" filtertype = "age" onClick = {(event)=> {setCheck(event,{...query,age:2,page:1})}}>2+</button>
                        <button className="filter-menu-option" filtertype = "age" onClick = {(event)=> {setCheck(event,{...query,age:3,page:1})}}>3+</button>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-start align-items-center w-100 m-3">
                    <p className="w-25 m-0 font-weight-bold">Shelter</p>
                    <div className="d-flex justify-content-start align-items-center flex-fill flex-wrap">
                        {shelters.map((s) => {
                            return <button className="filter-menu-option " key ={s.id} filtertype = "shelter_id" onClick = {(event)=> {setCheck(event,{...query,shelter_id:s.id,page:1})}}>{s.username}</button>
                        })}
                        
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    <div id="pet-card-container" className="d-flex flex-row justify-content-center align-items-start flex-wrap my-3">
        {listings.map((listing) => {
            return <div className="card pet-card" key = {listing.id}>
            <div className="pet-card-image-cont text-center">
                <img className="pet-card-image" src={listing.avatar} alt="corgi dog"/>
            </div>
            <div className="card-body d-flex flex-column justify-content-start align-items-start">
                <h5 className="card-title">{listing.name}</h5>
                <h6 className="card-subtitle mb-2">Corgi</h6>
                <div className="d-flex justify-content-start align-items-start">
                    <span className="material-symbols-outlined">weight</span>
                    <p>{listing.size} lbs / {listing.age} years old</p>
                </div>
                <div className="d-flex justify-content-start align-items-start">
                    <span className="material-symbols-outlined">home</span>
                    <p>{getShelterName(shelters,listing.shelter)}</p>
                </div>
                <Link to={`/petDetails/${listing.id}`} className="view-pet-button">Learn More </Link>
            </div>
        </div>
        })}
    </div>
    <div className='d-flex flex-row justify-content-center align-items-center w-100 py-4'>
        <button className='btn m-2' id="prev-button" onClick = {()=> {setQuery({...query, page: query.page - 1})}}>Previous Page</button>
        <button className='btn m-2' id="next-button" onClick = {()=> {setQuery({...query, page: query.page + 1})}}>Next Page </button>
    </div>
    
    </>
}

export default PetSearch;