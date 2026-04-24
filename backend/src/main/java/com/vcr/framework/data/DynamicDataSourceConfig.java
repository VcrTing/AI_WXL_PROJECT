package com.vcr.framework.data;

import com.alibaba.druid.pool.DruidDataSource;
import com.vcr.framework.define.DSDefined;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class DynamicDataSourceConfig {

    private static final String FOLDER = "spring.datasource.dynamic.datasource";

    // 引用常量接口
    private static final String MASTER = DSDefined.MASTER;
    private static final String SOURCE1 = DSDefined.SOURCE1;


    // ========== Master 数据源 ==========
    @Bean(name = MASTER + "DataSource")   // 生成 Bean 名称为 "masterDataSource"
    public DruidDataSource masterDataSource(
            @Value("${" + FOLDER + "." + MASTER + ".url}") String url,
            @Value("${" + FOLDER + "." + MASTER + ".username}") String username,
            @Value("${" + FOLDER + "." + MASTER + ".password}") String password,
            @Value("${" + FOLDER + "." + MASTER + ".driver-class-name}") String driverClassName) {
        return createDruidDataSource(url, username, password, driverClassName);
    }

    // ========== Source1 数据源 ==========
    @Bean(name = SOURCE1 + "DataSource")   // 生成 Bean 名称为 "source1DataSource"
    public DruidDataSource source1DataSource(
            @Value("${" + FOLDER + "." + SOURCE1 + ".url}") String url,
            @Value("${" + FOLDER + "." + SOURCE1 + ".username}") String username,
            @Value("${" + FOLDER + "." + SOURCE1 + ".password}") String password,
            @Value("${" + FOLDER + "." + SOURCE1 + ".driver-class-name}") String driverClassName) {
        return createDruidDataSource(url, username, password, driverClassName);
    }

    // ========== 动态路由数据源 ==========
    @Bean
    @Primary
    public MyDynamicRoutingDataSource myDynamicRoutingDataSource(
            @Qualifier(MASTER + "DataSource") DataSource masterDataSource,
            @Qualifier(SOURCE1 + "DataSource") DataSource source1DataSource) {

        MyDynamicRoutingDataSource routingDataSource = new MyDynamicRoutingDataSource();
        routingDataSource.setDefaultTargetDataSource(masterDataSource);
        Map<Object, Object> targetDataSources = new HashMap<>();
        targetDataSources.put(MASTER, masterDataSource);
        targetDataSources.put(SOURCE1, source1DataSource);
        routingDataSource.setTargetDataSources(targetDataSources);
        routingDataSource.afterPropertiesSet();
        return routingDataSource;
    }


    // ========== 公共创建方法 ==========
    private DruidDataSource createDruidDataSource(String url, String username,
                                                  String password, String driverClassName) {
        DruidDataSource ds = new DruidDataSource();
        ds.setUrl(url);
        ds.setUsername(username);
        ds.setPassword(password);
        ds.setDriverClassName(driverClassName);
        ds.setInitialSize(5);
        ds.setMinIdle(5);
        ds.setMaxActive(20);
        ds.setMaxWait(60000);
        return ds;
    }
}
