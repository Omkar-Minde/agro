import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CustomerAddress() {
    // const history = useHistory();
    const navigate = useNavigate();

    const [adrLine1, setAdrLine1] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [pinCode, setPinCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const customerAddress = { adrLine1, city, district, state, pinCode }
        //error - add same names and fields

        console.log(customerAddress);

        const registeredCustomer = sessionStorage.getItem("registeredCustomer");

         if (registeredCustomer) {
            axios.post(`http://localhost:7070/customer/address/${registeredCustomer}`, customerAddress)
                .then(response => {
                    console.log("customer address added successfully", response.data);
                    navigate('/');
                })
                .catch(error => {
                    console.log('something went wrong', error);
                })
        }
    }

    return (
        <div style={{backgroundColor: "#e2f2e6"}}>
            <div className="container mt-4 mb-4">

                <div className="row justify-content-center">
                    <div className="col-6 border" style={{backgroundColor: "#caf2d4"}}>
                        <h1 className="my-4">Address Details</h1>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="Add_line" className="form-label">Address Line</label>
                                <input type="text" onChange={(e) => setAdrLine1(e.target.value)} className="form-control" name="Add_line" id="Add_line" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City</label>
                                <input type="text" onChange={(e) => setCity(e.target.value)} className="form-control" name="city" id="city" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="district" className="form-label">District</label>
                                <input type="text" onChange={(e) => setDistrict(e.target.value)} className="form-control" name="district" id="district" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="state" className="form-label">State</label>
                                <input type="text" onChange={(e) => setState(e.target.value)} className="form-control" name="state" id="state" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pincode" className="form-label">Pin code</label>
                                <input type="text" onChange={(e) => setPinCode(e.target.value)} className="form-control" name="pincode" id="pincode" />
                            </div>


                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}


