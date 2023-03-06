package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.ProductRepository;
import com.app.dto.ProductDto;
import com.app.entities.Product;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class IProductImageHandelingSserviceImpl implements IProductImageHandelingService {

	@Autowired
	private ProductRepository productRepo;
	
	@Value("${file.upload.locationProduct}")
	private String folderLocation;
	
	@Autowired
	private ModelMapper mapper;
	
	@PostConstruct
	public void Init() {
		//check if folder exist / else create
		File folder = new File(folderLocation);
		if(!folder.exists()) {
			folder.mkdirs();
		log.info("created");}
		else
			log.info("exists");
	}
	
	@Override
	public String saveImage(long productId, MultipartFile imgFile) throws IOException {
		//get 
		Product product = productRepo.findById(productId)
				.orElseThrow(()->new ResourceNotFoundException("invalid product id"));
		//create absolute path to image file
		String path = folderLocation+File.separator+imgFile.getOriginalFilename();
		product.setProductImagesByFarmer(path);
		log.info("path{}",path);
		//imgFile.getInputStream();
		
		Files.copy(imgFile.getInputStream(), Paths.get(path), StandardCopyOption.REPLACE_EXISTING);
		return "Image uploaded successfully!!!!";
	}

	@Override
	public String getImage(long produtId) {
		Product product = productRepo.findProductByProductId(produtId);
		String imgPath = product.getProductImagesByFarmer();
		return imgPath;
	}


}
