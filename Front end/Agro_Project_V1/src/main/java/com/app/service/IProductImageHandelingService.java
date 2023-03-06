package com.app.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ProductDto;

public interface IProductImageHandelingService {
	String saveImage(long productId, MultipartFile imgFile) throws IOException;
	
	String getImage(long produtId);
}
