package com.vcr.auth;

public interface AuthDefined {
    String TABLE_X_USER = "sys_user";

    Long TOKEN_EXPIRE_TIME = 60 * 60 * 24 * 1000L;

    String[] ROUTER = {
        "/procedure/testHardcoded",
        "/auth/**",
        "/public/**",           // 示例：其他公开资源
        "/swagger-ui/**",       // 示例：API 文档
        "/v3/api-docs/**"       // 示例：OpenAPI 文档
    };
}
