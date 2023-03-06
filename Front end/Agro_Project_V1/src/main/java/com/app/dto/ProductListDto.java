package com.app.dto;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor

public class ProductListDto {
	private long productId;
	
	private String productTitle;
	
	private double price;

	private LocalDate harvestedDate;

	private LocalDate expiryDate;

	private int availableStock;

	private MultipartFile productImagesByFarmer;

	private boolean isOrganic;

	public ProductListDto(long productId, String productTitle, double price, LocalDate harvestedDate,
			LocalDate expiryDate, int availableStock, MultipartFile productImagesByFarmer, boolean isOrganic) {
		super();
		this.productId = productId;
		this.productTitle = productTitle;
		this.price = price;
		this.harvestedDate = harvestedDate;
		this.expiryDate = expiryDate;
		this.availableStock = availableStock;
		this.productImagesByFarmer = productImagesByFarmer;
		this.isOrganic = isOrganic;
	}
	
	
	
	
}
