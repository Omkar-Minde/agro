package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.AddressRepository;
import com.app.dao.CustomerRepository;
import com.app.dto.AddressDto;
import com.app.dto.CustomerListDto;
import com.app.dto.CustomerLoginrResponse;
import com.app.dto.LoginRequest;
import com.app.entities.Address;
import com.app.entities.Customer;

@Service
@Transactional
public class CustomerServiceImpl implements ICustomerService {
	@Autowired
	CustomerRepository customerRepo;
	@Autowired
	private ModelMapper mapper;

	@Autowired
	IAddressService addressService;

	@Override
	public Customer registerCustomer(Customer transientCustomer) {
		// TODO Auto-generated method stub
		return customerRepo.save(transientCustomer);
	}

	@Override
	public void customerLogout() {
		// TODO Auto-generated method stub

	}

	@Override
	public CustomerLoginrResponse customerLogin(@Valid LoginRequest request) {
		Customer authenticatedCustomer = customerRepo.findByEmailAndPassword(request.getEmail(), request.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Bad Credentials !!!!!!"));
		CustomerLoginrResponse loginResponse = mapper.map(authenticatedCustomer, CustomerLoginrResponse.class);
		return loginResponse;
	}

	@Override
	public Customer findCustomerById(long customerId) {
		// TODO Auto-generated method stub
		Customer authenticatedCustomer = customerRepo.findByCustomerId(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Bad Credentials !!!!!! of customer"));
		return authenticatedCustomer;
	}

	@Override
	public List<CustomerListDto> getAllCustomers() {
		List<CustomerListDto> customersDtoList = new ArrayList<>();

		List<Customer> customersList = customerRepo.findAll();
		for (Customer customer : customersList) {
			CustomerListDto customerDto = mapper.map(customer, CustomerListDto.class);
			customersDtoList.add(customerDto);
		}
		return customersDtoList;
	}

	public Customer findCusromer(long customerId) {
		return customerRepo.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("no customer"));
	}

	@Override
	public List<AddressDto> getListOfCustomerAddress(long customerId) {
		Customer customer = customerRepo.findByCustomerId(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("customer not found"));
		System.out.println(customer);

		return addressService.addressList(customer);
	}

}
