package com.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.CartRepository;
import com.app.dao.OrderItemRepository;
import com.app.dto.AddToCart;
import com.app.dto.AllOrderItemDto;
import com.app.dto.FarmerViewOrderDto;
import com.app.dto.OrderItemListDto;
import com.app.entities.Cart;
import com.app.entities.Farmer;
import com.app.entities.Order;
import com.app.entities.OrderItem;
import com.app.entities.Product;

@Service
@Transactional
public class OrderItemServiceImpl implements IOrderItemService {

	@Autowired
	private OrderItemRepository orderItemRepo;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private CartRepository cartRepo;

	@Autowired
	private IProductService productServiceImpl;

	@Autowired
	private IOrderService orderService;

	@Autowired
	private ICartService cartService;

	/*
	 * @Override public OrderItem createOrderItem(AddToCart addToCartDto) {
	 * 
	 * System.out.println("in orderitem service creating item");
	 * System.out.println("2--------------------------"); OrderItem orderItem =
	 * mapper.map(addToCartDto, OrderItem.class);
	 * System.out.println("--------------------------");
	 * 
	 * System.out.
	 * println("in orderitem service mapped item after this insert querry must be fired "
	 * + orderItem); System.out.println("--------------------------"); //return
	 * orderItemRepo.save(orderItem); return orderItem; }
	 * 
	 * 
	 * @Override public OrderItem addCartId(Cart cart, OrderItem orderItem) {
	 * System.out.println("in order item add cart id 1"); // OrderItem
	 * orderItemPersistant=orderItemRepo.findByOrderItemId(orderItem.getOrderItemId(
	 * )); System.out.println("the order item before setting cart" +orderItem);
	 * System.out.println("--------------------------"); System.out.println("2");
	 * orderItem.setCart(cart); System.out.println("--------------------------");
	 * System.out.println("--------------------------");
	 * System.out.println("the order item  is" +orderItem);
	 * 
	 * orderItemRepo.save(orderItem); //System.out.println(
	 * orderItemRepo.addCartIdToProduct(orderItem.getProductQuantity(),orderItem.
	 * getProductPrice(), cart, orderItem.getOrderItemId())); // return null; return
	 * null; }
	 */
	public OrderItem addToOrderItem(AddToCart addToCartDto, Long cartId) {

		System.out.println("in order item service creating item");
		System.out.println("2--------------------------");
		OrderItem orderItem = mapper.map(addToCartDto, OrderItem.class);
		System.out.println("--------------------------");
		Cart cart = cartRepo.findByCartId(cartId);
		orderItem.setCart(cart);

		System.out.println(" adding product to item");

		orderItem.setProduct(productServiceImpl.findProductByProductId(addToCartDto.getProductId()));

		System.out.println("in orderitem service mapped item after this insert querry must be fired " + orderItem);
		System.out.println("--------------------------");

		return orderItemRepo.save(orderItem);
	}

	public OrderItem findOrderItem(Long orderItemId) {

		return orderItemRepo.findByOrderItemId(orderItemId);
	}

	// this is called by order service

	// transaction propagated here so we add method to change product quantity
	@Override
	public void updateOrderItemOrderId(Set<OrderItem> orderItems, Order order) {

		// updating order id of every orderItem
		for (OrderItem orderItem : orderItems) {
			System.out.println("updating each order items order id in order service");
			orderItemRepo.updateOrderId(order, orderItem.getOrderItemId());
			System.out.println(" after updating each order items order id in order service");
			System.out.println("order item ----here  check for product id " + orderItem);
			// order item has product id
			productServiceImpl.updateProductQuantity(orderItem);
		}

	}

	@Override
	public List<OrderItem> findOrderItemsByOrderId(Order order) {

		return orderItemRepo.findOrderItemsByOrderId(order);
	}

	@Override
	public String deleteOrderItemById(@PathVariable long orderItemId) {

		orderItemRepo.deleteById(orderItemId);
		return "Order rejected succfully!!!";

	}

	@Override
	public Product getProductByOrderId(Long orderItemId) {

		return orderItemRepo.getProductByOrderId(orderItemId);
	}

	@Override
	public void deleteOrderItem(Order order) {
		System.out.println("in delete order method of order item " + order.getOrderId());
		List<OrderItem> orderItems = orderItemRepo.findOrderItemsByOrderId(order);
		System.out.println(orderItems);
//		//List<OrderItem> orderItems=orderItemRepo.findByOrder_OrderId(order.getOrderId());
		for (OrderItem orderItem : orderItems) {
			System.out.println("in for loop");

			System.out.println("in delete orderItem " + orderItem);
			productServiceImpl.updateProductAddQuantity(orderItem.getProduct(), orderItem.getProductQuantity());
			System.out.println("deleting orderItem" + orderItem.getOrderItemId());
			orderItemRepo.deleteByOrderItemId(orderItem.getOrderItemId());
		}

	}

	@Override
	public List<FarmerViewOrderDto> viewFarmerOrder(Farmer farmer) {
		List<OrderItem> items = orderItemRepo.findByProduct_Farmer(farmer);
		List<FarmerViewOrderDto> listOfFarmerOrders = new ArrayList<>();

		for (OrderItem orderItem : items) {
			String productTitle = orderItem.getProduct().getProductTitle();
			System.out.println("title" + productTitle);
			FarmerViewOrderDto farmerOrder = mapper.map(orderItem, FarmerViewOrderDto.class);
			Order order = orderService.showOrderDetailsById(orderItem.getOrder().getOrderId());
			farmerOrder.setProductTitle(productTitle);
			farmerOrder.setOrderTime(order.getOrderTime());
			farmerOrder.setOrderStatus(order.getOrderStatus().toString());
			listOfFarmerOrders.add(farmerOrder);
		}
		return listOfFarmerOrders;
	}

	@Override
	public List<AllOrderItemDto> getAllOrderItems(long cartId) {
		System.out.println("in get all order");

		Cart cart = cartService.findCartbyCartId(cartId);
		System.out.println("cart " + cart);
		List<AllOrderItemDto> listOfAllOrderItemDto = new ArrayList<>();
		;
		List<OrderItem> listOfOrderItem = orderItemRepo.findByCart(cart);
		for (OrderItem orderItem : listOfOrderItem) {
			AllOrderItemDto orderItemDto = mapper.map(orderItem, AllOrderItemDto.class);
			// title
			orderItemDto.setTitle(orderItem.getProduct().getProductTitle());
			// profile pic of product need to be handled
			// OrderItemDto.getProfilePic(orderItem.getProduct().getProductImagesByFarmer());
			// details
			orderItemDto.setProductDetails(orderItem.getProduct().getProductDetails());

			// exp date
			orderItemDto.setExpiryDate(orderItem.getProduct().getExpiryDate());
			// set organic
			orderItemDto.setOrganic(orderItem.getProduct().isOrganic());
			// setting order in order item
			if (orderItem.getOrder() != null) {
				orderItemDto.setOrderId(orderItem.getOrder().getOrderId());
			}

			listOfAllOrderItemDto.add(orderItemDto);
			System.out.println("orderitems are " + orderItemDto);
			System.out.println("list of order" + listOfAllOrderItemDto);
		}
		return listOfAllOrderItemDto;
	}

	@Override
	public void deleteOrderItem(long orderItemId) {
		orderItemRepo.deleteById(orderItemId);
	}

	public boolean addToWishList(long orderItemId, boolean state) {
		OrderItem orderItem = orderItemRepo.findById(orderItemId)
				.orElseThrow(() -> new ResourceNotFoundException("orderItem not found"));
		orderItem.setWishListed(state);
		orderItemRepo.save(orderItem);
		return orderItem.isWishListed();
	}

	public void updateOrderItemQuantities(List<OrderItemListDto> arrayOfOrderItemList) {
		List<OrderItem> listOfOrderItem = new ArrayList<>();
		OrderItem orderItem;
		for (OrderItemListDto orderItemListDto : arrayOfOrderItemList) {
			if (orderItemListDto.getOrderItemId() != 0) {
				orderItem = orderItemRepo.findById(orderItemListDto.getOrderItemId())
						.orElseThrow(() -> new ResourceNotFoundException("orderItem not found"));
				orderItem.setProductQuantity((int) orderItemListDto.getProductQuantity());
				;
				orderItemRepo.save(orderItem);
			}
		}
	}

	@Override
	public void deleteOrderItem(OrderItem orderItem) {
		// TODO Auto-generated method stub

	}

}
