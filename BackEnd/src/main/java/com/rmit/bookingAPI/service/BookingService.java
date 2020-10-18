package com.rmit.bookingAPI.service;

import com.rmit.bookingAPI.model.*;
import com.rmit.bookingAPI.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

/*
@author Daniel Bound
*/
@Service
public class
BookingService {

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

    /*
    * Helper method to determine if a booking made by a customer can be cancelled due
    * to the 48 hour cutoff time before the booking.
    * */
    public boolean isBookingCancellable(Date bookingDate, Time bookingTime) {
        Calendar calendar = Calendar.getInstance();
        long cutoffTimeInMilli = calendar.getTimeInMillis();
        cutoffTimeInMilli += 48 * 60 * 60 * 1000; //48 hours in milliseconds;
        long bookingTimeInMilli = bookingDate.getTime() + bookingTime.getTime();

        if (cutoffTimeInMilli > bookingTimeInMilli) {
            return false;
        }
        return true;
    }

}
