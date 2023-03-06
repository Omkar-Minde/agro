package com.app.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "category")
@NoArgsConstructor
@Getter
@Setter
public class Category {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "category_id")
	private long categoryId;
	
	@Column(name = "catg_name")
	private String catgName;
	
	@Column(name = "catg_descp")
	private String description;
	
	@JsonIgnore 
	@OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
	Set<SubCategory> subCategories=new HashSet<>();
	
	@ManyToOne
	@JoinColumn(name = "admin_id")
	private Admin admin;

	public Category(long categoryId, String catgName, String description, Admin admin) {
		super();
		this.categoryId = categoryId;
		this.catgName = catgName;
		this.description = description;
		this.admin = admin;
	}

}
