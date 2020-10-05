package com.rmit.bookingAPI.repository;

import com.rmit.bookingAPI.model.Booking;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Id;

@Repository
public interface BookingRepository extends CrudRepository<Booking, Long> {
    Booking findById(Id id);
}
