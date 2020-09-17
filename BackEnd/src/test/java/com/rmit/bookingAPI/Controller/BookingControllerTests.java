package com.rmit.bookingAPI.Controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.bookingAPI.Controller.DTO.BookingDTO;
import com.rmit.bookingAPI.Controller.DTO.ShiftDTO;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
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
        ShiftDTO shiftDTO = new ShiftDTO("janeDoe",
                validWorkDateString, "12:30", "14:30");

        this.mockMvc.perform(post("/api/shift/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(shiftDTO)));
    }

    @Test
    @DirtiesContext
    void validAddBookingReturn201() throws Exception{

        BookingDTO bookingDTO = new BookingDTO(validWorkDateString, "12:30",
                "4", "billNewer", "janeDoe");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)))
                .andExpect(status().isCreated());
    }

    @Test
    @DirtiesContext
    void invalidAddBookingReturn400_invalidDate() throws Exception{

        BookingDTO bookingDTO = new BookingDTO(invalidWorkDateString, "12:30",
                "4", "billNewer", "janeDoe");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)))
                .andExpect(status().isNotFound());

    }

    @Test
    @DirtiesContext
    void invalidAddBookingReturn400_invalidTime() throws Exception{

        BookingDTO bookingDTO = new BookingDTO(validWorkDateString, "14:30",
                "4", "billNewer", "janeDoe");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)))
                .andExpect(status().isNotFound());

    }

    @Test
    @DirtiesContext
    void invalidAddBookingReturn400_invalidService() throws Exception{

        BookingDTO bookingDTO = new BookingDTO(validWorkDateString, "12:30",
                "0", "billNewer", "janeDoe");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)))
                .andExpect(status().isNotFound());

    }

    @Test
    @DirtiesContext
    void invalidAddBookingReturn400_invalidEmployee() throws Exception{

        BookingDTO bookingDTO = new BookingDTO(validWorkDateString, "12:30",
                "4", "billNewer", "janDoe");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)))
                .andExpect(status().isNotFound());

    }

    @Test
    @DirtiesContext
    void invalidAddBookingReturn400_existingBooking() throws Exception{

        BookingDTO bookingDTO = new BookingDTO(validWorkDateString, "12:30",
                "4", "billNewer", "janeDoe");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)));

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)))
                .andExpect(status().isBadRequest());

    }

    @Test
    @DirtiesContext
    void invalidAddBookingReturn400_concurrentBookingsSameEmployee() throws Exception{

        BookingDTO bookingDTO_1 = new BookingDTO(validWorkDateString, "12:30",
                "4", "billNewer", "janeDoe");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO_1)));

        BookingDTO bookingDTO_2 = new BookingDTO(validWorkDateString, "12:30",
                "4", "billNewer", "janeDoe");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO_2)))
                .andExpect(status().isBadRequest());

    }

    @Test
    @DirtiesContext
    void validRemoveBookingReturn200() throws Exception {

        BookingDTO bookingDTO = new BookingDTO(validWorkDateString, "12:30",
                "4", "billNewer", "janeDoe");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)));

        this.mockMvc.perform(delete("/api/booking/remove/1"))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void invalidRemoveBookingReturn404_notFound() throws Exception {

        BookingDTO bookingDTO = new BookingDTO(validWorkDateString, "12:30",
                "4", "billNewer", "janeDoe");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)));

        this.mockMvc.perform(delete("/api/booking/remove/0"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    void invalidRemoveBookingReturn400_invalidId() throws Exception {

        BookingDTO bookingDTO = new BookingDTO(validWorkDateString, "12:30",
                "4", "billNewer", "janeDoe");

        this.mockMvc.perform(post("/api/booking/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(bookingDTO)));

        this.mockMvc.perform(delete("/api/booking/remove/one"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void validGetVacantBookingsReturn200() throws Exception {

        this.mockMvc.perform(get("/api/booking/vacantBookings"))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void validGetVacantBookingsByServiceIdReturn200() throws Exception {

        this.mockMvc.perform(get("/api/booking/vacantBookings/1"))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void invalidGetVacantBookingsByServiceIdReturn404_notFound() throws Exception {

        this.mockMvc.perform(get("/api/booking/vacantBookings/0"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    void invalidGetVacantBookingsByServiceIdReturn404_invalidServiceId() throws Exception {

        this.mockMvc.perform(get("/api/booking/vacantBookings/one"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void validGetOccupiedBookingsReturn200() throws Exception {

        this.mockMvc.perform(get("/api/booking/occupiedBookings"))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void validGetOccupiedBookingsByUsernameReturn200() throws Exception {

        this.mockMvc.perform(get("/api/booking/occupiedBookings/billNewer"))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void invalidGetOccupiedBookingsByUsernameReturn404_notFound() throws Exception {

        this.mockMvc.perform(get("/api/booking/occupiedBookings/janeDoe"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    void validGetPastBookingsReturn200() throws Exception {

        this.mockMvc.perform(get("/api/booking/pastBookings"))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void validGetPastBookingsByUsernameReturn200() throws Exception {

        this.mockMvc.perform(get("/api/booking/pastBookings/billNewer"))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void validGetPastBookingsByUsernameReturn404_notFound() throws Exception {

        this.mockMvc.perform(get("/api/booking/pastBookings/janeDoe"))
                .andExpect(status().isNotFound());
    }
}
