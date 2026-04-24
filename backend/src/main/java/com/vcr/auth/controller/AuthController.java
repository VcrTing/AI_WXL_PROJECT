package com.vcr.auth.controller;
import com.vcr.auth.model.XUser;
import com.vcr.auth.model.param.AuthLoginParam;
import com.vcr.auth.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody AuthLoginParam request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        XUser user = (XUser) authentication.getPrincipal();
        String token = jwtUtils.generateToken(user.getUsername());

        Map<String, Object> response = new HashMap<>();
        response.put("jwt", token);
        user.setPassword(null);
        response.put("user", user);
        return response;
    }

    @GetMapping("/info")
    public XUser getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof XUser) {
            return (XUser) principal;
        }
        return null;
    }

}