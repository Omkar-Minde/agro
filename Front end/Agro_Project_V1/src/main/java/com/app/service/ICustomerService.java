package com.app.service;

import java.util.List;

import javax.validation.Valid;

import com.app.dto.AddressDto;
import com.app.dto.CustomerListDto;
import com.app.dto.CustomerLoginrResponse;
import com.app.dto.LoginRequest;
import com.app.entities.Address;
import com.app.entities.Customer;

public interface ICustomerService {
Customer registerCustomer(Customer transientCustomer);
	
		void customerLogout();

		CustomerLoginrResponse customerLogin(@Valid LoginRequest request);
		
		Customer findCustomerById(long customerId);
		
		List<CustomerListDto> getAllCustomers();

		List<AddressDto> getListOfCustomerAddress(long customerId);
}
