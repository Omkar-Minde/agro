package com.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ReviewDto {
	
	private long reviewId;
	
	private String reviewContent;
	
	private String reviewTitle;

	public ReviewDto(long reviewId, String reviewContent,String reviewTitle) {
		super();
		this.reviewId = reviewId;
		this.reviewContent = reviewContent;
		this.reviewTitle = reviewTitle;
	}
	
}
