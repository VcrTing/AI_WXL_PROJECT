package com.vcr.money.salary.service.i;

import com.baomidou.mybatisplus.extension.service.IService;
import com.vcr.money.salary.entity.MSalary;

import java.util.Date;
import java.util.List;

public interface MSalaryService extends IService<MSalary> {
    // 根据用户ID查询
    List<MSalary> listByUserId(String userId);
    // 根据月份查询
    List<MSalary> listByBelongMonth(Integer belongMonth);
    // 根据支付状态查询
    List<MSalary> listByPayStatus(Integer payStatus);
    // 按账期时间范围查询
    List<MSalary> listByLedgerTimeRange(Date start, Date end);
}