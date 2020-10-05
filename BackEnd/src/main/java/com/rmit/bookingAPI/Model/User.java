package com.rmit.bookingAPI.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/*
* User Entity class design reasoning:
*
* As specified in the assignment spec, there are three types of user types that should have access to the application;
*   Customers, Employees and an Admin.
* Originally my design was to split all three up into their own entity classes which provided their own functionality.
* After doing some research on JWT and security for Spring, a perhaps better way to implement different user types of
* through 'roles' which I have implemented via the 'authGroup' parameter.
* This gives the front end clear distinction between user types and allows all users to sign in through the same portal,
* but receive different landing pages.
* For further user information the respective CustomerDetails and EmployeeDetails entity classes are provided, each
* with their own Id and identical username corresponding to their separate User entity.
* This design choice means the backend is able to send Customer and Employee information exclusively to the front end
* without having to attach passwords.
* */

@Entity
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String username;
    private String password;
    private RoleEnum role;

    public User(String username, String password, RoleEnum role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public RoleEnum getRole() {
        return role;
    }

    public void setRoles(RoleEnum role) {
        this.role = role;
    }
}
