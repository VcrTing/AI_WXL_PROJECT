package com.vcr.auth.security;

import com.vcr.auth.model.XUser;
import com.vcr.auth.service.i.XUserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class XUserDetailsService implements UserDetailsService {

    private final XUserService xUserService;

    public XUserDetailsService(XUserService xUserService) {
        this.xUserService = xUserService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        XUser user = xUserService.getByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("用户不存在: " + username);
        }
        return user;
    }
}