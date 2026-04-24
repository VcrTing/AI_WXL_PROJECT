package com.vcr.makuku.model;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SqlQueryRequest {
    @NotBlank(message = "SQL语句不能为空")
    private String sql;
}
