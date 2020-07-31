package com.rmit.bookingAPI.Model;

import org.springframework.data.annotation.Id;

import javax.persistence.GeneratedValue;
import java.time.DayOfWeek;
import java.util.ArrayList;

public class Employee{

    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private String password;
    private String name;
    private ArrayList<DayOfWeek> availability;
    private ArrayList<Service> services;

    public Employee(String username, String password, String name) {
        this.username = username;
        this.password = password;
        this.name = name;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public ArrayList<DayOfWeek> getAvailability() {
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
    public ArrayList<Service> getServices() {
        return services;
    }
    public void addService(Service service) {
        if (!services.contains(service)) {
            services.add(service);
        }
    }
    public void removeAvailability(Service service) {
        if (services.contains(service)) {
            services.remove(service);
        }
    }
}
