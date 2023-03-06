package com.app.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AddToCart;
import com.app.dto.AllOrderItemDto;
import com.app.dto.ApiResponse;
import com.app.dto.OrderItemListDto;
import com.app.entities.Cart;
import com.app.entities.Customer;
import com.app.entities.OrderItem;
import com.app.service.CartServiceImpl;
import com.app.service.CustomerServiceImpl;
import com.app.service.OrderItemServiceImpl;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderItemController {

	@Autowired
	OrderItemServiceImpl orderItemService;

	@Autowired
	CartServiceImpl cartService;

	@Autowired
	CustomerServiceImpl customerService;

	@PostMapping("/add")
	public ResponseEntity<?> addToCart(@RequestBody AddToCart addToCartDto, HttpSession session) {
		System.out.println("in add dtls " + addToCartDto);
		try {

			Customer customer = customerService.findCustomerById(addToCartDto.getCustomerId());
			
//		Customer customer1 = customerService.findCusromer(addToCartDto.getCustomerId());
		
//			System.out.println("customer"+customer1);
//			
//			Cart cart1 = customer1.getCart();
//			
			
			System.out.println("this is customer" + customer);
			System.out.println("cart id"+addToCartDto.getCartId());

			if (addToCartDto.getCartId() == null) {
				System.out.println(" in new cart genratiob");
				Cart cart = cartService.addCartToCustomer(customer);
				System.out.println("this is new cart" + cart);
				long cartId = cart.getCartId();
				session.setAttribute("cartId", cartId);

				OrderItem orderItem = orderItemService.addToOrderItem(addToCartDto, cartId);
				System.out.println("this is added product in order item " + orderItem);
				// updating cart
				cartService.addItemToCart(orderItem, cartId, addToCartDto.getProductPrice(),
						addToCartDto.getProductQuantity());
				return new ResponseEntity<>(cartId, HttpStatus.CREATED);
			} else {

				OrderItem orderItem = orderItemService.addToOrderItem(addToCartDto, (Long) addToCartDto.getCartId());
				long cartId =  addToCartDto.getCartId();
				
				cartService.addItemToCart(orderItem, addToCartDto.getCartId(), addToCartDto.getProductPrice(),
						addToCartDto.getProductQuantity());

				return new ResponseEntity<>(cartId, HttpStatus.CREATED);
			}
		}

		catch (RuntimeException e) {
			System.out.println("err in add to  cart " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);// => invalid data from
																									// clnt
		}

	}

	@GetMapping("/getorderItems/{cartId}")
	public ResponseEntity<?> getOrderItems(@PathVariable long cartId) {
		System.out.println("in add dtls " + cartId);
		try {

			List<AllOrderItemDto> listOfItems = orderItemService.getAllOrderItems(cartId);
			// invoke service layer method
			listOfItems.forEach((p) -> System.out.println(p));
			return new ResponseEntity<>(listOfItems, HttpStatus.CREATED);
		} catch (RuntimeException e) {
			System.out.println("err in get orderItem " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping("/delete/{orderItemId}")
	public ResponseEntity<?> deleteOrderItem(@PathVariable long orderItemId) {
		orderItemService.deleteOrderItemById(orderItemId);
		return new ResponseEntity<>(new ApiResponse("deleted sucessfully"), HttpStatus.CREATED);
	}

	@PostMapping("/addtowishlist/{orderItemId}/{state}")
	public ResponseEntity<?> addToWishList(@PathVariable long orderItemId, @PathVariable boolean state) {
		System.out.println(state);
		return new ResponseEntity<>(orderItemService.addToWishList(orderItemId, state), HttpStatus.CREATED);
	}

	@PostMapping("/updateProductQuantities")
	public ResponseEntity<?> updateOrderItemQuantities(@RequestBody List<OrderItemListDto> arrayOfOrderItemList) {
		try {
			System.out.println("in updateOrderItemQuantities");
			if (arrayOfOrderItemList.size() != 0) {
				arrayOfOrderItemList.forEach((p) -> System.out.println(p));
				orderItemService.updateOrderItemQuantities(arrayOfOrderItemList);
			}

			return new ResponseEntity<>(new ApiResponse("updated sucessfully"), HttpStatus.CREATED);
		} catch (RuntimeException e) {
			System.out.println("err in add to  updated product quantity " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);// => invalid data from
																									// clnt
		}
	}


}
