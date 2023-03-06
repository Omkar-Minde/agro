package com.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class CustomerListDto {
	private Long customerId;
	
	private String firstName;
	
	private String lastName;
	
	private String email;
	
	private String contactNumber;
	
	private byte[] profilePicture;

	public CustomerListDto(Long customerId, String firstName, String lastName, String email, String contactNumber,
			byte[] profilePicture) {
		super();
		this.customerId = customerId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.contactNumber = contactNumber;
		this.profilePicture = profilePicture;
	}
}
