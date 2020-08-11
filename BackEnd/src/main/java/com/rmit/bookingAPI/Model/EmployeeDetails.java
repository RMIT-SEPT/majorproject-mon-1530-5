package com.rmit.bookingAPI.Model;

import javax.persistence.*;
import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

@Entity
public class EmployeeDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String username;
    private String name;
    @ElementCollection
    private List<DayOfWeek> availability;
    @ElementCollection
    private List<Long> serviceIds;

    public EmployeeDetails(String username, String name) {
        this.username = username;
        this.name = name;
    }
    public EmployeeDetails() {
    }

    public Long getId() {
        return id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public List<DayOfWeek> getAvailability() {
        return availability;
    }
    public void addAvailability(DayOfWeek dayOfWeek) {
        if (!availability.contains(dayOfWeek)) {
            availability.add(dayOfWeek);
        }
    }
    public void removeAvailability(DayOfWeek dayOfWeek) {
        if (availability.contains(dayOfWeek)) {
            availability.remove(dayOfWeek);
        }
    }
    public List<Long> getServices() {
        return serviceIds;
    }
    public void addService(Long service) {
        if (!serviceIds.contains(service)) {
            serviceIds.add(service);
        }
    }
    public void removeAvailability(Long service) {
        if (serviceIds.contains(service)) {
            serviceIds.remove(service);
        }
    }
}
