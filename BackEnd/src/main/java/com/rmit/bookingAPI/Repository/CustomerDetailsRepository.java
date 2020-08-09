package com.rmit.bookingAPI.Repository;

import com.rmit.bookingAPI.Model.CustomerDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerDetailsRepository extends CrudRepository<CustomerDetails, Long> {
    CustomerDetails findByUsername(String username);
}
