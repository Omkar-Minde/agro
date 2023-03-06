package com.app.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.CustomerLoginrResponse;
import com.app.dto.LoginRequest;
import com.app.entities.Address;
import com.app.entities.Customer;
import com.app.service.IAddressService;
import com.app.service.ICustomerService;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:3000")

public class CustomerController {
	@Autowired
	ICustomerService customerService;
	
	@Autowired
	IAddressService addressService;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerCustomerDetails(@RequestBody @Valid Customer transientCustomer,HttpSession session) {
		System.out.println("in add dtls " + transientCustomer);
		try {
			Customer registeredCustomer=customerService.registerCustomer(transientCustomer);
			session.setAttribute("customer_dtls",registeredCustomer );
			
			// invoke service layer method
			return new ResponseEntity<>(registeredCustomer, HttpStatus.CREATED);
		} catch (RuntimeException e) {
			System.out.println("err in add customer " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/address/{customerId}")
	public ResponseEntity<?> addAddress(@RequestBody @Valid Address transientAddress,HttpSession session,@PathVariable long customerId) {
		System.out.println("in add address dtls " + transientAddress);
		try {
			//Customer registeredCustomer=(Customer) session.getAttribute("customer_dtls");
			//transientAddress.setCustomer(registeredCustomer);
			// invoke service layer method
			return new ResponseEntity<>(addressService.addCustomerAddressDetails(transientAddress,customerId), HttpStatus.CREATED);
		} catch (RuntimeException e) {
			System.out.println("err in add address " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody @Valid LoginRequest request,HttpSession session)	
	{
		System.out.println("in user login "+request);
		CustomerLoginrResponse loggedCustomer = customerService.customerLogin(request);
		session.setAttribute("customer_dtls", loggedCustomer.getCustomerId());
		return ResponseEntity.ok(customerService.customerLogin(request));
	}
	
	@GetMapping("/logout")
	public String farmerLogout(HttpSession session,Model map,HttpServletResponse resp,HttpServletRequest request)
	{
		System.out.println("in log out");
		map.addAttribute("customer_dtls", session.getAttribute("customer_dtls"));
		session.invalidate();
		resp.setHeader("refresh", "5;url="+request.getContextPath());
		return "logged out!!!!";
	}
	
	@GetMapping("/address/{customerId}")
	public ResponseEntity<?> getListOfAddress(@PathVariable long customerId){
		System.out.println("in get address"+customerId);
		
		return new ResponseEntity<>(customerService.getListOfCustomerAddress( customerId),HttpStatus.CREATED);

	}
}
