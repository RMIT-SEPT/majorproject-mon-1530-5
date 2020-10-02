package com.rmit.bookingAPI.repository;

import com.rmit.bookingAPI.model.Shift;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShiftRepository extends CrudRepository<Shift, Long> {
}
