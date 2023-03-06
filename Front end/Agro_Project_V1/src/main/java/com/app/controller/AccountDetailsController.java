package com.app.controller;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AccountDetailsDto;
import com.app.dto.ApiResponse;
import com.app.entities.Category;
import com.app.service.IAccountDetailsService;

@RestController
@RequestMapping("/account")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountDetailsController {
	
	@Autowired
	IAccountDetailsService accountDetailsService;
	
	@PostMapping("/create/farmer")
	public ResponseEntity<?> addFarmerAccount(@RequestBody @Valid AccountDetailsDto accountDetailsDto , HttpSession session) {
	
		try {	
			long farmerId = (long)session.getAttribute("farmer_dtls");
			
			
			AccountDetailsDto account = this.accountDetailsService.AddFarmerAccountDetails(accountDetailsDto,farmerId);
			return new ResponseEntity<>(account , HttpStatus.CREATED);
		} catch (RuntimeException e) {
			System.out.println("err in create account details " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/create/customer")
	public ResponseEntity<?> addCustomerAccount(@RequestBody @Valid AccountDetailsDto accountDetailsDto , HttpSession session) {
	
		try {	
			
			long customerId = (long)session.getAttribute("customer_dtls");
			
			AccountDetailsDto account = this.accountDetailsService.AddCustomerAccountDetails(accountDetailsDto,customerId);
			return new ResponseEntity<>(account , HttpStatus.CREATED);
		} catch (RuntimeException e) {
			System.out.println("err in create account details " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

}
