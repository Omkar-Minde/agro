package com.app.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.ReviewDto;
import com.app.entities.Customer;
import com.app.entities.Product;
import com.app.entities.Review;
import com.app.service.IProductService;
import com.app.service.IReviewService;

@RestController
@RequestMapping("/review")
@CrossOrigin("*")
public class ReviewController {
	
	@Autowired
	IReviewService reviewService ; 
	
	@Autowired
	IProductService productService;
	
	@PostMapping("/{productId}/{customerId}")
	public ResponseEntity<ReviewDto> createReview(@RequestBody ReviewDto reviewDto , @PathVariable long productId,@PathVariable long customerId ,   HttpSession session ){
		
//		long customerId = (long) session.getAttribute("customer_dtls");
	//	System.out.println(customerId);
		ReviewDto createReview = this.reviewService.createReview(reviewDto, productId, customerId);
		
		return new ResponseEntity<ReviewDto>(createReview , HttpStatus.CREATED);
		
	}
	
	@DeleteMapping("/reviews/{reviewId}")
	public ResponseEntity<ApiResponse> deleteReview(@PathVariable long reviewId){
		
		this.reviewService.deleteReview(reviewId);
		
		return new ResponseEntity<ApiResponse>(new ApiResponse("review deleted successfully"),HttpStatus.OK);
		
	}
	
	@GetMapping("/get/{productId}")
	public List<Review> getAllReveiwsForProduct(@PathVariable long productId){
		Product product =productService.findProductByProductId(productId);
		return reviewService.getReviwsForProduct(product);
		
	}
	
	
	
	
	
	
	
}
