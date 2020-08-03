package com.rmit.bookingAPI.Repository;

import com.rmit.bookingAPI.Model.Booking;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends CrudRepository<Booking, Long> {
}
