package com.rmit.bookingAPI.controller;

import com.rmit.bookingAPI.controller.dto.BookingDTO;
import com.rmit.bookingAPI.model.*;
import com.rmit.bookingAPI.service.BookingService;
import com.rmit.bookingAPI.service.PaidServiceService;
import com.rmit.bookingAPI.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

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
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
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
            Iterator<Booking> desiredIterator = desiredBookings.iterator();
            while(desiredIterator.hasNext()) {
                Booking tempBooking_service = desiredIterator.next();
                if (tempBooking_service.getServiceId().equals(bookingDTO.returnServiceIdAsLong())) {
                    if (null == tempBooking_service.getCustomerUsername()) {
                        tempBooking_service.setCustomerUsername(bookingDTO.getCustomerUsername());
                        bookingService.addOrUpdateBooking(tempBooking_service);
                        desiredIterator.remove();
                        isBooked = true;
                    } else {
                        return new ResponseEntity<String>("Booking already occupied", HttpStatus.BAD_REQUEST);
                    }
                }
            }
            if (isBooked) {
                Iterator<Booking> undesiredIterator = desiredBookings.iterator();
                while(undesiredIterator.hasNext()) {
                    Booking tempBooking = undesiredIterator.next();
                    bookingService.removeBooking(tempBooking);
                    undesiredIterator.remove();
                }
                return new ResponseEntity<String>("Booking filled, and consequent bookings removed!", HttpStatus.CREATED);
            } else {
                return new ResponseEntity<String>("Invalid serviceId", HttpStatus.NOT_FOUND);
            }
        }
        catch (ParseException e) {
            return new ResponseEntity<String>("Invalid date format", HttpStatus.BAD_REQUEST);
        }
    }

    /*
    *   This method, if successful will remove the booking from the customer and add the now available bookings
    *   for the employees services
    */
    @DeleteMapping (value = "/booking/cancel")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<?> cancelBooking(@RequestBody Map<String, String> bookingDetails) {

        if (null == userService.findEmployeeDetailsByUsername(bookingDetails.get("employeeUsername"))) {
            return new ResponseEntity<String>("Employee not found", HttpStatus.NOT_FOUND);
        }
        if (null == userService.findCustomerDetailsByUsername(bookingDetails.get("customerUsername"))) {
            return new ResponseEntity<String>("Customer not found", HttpStatus.NOT_FOUND);
        }
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
            Date bookingDate = new Date(dateFormat.parse(bookingDetails.get("bookingDate")).getTime());

            Booking oldBooking = null;

            for (Booking booking : bookingService.getAllBookings()) {
                if (booking.getEmployeeUsername().equals(bookingDetails.get("employeeUsername"))) {
                    if (booking.getDate().compareTo(bookingDate) == 0) {
                        if (booking.getCustomerUsername().equals(bookingDetails.get("customerUsername"))) {
                            oldBooking = booking;
                        }
                        else {
                            return new ResponseEntity<String>("Booking is not occupied", HttpStatus.BAD_REQUEST);
                        }
                    }
                }
            }

            if (null == oldBooking) {
                return new ResponseEntity<>("Booking not found", HttpStatus.NOT_FOUND);
            }

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
            return new ResponseEntity<String>("Booking cancelled and vacant bookings added", HttpStatus.OK);
        }
        catch (ParseException e) {
            return new ResponseEntity<String>("Invalid date", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value="/booking/vacantBookings")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
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
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
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
    @PreAuthorize("hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
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
    @PreAuthorize("hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
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
