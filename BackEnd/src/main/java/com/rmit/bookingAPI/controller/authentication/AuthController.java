package com.rmit.bookingAPI.controller.authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.bookingAPI.controller.dto.LoginDTO;
import com.rmit.bookingAPI.model.User;
import com.rmit.bookingAPI.repository.UserRepository;
import com.rmit.bookingAPI.security.jwt.JWTResponsePayload;
import com.rmit.bookingAPI.security.jwt.JWTUtils;
import com.rmit.bookingAPI.security.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static com.rmit.bookingAPI.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Connection support for ReactJs Frontend requests
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder bCryptPasswordEncoder;

    @Autowired
    JWTUtils jwtUtils;

    @Autowired
    ObjectMapper objectMapper;

    @PostMapping(value = "/login")
    public ResponseEntity<?> userLogin(@RequestBody LoginDTO loginDTO, BindingResult result) throws Exception{
        if (result.hasErrors()) {
            return new ResponseEntity<String>("Invalid form data", HttpStatus.BAD_REQUEST);
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtils.generate(authentication);
        JWTResponsePayload jwtResponsePayload = new JWTResponsePayload(
                TOKEN_PREFIX + jwt,
                loginDTO.getUsername(),
                userRepository.findByUsername(loginDTO.getUsername()).getRole()
        );

        return new ResponseEntity<JWTResponsePayload>(jwtResponsePayload, HttpStatus.OK);
    }
}
