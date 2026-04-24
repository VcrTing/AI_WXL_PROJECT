package com.vcr.makuku.controller;
import com.vcr.framework.data.DSSource1;
import com.vcr.framework.result.ApiResult;
import com.vcr.makuku.model.ProcedureCallRequest;
import com.vcr.makuku.model.SqlQueryRequest;
import com.vcr.makuku.service.ProcedureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/backend/sql/exec")
public class SqlController {

    @Autowired
    private ProcedureService procedureService;

    @DSSource1
    @PostMapping("/procedure")
    public ApiResult<List<Map<String, Object>>> callProcedure(@RequestBody ProcedureCallRequest request) {
        try {
            Map<String, Object> paramsMap = request.getParams();
            List<Map<String, Object>> data = procedureService.callProcedureWithOrderedParams(
                    request.getProcedureName(),
                    new ArrayList<>(paramsMap.values())
            );
            return ApiResult.success("调用成功", data);
        } catch (Exception e) {
            return ApiResult.error(500, "调用失败：" + e.getMessage());
        }
    }

    @DSSource1
    @PostMapping("/select")
    public ApiResult<List<Map<String, Object>>> executeQuery(@RequestBody SqlQueryRequest request) {
        try {
            List<Map<String, Object>> data = procedureService.executeSelectQuery(request.getSql());
            return ApiResult.success("查询成功", data);
        }
        catch (IllegalArgumentException e) {
            return ApiResult.error(400, "参数错误：" + e.getMessage());
        }
        catch (Exception e) {
            return ApiResult.error(500, "系统错误：" + e.getMessage());
        }
    }
    /**
     * 写死参数的测试接口 —— 浏览器直接访问即可调用存储过程
     * 示例：GET http://localhost:7070/procedure/testHardcoded
     */
    @GetMapping("/testHardcoded")
    @DSSource1
    public ApiResult<List<Map<String, Object>>> testHardcodedProcedure() {
        // 写死的存储过程名称
        String procedureName = "SBO_Web_A042";

        // 写死的参数列表（顺序必须与存储过程定义一致，共10个）
        List<Object> params = List.of(
                "", "",
                "", "", "", "",
                "", "", "", ""
        );

        try {
            List<Map<String, Object>> data = procedureService.callProcedureWithOrderedParams(procedureName, params);
            return ApiResult.success("调用成功", data);
        } catch (Exception e) {
            return ApiResult.error(500, "调用失败：" + e.getMessage());
        }
    }
}