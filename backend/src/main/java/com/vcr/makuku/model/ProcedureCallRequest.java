package com.vcr.makuku.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProcedureCallRequest {
    private String procedureName;
    private Map<String, Object> params;
}
