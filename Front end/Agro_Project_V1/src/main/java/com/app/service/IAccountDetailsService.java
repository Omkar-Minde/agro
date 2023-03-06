package com.app.service;

import com.app.dto.AccountDetailsDto;

public interface IAccountDetailsService {

	AccountDetailsDto AddFarmerAccountDetails(AccountDetailsDto accountDetailsDto, long farmerId );
	
	AccountDetailsDto AddCustomerAccountDetails(AccountDetailsDto accountDetailsDto, long customerId );
	
	
}
