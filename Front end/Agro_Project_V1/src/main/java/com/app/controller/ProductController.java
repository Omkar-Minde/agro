package com.app.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;
import com.app.dto.ProductDto;
import com.app.dto.ProductListDto;
import com.app.entities.Product;
import com.app.service.IFarmerService;
import com.app.service.IProductImageHandelingService;
import com.app.service.IProductService;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:3000")
@Validated
public class ProductController {
	@Autowired
	IProductService productService;
	
	@Autowired
	IFarmerService farmerService;
	
	@Autowired
	private IProductImageHandelingService imageHandleService;
	
	@PostMapping("/add/{subCatgId}/{farmerId}")
	public ResponseEntity<?> addProductDetails(@RequestBody @Valid Product transientproduct,HttpSession session,@PathVariable long subCatgId, @PathVariable long farmerId) {
		System.out.println("in add dtls " + transientproduct);
		try {
			System.out.println("fetching farmer");
		//	long farmerId = (long)session.getAttribute("farmer_dtls_id");
			System.out.println(farmerId);
			ProductDto productDto = productService.addNewProduct(transientproduct, farmerId,subCatgId);
			return ResponseEntity.ok(productDto);
		} catch (RuntimeException e) {
			System.out.println("err in add emp " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/delete/{productId}")
	public ResponseEntity<?> deleteProductDetails(@PathVariable long productId) {
		System.out.println("in del product " + productId);
		try {
			return ResponseEntity.ok(new ApiResponse(productService.deleteProduct(productId)));
		} catch (RuntimeException e) {
			System.out.println("err in del  product " + e);
			return new ResponseEntity<>(new ApiResponse("Invalid Product ID !!!"), HttpStatus.NOT_FOUND);																											// id
		}
	}
	
	@PutMapping("/update/{farmerId}/{productId}")
	public ResponseEntity<?> updateProductDetails(@RequestBody Product detachedProduct,HttpSession session,@PathVariable long farmerId,@PathVariable long productId) {

		System.out.println("in update product " + detachedProduct);
		try {
			//long farmerId = (long)session.getAttribute("farmer_dtls_id");
			return ResponseEntity.ok(productService.updateProduct(detachedProduct,farmerId,productId));
		} catch (RuntimeException e) {
			System.out.println("err in update  product " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/get/{productId}")
	public Product getProductById(@PathVariable long productId) {
		return productService.findProductByProductId(productId);
	}
	
	
	@GetMapping
	public List<ProductListDto> getAllProducts(){
		return productService.getAllProductsList();

	}
	
	
	@PostMapping("/{productId}/images")
	public ResponseEntity<?> uploadImage(@PathVariable long productId, @RequestParam("file") MultipartFile imgFile) throws IOException{
		System.out.println("product id"+productId + " multipart file "+imgFile.getOriginalFilename());
		return ResponseEntity.ok(imageHandleService.saveImage(productId,imgFile));
	}
	
	
	@GetMapping("/getimage/{productId}")
	public ResponseEntity<?> getImage(@PathVariable long productId){
		System.out.println("getting image of product"+productId);
		String imgPath = imageHandleService.getImage(productId);
		return new ResponseEntity<>(new ApiResponse(imgPath), HttpStatus.CREATED);
	}
//	@GetMapping("/files/{id}")
//	public ResponseEntity<byte[]> getFile(@PathVariable Integer id) {
//		System.out.println("in get file");
//		FileDB fileDB = storageService.getFile(id);
//
//		return ResponseEntity.ok()
//				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
//				.body(fileDB.getData());
//	}
	
	
//	@PostMapping("/upload")
//	public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
//		String message = "";
//		try {
//			storageService.store(file);
//
//			message = "Uploaded the file successfully: " + file.getOriginalFilename();
//			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
//		} catch (Exception e) {
//			message = "Could not upload the file: " + file.getOriginalFilename() + "!";
//			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
//		}
//	}
}
