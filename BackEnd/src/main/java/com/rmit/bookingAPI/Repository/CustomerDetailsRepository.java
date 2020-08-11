package com.rmit.bookingAPI.Repository;

import com.rmit.bookingAPI.Model.CustomerDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import javax.persistence.Id;

@Repository
public interface CustomerDetailsRepository extends CrudRepository<CustomerDetails, Long> {
    CustomerDetails findByUsername(String username);
    CustomerDetails findById(Id id);
}
