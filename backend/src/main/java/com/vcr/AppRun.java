package com.vcr;


import com.baomidou.dynamic.datasource.spring.boot.autoconfigure.DynamicDataSourceAutoConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import com.alibaba.druid.spring.boot3.autoconfigure.DruidDataSourceAutoConfigure;

// 在启动类上排除自动配置
@SpringBootApplication(exclude = {
        DruidDataSourceAutoConfigure.class,   // 排除 Druid 自动配置
        DataSourceAutoConfiguration.class,      // 排除 Spring Boot 默认的 JDBC 自动配置
        DynamicDataSourceAutoConfiguration.class,
}, scanBasePackages = { "com.vcr" })
public class AppRun {

    public static void main(String[] args) {
        SpringApplication.run(AppRun.class, args);
    }
}
