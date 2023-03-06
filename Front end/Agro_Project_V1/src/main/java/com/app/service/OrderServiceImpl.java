package com.app.service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.OrderRepository;
import com.app.dto.OrderDto;
import com.app.entities.Address;
import com.app.entities.Cart;
import com.app.entities.Order;
import com.app.entities.OrderItem;
import com.app.entities.OrderStatus;

@Service
@Transactional
public class OrderServiceImpl implements IOrderService {

	@Autowired
	IOrderItemService orderItemService;

	@Autowired
	CartServiceImpl cartService;

	@Autowired
	OrderRepository orderRepo;
	
	@Autowired
	IAddressService addressService;

	@Override
	public Order placeOrder(OrderDto orderDto) {
		// preparing list of items to be added in order
	  System.out.println("----------------------------------------");
	  System.out.println("------------in place order method of order service---------------");
		Set<OrderItem> orderItems = new HashSet<>();

		// calculating order price
		Double orderPrice = 0.0;

		for (Long orderItemId : orderDto.getOrderItemsIdArray()) {
			OrderItem orderItem = orderItemService.findOrderItem(orderItemId);
			orderItems.add(orderItem);
			System.out.println("in for loop of order service order item is " +orderItem);
			orderPrice = orderPrice + (orderItem.getProductPrice() * orderItem.getProductQuantity());
		}
		System.out.println("in order service order item is " +orderItems);
		Long orderItemcount = (long) orderDto.getOrderItemsIdArray().size();

		LocalDateTime orderTime = LocalDateTime.now();

		Long cartId = orderDto.getCartId();
		Cart cart = cartService.findCartbyCartId(cartId);
		
		
		Address adress = addressService.getAddress(orderDto.getAddressId());

		OrderStatus orderStatus = OrderStatus.ACCEPTED;
		// empty order object created to add in database
		Order order = new Order();
		// setting orderItems to order
		order.setOrderItems(orderItems);
		order.setCart(cart);
		order.setOrderItemCount(orderItemcount);
		order.setOrderStatus(orderStatus);
		order.setOrderTime(orderTime);
		order.setOrderTotalPrice(orderPrice);
		order.setAddress(adress);
		order = orderRepo.save(order);
		// now we have to change order ids of the order item table in same transaction
		updateOrderItem(orderItems, order);
		// make changes in products quantity in product table in same transaction for
		// each order item
		// as transaction has propagated till orderItemservice so
		// see order item service
		return order;
	}

	public void updateOrderItem(Set<OrderItem> orderItems, Order order) {

		orderItemService.updateOrderItemOrderId(orderItems, order);
         System.out.println("in order item service order is "+order);
	}

	@Override
	public List<Order> getAllOrders(Cart cart) {
		      
		return 	orderRepo.findAllOrderByCartId(cart);
	}
	
	@Override
	public void cancelOrder(long orderId) {
		
	         Order order= orderRepo.findOrderById(orderId);
	         System.out.println("in cancel of order service"+ order);
	      //   List<OrderItem> orderItems = orderItemService.findOrderItemsByOrderId(order);
		    
	         // call order  item service here 
		   orderItemService.deleteOrderItem(order);
           orderRepo.delete(order);	
	}

	@Override
	public Order showOrderDetailsById(long orderId) {
		
		return orderRepo.findById(orderId).orElseThrow(()-> new ResourceNotFoundException("order not found"));
	}




}
