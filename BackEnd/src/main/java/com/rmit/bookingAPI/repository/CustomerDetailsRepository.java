package com.rmit.bookingAPI.repository;

import com.rmit.bookingAPI.model.CustomerDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import javax.persistence.Id;

@Repository
public interface CustomerDetailsRepository extends CrudRepository<CustomerDetails, Long> {
    CustomerDetails findByUsername(String username);
    CustomerDetails findById(Id id);
}
