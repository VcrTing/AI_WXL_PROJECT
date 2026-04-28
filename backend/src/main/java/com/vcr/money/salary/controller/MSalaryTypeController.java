package com.vcr.money.salary.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.vcr.framework.result.ApiResult;
import com.vcr.money.salary.entity.MSalaryType;
import com.vcr.money.salary.service.i.MSalaryTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/money/salary/salary-types")
public class MSalaryTypeController {

    @Autowired
    private MSalaryTypeService mSalaryTypeService;

    // 新增
    @PostMapping
    public ApiResult<MSalaryType> add(@RequestBody MSalaryType salaryType) {
        try {
            salaryType.setCreatedAt(new Date());
            salaryType.setUpdatedAt(new Date());
            if (salaryType.getDelFlag() == null) {
                salaryType.setDelFlag(0);
            }
            // 检查编码是否重复（可选）
            if (salaryType.getCode() != null) {
                MSalaryType exist = mSalaryTypeService.getByCode(salaryType.getCode());
                if (exist != null) {
                    return ApiResult.error(400, "编码已存在");
                }
            }
            boolean success = mSalaryTypeService.save(salaryType);
            if (!success) {
                return ApiResult.error(500, "保存失败");
            }
            MSalaryType saved = mSalaryTypeService.getById(salaryType.getId());
            return ApiResult.success(saved);
        } catch (Exception e) {
            return ApiResult.error(500, e);
        }
    }

    // 删除（逻辑删除）
    @DeleteMapping("/{id}")
    public ApiResult<MSalaryType> delete(@PathVariable String id) {
        try {
            MSalaryType salaryType = mSalaryTypeService.getById(id);
            if (salaryType == null) {
                return ApiResult.error(404, "记录不存在");
            }
            boolean success = mSalaryTypeService.removeById(id);
            if (!success) {
                return ApiResult.error(500, "删除失败");
            }
            return ApiResult.success(salaryType);
        } catch (Exception e) {
            return ApiResult.error(500, e);
        }
    }

    // 修改
    @PutMapping("/{id}")
    public ApiResult<MSalaryType> update(@PathVariable String id, @RequestBody MSalaryType salaryType) {
        try {
            MSalaryType exist = mSalaryTypeService.getById(id);
            if (exist == null) {
                return ApiResult.error(404, "记录不存在");
            }
            // 如果修改编码，检查重复
            if (salaryType.getCode() != null && !salaryType.getCode().equals(exist.getCode())) {
                MSalaryType conflict = mSalaryTypeService.getByCode(salaryType.getCode());
                if (conflict != null) {
                    return ApiResult.error(400, "编码已存在");
                }
            }
            salaryType.setId(id);
            salaryType.setUpdatedAt(new Date());
            // 注意：createdAt 和 createdBy 不应该被更新，但前端可能不传，这里忽略
            salaryType.setCreatedAt(null); // 避免覆盖创建时间
            boolean success = mSalaryTypeService.updateById(salaryType);
            if (!success) {
                return ApiResult.error(500, "更新失败");
            }
            MSalaryType updated = mSalaryTypeService.getById(id);
            return ApiResult.success(updated);
        } catch (Exception e) {
            return ApiResult.error(500, e);
        }
    }

    // 根据ID查询
    @GetMapping("/{id}")
    public ApiResult<MSalaryType> getById(@PathVariable String id) {
        try {
            MSalaryType salaryType = mSalaryTypeService.getById(id);
            if (salaryType == null) {
                return ApiResult.error(404, "记录不存在");
            }
            return ApiResult.success(salaryType);
        } catch (Exception e) {
            return ApiResult.error(500, e);
        }
    }

    // 分页条件查询
    @GetMapping("/page")
    public ApiResult<IPage<MSalaryType>> pageQuery(
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer code
    ) {
        try {
            Page<MSalaryType> page = new Page<>(pageNum, pageSize);
            LambdaQueryWrapper<MSalaryType> wrapper = new LambdaQueryWrapper<>();
            wrapper.like(name != null && !name.isEmpty(), MSalaryType::getName, name)
                    .eq(code != null, MSalaryType::getCode, code)
                    .orderByAsc(MSalaryType::getCode);
            IPage<MSalaryType> resultPage = mSalaryTypeService.page(page, wrapper);
            return ApiResult.success(resultPage);
        } catch (Exception e) {
            return ApiResult.error(500, e);
        }
    }

    // 查询全部（不分页，通常用于下拉选择框）
    @GetMapping("/all")
    public ApiResult<List<MSalaryType>> listAll() {
        try {
            List<MSalaryType> list = mSalaryTypeService.list(new LambdaQueryWrapper<MSalaryType>()
                    .orderByAsc(MSalaryType::getCode));
            return ApiResult.success(list);
        } catch (Exception e) {
            return ApiResult.error(500, e);
        }
    }

    // 根据编码查询
    @GetMapping("/code/{code}")
    public ApiResult<MSalaryType> getByCode(@PathVariable Integer code) {
        try {
            MSalaryType salaryType = mSalaryTypeService.getByCode(code);
            if (salaryType == null) {
                return ApiResult.error(404, "记录不存在");
            }
            return ApiResult.success(salaryType);
        } catch (Exception e) {
            return ApiResult.error(500, e);
        }
    }
}