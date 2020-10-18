package com.rmit.bookingAPI;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.bookingAPI.controller.dto.CustomerDTO;
import com.rmit.bookingAPI.controller.dto.EmployeeDTO;
import com.rmit.bookingAPI.controller.dto.LoginDTO;
import com.rmit.bookingAPI.model.CustomerDetails;
import com.rmit.bookingAPI.model.RoleEnum;
import com.rmit.bookingAPI.model.User;
import com.rmit.bookingAPI.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class SecurityTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    private String adminJwtToken;
    private String employeeJwtToken;
    private String customerJwtToken;

    @BeforeEach
    void setupEach() throws Exception {

        JacksonJsonParser jsonParser = new JacksonJsonParser();

        User testAdmin = new User("testAdmin", bCryptPasswordEncoder.encode("password"), RoleEnum.ROLE_ADMIN);
        userRepository.save(testAdmin);
        User testEmployee = new User("testEmployee", bCryptPasswordEncoder.encode("password"), RoleEnum.ROLE_EMPLOYEE);
        userRepository.save(testEmployee);
        User testCustomer = new User("testCustomer", bCryptPasswordEncoder.encode("password"), RoleEnum.ROLE_CUSTOMER);
        userRepository.save(testCustomer);

        LoginDTO loginDTOAdmin = new LoginDTO("testAdmin", "password");
        ResultActions adminResult =
                this.mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDTOAdmin)));

        String adminResultString = adminResult.andReturn().getResponse().getContentAsString();
        adminJwtToken = jsonParser.parseMap(adminResultString).get("jwt").toString();

        LoginDTO loginDTOEmployee = new LoginDTO("testEmployee", "password");
        ResultActions employeeResult =
                this.mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDTOEmployee)));

        String employeeResultString = employeeResult.andReturn().getResponse().getContentAsString();
        employeeJwtToken = jsonParser.parseMap(employeeResultString).get("jwt").toString();

        LoginDTO loginDTOCustomer = new LoginDTO("testCustomer", "password");
        ResultActions customerResult =
            this.mockMvc.perform(post("/api/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(loginDTOCustomer)));

        String customerResultString = customerResult.andReturn().getResponse().getContentAsString();
        customerJwtToken = jsonParser.parseMap(customerResultString).get("jwt").toString();
    }

    @AfterEach
    void breakdownEach() throws Exception{
        userRepository.delete(userRepository.findByUsername("testAdmin"));
        userRepository.delete(userRepository.findByUsername("testEmployee"));
        userRepository.delete(userRepository.findByUsername("testCustomer"));
    }

    @Test
    void authorizedAdminAccessReturn200() throws Exception {

        Map<String, String> updatedDetails = new HashMap<>();
        updatedDetails.put("username", "testAdmin");
        updatedDetails.put("oldPassword", "password");
        updatedDetails.put("newPassword", "password2");

        this.mockMvc.perform(put("/api/user/updatePassword")
                .header("Authorization", adminJwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isOk());
    }

    @Test
    void forbiddenAdminAccessReturn403_forbidden() throws Exception {

        CustomerDetails customerDetails = new CustomerDetails("testCustomer", "Test Name", "1 Victoria Street", "0412121212");

        this.mockMvc.perform(put("/api/customer/updateDetails/testCustomer")
                .header("Authorization", adminJwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(customerDetails)))
                .andExpect(status().isForbidden());
    }

    @Test
    void authorizedEmployeeAccessReturn200() throws Exception {

        Map<String,String> updatedDetails = new HashMap<>();
        updatedDetails.put("username", "testEmployee");
        updatedDetails.put("oldPassword", "password");
        updatedDetails.put("newPassword", "password2");

        this.mockMvc.perform(put("/api/user/updatePassword")
                .header("Authorization", employeeJwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isOk());
    }

    @Test
    void forbiddenEmployeeAccessReturn403_forbidden() throws Exception {

        this.mockMvc.perform(delete("/api/employee/remove/testEmployee")
                .header("Authorization", employeeJwtToken))
                .andExpect(status().isForbidden());
    }

    @Test
    void authorizedCustomerAccessReturn200() throws Exception {

        Map<String,String> updatedDetails = new HashMap<>();
        updatedDetails.put("username", "testCustomer");
        updatedDetails.put("oldPassword", "password");
        updatedDetails.put("newPassword", "password2");

        this.mockMvc.perform(put("/api/user/updatePassword")
                .header("Authorization", customerJwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isOk());
    }

    @Test
    void forbiddenCustomerAccessReturn403_forbidden() throws Exception {

        this.mockMvc.perform(delete("/api/customer/remove/testCustomer")
                .header("Authorization", customerJwtToken))
                .andExpect(status().isForbidden());
    }

    @Test
    void unauthorizedUserAccessReturn401_unauthorized() throws Exception {

        this.mockMvc.perform(delete("/api/customer/remove/testCustomer"))
                .andExpect(status().isUnauthorized());
    }
}
