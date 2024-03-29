package com.rmit.bookingAPI.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.bookingAPI.model.PaidService;
import com.rmit.bookingAPI.service.PaidServiceService;
import org.junit.jupiter.api.AfterEach;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(roles = {"ADMIN"})
class PaidServiceTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PaidServiceService paidServiceService;

    @BeforeEach
    void setupEach() throws Exception {

        PaidService paidService = new PaidService("Test Service", "Test Service Description");

        this.mockMvc.perform(post("/api/service/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(paidService)));
    }

    @AfterEach
    void breakdownEach() throws Exception {

        Long serviceId = paidServiceService.findPaidServiceByName("Test Service").getId();
        this.mockMvc.perform(delete("/api/service/remove/" + Long.toString(serviceId)));
    }

    @Test
    void validAddServiceReturn201() throws Exception {

        breakdownEach();

        PaidService paidService = new PaidService("Test Service", "Test Service Description");

        this.mockMvc.perform(post("/api/service/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(paidService)))
                .andExpect(status().isCreated());
    }

    @Test
    void invalidAddServiceReturn400_missingField() throws Exception {

        PaidService paidService = new PaidService("", "Test Service Description");

        this.mockMvc.perform(post("/api/service/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(paidService)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void invalidAddServiceReturn400_existingName() throws Exception {

        PaidService paidService = new PaidService("Test Service", "Test Service Description");

        this.mockMvc.perform(post("/api/service/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(paidService)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void validGetServiceReturn200() throws Exception {

        Long serviceId = paidServiceService.findPaidServiceByName("Test Service").getId();

        this.mockMvc.perform(get("/api/service/get/" + Long.toString(serviceId)))
                .andExpect(status().isOk());
    }

    @Test
    void invalidGetServiceReturn404_notFound() throws Exception {

        this.mockMvc.perform(get("/api/service/get/0")) // 0 will always be an invalid serviceId
                .andExpect(status().isNotFound());
    }

    @Test
    void invalidGetServiceReturn400_invalidServiceId() throws Exception {

        this.mockMvc.perform(get("/api/service/get/zero"))
                .andExpect(status().isBadRequest());
    }

}
