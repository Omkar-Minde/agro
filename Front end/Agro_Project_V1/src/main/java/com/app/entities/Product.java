package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Table(name = "product")
@NoArgsConstructor
@Getter
@Setter
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="product_id") 
	private long productId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "subcatg_id")
	private SubCategory subcatg;
	
	@Column(name = "product_details")
	private String productDetails;
	
	@ManyToOne
	@JoinColumn(name = "farmer_id")
	private Farmer farmer;
	
	@Column(name = "product_title")
	private String productTitle;
	
	public Product(long productId, String productTitle, double price, LocalDate harvestedDate ,
			String productImagesByFarmer, LocalDate expiryDate, double availableStock) {
		super();
		this.productId = productId;
		this.productTitle = productTitle;
		this.price = price;
		this.harvestedDate = harvestedDate;
		this.productImagesByFarmer = productImagesByFarmer;
		this.expiryDate = expiryDate;
		this.availableStock = availableStock;
	}
	

	@Column(name="price")
	private double price;
	
	@Column(name ="harvested_date")
	private LocalDate harvestedDate;
	
	@Column(name ="expiry_date")
	private LocalDate expiryDate;
	
	@Column(name = "available_stock")
	private double availableStock;
	
	@Lob
	@Column(name="product_images_by_farmer")
	private String productImagesByFarmer;
	
	@Column(name="is_organic")
	private boolean isOrganic;
	
	@ManyToOne
	@JoinColumn(name = "admin_id")
	private Admin admin;
	
//	@OneToMany(mappedBy = "product")
//	@Column(name = "reveiw_id")
//	List<Review>reviews=new ArrayList<>();
}
