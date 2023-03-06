package com.app.service;

import java.util.List;
import java.util.Set;

import com.app.dto.AddToCart;
import com.app.dto.AllOrderItemDto;
import com.app.dto.FarmerViewOrderDto;
import com.app.entities.Farmer;
import com.app.entities.Order;
import com.app.entities.OrderItem;
import com.app.entities.Product;

public interface IOrderItemService {

	/*
	 * OrderItem createOrderItem(AddToCart addToCart);
	 * 
	 * OrderItem addCartId(Cart cart, OrderItem orderItem);
	 */
	public OrderItem addToOrderItem(AddToCart addToCartDto, Long cartId);

	public OrderItem findOrderItem(Long orderItemId);

	public void updateOrderItemOrderId(Set<OrderItem> orderItems, Order order);

	public List<OrderItem> findOrderItemsByOrderId(Order order);

	public void deleteOrderItem(OrderItem orderItem);

	public Product getProductByOrderId(Long orderItemId);

	public void deleteOrderItem(Order order);

	List<FarmerViewOrderDto> viewFarmerOrder(Farmer farmer);

	public List<AllOrderItemDto> getAllOrderItems(long cartId);

	void deleteOrderItem(long orderItemId);

	public boolean addToWishList(long orderItemId, boolean status);

	String deleteOrderItemById(long orderItemId);
}
