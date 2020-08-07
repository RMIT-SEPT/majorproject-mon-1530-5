package com.rmit.bookingAPI.Repository;

import com.rmit.bookingAPI.Model.Admin;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends CrudRepository<Admin, Long> {
    Admin findByUsername(String username);
}
