package com.rmit.bookingAPI.Repository;

import com.rmit.bookingAPI.Model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
}
