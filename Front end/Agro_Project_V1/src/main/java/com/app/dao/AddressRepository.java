package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.Address;
import com.app.entities.Customer;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

	List<Address> findByCustomer(Customer customer);

}
