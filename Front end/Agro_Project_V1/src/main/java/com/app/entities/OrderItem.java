package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Table(name = "order_item")
@NoArgsConstructor
@Getter
@Setter

public class OrderItem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="order_item_id") 
	private Long orderItemId;
	
	@OneToOne
	@JoinColumn(name = "product_id")
	private Product product;
	
	private int productQuantity;
	
	private double productPrice;
	
	private boolean wishListed;
	
	private LocalDate cartAddedDate;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id")
	private Order order;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "cart_id")
	private Cart cart;

	

	@Override
	public String toString() {
		return "OrderItem [orderItemId=" + orderItemId + ", product=" + product + ", productQuantity=" + productQuantity
				+ ", productPrice=" + productPrice + ", order=" + order + ", cart=" + cart + "]";
	}



	public OrderItem(Long orderItemId,Product product, int productQuantity, double productPrice) {
		super();
		this.orderItemId = orderItemId;
		this.product = product;
		this.productQuantity = productQuantity;
		this.productPrice = productPrice;
	}



	public OrderItem(Long orderItemId, int productQuantity, double productPrice) {
		super();
		this.orderItemId = orderItemId;
		this.productQuantity = productQuantity;
		this.productPrice = productPrice;
	}
	
	
	
}
