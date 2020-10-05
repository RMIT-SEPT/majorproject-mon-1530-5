package com.rmit.bookingAPI.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.bookingAPI.controller.dto.CustomerDTO;
import com.rmit.bookingAPI.controller.dto.LoginDTO;
import com.rmit.bookingAPI.model.CustomerDetails;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class CustomerControllerTests {

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
	}

	@AfterEach
	void breakdownEach() throws Exception {
		this.mockMvc.perform(delete("/api/customer/remove/testCustomer"));
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
				.andExpect(status().isNotFound());
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
	void validCustomerGetReturn200() throws Exception{

		this.mockMvc.perform(get("/api/customer/get/testCustomer"))
				.andExpect(status().isOk());
	}

	@Test
	@DirtiesContext
	void invalidCustomerGetReturn404() throws Exception{

		this.mockMvc.perform(get("/api/customer/get/tsetCustomer"))
				.andExpect(status().isNotFound());
	}

	@Test
	@DirtiesContext
	void validCustomerUpdateReturn200() throws Exception{

		CustomerDetails customerDetails = new CustomerDetails("testCustomer", "Test Name", "1 Victoria Street", "0412121212");

		this.mockMvc.perform(put("/api/customer/updateDetails/testCustomer")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(customerDetails)))
				.andExpect(status().isOk());
	}

	@Test
	@DirtiesContext
	void invalidCustomerUpdateReturn404_notFound() throws Exception{

		CustomerDetails customerDetails = new CustomerDetails("tsetCustomer", "Test Name", "1 Victoria Street", "0412121212");

		this.mockMvc.perform(put("/api/customer/updateDetails/tsetCustomer")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(customerDetails)))
				.andExpect(status().isNotFound());
	}
}
