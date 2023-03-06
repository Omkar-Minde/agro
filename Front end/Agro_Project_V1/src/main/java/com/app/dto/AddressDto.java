package com.app.dto;

import javax.persistence.Column;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Setter
@Getter
@ToString
@NoArgsConstructor

public class AddressDto {
	private long addressId;
	
	private String adrLine1;

	private String city;

	private String district;

	private String state;

	private String pinCode;

	public AddressDto(long addressId, String adrLine1, String city, String district, String state, String pinCode) {
		super();
		this.addressId = addressId;
		this.adrLine1 = adrLine1;
		this.city = city;
		this.district = district;
		this.state = state;
		this.pinCode = pinCode;
	}
	
	
	
}
