package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entities.Category;
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
	
	String deleteByCategoryId(long categoryId);

	boolean existsByCategoryId(long categoryId);

	@Query("select new com.app.entities.Category(c.categoryId,c.catgName,c.description,c.admin) from Category c where c.categoryId=?1 ")
	Category findByCategoryId( long categoryId);
}
