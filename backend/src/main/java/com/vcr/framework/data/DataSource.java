package com.vcr.framework.data;
import com.vcr.framework.define.DSDefined;

import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DataSource {
    String value() default DSDefined.MASTER; // 默认数据源为 master
}