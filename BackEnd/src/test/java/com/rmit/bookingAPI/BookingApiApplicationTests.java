package com.rmit.bookingAPI;

import com.rmit.bookingAPI.Controller.BusinessController;
import com.rmit.bookingAPI.Controller.CustomerDTO;
import com.rmit.bookingAPI.Service.BusinessService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.validation.BindingResult;


@SpringBootTest
@AutoConfigureMockMvc
class BookingApiApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	BusinessController businessController;

	@Test
	public void mySqlServicesTest() {

		//test connection
	}

	@Test
	public void authTest() {
		//for future security implementation
	}

	@Test
	public void addCustomerTestSuccess() {

		//create valid customerDTO object
		//use it as a parameter for the customerRegister controller method
		//assert that its HTTP status result will be 200 (OK)

//		CustomerDTO testCustomerDTO = new CustomerDTO("daniel","password", "Daniel", "1 Victoria Street", "1234567890");
//		businessController.customerRegister(testCustomerDTO, null);
//		ResponseEntity<CustomerDTO> responseEntity = new ResponseEntity<CustomerDTO>(null);
//		responseEntity.status(HttpStatus.OK);
//
	}

	@Test
	public void loginCustomerTestSuccess() {

		//create valid customerDTO object
		//use it as a parameter for the customerRegister controller method
		//create valid loginDTO object
		//assert that its HTTP status result will be 200 (OK)
	}

	@Test
	public void addDuplicateCustomerTestFail() {

		//create valid customerDTO object
		//use it as a parameter for the customerRegister controller method
		//assert that its HTTP status result will be 200 (OK)
		//use the customerDTO object again as a parameter for the customerRegister controller method
		//assert that its HTTP status result will be 400 (BAD_REQUEST)

	}

	@Test
	public void addDuplicateEmployeeTestFail() {

		//create valid employeeDTO object
		//use it as a parameter for the addEmployee controller method
		//assert that its HTTP status result will be 200 (OK)
		//use the employeeDTO object again as a parameter for the addEmployee controller method
		//assert that its HTTP status result will be 400 (BAD_REQUEST)

	}

	@Test
	public void accessForbiddenPage() {

		//no setup
		//get request from /myinformation
		//receieve 403 forbidden
	}


	//attempt to load unauthorized portal


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
	//

	@Test
	void contextLoads() {
	}

}
