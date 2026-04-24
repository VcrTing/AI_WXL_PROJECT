package com.vcr.auth.controller;

import com.alibaba.druid.pool.DruidDataSource;
import com.baomidou.dynamic.datasource.toolkit.DynamicDataSourceContextHolder;
import com.vcr.auth.model.XUser;
import com.vcr.auth.model.param.AuthLoginParam;
import com.vcr.auth.security.JwtUtils;
import com.vcr.framework.data.DSMaster;
import com.vcr.framework.data.MyDynamicRoutingDataSource;
import com.vcr.framework.result.ApiResult;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthTestController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtils jwtUtils;

    // ⭐ 新增 GET 方式登录，方便浏览器直接访问测试
    @DSMaster
    @GetMapping("/login/test")
    public ApiResult<Map<String, Object>> loginByGet(@Valid AuthLoginParam param) {
        // 校验通过后直接使用 param 对象
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(param.getUsername(), param.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        XUser user = (XUser) authentication.getPrincipal();
        String token = jwtUtils.generateToken(user.getUsername());
        //
        Map<String, Object> data = new HashMap<>();
        data.put("token", token);
        data.put("username", user.getUsername());
        data.put("realname", user.getRealname());
        data.put("avatar", user.getAvatar());
        //
        return ApiResult.success("登录成功", data);
    }



    @Autowired
    private List<DruidDataSource> dataSources;

    @Autowired
    private DataSource dataSource;
    @DSMaster
    @GetMapping("/test/db")
    public String testDb() {
        try (Connection conn = dataSource.getConnection()) {
            return "✅ 数据库连接成功！URL: " + conn.getMetaData().getURL();
        } catch (Exception e) {
            return "❌ 连接失败：" + e.getMessage();
        }
    }
}
