package com.vcr.makuku;

import java.util.Set;

public interface MaKuDefined {

    // 允许调用的存储过程白名单（防止 SQL 注入）
    Set<String> ALLOWED_PROCEDURES = Set.of(
            "SBO_Web_A042"
    );
}
