package com.rmit.bookingAPI.controller;

import com.rmit.bookingAPI.model.PaidService;
import com.rmit.bookingAPI.service.PaidServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Connection support for ReactJs Frontend requests
public class PaidServiceController {

    @Autowired
    PaidServiceService paidServiceService;

    @PostMapping(value = "/service/add")
    public ResponseEntity<?> addService(@Valid @RequestBody PaidService paidService, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<String>("Invalid form data", HttpStatus.BAD_REQUEST);
        }
        if (null != paidServiceService.findPaidServiceByName(paidService.getName())) {
            return new ResponseEntity<String>("Service already exists", HttpStatus.BAD_REQUEST);
        }
        paidServiceService.addOrUpdatePaidService(paidService);
        return new ResponseEntity<PaidService>(paidServiceService.findPaidServiceByName(paidService.getName()), HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/service/remove/{serviceId}")
    public ResponseEntity<String> removeService(@PathVariable("serviceId") String serviceIdString) {
        try{
            Long serviceId = Long.parseLong(serviceIdString);
            if (null == paidServiceService.findPaidServiceById(serviceId)) {
                return new ResponseEntity<String>("Service not found", HttpStatus.NOT_FOUND);
            }
            paidServiceService.removePaidService(serviceId);
            return new ResponseEntity<String>("Service " + serviceIdString + " removed", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("Invalid serviceId", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value="/service/all")
    public ResponseEntity<List<PaidService>> getAllServices() {
        return new ResponseEntity<List<PaidService>>(paidServiceService.getAllPaidServices(), HttpStatus.OK);
    }

    @GetMapping(value="/service/get/{serviceId}")
    public ResponseEntity<?> getServiceById(@PathVariable("serviceId") String serviceIdString) {

        /* Spring boot didn't like it when I asked directly for a 'Long' value here ^^.
        * This is why I use a String which I later parse to a Long.
        * */
        try {
            Long serviceId = Long.parseLong(serviceIdString);
            if (null == paidServiceService.findPaidServiceById(serviceId)) {
                return new ResponseEntity<String>("A service with that serviceId doesn't exist", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<PaidService>(paidServiceService.findPaidServiceById(serviceId), HttpStatus.OK);
        } catch (NumberFormatException e) {
            return new ResponseEntity<String>("A numerical serviceId value must be given", HttpStatus.BAD_REQUEST);
        }
    }
}
