package com.app.service;



import com.app.dto.SubCategoryRequest;
import com.app.entities.SubCategory;

public interface ISubCategoryService {

	String deleteSubCategoryById(long subCategoryId);

	SubCategory createSubCategory(SubCategoryRequest subCategoryRequest, long adminId);

	SubCategory updateSubCategory(SubCategory detachedSubCategory, long adminId);

	void updateSubCategoryQuantity(SubCategory subCategory, double orderedItemQuantity);
	
    void updateSubCategoryAddQuantity( SubCategory subCategory, double orderedItemQuantity) ;
    
    SubCategory findSubCategoryById(long subCatgId);
    
    

}
