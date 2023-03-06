import React from 'react'
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import customerService from '../service/customerService';

export default function CustomerSignup() {

    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[contactNumber, setContactNumber] = useState('');

    const navigation = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const profilePicture = "";
        

        const customer = {firstName, lastName, email, password, contactNumber,profilePicture }
        console.log(customer);

        customerService.create(customer)
            .then(response => {
                console.log("customer added successfully", response.data);
                sessionStorage.setItem("registeredCustomer",response.data.customerId)
                navigation("/customer/register/address")
                // history.push("/");
            })
            .catch(error => {
                console.log('something went wrong', error);
            })

    }
    return (
        <div  style={{backgroundColor: "#e2f2e6"}}>
            <div className="container mt-4 mb-4">
                
                <div className="row justify-content-center">
                    <div className="col-6 border" style={{backgroundColor: "#caf2d4"}}>
                    <h1 className="my-4">Customer Registration Form</h1>
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

                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}
