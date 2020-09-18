//package com.rmit.bookingAPI.Security;
//
//import com.rmit.bookingAPI.Model.User;
//import com.rmit.bookingAPI.Repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserDetailsServiceImpl implements UserDetailsService {
//
//    @Autowired
//    UserRepository userRepository;
//
//    public UserDetailsServiceImpl(UserRepository userRepository) {
//        super();
//        this.userRepository = userRepository;
//    }
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = this.userRepository.findByUsername(username);
//        if (null == user) {
//            throw new UsernameNotFoundException("Username: " + username + " not found...");
//        }
//        return new UserDetailsImpl(user, user.getAuthGroup());
//    }
//}
