package com.vcr.framework.data;

import java.lang.reflect.Method;

import com.vcr.framework.define.DSDefined;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Order(-1)
public class DataSourceAspect {
    

    @Around("@annotation(com.vcr.framework.data.DataSource) || " +
            "@annotation(com.vcr.framework.data.DSMaster) || " +
            "@annotation(com.vcr.framework.data.DSSource1) || " +
            "@within(com.vcr.framework.data.DataSource) || " +
            "@within(com.vcr.framework.data.DSMaster) || " +
            "@within(com.vcr.framework.data.DSSource1)")
    public Object around(ProceedingJoinPoint point) throws Throwable {
        String dataSourceKey = resolveDataSourceKey(point);
        if (dataSourceKey != null) {
            DynamicDataSourceContextHolder.setDataSourceKey(dataSourceKey);
        }
        try {
            return point.proceed();
        } finally {
            DynamicDataSourceContextHolder.clearDataSourceKey();
        }
    }

    /**
     * 解析当前方法或类上的数据源注解，返回对应的 key
     */
    private String resolveDataSourceKey(ProceedingJoinPoint point) {
        MethodSignature signature = (MethodSignature) point.getSignature();
        Method method = signature.getMethod();
        Class<?> targetClass = point.getTarget().getClass();

        // 1. 优先检查方法上的注解
        if (method.isAnnotationPresent(DSMaster.class)) {
            return DSDefined.MASTER;
        }
        if (method.isAnnotationPresent(DSSource1.class)) {
            return DSDefined.SOURCE1;
        }
        if (method.isAnnotationPresent(DataSource.class)) {
            return method.getAnnotation(DataSource.class).value();
        }

        // 2. 方法上没有，再检查类上的注解
        if (targetClass.isAnnotationPresent(DSMaster.class)) {
            return DSDefined.MASTER;
        }
        if (targetClass.isAnnotationPresent(DSSource1.class)) {
            return DSDefined.SOURCE1;
        }
        if (targetClass.isAnnotationPresent(DataSource.class)) {
            return targetClass.getAnnotation(DataSource.class).value();
        }

        // 3. 都没有，返回 null，后续将使用默认数据源
        return null;
    }
}