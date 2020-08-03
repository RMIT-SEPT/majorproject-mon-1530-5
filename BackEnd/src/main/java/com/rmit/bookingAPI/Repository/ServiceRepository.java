package com.rmit.bookingAPI.Repository;

import com.rmit.bookingAPI.Model.Service;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends CrudRepository<Service, Long> {
}
