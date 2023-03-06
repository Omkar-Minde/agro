package com.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor

public class AccountDetailsDto {
	
	private String bankAccountNumber;
	
	private int ifsc;
	
	private String contactNumber;

	public AccountDetailsDto(String bankAccountNumber, int ifsc, String contactNumber) {
		super();
		this.bankAccountNumber = bankAccountNumber;
		this.ifsc = ifsc;
		this.contactNumber = contactNumber;
	}

	
}
