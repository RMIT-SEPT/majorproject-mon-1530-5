package com.rmit.bookingAPI.service;

import com.rmit.bookingAPI.model.PaidService;
import com.rmit.bookingAPI.repository.PaidServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/*
@author Daniel Bound
*/
@Service
public class PaidServiceService {

    @Autowired
    private PaidServiceRepository paidServiceRepository;

    public PaidService findPaidServiceById(Long serviceId) {

        for (PaidService tempService : getAllPaidServices()) {
            if (tempService.getId().equals(serviceId)) {
                return tempService;
            }
        }
        return null;

    }

    public PaidService findPaidServiceByName(String name) {
        return paidServiceRepository.findPaidServiceByName(name);
    }

    public List<PaidService> getAllPaidServices() {
        List<PaidService> paidServices = new ArrayList<PaidService>();
        paidServiceRepository.findAll().forEach(paidServices::add);
        return paidServices;
    }

    public void addOrUpdatePaidService(PaidService paidService) {
        paidServiceRepository.save(paidService);
    }

    public void removePaidService(Long serviceId) {
        paidServiceRepository.delete(findPaidServiceById(serviceId));
    }
}
