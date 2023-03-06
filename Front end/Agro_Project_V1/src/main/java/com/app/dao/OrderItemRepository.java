package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entities.Cart;
import com.app.entities.Farmer;
import com.app.entities.Order;
import com.app.entities.OrderItem;
import com.app.entities.Product;

@Repository

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
//Long orderItemId, int productQuantity, double productPrice
	@Query("select new com.app.entities.OrderItem(o.orderItemId,o.product,o.productQuantity,o.productPrice) from OrderItem o where o.orderItemId= ?1")
	OrderItem findByOrderItemId(Long orderItemId);

	@Modifying
	@Query("update OrderItem o set o.productQuantity=?1,o.productPrice=?2,o.cart=?3 where o.orderItemId=?4")
  void addCartIdToProduct(int productQuantity, double productPrice, Cart cart, Long orderItemId);

	
	@Modifying
	@Query("update OrderItem o set o.order= ?1 where o.orderItemId= ?2")
	void updateOrderId( Order order,Long orderItemId);
	
	@Query("select new com.app.entities.OrderItem(o.orderItemId,o.product,o.productQuantity,o.productPrice) from OrderItem o where o.order= ?1")
	List<OrderItem> findOrderItemsByOrderId(Order order);

	
	void deleteByOrderItemId(Long orderItemId);
	
	
	@Query("select o.product from OrderItem o where o.orderItemId=?1")
	Product getProductByOrderId(Long orderItemId);
	
	List<OrderItem> findByProduct_Farmer(Farmer farmer);
	
	
	 List<OrderItem> findByCart(Cart cart);
	//@Query("insert into ")
	/*
	 * @Query("update OrderItem o set (o.productQuantity=?1,o.productPrice=?2,o.cart=?3) where o.orderItemId=?4"
	 * ) int addCartIdToProduct(int productQuantity,double productPrice,Cart cart,
	 * Long orderItemId);
	 */
}
