package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Product;
import com.app.entities.Review;

public interface ReviewRepo extends JpaRepository<Review, Long> {

	@Query("select new com.app.entities.Review(r.reviewId,r.reviewTitle,r.reviewContent)from Review r where r.product=?1")
	List<Review> findReviewsByproductId(Product products);
}
