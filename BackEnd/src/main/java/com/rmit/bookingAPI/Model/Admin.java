package com.rmit.bookingAPI.Model;

import javax.persistence.*;

@Entity
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
