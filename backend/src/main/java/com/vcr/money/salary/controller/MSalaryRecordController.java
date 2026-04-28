package com.vcr.money.salary.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.vcr.framework.result.ApiResult;
import com.vcr.money.salary.entity.MSalaryRecord;
import com.vcr.money.salary.service.i.MSalaryRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/money/salary/salary-records")
public class MSalaryRecordController {

    @Autowired
    private MSalaryRecordService salaryRecordService;

    // 新增：返回新增后的完整记录
    @PostMapping
    public ApiResult<MSalaryRecord> add(@RequestBody MSalaryRecord record) {
        try {
            record.setCreatedAt(new Date());
            record.setUpdatedAt(new Date());
            if (record.getDelFlag() == null) {
                record.setDelFlag(0);
            }
            boolean success = salaryRecordService.save(record);
            if (!success) {
                return ApiResult.error("保存失败");
            }
            // 返回新增后的记录（已包含自动生成的ID）
            MSalaryRecord savedRecord = salaryRecordService.getById(record.getId());
            return ApiResult.success(savedRecord);
        } catch (Exception e) {
            return ApiResult.error(e);
        }
    }

    // 删除（逻辑删除）：返回被删除前的原记录
    @DeleteMapping("/{id}")
    public ApiResult<MSalaryRecord> deleteById(@PathVariable String id) {
        try {
            // 先查询原记录
            MSalaryRecord record = salaryRecordService.getById(id);
            if (record == null) {
                return ApiResult.error(404, "记录不存在");
            }
            boolean success = salaryRecordService.removeById(id);
            if (!success) {
                return ApiResult.error(500, "删除失败");
            }
            return ApiResult.success(record);
        } catch (Exception e) {
            return ApiResult.error(e);
        }
    }

    // 修改：返回修改后的完整记录
    @PutMapping("/{id}")
    public ApiResult<MSalaryRecord> update(@PathVariable String id, @RequestBody MSalaryRecord record) {
        try {
            // 检查记录是否存在
            MSalaryRecord existRecord = salaryRecordService.getById(id);
            if (existRecord == null) {
                return ApiResult.error(404, "记录不存在");
            }
            record.setId(id);
            record.setUpdatedAt(new Date());
            boolean success = salaryRecordService.updateById(record);
            if (!success) {
                return ApiResult.error(500, "更新失败");
            }
            // 返回更新后的记录
            MSalaryRecord updatedRecord = salaryRecordService.getById(id);
            return ApiResult.success(updatedRecord);
        } catch (Exception e) {
            return ApiResult.error(e);
        }
    }

    // 根据ID查询
    @GetMapping("/{id}")
    public ApiResult<MSalaryRecord> getById(@PathVariable String id) {
        try {
            MSalaryRecord record = salaryRecordService.getById(id);
            if (record == null) {
                return ApiResult.error(404, "记录不存在");
            }
            return ApiResult.success(record);
        } catch (Exception e) {
            return ApiResult.error(e);
        }
    }

    // 分页查询
    @GetMapping("/page")
    public ApiResult<IPage<MSalaryRecord>> pageQuery(
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) Integer salaryType,
            @RequestParam(required = false) Integer isFinish,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startWorkDay,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date endWorkDay) {
        try {
            Page<MSalaryRecord> page = new Page<>(pageNum, pageSize);
            LambdaQueryWrapper<MSalaryRecord> wrapper = new LambdaQueryWrapper<>();
            wrapper.eq(salaryType != null, MSalaryRecord::getSalaryType, salaryType)
                    .eq(isFinish != null, MSalaryRecord::getIsFinish, isFinish)
                    .between(startWorkDay != null && endWorkDay != null,
                            MSalaryRecord::getWorkDay, startWorkDay, endWorkDay)
                    .orderByDesc(MSalaryRecord::getWorkDay);
            IPage<MSalaryRecord> resultPage = salaryRecordService.page(page, wrapper);
            return ApiResult.success(resultPage);
        } catch (Exception e) {
            return ApiResult.error(e);
        }
    }

}