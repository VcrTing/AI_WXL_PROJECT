package com.vcr.framework.data;

import com.alibaba.druid.pool.DruidDataSource;
import com.vcr.framework.define.DSDefined;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

public class DataSourceConfig {

    @Bean
    @ConfigurationProperties("spring.datasource." + DSDefined.MASTER)
    public DataSource masterDataSource() {
        return new DruidDataSource();
    }

    @Bean
    @ConfigurationProperties("spring.datasource." + DSDefined.SOURCE1)
    public DataSource source1DataSource() {
        return new DruidDataSource();
    }

    @Bean
    @Primary
    public DataSource dynamicDataSource() {
        MyDynamicRoutingDataSource dynamicDataSource = new MyDynamicRoutingDataSource();
        dynamicDataSource.setDefaultTargetDataSource(masterDataSource());
        //
        Map<Object, Object> targetDataSources = new HashMap<>();
        targetDataSources.put(DSDefined.MASTER, masterDataSource());
        targetDataSources.put(DSDefined.SOURCE1, source1DataSource());
        dynamicDataSource.setTargetDataSources(targetDataSources);
        //
        return dynamicDataSource;
    }
}