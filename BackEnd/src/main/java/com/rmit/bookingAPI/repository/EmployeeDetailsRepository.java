package com.rmit.bookingAPI.repository;

import com.rmit.bookingAPI.model.EmployeeDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Id;

@Repository
public interface EmployeeDetailsRepository extends CrudRepository<EmployeeDetails, Long> {
    EmployeeDetails findByUsername(String username);
    EmployeeDetails findById(Id id);
}
