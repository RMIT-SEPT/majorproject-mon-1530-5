package com.rmit.bookingAPI.service;

import com.rmit.bookingAPI.model.*;
import com.rmit.bookingAPI.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> findBookingsByUsername(String username) {
        List<Booking> bookings = new ArrayList<Booking>();
        for (Booking booking : getAllBookings()) {
            if (booking.getCustomerUsername().equals(username)) {
                bookings.add(booking);
            }
        }
        return bookings;
    }

    public Booking findBookingById(Long bookingId) {
        for (Booking tempBooking : getAllBookings()) {
            if (tempBooking.getId().equals(bookingId)) {
                return tempBooking;
            }
        }
        return null;
    }

    public List<Booking> getAllBookings() {
        List<Booking> bookings = new ArrayList<Booking>();
        bookingRepository.findAll().forEach(bookings::add);
        return bookings;
    }

    public void addOrUpdateBooking(Booking booking) {
        bookingRepository.save(booking);
    }

    public void removeBooking(Booking booking) {
        bookingRepository.delete(booking);
    }

}
