package com.app.dao;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entities.Product;
import com.app.entities.SubCategory;
  @Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	String deleteByProductId(long productId);
	
	boolean existsByProductId(long productId );

	//long productId, String productTitle, double price, LocalDate expiryDate, int availableStock
	@Query("select new com.app.entities.Product(p.productId,p.productTitle,p.price,p.harvestedDate,p.productImagesByFarmer,p.expiryDate,p.availableStock) from Product p where p.productId= ?1")
	Product findProductByProductId(long productId);

	@Modifying
	@Query("update Product p set p.availableStock=?1 where p.productId=?2")
	void updateProductQuantity(double Quantity,long producId);
	
	@Modifying
	@Query("update Product p set p.productId=?1,p.productTitle=?2,p.price=?3,p.harvestedDate=?4,p.expiryDate=?5,p.availableStock=?6 where p.productId=?7")
	void updateProduct(long produId,String title,double price,LocalDate harvestedDate,LocalDate expiryDate,double stock,long pId );

	@Query("select p.subcatg from Product p where p.productId= ?1")
	SubCategory getSubcategoryFromProductId(long productId);
}
