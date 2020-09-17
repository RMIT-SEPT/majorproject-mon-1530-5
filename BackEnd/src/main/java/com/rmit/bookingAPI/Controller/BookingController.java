package com.rmit.bookingAPI.Controller;

import com.rmit.bookingAPI.Controller.DTO.BookingDTO;
import com.rmit.bookingAPI.Model.*;
import com.rmit.bookingAPI.Service.BookingService;
import com.rmit.bookingAPI.Service.PaidServiceService;
import com.rmit.bookingAPI.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Connection support for ReactJs Frontend requests
public class BookingController {

    @Autowired
    BookingService bookingService;

    @Autowired
    UserService userService;

    @Autowired
    PaidServiceService paidServiceService;

    @PostMapping(value = "/booking/add")
    public ResponseEntity<?> addBooking(@Valid @RequestBody BookingDTO bookingDTO, BindingResult result) throws Exception{

        if (result.hasErrors()) {
            return new ResponseEntity<String>("Invalid form data", HttpStatus.BAD_REQUEST);
        }
        if (null == userService.findEmployeeDetailsByUsername(bookingDTO.getEmployeeUsername())) {
            return new ResponseEntity<String>("Employee with that username does not exist", HttpStatus.NOT_FOUND);
        }

        try {

            /*
            A list of bookings on the correct date and with the correct employee are gathered.
            This is represented as a list as one employee is able to provide several services.
            */
            List<Booking> desiredBookings = new ArrayList<>();
            Booking newBooking = bookingDTO.returnBookingObject();

            for (Booking tempBooking_employee : bookingService.getAllBookings()) {
                if (newBooking.getDate().compareTo(tempBooking_employee.getDate()) == 0) {
                    if (newBooking.getBookingTime().compareTo(tempBooking_employee.getBookingTime()) == 0) {
                        if (newBooking.getEmployeeUsername().equals(tempBooking_employee.getEmployeeUsername())) {
                            desiredBookings.add(tempBooking_employee);
                        }
                    }
                }
            }
            if (desiredBookings.isEmpty()) {
                return new ResponseEntity<String>("No bookings on that date, with that employee exist...", HttpStatus.NOT_FOUND);
            }

            /*
            The list is then examined to select the correct service that was provided in the BookingDTO.
            The other empty bookings for the different provided services are removed as an employee cannot fulfill
            multiple bookings at once.
            */
            boolean isBooked = false;
            for (Booking tempBooking_service : desiredBookings) {
                if (tempBooking_service.getServiceId().equals(bookingDTO.returnServiceIdAsLong())) {
                    if (null == tempBooking_service.getCustomerUsername()) {
                        tempBooking_service.setCustomerUsername(bookingDTO.getCustomerUsername());
                        bookingService.addOrUpdateBooking(tempBooking_service);
                        desiredBookings.remove(tempBooking_service);
                        isBooked = true;
                    } else {
                        return new ResponseEntity<String>("Booking already occupied", HttpStatus.BAD_REQUEST);
                    }
                }
            }
            if (isBooked) {
                for (Booking tempBooking : desiredBookings) {
                    bookingService.removeBooking(tempBooking);
                }
                return new ResponseEntity<String>("Booking filled, and consequent bookings removed!", HttpStatus.CREATED);
            } else {
                return new ResponseEntity<String>("Invalid serviceId", HttpStatus.NOT_FOUND);
            }
        }
        catch (Exception e) {
            return new ResponseEntity<String>("Invalid date format", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping (value = "/booking/remove/{bookingId}")
    public ResponseEntity<?> removeBooking(@PathVariable("bookingId") String bookingIdString) {

        try {
            Long bookingId = Long.parseLong(bookingIdString);

            if (null == bookingService.findBookingById(bookingId)) {
                return new ResponseEntity<String>("Booking with that bookingId does not exist", HttpStatus.NOT_FOUND);
            }
            if (null == bookingService.findBookingById(bookingId).getCustomerUsername()) {
                return new ResponseEntity<String>("Booking with that bookingId is not occupied", HttpStatus.BAD_REQUEST);
            }

            Booking oldBooking = bookingService.findBookingById(bookingId);
            oldBooking.setCustomerUsername(null);
            bookingService.addOrUpdateBooking(oldBooking);

            for (Long serviceId : userService.getEmployeeServices(oldBooking.getEmployeeUsername())) {
                if (!serviceId.equals(oldBooking.getServiceId())) {
                    Booking tempBooking = new Booking(
                            oldBooking.getDate(),
                            oldBooking.getBookingTime(),
                            serviceId,
                            oldBooking.getEmployeeUsername()
                    );
                    bookingService.addOrUpdateBooking(tempBooking);
                }
            }
            return new ResponseEntity<String>("Booking removed and vacant bookings added", HttpStatus.OK);
        }
        catch (NumberFormatException e) {
            return new ResponseEntity<String>("A numerical bookingId value must be given", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value="/booking/vacantBookings")
    public ResponseEntity<List<Booking>> getVacantFutureBookings() {

        List<Booking> desiredBookings = new ArrayList<>();
        Calendar cal = Calendar.getInstance();

        for (Booking booking : bookingService.getAllBookings()) {
            if (booking.getDate().after(cal.getTime())) {
                if (null == booking.getCustomerUsername()) {
                    desiredBookings.add(booking);
                }
            }
        }
        return new ResponseEntity<List<Booking>>(desiredBookings, HttpStatus.OK);
    }

    @GetMapping(value = "/booking/vacantBookings/{serviceId}")
    public ResponseEntity<?> getVacantFutureBookingsByService(@PathVariable("serviceId") String serviceIdString) {

        try {
            Long serviceId = Long.parseLong(serviceIdString);
            if (null == paidServiceService.findPaidServiceById(serviceId)) {
                return new ResponseEntity<String>("Service not found", HttpStatus.NOT_FOUND);
            }

            List<Booking> desiredBookings = new ArrayList<>();
            Calendar cal = Calendar.getInstance();

            for (Booking booking : bookingService.getAllBookings()) {
                if (booking.getDate().after(cal.getTime())) {
                    if (null == booking.getCustomerUsername()) {
                        if (booking.getServiceId().equals(serviceId)) {
                            desiredBookings.add(booking);
                        }
                    }
                }
            }
            return new ResponseEntity<List<Booking>>(desiredBookings, HttpStatus.OK);
        } catch (NumberFormatException e) {
            return new ResponseEntity<String>("A numerical serviceId value must be given", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value="/booking/occupiedBookings")
    public ResponseEntity<List<Booking>> getOccupiedFutureBookings() {

        List<Booking> desiredBookings = new ArrayList<>();
        Calendar cal = Calendar.getInstance();

        for (Booking booking : bookingService.getAllBookings()) {
            if (booking.getDate().after(cal.getTime())) {
                if (null != booking.getCustomerUsername()) {
                    desiredBookings.add(booking);
                }
            }
        }
        return new ResponseEntity<List<Booking>>(desiredBookings, HttpStatus.OK);
    }

    @GetMapping(value = "/booking/occupiedBookings/{username}")
    public ResponseEntity<?> getOccupiedFutureBookingsByUsername(@PathVariable("username") String username) {

        CustomerDetails customerDetails = userService.findCustomerDetailsByUsername(username);
        if (null == customerDetails) {
            return new ResponseEntity<String>("Customer not found", HttpStatus.NOT_FOUND);
        }

        List<Booking> desiredBookings = new ArrayList<>();
        Calendar cal = Calendar.getInstance();

        for (Booking booking : bookingService.getAllBookings()) {
            if (booking.getDate().after(cal.getTime())) {
                if (customerDetails.getUsername().equals(booking.getCustomerUsername())) {
                    desiredBookings.add(booking);
                }
            }
        }
        return new ResponseEntity<List<Booking>>(desiredBookings, HttpStatus.OK);
    }

    @GetMapping(value="/booking/pastBookings")
    public ResponseEntity<List<Booking>> getPastBookings() {

        List<Booking> desiredBookings = new ArrayList<>();
        Calendar cal = Calendar.getInstance();

        for (Booking booking : bookingService.getAllBookings()) {
            if (booking.getDate().before(cal.getTime())) {
                if (null != booking.getCustomerUsername()) {
                    desiredBookings.add(booking);
                }
            }
        }
        return new ResponseEntity<List<Booking>>(desiredBookings, HttpStatus.OK);
    }

    @GetMapping(value = "/booking/pastBookings/{username}")
    public ResponseEntity<?> getOccupiedPastBookingsByUsername(@PathVariable("username") String username) {

        CustomerDetails customerDetails = userService.findCustomerDetailsByUsername(username);
        if (null == customerDetails) {
            return new ResponseEntity<String>("Customer not found", HttpStatus.NOT_FOUND);
        }

        List<Booking> desiredBookings = new ArrayList<>();
        Calendar cal = Calendar.getInstance();

        for (Booking booking : bookingService.getAllBookings()) {
            if (booking.getDate().before(cal.getTime())) {
                if (customerDetails.getUsername().equals(booking.getCustomerUsername())) {
                    desiredBookings.add(booking);
                }
            }
        }
        return new ResponseEntity<List<Booking>>(desiredBookings, HttpStatus.OK);
    }
}
