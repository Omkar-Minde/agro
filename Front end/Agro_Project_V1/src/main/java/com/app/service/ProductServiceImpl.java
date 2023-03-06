package com.app.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.ProductRepository;
import com.app.dto.ProductDto;
import com.app.dto.ProductListDto;
import com.app.entities.Farmer;
import com.app.entities.OrderItem;
import com.app.entities.Product;
import com.app.entities.SubCategory;

@Service
@Transactional
public class ProductServiceImpl implements IProductService {
	@Autowired
	ProductRepository productRepo;
	
	@Autowired
	IFarmerService farmerService;
	
	@Autowired 
	ISubCategoryService subCategoryService;
	
	@Autowired
	ModelMapper mapper;
	
//	@Autowired
//	IOrderItemService orderService;

	@Override
	public ProductDto addNewProduct(Product transientProduct,long farmerId,long subCatgId) {
		
		SubCategory subCateg = subCategoryService.findSubCategoryById(subCatgId);
		Farmer farmer=farmerService.findFarmerById(farmerId);
		System.out.println(farmer);
		transientProduct.setFarmer(farmer);
		transientProduct.setSubcatg(subCateg);
		System.out.println("sub catg"+subCateg);
		Product product = productRepo.save(transientProduct);
		ProductDto productDto = mapper.map(product, ProductDto.class);
		return productDto;
	}

	@Override
	public Product updateProduct(Product detachedProduct,long farmerId,long productId) {
		
		Farmer farmer=farmerService.findFarmerById(farmerId);
		System.out.println("in farmer"+farmer);
		System.out.println("in path id"+productId);
		
		if (productRepo.existsByProductId(productId)) {
			productRepo.updateProduct(productId, detachedProduct.getProductTitle(), detachedProduct.getPrice(), detachedProduct.getHarvestedDate(), detachedProduct.getExpiryDate(),detachedProduct.getAvailableStock(), productId);
			Product product =productRepo.findProductByProductId(productId);
			//updatedProduct.setFarmer(farmer);
			return product;//update
		}
		throw new ResourceNotFoundException("Invalid Product ID : Updation Failed !!!!!!!!!" + detachedProduct.getProductId());
	}
	
	@Override
	public String deleteProduct(long productId) {
		productRepo.deleteByProductId(productId);
		return "Product details deleted for product id " + productId;
	}
    
	
	//called in orderItem
	public Product findProductByProductId(long productId) {
		return productRepo.findProductByProductId(productId);
	}

	@Override
	public void updateProductQuantity(OrderItem orderItem) {
		System.out.println("in update product"+ orderItem.getProduct());
		
	    
	//	Product product= productRepo.findProductByProductId((orderItem.getProduct().getProductId()));
	    
		//if not working the call orderitem repository
	//	Product product= productRepo.findProductByProductId((orderItem.getProduct().getProductId()));
        Product product = orderItem.getProduct();
	    double oldQuantity=product.getAvailableStock();
	    System.out.println("oldQuantity is "+oldQuantity);
         double orderedItemQuantity=orderItem.getProductQuantity();
         System.out.println("order quantity is is "+orderedItemQuantity);
         double updatedQuantity=oldQuantity-orderedItemQuantity;
         System.out.println("updated quantity is "+updatedQuantity);
		productRepo.updateProductQuantity(updatedQuantity,orderItem.getProduct().getProductId());
		// also subcategories total stock has to be updated
		 System.out.println("updated product quantity now calling subcategory update method");
		//SubCategory subCategory=productRepo.getSubcategoryFromProductId(product.getProductId());
		SubCategory subCategory =product.getSubcatg();
		 System.out.println("updated product quantity now calling subcategory update method "+subCategory);
		subCategoryService.updateSubCategoryQuantity(subCategory,orderedItemQuantity);
	}
	
	@Override
	public void updateProductAddQuantity(Product product, double orderedItemQuantity) {
		
		//Product product =orderService.getProductByOrderId(orderItem.getOrderItemId());
		//Product product= productRepo.findProductByProductId((orderItem.getProduct().getProductId()));
        double oldQuantity=product.getAvailableStock();
       // double orderedItemQuantity=orderItem.getProductQuantity();
        //we have to add quantity to product
        double updatedQuantity=oldQuantity+orderedItemQuantity;
        productRepo.updateProductQuantity(updatedQuantity,product.getProductId());
        System.out.println("SubCategory of product is"+product.getSubcatg());
        subCategoryService.updateSubCategoryAddQuantity(product.getSubcatg(),orderedItemQuantity);
	}
	@Override
	public List<ProductListDto> getAllProductsList() {
		
		List<ProductListDto>listProductDto = new ArrayList<>();
		
		
	
		List<Product>listOfProduct = productRepo.findAll();
		
		for (Product product : listOfProduct) {
			ProductListDto productDtoList =mapper.map(product, ProductListDto.class);
			listProductDto.add(productDtoList);
			
		}
		return listProductDto ;
	}

	@Override
	public List<ProductListDto> getAllFarmerProductsList(long famerId) {
		List<ProductListDto>listProductDto = new ArrayList<>();
		
		
		
		List<Product>listOfProduct = productRepo.findAll();
		
		
		for (Product product : listOfProduct) {
			if(product.getFarmer().getFarmerId() == famerId) {
				ProductListDto productDtoList =mapper.map(product, ProductListDto.class);
				listProductDto.add(productDtoList);	
			}
		}
		return listProductDto ;
	}

}
