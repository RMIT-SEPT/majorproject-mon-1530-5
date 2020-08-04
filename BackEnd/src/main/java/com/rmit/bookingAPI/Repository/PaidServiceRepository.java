package com.rmit.bookingAPI.Repository;

import com.rmit.bookingAPI.Model.PaidService;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaidServiceRepository extends CrudRepository<PaidService, Long> {
}
