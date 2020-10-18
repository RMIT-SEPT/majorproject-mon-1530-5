package com.rmit.bookingAPI.repository;

import com.rmit.bookingAPI.model.PaidService;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaidServiceRepository extends CrudRepository<PaidService, Long> {
    public PaidService findPaidServiceByName(String name);

}
