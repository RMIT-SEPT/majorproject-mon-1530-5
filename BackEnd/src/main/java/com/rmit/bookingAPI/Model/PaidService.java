package com.rmit.bookingAPI.Model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class PaidService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;

    public PaidService(String name, String description) {
        this.name = name;
        this.description = description;
    }
    public PaidService() {
    }
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
