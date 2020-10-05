package com.rmit.bookingAPI.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.bookingAPI.controller.dto.CustomerDTO;
import com.rmit.bookingAPI.controller.dto.EmployeeDTO;
import com.rmit.bookingAPI.controller.dto.LoginDTO;
import org.junit.jupiter.api.AfterEach;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class AuthControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setupEach() throws Exception {

        CustomerDTO customerDTO = new CustomerDTO("testCustomer", "password", "Test Name", "1 Victoria Street", "0412345678");

        this.mockMvc.perform(post("/api/customer/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(customerDTO)));

        EmployeeDTO employeeDTO = new EmployeeDTO("testEmployee", "password", "Test Name");

        this.mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));
    }

    @AfterEach
    void breakdownEach() throws Exception {
        this.mockMvc.perform(delete("/api/customer/remove/testCustomer"));
        this.mockMvc.perform(delete("/api/employee/remove/testEmployee"));
    }

    @Test
    @DirtiesContext
    void validCustomerRegisterReturn201() throws Exception {

        this.mockMvc.perform(delete("/api/customer/remove/testCustomer"));

        CustomerDTO customerDTO = new CustomerDTO("testCustomer", "password", "Test Name", "1 Victoria Street", "0412345678");

        this.mockMvc.perform(post("/api/customer/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(customerDTO)))
                .andExpect(status().isCreated());
    }

    @Test
    @DirtiesContext
    void invalidCustomerRegisterReturn400_missingField() throws Exception {

        CustomerDTO customerDTO = new CustomerDTO("testCustomer", "password", "", "1 Victoria Street", "0412345678");

        this.mockMvc.perform(post("/api/customer/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(customerDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void invalidCustomerRegisterReturn400_existingUsername() throws Exception {

        CustomerDTO customerDTO = new CustomerDTO("testCustomer", "password", "Test Name", "1 Victoria Street", "0412345678");

        this.mockMvc.perform(post("/api/customer/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(customerDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void validCustomerLoginReturn200() throws Exception{

        LoginDTO loginDTO = new LoginDTO("testCustomer", "password");

        this.mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void invalidCustomerLoginReturn400_wrongUsername() throws Exception{

        LoginDTO loginDTO = new LoginDTO("tsetCustomer", "password");

        this.mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void invalidCustomerLoginReturn400_wrongPassword() throws Exception{

        LoginDTO loginDTO = new LoginDTO("testCustomer", "passwrod");

        this.mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void validAddEmployeeReturn201() throws Exception {

        this.mockMvc.perform(delete("/api/employee/remove/testEmployee")); //undoes the @Beforeeach method

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

        mockMvc.perform(post("/api/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void validEmployeeLoginReturn200() throws Exception{

        LoginDTO loginDTO = new LoginDTO("testEmployee", "password");

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void invalidEmployeeLoginReturn400_wrongUsername() throws Exception{

        LoginDTO loginDTO = new LoginDTO("testEpmloyee", "password");

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void invalidEmployeeLoginReturn400_wrongPassword() throws Exception{

        LoginDTO loginDTO = new LoginDTO("testEmployee", "passwrod");

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isBadRequest());
    }
}
