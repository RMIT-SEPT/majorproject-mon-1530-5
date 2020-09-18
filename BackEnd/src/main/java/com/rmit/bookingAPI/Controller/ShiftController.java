package com.rmit.bookingAPI.Controller;

import com.rmit.bookingAPI.Controller.DTO.EmployeeDTO;
import com.rmit.bookingAPI.Controller.DTO.ShiftDTO;
import com.rmit.bookingAPI.Model.Booking;
import com.rmit.bookingAPI.Model.EmployeeDetails;
import com.rmit.bookingAPI.Model.Shift;
import com.rmit.bookingAPI.Model.User;
import com.rmit.bookingAPI.Service.BookingService;
import com.rmit.bookingAPI.Service.ShiftService;
import com.rmit.bookingAPI.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Connection support for ReactJs Frontend requests
public class ShiftController {

    @Autowired
    ShiftService shiftService;

    @Autowired
    UserService userService;

    @Autowired
    BookingService bookingService;


    @PostMapping(value = "/shift/add")
    public ResponseEntity<String> addShift(@Valid @RequestBody ShiftDTO shiftDTO, BindingResult result) throws Exception{
        if (result.hasErrors()) {
            return new ResponseEntity<String>("Invalid form data", HttpStatus.BAD_REQUEST);
        }

        Calendar tempCal = Calendar.getInstance();
        try {
            //Shift object constructed from the DTO received
            Shift newShift = shiftDTO.returnShiftObject();

            if (newShift.getShiftDate().before(tempCal.getTime())) {
                return new ResponseEntity<String>("Cannot add a shift before today's date", HttpStatus.BAD_REQUEST);
            }

            //shift cannot be added further than 1 month in the future
            tempCal.add(Calendar.MONTH, 1);
            if (newShift.getShiftDate().after(tempCal.getTime())) {
                return new ResponseEntity<String>("Cannot add shift further than 1 month in the future", HttpStatus.BAD_REQUEST);
            }
            if (null == userService.findEmployeeDetailsByUsername(newShift.getEmployeeUsername())) {
                return new ResponseEntity<String>("That employee does not exist", HttpStatus.NOT_FOUND);
            }
            for (Shift tempShift : shiftService.getAllShifts()) {
                if (tempShift.getEmployeeUsername().equals(newShift.getEmployeeUsername())) {
                    if (tempShift.getShiftDate().compareTo(newShift.getShiftDate()) == 0) {
                        return new ResponseEntity<String>("That shift already exists", HttpStatus.BAD_REQUEST);
                    }
                }
            }
            if (!shiftService.isShiftWorkable(newShift, userService.getEmployeeAvailability(newShift.getEmployeeUsername()))) {
                return new ResponseEntity<String>("Shift is outside of employee availability", HttpStatus.BAD_REQUEST);
            }
            shiftService.addOrUpdateShift(newShift);

            /*
             * When the shift gets successfully added, the consequent vacant bookings are added for the services that the
             * employee can provide. For example, if the employee can provide 3 different services, then 3 vacant bookings
             * are added to the system for a customer to book. Once one of those bookings is booked, the other vacant
             * bookings are removed as the employee can no longer provide them as they now have the newly booked service to
             * provide.
             *
             * This section will need to be modified if shifts become longer than 2 hours (the same length as 1 booking).
             * */
            EmployeeDetails tempEmployee = userService.findEmployeeDetailsByUsername(newShift.getEmployeeUsername());
            for (Long serviceId : tempEmployee.getServices()) {
                bookingService.addOrUpdateBooking(
                        new Booking(
                                newShift.getShiftDate(),
                                newShift.getStartTime(),
                                serviceId,
                                newShift.getEmployeeUsername()
                        )
                );
            }
            return new ResponseEntity<String>("Shift and consequent bookings added!", HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<String>("Invalid date format", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value="/shift/all")
    public ResponseEntity<List<Shift>> getAllShifts() {
        return new ResponseEntity<List<Shift>>(shiftService.getAllShifts(), HttpStatus.OK);
    }

    @GetMapping(value = "/shift/findByUsername/{username}")
    public ResponseEntity<?> getShiftsByUsername(@PathVariable("username") String username) {
        if (null != userService.findEmployeeDetailsByUsername(username)) {
            return new ResponseEntity<List<Shift>>(shiftService.getShiftsByUsername(username), HttpStatus.OK);
        }
        return new ResponseEntity<String>("An employee with that username doesn't exist", HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "shift/getAvailableEmployees/{date}")
    public ResponseEntity<?> getAvailableEmployeesOnDay(@PathVariable("date") String date) throws Exception{

        List<Map<String,String>> availableEmployees = new ArrayList<Map<String,String>>();

        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
            Date tempDate = new Date(dateFormat.parse(date).getTime());
            DayOfWeek dateDayOfWeek = shiftService.returnDayOfWeekFromDate(tempDate);

            for (EmployeeDetails tempEmployeeDetails : userService.getAllEmployeeDetails()) {
                for (DayOfWeek dow : tempEmployeeDetails.getAvailability()) {
                    if (dow.equals(dateDayOfWeek)) {
                        Map<String, String> tempEmployee = new HashMap<String, String>();
                        tempEmployee.put("username", tempEmployeeDetails.getUsername());
                        tempEmployee.put("name", tempEmployeeDetails.getName());
                        availableEmployees.add(tempEmployee);
                    }
                }
            }

            for (Shift tempShift : shiftService.getShiftsByDate(tempDate)) {
                availableEmployees.removeIf(employee -> tempShift.getEmployeeUsername().equals(employee.get("username")));
            }

            return new ResponseEntity<List<Map<String,String>>>(availableEmployees, HttpStatus.OK);

        }
        catch (Exception e) {
            return new ResponseEntity<String>("Invalid date", HttpStatus.BAD_REQUEST);
        }
    }
}
