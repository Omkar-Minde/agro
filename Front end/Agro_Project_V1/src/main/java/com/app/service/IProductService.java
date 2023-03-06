package com.app.service;

import java.util.List;

import com.app.dto.ProductDto;
import com.app.dto.ProductListDto;
import com.app.entities.OrderItem;
import com.app.entities.Product;

public interface IProductService {
	
	ProductDto addNewProduct(Product tansientProduct,long farmerId,long subCtagId);
	
	Product updateProduct(Product detachedProduct,long farmerId,long productId);
	
	String deleteProduct(long productId);

	Product findProductByProductId(long productId);

	void updateProductQuantity(OrderItem orderItem);
	
	void updateProductAddQuantity(Product Product, double orderQuantity);
	
	List<ProductListDto> getAllProductsList();
	
	List<ProductListDto> getAllFarmerProductsList(long farmerId);
	
}
