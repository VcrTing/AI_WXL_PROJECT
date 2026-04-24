package com.vcr.framework.data;
import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DSMaster {
    // 内部已固定数据源标识，无需 value 属性
    // 如果需要可加，但这里省略保持简洁
}