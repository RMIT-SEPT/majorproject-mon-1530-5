package com.rmit.myapi.Entity;

import java.time.DayOfWeek;
import java.util.ArrayList;

public class Employee extends User{

    private String name;
    private ArrayList<DayOfWeek> availability;
    private ArrayList<Service> services;

    public Employee(String username, String password, String name) {
        super.setUsername(username);
        super.setPassword(password);
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
