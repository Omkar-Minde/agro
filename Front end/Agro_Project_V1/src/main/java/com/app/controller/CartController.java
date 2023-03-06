package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Customer;
import com.app.service.ICartService;
import com.app.service.ICustomerService;



@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {
	
	@Autowired
	ICartService cartService;
	
	@Autowired
	ICustomerService customerService;
//	@PostMapping("/add")
//    public ResponseEntity<ApiResponse> addToCart(@RequestBody AddToCartDto addToCartDto,
//                                                 @RequestParam("token") String token) throws AuthenticationFailException, ProductNotExistException {
//        authenticationService.authenticate(token);
//        User user = authenticationService.getUser(token);
//        Product product = productService.getProductById(addToCartDto.getProductId());
//        System.out.println("product to add"+  product.getName());
//        cartService.addToCart(addToCartDto, product, user);
//        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Added to cart"), HttpStatus.CREATED);
//
//    }
	/*@PostMapping("/add")
      public ResponseEntity<?> addToCart(@RequestBody AddToCart addToCartDto,HttpSession session){
		System.out.println("in add dtls " + addToCartDto );
		try {
		    	Cart cart =cartService.addToCart(addToCartDto);
		    	session.setAttribute("cart_id",cart.getCartId() );
		    	
		    	return new ResponseEntity<>("product added to cart", HttpStatus.CREATED);
		} 
		
		catch (RuntimeException e) {
			System.out.println("err in add to  cart " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);// => invalid data from
																									// clnt
		}	}*/
	
	
	@GetMapping("/get/{customerId}")
	public ResponseEntity<?> getCartIdFromCustomer(@PathVariable long customerId){
		
		System.out.println("in get cart id");
		
		Customer customer = customerService.findCustomerById(customerId);
		
		long cartId = cartService.findCartbyCustomer(customer);
		
		System.out.println("in get cart id"+cartId);
		
		return new ResponseEntity<>(cartId, HttpStatus.CREATED);
		
	}
	
	
	
	
	
	
	
}
