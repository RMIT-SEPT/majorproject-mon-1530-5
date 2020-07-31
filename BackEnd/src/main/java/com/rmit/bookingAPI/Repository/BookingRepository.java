package com.rmit.bookingAPI.Repository;

import com.rmit.bookingAPI.Model.Booking;
import org.springframework.data.repository.CrudRepository;

public interface BookingRepository extends CrudRepository<Booking, Long> {
}
