package com.rmit.bookingAPI.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.bookingAPI.controller.dto.BookingDTO;
import com.rmit.bookingAPI.controller.dto.CustomerDTO;
import com.rmit.bookingAPI.controller.dto.EmployeeDTO;
import com.rmit.bookingAPI.controller.dto.ShiftDTO;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(roles = {"ADMIN"})
public class BookingControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private static String validWorkDateString;
    private static String invalidWorkDateString;


    @BeforeAll
    static void setupAll() throws Exception {

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        LocalDate ld = LocalDate.now();

        ld = ld.with(TemporalAdjusters.next(DayOfWeek.MONDAY));
        Date workDate = java.sql.Date.valueOf(ld);
        validWorkDateString = dateFormat.format(workDate);

        ld = ld.with(TemporalAdjusters.next(DayOfWeek.TUESDAY));
        workDate = java.sql.Date.valueOf(ld);
        invalidWorkDateString = dateFormat.format(workDate);
    }

    @BeforeEach
    void setupEach() throws Exception{

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

        Map<String,String> availabilityDetails = new HashMap<>();
        availabilityDetails.put("username", "testEmployee");
        availabilityDetails.put("dayOfWeek", "MONDAY");

        this.mockMvc.perform(post("/api/employee/addAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(availabilityDetails)));

        Map<String,String> serviceDetails = new HashMap<>();
        serviceDetails.put("username", "testEmployee");
        serviceDetails.put("serviceId", "1");

        this.mockMvc.perform(post("/api/employee/addService")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(serviceDetails)));

        CustomerDTO customerDTO = new CustomerDTO("testCustomer", "password", "Test Name", "1 Victoria Street", "0412345678");

        this.mockMvc.perform(post("/api/customer/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(customerDTO)));
        
        ShiftDTO shiftDTO = new ShiftDTO("testEmployee",
                validWorkDateString, "12:30", "14:30");

        this.mockMvc.perform(post("/api/shift/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(shiftDTO)));
    }

    @AfterEach
    void breakdownEach() throws Exception {

        Map<String,String> body = new HashMap<>();
        body.put("username", "testEmployee");
        body.put("shiftDate", validWorkDateString);

        this.mockMvc.perform(delete("/api/shift/remove")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)));

        this.mockMvc.perform(delete("/api/employee/remove/testEmployee"));
        this.mockMvc.perform(delete("/api/customer/remove/testCustomer"));
    }

    @Test
    void validAddBookingReturn201() throws Exception{

        BookingDTO bookingDTO = new BookingDTO(validWorkDateString, "12:30",
                "1", "testCustomer", "testEmployee");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)))
                .andExpect(status().isCreated());
    }

    @Test
    void invalidAddBookingReturn400_invalidDate() throws Exception{

        BookingDTO bookingDTO = new BookingDTO(invalidWorkDateString, "12:30",
                "1", "testCustomer", "testEmployee");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)))
                .andExpect(status().isNotFound());
    }

    @Test
    void invalidAddBookingReturn400_invalidTime() throws Exception{

        BookingDTO bookingDTO = new BookingDTO(validWorkDateString, "14:30",
                "1", "testCustomer", "testEmployee");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)))
                .andExpect(status().isNotFound());
    }

    @Test
    void invalidAddBookingReturn404_invalidService() throws Exception{

        BookingDTO bookingDTO = new BookingDTO(validWorkDateString, "12:30",
                "0", "testCustomer", "testEmployee");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)))
                .andExpect(status().isNotFound());
    }

    @Test
    void invalidAddBookingReturn404_invalidEmployee() throws Exception{

        BookingDTO bookingDTO = new BookingDTO(validWorkDateString, "12:30",
                "1", "testCustomer", "janDoe");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)))
                .andExpect(status().isNotFound());
    }

    @Test
    void invalidAddBookingReturn400_existingBooking() throws Exception{

        BookingDTO bookingDTO = new BookingDTO(validWorkDateString, "12:30",
                "1", "testCustomer", "testEmployee");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)));

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void invalidAddBookingReturn400_concurrentBookingsSameEmployee() throws Exception{

        BookingDTO bookingDTO_1 = new BookingDTO(validWorkDateString, "12:30",
                "1", "testCustomer", "testEmployee");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO_1)));

        BookingDTO bookingDTO_2 = new BookingDTO(validWorkDateString, "12:30",
                "1", "testCustomer", "testEmployee");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO_2)))
                .andExpect(status().isBadRequest());

    }

    @Test
    void validCancelBookingReturn200() throws Exception {

        BookingDTO bookingDTO = new BookingDTO(validWorkDateString, "12:30",
                "1", "testCustomer", "testEmployee");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)));

        Map<String,String> bookingDetails = new HashMap<>();
        bookingDetails.put("employeeUsername", "testEmployee");
        bookingDetails.put("bookingDate", validWorkDateString);
        bookingDetails.put("customerUsername", "testCustomer");

        this.mockMvc.perform(delete("/api/booking/cancel")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDetails)))
                .andExpect(status().isOk());
    }

    @Test
    void invalidCancelBookingReturn404_employeeNotFound() throws Exception {

        BookingDTO bookingDTO = new BookingDTO(validWorkDateString, "12:30",
                "1", "testCustomer", "testEmployee");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)));

        Map<String,String> bookingDetails = new HashMap<>();
        bookingDetails.put("employeeUsername", "tetEmployee");
        bookingDetails.put("bookingDate", validWorkDateString);
        bookingDetails.put("customerUsername", "testCustomer");

        this.mockMvc.perform(delete("/api/booking/cancel")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDetails)))
                .andExpect(status().isNotFound());
    }

    @Test
    void invalidCancelBookingReturn404_customerNotFound() throws Exception {

        BookingDTO bookingDTO = new BookingDTO(validWorkDateString, "12:30",
                "1", "testCustomer", "testEmployee");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)));

        Map<String,String> bookingDetails = new HashMap<>();
        bookingDetails.put("employeeUsername", "testEmployee");
        bookingDetails.put("bookingDate", validWorkDateString);
        bookingDetails.put("customerUsername", "tetCustomer");

        this.mockMvc.perform(delete("/api/booking/remove/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDetails)))
                .andExpect(status().isNotFound());
    }

    @Test
    void validGetVacantBookingsReturn200() throws Exception {

        this.mockMvc.perform(get("/api/booking/vacantBookings"))
                .andExpect(status().isOk());
    }

    @Test
    void validGetVacantBookingsByServiceIdReturn200() throws Exception {

        this.mockMvc.perform(get("/api/booking/vacantBookings/1"))
                .andExpect(status().isOk());
    }

    @Test
    void invalidGetVacantBookingsByServiceIdReturn404_notFound() throws Exception {

        this.mockMvc.perform(get("/api/booking/vacantBookings/0"))
                .andExpect(status().isNotFound());
    }

    @Test
    void invalidGetVacantBookingsByServiceIdReturn404_invalidServiceId() throws Exception {

        this.mockMvc.perform(get("/api/booking/vacantBookings/one"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void validGetOccupiedBookingsReturn200() throws Exception {

        this.mockMvc.perform(get("/api/booking/occupiedBookings"))
                .andExpect(status().isOk());
    }

    @Test
    void validGetOccupiedBookingsByUsernameReturn200() throws Exception {

        this.mockMvc.perform(get("/api/booking/occupiedBookings/testCustomer"))
                .andExpect(status().isOk());
    }

    @Test
    void invalidGetOccupiedBookingsByUsernameReturn404_notFound() throws Exception {

        this.mockMvc.perform(get("/api/booking/occupiedBookings/tetCustomer"))
                .andExpect(status().isNotFound());
    }

    @Test
    void validGetPastBookingsReturn200() throws Exception {

        this.mockMvc.perform(get("/api/booking/pastBookings"))
                .andExpect(status().isOk());
    }

    @Test
    void validGetPastBookingsByUsernameReturn200() throws Exception {

        this.mockMvc.perform(get("/api/booking/pastBookings/testCustomer"))
                .andExpect(status().isOk());
    }

    @Test
    void validGetPastBookingsByUsernameReturn404_notFound() throws Exception {

        this.mockMvc.perform(get("/api/booking/pastBookings/tetCustomer"))
                .andExpect(status().isNotFound());
    }
}
