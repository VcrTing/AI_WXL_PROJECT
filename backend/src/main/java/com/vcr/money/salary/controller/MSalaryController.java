package com.vcr.money.salary.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.vcr.framework.result.ApiResult;
import com.vcr.money.salary.entity.MSalary;
import com.vcr.money.salary.service.i.MSalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/money/salary/salary")
public class MSalaryController {

    @Autowired
    private MSalaryService mSalaryService;

    // 新增总账
    @PostMapping
    public ApiResult<MSalary> add(@RequestBody MSalary salary) {
        try {
            salary.setCreatedAt(new Date());
            salary.setUpdatedAt(new Date());
            if (salary.getDelFlag() == null) {
                salary.setDelFlag(0);
            }
            boolean success = mSalaryService.save(salary);
            if (!success) {
                return ApiResult.error(500, "保存失败");
            }
            MSalary saved = mSalaryService.getById(salary.getId());
            return ApiResult.success(saved);
        } catch (Exception e) {
            return ApiResult.error(500, e);
        }
    }

    // 删除（逻辑删除）
    @DeleteMapping("/{id}")
    public ApiResult<MSalary> delete(@PathVariable String id) {
        try {
            MSalary salary = mSalaryService.getById(id);
            if (salary == null) {
                return ApiResult.error(404, "记录不存在");
            }
            boolean success = mSalaryService.removeById(id);
            if (!success) {
                return ApiResult.error(500, "删除失败");
            }
            return ApiResult.success(salary);
        } catch (Exception e) {
            return ApiResult.error(500, e);
        }
    }

    // 修改总账
    @PutMapping("/{id}")
    public ApiResult<MSalary> update(@PathVariable String id, @RequestBody MSalary salary) {
        try {
            MSalary exist = mSalaryService.getById(id);
            if (exist == null) {
                return ApiResult.error(404, "记录不存在");
            }
            salary.setId(id);
            salary.setUpdatedAt(new Date());
            boolean success = mSalaryService.updateById(salary);
            if (!success) {
                return ApiResult.error(500, "更新失败");
            }
            MSalary updated = mSalaryService.getById(id);
            return ApiResult.success(updated);
        } catch (Exception e) {
            return ApiResult.error(500, e);
        }
    }

    // 根据ID查询
    @GetMapping("/{id}")
    public ApiResult<MSalary> getById(@PathVariable String id) {
        try {
            MSalary salary = mSalaryService.getById(id);
            if (salary == null) {
                return ApiResult.error(404, "记录不存在");
            }
            return ApiResult.success(salary);
        } catch (Exception e) {
            return ApiResult.error(500, e);
        }
    }

    // 分页条件查询
    @GetMapping("/page")
    public ApiResult<IPage<MSalary>> pageQuery(
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String connectXUserId,
            @RequestParam(required = false) Integer belongMonth,
            @RequestParam(required = false) Integer payStatus,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date ledgerStartFrom,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date ledgerStartTo,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date ledgerEndFrom,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date ledgerEndTo
    ) {
        try {
            Page<MSalary> page = new Page<>(pageNum, pageSize);
            LambdaQueryWrapper<MSalary> wrapper = new LambdaQueryWrapper<>();
            wrapper.eq(connectXUserId != null && !connectXUserId.isEmpty(),
                            MSalary::getConnectXUserId, connectXUserId)
                    .eq(belongMonth != null, MSalary::getBelongMonth, belongMonth)
                    .eq(payStatus != null, MSalary::getPayStatus, payStatus)
                    .ge(ledgerStartFrom != null, MSalary::getLedgerStartTime, ledgerStartFrom)
                    .le(ledgerStartTo != null, MSalary::getLedgerStartTime, ledgerStartTo)
                    .ge(ledgerEndFrom != null, MSalary::getLedgerEndTime, ledgerEndFrom)
                    .le(ledgerEndTo != null, MSalary::getLedgerEndTime, ledgerEndTo)
                    .orderByDesc(MSalary::getBelongMonth, MSalary::getCreatedAt);
            IPage<MSalary> resultPage = mSalaryService.page(page, wrapper);
            return ApiResult.success(resultPage);
        } catch (Exception e) {
            return ApiResult.error(500, e);
        }
    }

    // 查询全部（慎用）
    @GetMapping("/all")
    public ApiResult<List<MSalary>> listAll() {
        try {
            List<MSalary> list = mSalaryService.list(new LambdaQueryWrapper<MSalary>()
                    .orderByDesc(MSalary::getBelongMonth, MSalary::getCreatedAt));
            return ApiResult.success(list);
        } catch (Exception e) {
            return ApiResult.error(500, e);
        }
    }

    // 根据用户ID查询所有总账
    @GetMapping("/user/{userId}")
    public ApiResult<List<MSalary>> listByUserId(@PathVariable String userId) {
        try {
            List<MSalary> list = mSalaryService.listByUserId(userId);
            return ApiResult.success(list);
        } catch (Exception e) {
            return ApiResult.error(500, e);
        }
    }

    // 根据月份查询
    @GetMapping("/month/{belongMonth}")
    public ApiResult<List<MSalary>> listByBelongMonth(@PathVariable Integer belongMonth) {
        try {
            List<MSalary> list = mSalaryService.listByBelongMonth(belongMonth);
            return ApiResult.success(list);
        } catch (Exception e) {
            return ApiResult.error(500, e);
        }
    }
}