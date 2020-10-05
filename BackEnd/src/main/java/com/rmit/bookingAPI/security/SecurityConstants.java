package com.rmit.bookingAPI.security;

public class SecurityConstants {

    public static final String SECRET = "group5";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final int EXPIRATION_TIME = 5 * 60 * 1000; //5 Minutes
}
