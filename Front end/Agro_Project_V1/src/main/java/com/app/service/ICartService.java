package com.app.service;

import com.app.entities.Cart;
import com.app.entities.Customer;
import com.app.entities.OrderItem;

public interface ICartService {


	public void addItemToCart(OrderItem orderItem, long cartId,double productPrice,int productQuantity);



	public long findCartbyCustomer(Customer customer);



	public Cart findCartbyCartId(long cartId);
	
}
