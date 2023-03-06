package com.app.dto;

import java.time.LocalDateTime;

import com.app.entities.Product;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class FarmerViewOrderDto {
	
	private Long orderItemId;
	
	private int productQuantity;
	
	private double productPrice;
	
	private String productTitle;
	
	private LocalDateTime orderTime;
	
	private String orderStatus;
	
}
