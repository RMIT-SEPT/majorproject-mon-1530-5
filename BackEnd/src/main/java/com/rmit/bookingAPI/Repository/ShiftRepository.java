package com.rmit.bookingAPI.Repository;

import com.rmit.bookingAPI.Model.Shift;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShiftRepository extends CrudRepository<Shift, Long> {
}
