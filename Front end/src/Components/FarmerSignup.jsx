import React from 'react';
import {useState} from 'react';
// import { Link, useHistory, useParams } from "react-router-dom";
import agroService from '../service/agroService'
import { Link, useNavigate, useNavigation } from 'react-router-dom';

export default function FarmerSignUp() {
    // const history = useHistory();

    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[contactNumber, setContactNumber] = useState('');

    const navigate =useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // const farmer = {
        //     first_name : e.target.first_name.value,
        //     last_name : e.target.last_name.value,
        //     email : e.target.email.value,
        //     password : e.target.password.value,
        //     contact : e.target.contact.value,
        //     profile_pic : ""
        // }

        const profilePicture = "";
        

        const farmer = {firstName, lastName, email, password, contactNumber,profilePicture }
        console.log(farmer);

        agroService.create(farmer)
            .then(response => {
                console.log("farmer added successfully", response.data);
                sessionStorage.setItem("registeredFarmer",response.data.farmerId);
                navigate("/farmer/register/address")
                // history.push("/");
            })
            .catch(error => {
                console.log('something went wrong', error);
            })

    }

    return (
        <div style={{backgroundColor: "#e2f2e6"}}>
            <div className="container mt-4 mb-4">
                
                <div className="row justify-content-center">
                    <div className="col-6 border" style={{backgroundColor: "#caf2d4"}}>
                    <h1 className="my-4">Farmer Registration Form</h1>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="first_name" className="form-label">First Name</label>
                                <input type="text" onChange={(e) => setFirstName(e.target.value)} className="form-control" name="first_name" id="fname" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lname" className="form-label">Last  Name</label>
                                <input type="text" onChange={(e) => setLastName(e.target.value)} className="form-control" name="last_name" id="lname" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" name="email" id="email" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pwd" className="form-label">Password</label>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" name="password" id="pwd" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contact" className="form-label">Contact no</label>
                                <input type="number" onChange={(e) => setContactNumber(e.target.value)} className="form-control" name="contact" id="contact" />
                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="proPic" className="form-label">Profile Picture</label>
                                <input type="file" className="form-control" name="profile_pic" id="proPic" />
                            </div> */}

                            <button type="submit" className="btn btn-primary"  onClick={handleSubmit}>Next</button>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}
