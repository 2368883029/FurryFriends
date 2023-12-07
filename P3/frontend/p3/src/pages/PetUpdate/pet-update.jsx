import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { APIContext } from '../../contexts/APIContext';
import BASE from '../../constants/baseUrl';
import { useNavigate, useParams } from 'react-router-dom';
import './pet-update.css';

const PetUpdate = () => {
    const { user } = useContext(APIContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [errorMessage, setErrorMessage] = useState(null);
    const [petData, setPetData] = useState({
        name: '',
        sex: '',
        breed: '',
        age: 0,
        size: 0,
        color: '',
        description: '',
        medical_history: '',
        other_notes: '',
        status: 'available',
    });

    useEffect(() => {
        fetch(`${BASE}/listings/${id}`, {
            headers: { Authorization: `Bearer ${user.token}`}
        }).then(res => res.json()).then(json => {
            setPetData(json);
        })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        let error = false;

        fetch(`${BASE}/listings/${id}`, {
            method: 'PUT', // Use PUT for updating, POST for creating
            body: JSON.stringify(petData),
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (!res.ok) {
                    error = true;
                }
                return res.json();
            })
            .then((json) => {
                if (error) {
                    setErrorMessage(json);
                } else {
                    navigate(`/petDetails/${json.id}`);
                }
            })
            .catch((error) => {
                console.error('Error updating/creating pet:', error);
                setErrorMessage({ error: 'An error occurred while updating/creating the pet.' });
            });
    };
    
    const handleDelete = () => {
        fetch(`${BASE}/listings/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (!res.ok) {
                    setErrorMessage({ error: 'Failed to delete pet.' })
                }
                return res.json();
            })
            .then(() => {
                // navigate('/pets');
            })
            .catch((error) => {
                console.error('Error deleting pet:', error);
                setErrorMessage({ error: 'An error occurred while deleting the pet.' });
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPetData({ ...petData, [name]: value });
    };

    return (
        <>
            <div className="content">
                <div className="main-content">
                    <div className="container">
                        <div className="form">
                            <header>Update Pet</header>
                            {errorMessage && (
                                <div className="messages" style={{ color: 'red' }}>
                                    {Object.entries(errorMessage).map(([key, value]) => (
                                        <p key={key}>{`${key}: ${value}`}</p>
                                    ))}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter the pet's name"
                                    value={petData.name}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="sex"
                                    placeholder="Enter the pet's sex"
                                    value={petData.sex}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="breed"
                                    name="sex"
                                    placeholder="Enter the pet's breed"
                                    value={petData.breed}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Enter the pet's age"
                                    value={petData.age}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="number"
                                    name="size"
                                    placeholder="Enter the pet's size"
                                    value={petData.size}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="color"
                                    placeholder="Enter the pet's color"
                                    value={petData.color}
                                    onChange={handleInputChange}
                                />
                                <textarea
                                    name="description"
                                    value={petData.description}
                                    rows="5"
                                    placeholder="Enter the pet's description"
                                ></textarea>
                                <textarea
                                    name="medical_history"
                                    value={petData.medical_history}
                                    rows="5"
                                    placeholder="Enter the pet's medical history"
                                ></textarea>
                                <textarea
                                    name="other_notes"
                                    value={petData.other_notes}
                                    rows="5"
                                    placeholder="Enter other notes"
                                ></textarea>
                                <label>Status:</label>
                                <select name="status">
                                    <option value="available">Available</option>
                                    <option value="not_available">Not Available</option>
                                </select>
                                <input type="submit" className="button" value='Update' />
                            </form>
                            {id && (
                                <input type="button" onClick={handleDelete} className="button" value='Delete Pet' style={{ backgroundColor: 'red' }} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PetUpdate;