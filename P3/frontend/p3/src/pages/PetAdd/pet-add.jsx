import React, { useState } from 'react';
import { useContext } from 'react';
import { APIContext } from '../../contexts/APIContext';
import { useNavigate } from 'react-router-dom';
import BASE from '../../constants/baseUrl';
import './pet-add.css';

const PetAdd = () => {
    const { user } = useContext(APIContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        let error = false;

        const data = Array.from(event.target.elements)
            .filter((input) => input.name)
            .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});


        fetch(`${BASE}/listings/`,
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    "Content-Type": "application/json"
                }
            }).then(res => {
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
                console.error('Error adding pet:', error);
                setErrorMessage({ error: 'An error occurred while adding the pet.' });
            });
    };

    return <>
        <div className="content petAddContent">
            <div className="main-content">
                <div className="container">
                    <div className="form">
                        <header>Add Pet</header>
                        {errorMessage && (
                            <div className="messages" style={{ color: 'red' }}>
                                {Object.entries(errorMessage).map(([key, value]) => (
                                    <p key={key}>{`${key}: ${value}`}</p>
                                ))}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <input type="text" name="name" placeholder="Enter the pet's name" />
                            <input type="text" name="sex" placeholder="Enter the pet's sex" />
                            <input type="text" name="breed" placeholder="Enter the pet's breed" />
                            <input type="number" name="age" placeholder="Enter pet's age" step="1" min="0" max="20" />
                            <input type="number" name="size" placeholder="Enter the pet's size" />
                            <input type="text" name="color" placeholder="Enter the pet's color" />
                            <textarea name="description" rows="5" placeholder="Enter the pet's description"></textarea>
                            <textarea name="medical_history" rows="5" placeholder="Enter the pet's medical history"></textarea>
                            <textarea name="other_notes" rows="5" placeholder="Enter other notes"></textarea>
                            {/* <label className="file-upload">Upload Pet's Image</label>
                            <input type="file" name="avatar" /> */}
                            <label>Status:</label>
                            <select name="status">
                                <option value="available">Available</option>
                                <option value="not_available">Not Available</option>
                            </select>
                            <input type="submit" className="button" value='Submit' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default PetAdd;