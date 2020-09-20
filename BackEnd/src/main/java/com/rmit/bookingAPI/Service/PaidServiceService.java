package com.rmit.bookingAPI.Service;

import com.rmit.bookingAPI.Model.PaidService;
import com.rmit.bookingAPI.Repository.PaidServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

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
