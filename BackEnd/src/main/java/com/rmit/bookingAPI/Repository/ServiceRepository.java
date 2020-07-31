package com.rmit.bookingAPI.Repository;

import com.rmit.bookingAPI.Model.Service;
import org.springframework.data.repository.CrudRepository;

public interface ServiceRepository extends CrudRepository<Service, Long> {
}
