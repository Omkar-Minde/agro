package com.app.service;

import java.util.List;

import com.app.dto.ReviewDto;
import com.app.entities.Product;
import com.app.entities.Review;

public interface IReviewService {
	
	ReviewDto createReview(ReviewDto reviewDto , long productId, long customerId);
	
	List<Review> getReviwsForProduct(Product product);
	
	void deleteReview(long reviewId);

}
