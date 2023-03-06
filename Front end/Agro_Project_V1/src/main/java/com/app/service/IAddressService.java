package com.app.service;

import java.util.List;

import com.app.dto.AddressDto;
import com.app.entities.Address;
import com.app.entities.Customer;

public interface IAddressService {
	Address addAddressDetails(Address address ,long farmerId);

	Address addCustomerAddressDetails(Address address, long customerId);

	List<AddressDto> addressList(Customer customer);
	
	 Address getAddress(long addressId);

}
