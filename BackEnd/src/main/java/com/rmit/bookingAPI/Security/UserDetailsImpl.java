//package com.rmit.bookingAPI.Security;
//
//import com.rmit.bookingAPI.Model.User;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.Collection;
//import java.util.Collections;
//import java.util.HashSet;
//import java.util.Set;
//
//public class UserDetailsImpl implements UserDetails {
//
//    private User user;
//    private String authGroup;
//
//    public UserDetailsImpl(User user, String authGroup) {
//        super();
//        this.user = user;
//        this.authGroup = authGroup;
//    }
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        if (null == authGroup) {
//            return Collections.emptySet();
//        }
//        Set<SimpleGrantedAuthority> grantedAuthority = new HashSet<>();
//        grantedAuthority.add(new SimpleGrantedAuthority(authGroup));
//        return grantedAuthority;
//    }
//    @Override
//    public String getPassword() {
//        return this.user.getPassword();
//    }
//    @Override
//    public String getUsername() {
//        return this.user.getUsername();
//    }
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
//}
