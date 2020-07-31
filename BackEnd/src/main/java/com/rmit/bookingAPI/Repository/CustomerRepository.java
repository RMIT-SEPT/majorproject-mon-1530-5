package com.rmit.bookingAPI.Repository;

import com.rmit.bookingAPI.Model.Customer;
import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends CrudRepository<Customer, Long> {
}
