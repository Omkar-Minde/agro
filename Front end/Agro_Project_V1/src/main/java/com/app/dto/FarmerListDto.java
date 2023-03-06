package com.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class FarmerListDto {
	private long farmerId;
	
	private String firstName;
	
	private String lastName;

	private String email;
	
	private String contactNumber;
	
	private double maintainanceAmount;
	
	private double receivableAmount;
	
	private byte[] profilePicture;

	public FarmerListDto(long farmerId, String firstName, String lastName, String email, String contactNumber,
			double maintainanceAmount, double receivableAmount, byte[] profilePicture) {
		super();
		this.farmerId = farmerId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.contactNumber = contactNumber;
		this.maintainanceAmount = maintainanceAmount;
		this.receivableAmount = receivableAmount;
		this.profilePicture = profilePicture;
	}
	
	
}
