package com.app.dto;

import com.app.entities.Product;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class OrderItemListDto {
	
   private long orderItemId;
   
   private long productQuantity;

}
