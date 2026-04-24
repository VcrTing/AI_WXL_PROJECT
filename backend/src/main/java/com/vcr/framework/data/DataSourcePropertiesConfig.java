package com.vcr.framework.data;

import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSourcePropertiesConfig {

    @Bean
    public DataSourceProperties dataSourceProperties() {
        // 提供一个空的 DataSourceProperties Bean 来满足注入要求
        return new DataSourceProperties();
    }
}