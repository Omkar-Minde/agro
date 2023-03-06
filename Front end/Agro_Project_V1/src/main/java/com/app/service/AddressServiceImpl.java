package com.app.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.AddressRepository;
import com.app.dao.CustomerRepository;
import com.app.dao.FarmerRepository;
import com.app.dto.AddressDto;
import com.app.entities.Address;
import com.app.entities.Customer;
import com.app.entities.Farmer;

@Service
@Transactional
public class AddressServiceImpl implements IAddressService {
@Autowired
AddressRepository addressRepo;

@Autowired
FarmerRepository farmerRepo;

@Autowired
CustomerRepository customerRepository;

@Autowired
ModelMapper mapper;

	@Override
	public Address addAddressDetails(Address address,long farmerId) {
		
		Farmer farmer = farmerRepo.searchByFarmerId(farmerId);
		address.setFarmer(farmer);
		return addressRepo.save(address);
	}
	
	@Override
	public Address addCustomerAddressDetails(Address address,long customerId) {
		
		Customer customer = customerRepository.findByCustomerId(customerId).orElseThrow(() -> new ResourceNotFoundException("customer not found"));
		address.setCustomer(customer);
		return addressRepo.save(address);
	}

	@Override
	public List<AddressDto> addressList(Customer customer) {
		List<AddressDto> listOfDto = new ArrayList<>();
		
		List<Address> listOfAddress = addressRepo.findByCustomer(customer);
		
		for (Address address : listOfAddress) {
			AddressDto addressDto =  mapper.map(address, AddressDto.class);
			listOfDto.add(addressDto);
		}
		return listOfDto;
	}

	public Address getAddress(long addressId) {
		System.out.println("address id"+addressId);
		Address address= addressRepo.findById(addressId).orElseThrow(() -> new ResourceNotFoundException("address not found"));
		return address;
	}
	
}
