package com.vcr.framework.data;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class MyDynamicRoutingDataSource extends AbstractRoutingDataSource {

    // 存储所有数据源的 Map（需要在初始化时设置）
    private Map<Object, DataSource> targetDataSources;

    @Override
    public void setTargetDataSources(Map<Object, Object> targetDataSources) {
        super.setTargetDataSources(targetDataSources);
        // 保存一份引用供外部访问
        this.targetDataSources = (Map) targetDataSources;
    }

    @Override
    protected Object determineCurrentLookupKey() {
        return DynamicDataSourceContextHolder.getDataSourceKey();
    }

    // 公开方法：根据 key 获取数据源
    public DataSource getDataSource(String key) {
        return targetDataSources != null ? targetDataSources.get(key) : null;
    }
}