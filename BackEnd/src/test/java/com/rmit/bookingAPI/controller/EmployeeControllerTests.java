package com.rmit.bookingAPI.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.bookingAPI.controller.dto.EmployeeDTO;
import com.rmit.bookingAPI.model.PaidService;
import com.rmit.bookingAPI.security.SecurityConfig;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(roles = {"ADMIN", "EMPLOYEE"})
class EmployeeControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setupEach() throws Exception {

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));
    }

    @AfterEach
    void breakdownEach() throws Exception {
        this.mockMvc.perform(delete("/api/employee/remove/testEmployee"));
    }

    @Test
    void validEmployeeGetReturn200() throws Exception{

        this.mockMvc.perform(get("/api/employee/get/testEmployee"))
                .andExpect(status().isOk());
    }

    @Test
    void invalidEmployeeGetReturn404() throws Exception{

        this.mockMvc.perform(get("/api/employee/get/tsetEmployee"))
                .andExpect(status().isNotFound());
    }

    @Test
    void validEmployeeAddAvailabilityReturn200() throws Exception {

        Map<String,String> updatedDetails = new HashMap<>();
        updatedDetails.put("username", "testEmployee");
        updatedDetails.put("dayOfWeek", "MONDAY");

        this.mockMvc.perform(post("/api/employee/addAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isOk());
    }

    @Test
    void invalidEmployeeAddAvailabilityReturn400_existingDay() throws Exception {

        Map<String,String> updatedDetails = new HashMap<>();
        updatedDetails.put("username", "testEmployee");
        updatedDetails.put("dayOfWeek", "MONDAY");

        this.mockMvc.perform(post("/api/employee/addAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails)));

        this.mockMvc.perform(post("/api/employee/addAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void invalidEmployeeAddAvailabilityReturn400_invalidDay() throws Exception {

        Map<String,String> updatedDetails = new HashMap<>();
        updatedDetails.put("username", "testEmployee");
        updatedDetails.put("dayOfWeek", "MDAY");

        this.mockMvc.perform(post("/api/employee/addAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void invalidEmployeeAddAvailabilityReturn404_invalidEmployee() throws Exception {

        Map<String, String> updatedDetails = new HashMap<>();
        updatedDetails.put("username", "tsetEmployee");
        updatedDetails.put("dayOfWeek", "MONDAY");

        this.mockMvc.perform(post("/api/employee/addAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isNotFound());
    }

    @Test
    void validEmployeeRemoveAvailabilityReturn200() throws Exception {

        Map<String,String> updatedDetails = new HashMap<>();
        updatedDetails.put("username", "testEmployee");
        updatedDetails.put("dayOfWeek", "MONDAY");

        this.mockMvc.perform(post("/api/employee/addAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails)));

        this.mockMvc.perform(post("/api/employee/removeAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isOk());
    }

    @Test
    void invalidEmployeeRemoveAvailabilityReturn404_notFound() throws Exception {

        Map<String,String> updatedDetails1 = new HashMap<>();
        updatedDetails1.put("username", "testEmployee");
        updatedDetails1.put("dayOfWeek", "MONDAY");

        this.mockMvc.perform(post("/api/employee/addAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails1)));

        Map<String,String> updatedDetails2 = new HashMap<>();
        updatedDetails2.put("username", "testEmployee");
        updatedDetails2.put("dayOfWeek", "TUESDAY");

        this.mockMvc.perform(post("/api/employee/removeAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails2)))
                .andExpect(status().isNotFound());
    }

    @Test
    void invalidEmployeeRemoveAvailabilityReturn400_invalidDay() throws Exception {

        Map<String,String> updatedDetails1 = new HashMap<>();
        updatedDetails1.put("username", "testEmployee");
        updatedDetails1.put("dayOfWeek", "MONDAY");

        this.mockMvc.perform(post("/api/employee/addAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails1)));

        Map<String,String> updatedDetails2 = new HashMap<>();
        updatedDetails2.put("username", "testEmployee");
        updatedDetails2.put("dayOfWeek", "TDAY");

        this.mockMvc.perform(post("/api/employee/removeAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails2)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void invalidEmployeeRemoveAvailabilityReturn404_invalidEmployee() throws Exception {

        Map<String,String> updatedDetails1 = new HashMap<>();
        updatedDetails1.put("username", "testEmployee");
        updatedDetails1.put("dayOfWeek", "MONDAY");

        this.mockMvc.perform(post("/api/employee/addAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails1)));

        Map<String,String> updatedDetails2 = new HashMap<>();
        updatedDetails2.put("username", "tsetEmployee");
        updatedDetails2.put("dayOfWeek", "MONDAY");

        this.mockMvc.perform(post("/api/employee/removeAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails2)))
                .andExpect(status().isNotFound());
    }

    @Test
    void validEmployeeAddServiceReturn200() throws Exception {

        PaidService paidService = new PaidService("Test Service", "Test Service Description");

        this.mockMvc.perform(post("/api/service/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(paidService)));

        Map<String,String> body = new HashMap<>();
        body.put("username", "testEmployee");
        body.put("serviceId", "1");

        this.mockMvc.perform(post("/api/employee/addService")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isOk());
    }

    @Test
    void invalidEmployeeAddServiceReturn400_invalidService() throws Exception {

        PaidService paidService = new PaidService("Test Service", "Test Service Description");

        this.mockMvc.perform(post("/api/service/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(paidService)));

        Map<String,String> body = new HashMap<>();
        body.put("username", "testEmployee");
        body.put("serviceId", "0"); //serviceId of 0 is invalid

        this.mockMvc.perform(post("/api/employee/addService")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isNotFound());
    }

    @Test
    void invalidEmployeeAddServiceReturn400_existingService() throws Exception {

        PaidService paidService = new PaidService("Test Service", "Test Service Description");

        this.mockMvc.perform(post("/api/service/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(paidService)));

        Map<String,String> body = new HashMap<>();
        body.put("username", "testEmployee");
        body.put("serviceId", "1");

        this.mockMvc.perform(post("/api/employee/addService")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)));

        this.mockMvc.perform(post("/api/employee/addService")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void validEmployeeUpdatePasswordReturn200() throws Exception {

        Map<String,String> updatedDetails = new HashMap<>();
        updatedDetails.put("username", "testEmployee");
        updatedDetails.put("oldPassword", "password");
        updatedDetails.put("newPassword", "password2");

        this.mockMvc.perform(put("/api/user/updatePassword")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isOk());
    }

    @Test
    void invalidEmployeeUpdatePasswordReturn404_notFound() throws Exception {

        Map<String,String> updatedDetails = new HashMap<>();
        updatedDetails.put("username", "tsetEmployee");
        updatedDetails.put("oldPassword", "password");
        updatedDetails.put("newPassword", "password2");

        this.mockMvc.perform(put("/api/user/updatePassword")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isNotFound());
    }

    @Test
    void invalidEmployeeUpdatePasswordReturn400_wrongPassword() throws Exception {

        Map<String,String> updatedDetails = new HashMap<>();
        updatedDetails.put("username", "testEmployee");
        updatedDetails.put("oldPassword", "password1");
        updatedDetails.put("newPassword", "password2");

        this.mockMvc.perform(put("/api/user/updatePassword")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isBadRequest());
    }
}

