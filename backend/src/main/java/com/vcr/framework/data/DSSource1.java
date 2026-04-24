package com.vcr.framework.data;
import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DSSource1 {
    // 对应 slave 数据源，也可按需调整
}