package com.rmit.bookingAPI.Repository;

import com.rmit.bookingAPI.Model.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {
}
