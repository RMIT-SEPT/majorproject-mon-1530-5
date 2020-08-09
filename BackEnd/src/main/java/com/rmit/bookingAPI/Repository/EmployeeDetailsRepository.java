package com.rmit.bookingAPI.Repository;

import com.rmit.bookingAPI.Model.EmployeeDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeDetailsRepository extends CrudRepository<EmployeeDetails, Long> {
    EmployeeDetails findByUsername(String username);
}
