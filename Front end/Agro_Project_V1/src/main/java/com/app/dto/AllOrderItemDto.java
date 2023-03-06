package com.app.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
@NoArgsConstructor
public class AllOrderItemDto {

	
	private Long orderItemId;
	
	private String title;
	
	private String productDetails;
	
	private byte[] profilePic;
	
	private LocalDate cartAddedDate;
	
	private	LocalDate expiryDate;
	
	private boolean organic;
	
	private double productPrice;
	
	private double productQuantity;
	
	private boolean wishListed;
	
	private long orderId;
}
