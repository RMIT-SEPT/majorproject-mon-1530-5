package com.rmit.bookingAPI.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.bookingAPI.Controller.DTO.EmployeeDTO;
import com.rmit.bookingAPI.Controller.DTO.ShiftDTO;
import org.junit.jupiter.api.AfterEach;
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
import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class ShiftControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private static String validWorkDateString;
    private static String invalidWorkDateString;

    @BeforeAll
    static void setup() {

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
    void setupEach() throws Exception {

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

        Map<String,String> updatedDetails = new HashMap<>();
        updatedDetails.put("username", "testEmployee");
        updatedDetails.put("dayOfWeek", "MONDAY");

        this.mockMvc.perform(post("/api/employee/addAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails)));
    }

    @AfterEach
    void breakdownEach() throws Exception {
        this.mockMvc.perform(delete("/api/employee/remove/testEmployee"));
    }

    @Test
    @DirtiesContext
    void validAddShiftReturn200() throws Exception {

        ShiftDTO shiftDTO = new ShiftDTO("testEmployee",
                validWorkDateString, " 12:30"," 14:30");

        this.mockMvc.perform(post("/api/shift/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(shiftDTO)))
                .andExpect(status().isOk());
//
        Map<String,String> body = new HashMap<>();
        body.put("username", "testEmployee");
        body.put("shiftDate", validWorkDateString);

        this.mockMvc.perform(delete("/api/shift/remove")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)));
    }

    @Test
    @DirtiesContext
    void invalidAddShiftReturn400_existingShift() throws Exception {

        ShiftDTO shiftDTO = new ShiftDTO("testEmployee",
                validWorkDateString, " 12:30"," 14:30");

        this.mockMvc.perform(post("/api/shift/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(shiftDTO)));

        this.mockMvc.perform(post("/api/shift/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(shiftDTO)))
                .andExpect(status().isBadRequest());

        Map<String,String> body = new HashMap<>();
        body.put("username", "testEmployee");
        body.put("shiftDate", validWorkDateString);

        this.mockMvc.perform(delete("/api/shift/remove")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)));
    }

    @Test
    @DirtiesContext
    void invalidAddShiftReturn400_outsideOfAvailability() throws Exception {

        ShiftDTO shiftDTO = new ShiftDTO("testEmployee",
                invalidWorkDateString, " 12:30"," 14:30");

        this.mockMvc.perform(post("/api/shift/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(shiftDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void invalidAddShiftReturn404_invalidUsername() throws Exception {

        ShiftDTO shiftDTO = new ShiftDTO("tesEmployee",
                validWorkDateString, " 12:30"," 14:30");

        this.mockMvc.perform(post("/api/shift/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(shiftDTO)))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    void invalidAddShiftReturn400_invalidDateFormat() throws Exception {

        ShiftDTO shiftDTO = new ShiftDTO("testEmployee",
                invalidWorkDateString, "16:30","18:30");

        this.mockMvc.perform(post("/api/shift/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(shiftDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void invalidAddShiftReturn400_invalidFutureDate() throws Exception {

        ShiftDTO shiftDTO = new ShiftDTO("testEmployee",
                "01-01-2021", "12:30",
                "14:30");

        this.mockMvc.perform(post("/api/shift/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(shiftDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void invalidAddShiftReturn400_invalidPastDate() throws Exception {

        ShiftDTO shiftDTO = new ShiftDTO("testEmployee",
                "01-01-2020", "12:30",
                "14:30");

        this.mockMvc.perform(post("/api/shift/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(shiftDTO)))
                .andExpect(status().isBadRequest());
    }
}
