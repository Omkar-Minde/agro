import React from 'react';
import {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddReview = () => {
    const customerId = sessionStorage.getItem("customerLoginId");

    const navigate = useNavigate();

    const[reviewTitle, setReviewTitle] = useState('');
    const[reviewContent, setReviewContent] = useState('');

    const{id} = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        const productReview = { reviewTitle,reviewContent }
        //error - add same names and fields and review Id ??

        console.log(productReview);
        //change uri in controller 
        axios.post(`http://localhost:7070/review/${id}/${customerId}`,productReview)
            .then(response => {
                console.log("review added successfully", response.data);
                navigate('/product/get/:id');
            })
            .catch(error => {
                console.log('something went wrong', error);
            })
    }




    return (
        <div className='container' style={{backgroundColor: "#e2f2e6"}}>
            <div className='row justify-content-center mt-5'>
                <div className="col-8">
                    <div class="mb-3">
                        <label for="reviewTitle" class="form-label">Review Title</label>
                        <input type="text" class="form-control" id="reviewTitle" onChange={(e) => setReviewTitle(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label for="reviewDesc" class="form-label">Review Descreption</label>
                        <textarea class="form-control" id="reviewDesc" rows="3" onChange={(e) => setReviewContent(e.target.value)}></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>

            </div>

        </div>
    );
}

export default AddReview;
