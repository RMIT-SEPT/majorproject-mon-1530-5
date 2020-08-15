package com.rmit.bookingAPI;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.bookingAPI.Controller.BusinessController;
import com.rmit.bookingAPI.Controller.CustomerDTO;
import com.rmit.bookingAPI.Controller.LoginDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = BusinessController.class)
class BookingApiApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private BusinessController businessController;

	@Test
	public void mySqlServicesTest() {
		/*
			For future implementation
		*/
	}

	@Test
	public void authTest() {
		/*
			For future implementation
		*/
	}

	@Test
	void validCustomerRegisterReturn200() throws Exception {

		CustomerDTO customerDTO = new CustomerDTO("test", "password", "Test Name", "1 Victoria Street", "0412345678");

		mockMvc.perform(post("/api/register", 42L)
				.contentType("application/json")
				.content(objectMapper.writeValueAsString(customerDTO)))
				.andExpect(status().isOk());
	}
	@Test
	void invalidCustomerRegisterReturn400_missingField() throws Exception {

		CustomerDTO customerDTO = new CustomerDTO("test", "password", "", "1 Victoria Street", "0412345678");

		mockMvc.perform(post("/api/register", 42L)
				.contentType("application/json")
				.content(objectMapper.writeValueAsString(customerDTO)))
				.andExpect(status().isBadRequest());
	}
	@Test
	void invalidCustomerRegisterReturn400_existingUsername() throws Exception {

		CustomerDTO customerDTO_1 = new CustomerDTO("test", "password", "Test Name", "1 Victoria Street", "0412345678");
		CustomerDTO customerDTO_2 = new CustomerDTO("test", "password", "Test Name", "1 Victoria Street", "0412345678");

		mockMvc.perform(post("/api/register", 42L)
				.contentType("application/json")
				.content(objectMapper.writeValueAsString(customerDTO_1)));

		mockMvc.perform(post("/api/register", 42L)
				.contentType("application/json")
				.content(objectMapper.writeValueAsString(customerDTO_2)))
				.andExpect(status().isBadRequest());
	}


	@Test
	public void validCustomerLoginReturn200() throws Exception{

		CustomerDTO customerDTO = new CustomerDTO("test", "password", "", "1 Victoria Street", "0412345678");

		mockMvc.perform(post("/api/register", 42L)
				.contentType("application/json")
				.content(objectMapper.writeValueAsString(customerDTO)));

		LoginDTO loginDTO = new LoginDTO("test", "password");

		mockMvc.perform(post("/api/register", 42L)
				.contentType("application/json")
				.content(objectMapper.writeValueAsString(loginDTO)))
				.andExpect(status().isOk());
	}

	@Test
	public void invalidCustomerLoginReturn400_wrongUsername() throws Exception{

		CustomerDTO customerDTO = new CustomerDTO("test", "password", "", "1 Victoria Street", "0412345678");

		mockMvc.perform(post("/api/register", 42L)
				.contentType("application/json")
				.content(objectMapper.writeValueAsString(customerDTO)));

		LoginDTO loginDTO = new LoginDTO("tset", "password");

		mockMvc.perform(post("/api/register", 42L)
				.contentType("application/json")
				.content(objectMapper.writeValueAsString(loginDTO)))
				.andExpect(status().isBadRequest());
	}

	@Test
	public void invalidCustomerLoginReturn400_wrongPassword() throws Exception{

		CustomerDTO customerDTO = new CustomerDTO("test", "password", "", "1 Victoria Street", "0412345678");

		mockMvc.perform(post("/api/register", 42L)
				.contentType("application/json")
				.content(objectMapper.writeValueAsString(customerDTO)));

		LoginDTO loginDTO = new LoginDTO("test", "passwrod");

		mockMvc.perform(post("/api/register", 42L)
				.contentType("application/json")
				.content(objectMapper.writeValueAsString(loginDTO)))
				.andExpect(status().isBadRequest());
	}

	@Test
	public void addDuplicateEmployeeTestFail() {

		/*
			For future implementation
		*/

		//create valid employeeDTO object
		//use it as a parameter for the addEmployee controller method
		//assert that its HTTP status result will be 200 (OK)
		//use the employeeDTO object again as a parameter for the addEmployee controller method
		//assert that its HTTP status result will be 400 (BAD_REQUEST)
	}

	@Test
	public void accessForbiddenPage() {

		/*
			For future implementation
		*/

		//no setup
		//get request from /myinformation
		//receieve 403 forbidden
	}


	//register customer account with identical username to another customer account
	//register customer account with identical username to another employee account
	//register customer account with identical username to the admin account
	//add employee account with identical username to another employee account
	//add employee account with identical username to another customer account
	//add employee account with identical username to the admin account

	//create customer account with missing credentials
	//add employee account with missing credentials
	//add service with missing details

	//roster employee outside of availability
	//roster employee twice in a day

}
