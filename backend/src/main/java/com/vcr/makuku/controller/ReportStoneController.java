package com.vcr.makuku.controller;

import com.vcr.framework.data.DSSource1;
import com.vcr.framework.result.ApiResult;
import com.vcr.makuku.model.ProcedureCallRequest;
import com.vcr.makuku.service.ProcedureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/business/report/stone")
public class ReportStoneController {
    @Autowired
    private ProcedureService procedureService;

    @DSSource1
    @PostMapping("/master/list")
    public ApiResult<List<Map<String, Object>>> masterList(@RequestBody ProcedureCallRequest request) {
        try {
            Map<String, Object> paramsMap = request.getParams();
            List<Map<String, Object>> data = procedureService.callProcedureWithOrderedParams(
                    "Z_New_Rpt_MasterData",
                    new ArrayList<>(paramsMap.values())
            );
            return ApiResult.success("调用成功", data);
        } catch (Exception e) {
            return ApiResult.error(e);
        }
    }
}
