package com.rmit.bookingAPI.Model;

import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;

@Entity
public class Admin {

    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private String password;

    public Admin (String username, String password) {
        this.username = username;
        this.password = password;
    }
    public Admin() {
    }
}
