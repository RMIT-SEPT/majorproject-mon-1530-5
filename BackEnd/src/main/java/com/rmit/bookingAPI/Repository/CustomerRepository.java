package com.rmit.bookingAPI.Repository;

import com.rmit.bookingAPI.Model.Customer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Long> {
    Customer findByUsername(String username);
}
