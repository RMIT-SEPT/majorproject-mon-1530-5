package com.rmit.bookingAPI.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.sql.Date;
import java.sql.Time;
import java.util.Calendar;

import static org.junit.Assert.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class BookingServiceTests {

    @Autowired
    private BookingService bookingService;

    @Test
    void isBookingCancellableTest_valid() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MONTH, 1);
        Date validDate = new Date(cal.getTime().getTime());
        Time validTime = Time.valueOf("12:00:00");

        assertTrue(bookingService.isBookingCancellable(validDate, validTime));
    }

    @Test
    void isBookingCancellableTest_invalid() {

        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_WEEK, 1);
        Date invalidDate = new Date(cal.getTime().getTime());
        Time invalidTime = Time.valueOf("12:00:00");

        assertFalse(bookingService.isBookingCancellable(invalidDate, invalidTime));
    }
}
