package com.rmit.bookingAPI.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.bookingAPI.Controller.DTO.EmployeeDTO;
import com.rmit.bookingAPI.Controller.DTO.LoginDTO;
import com.rmit.bookingAPI.Model.PaidService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
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
class EmployeeTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    @DirtiesContext
    void validAddEmployeeReturn201() throws Exception {

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)))
                .andExpect(status().isCreated());
    }

    @Test
    @DirtiesContext
    void invalidAddEmployeeReturn400_missingField() throws Exception {

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)))
                .andExpect(status().isBadRequest());
    }
    @Test
    @DirtiesContext
    void invalidAddEmployeeReturn400_existingUsername() throws Exception {

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

        mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void validEmployeeLoginReturn200() throws Exception{

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

        LoginDTO loginDTO = new LoginDTO("testEmployee", "password");

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void invalidEmployeeLoginReturn400_wrongUsername() throws Exception{

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

        LoginDTO loginDTO = new LoginDTO("testEpmloyee", "password");

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    void invalidEmployeeLoginReturn400_wrongPassword() throws Exception{

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

        LoginDTO loginDTO = new LoginDTO("testEmployee", "passwrod");

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void validEmployeeGetReturn200() throws Exception{

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

        this.mockMvc.perform(get("/api/employee/get/testEmployee"))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void invalidEmployeeGetReturn404() throws Exception{

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

        this.mockMvc.perform(get("/api/employee/get/tsetEmployee"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    void validEmployeeAddAvailabilityReturn200() throws Exception {

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

        Map<String,String> updatedDetails = new HashMap<>();
        updatedDetails.put("username", "testEmployee");
        updatedDetails.put("dayOfWeek", "MONDAY");

        this.mockMvc.perform(post("/api/employee/addAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void invalidEmployeeAddAvailabilityReturn400_existingDay() throws Exception {

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

        this.mockMvc.perform(post("/api/employee/addAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void invalidEmployeeAddAvailabilityReturn400_invalidDay() throws Exception {

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

        Map<String,String> updatedDetails = new HashMap<>();
        updatedDetails.put("username", "testEmployee");
        updatedDetails.put("dayOfWeek", "MDAY");

        this.mockMvc.perform(post("/api/employee/addAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void invalidEmployeeAddAvailabilityReturn404_invalidEmployee() throws Exception {

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

        Map<String,String> updatedDetails = new HashMap<>();
        updatedDetails.put("username", "tsetEmployee");
        updatedDetails.put("dayOfWeek", "MONDAY");

        this.mockMvc.perform(post("/api/employee/addAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    void validEmployeeRemoveAvailabilityReturn200() throws Exception {

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

        this.mockMvc.perform(post("/api/employee/removeAvailability")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void invalidEmployeeRemoveAvailabilityReturn404_notFound() throws Exception {

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

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
    @DirtiesContext
    void invalidEmployeeRemoveAvailabilityReturn400_invalidDay() throws Exception {

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

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
    @DirtiesContext
    void invalidEmployeeRemoveAvailabilityReturn404_invalidEmployee() throws Exception {

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

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
    @DirtiesContext
    void validEmployeeAddServiceReturn200() throws Exception {

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

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
    @DirtiesContext
    void invalidEmployeeAddServiceReturn400_invalidService() throws Exception {

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

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
    @DirtiesContext
    void invalidEmployeeAddServiceReturn400_existingService() throws Exception {

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

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
    @DirtiesContext
    void validEmployeeUpdatePasswordReturn200() throws Exception {

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

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
    @DirtiesContext
    void invalidEmployeeUpdatePasswordReturn404_notFound() throws Exception {

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

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
    @DirtiesContext
    void invalidEmployeeUpdatePasswordReturn400_wrongPassword() throws Exception {

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

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

