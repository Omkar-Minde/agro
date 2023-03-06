package com.app.service;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.AccountDetailsRepository;
import com.app.dao.CustomerRepository;
import com.app.dao.FarmerRepository;
import com.app.dto.AccountDetailsDto;
import com.app.entities.AccountDetails;
import com.app.entities.Customer;
import com.app.entities.Farmer;


@Service
@Transactional

public class AccountDetailsService implements IAccountDetailsService {

	@Autowired
	AccountDetailsRepository accountDetailsRepo;
	
	@Autowired
	ModelMapper modelMapper;
	
	@Autowired
	FarmerRepository farmerRepo;
	
	@Autowired
	CustomerRepository customerRepo;

	@Override
	public AccountDetailsDto AddFarmerAccountDetails(AccountDetailsDto accountDetailsDto, long farmerId) {

		AccountDetails accountDetails = this.modelMapper.map(accountDetailsDto, AccountDetails.class);
		System.out.println(accountDetails);
		
		Farmer farmer = this.farmerRepo.findById(farmerId).orElseThrow(() -> new ResourceNotFoundException("farmer not found") );
		
		System.out.println(farmer.getFarmerId());
		
		AccountDetails savedAccountDetails = this.accountDetailsRepo.save(accountDetails);
		
		System.out.println(savedAccountDetails);
		
		savedAccountDetails.setFarmer(farmer);
		
		return this.modelMapper.map(savedAccountDetails, AccountDetailsDto.class);
	}

	@Override
	public AccountDetailsDto AddCustomerAccountDetails(AccountDetailsDto accountDetailsDto, long customerId) {
		
		AccountDetails accountDetails = this.modelMapper.map(accountDetailsDto, AccountDetails.class);
		
		Customer customer = this.customerRepo.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("customer not found") );
		
		AccountDetails savedAccountDetails = this.accountDetailsRepo.save(accountDetails);
		
		savedAccountDetails.setCustomer(customer);
		
		
		return this.modelMapper.map(savedAccountDetails, AccountDetailsDto.class);
	}
	
	
//	@Override
//	public AccountDetailsDto AddAccountDetails(AccountDetailsDto accountDetailsDto, long farmerId , long customerId) {
//		
//		AccountDetails accountDetails = this.modelMapper.map(accountDetailsDto, AccountDetails.class);
//		
//		Farmer farmer = this.farmerRepo.findById(farmerId).orElseThrow(() -> new ResourceNotFoundException("farmer not found") )
//		
//		Customer customer = this.farmerRepo.findById(customer).orElseThrow(() -> new ResourceNotFoundException("customer not found") )		
//				
//				
//		AccountDetails savedAccountDetails = this.accountDetailsRepo.save(accountDetails);
//		
//		savedAccountDetails.setFarmer(farmer);
//		savedAccountDetails.setCustomer(customer);
//		
//		
//		
//		return this.modelMapper.map(savedAccountDetails, AccountDetailsDto.class);
//	}

}
