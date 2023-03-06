package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.AccountDetails;

public interface AccountDetailsRepository extends JpaRepository<AccountDetails, Long> {

}
