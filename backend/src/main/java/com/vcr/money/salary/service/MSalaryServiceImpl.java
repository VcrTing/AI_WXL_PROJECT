package com.vcr.money.salary.service;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.vcr.money.salary.entity.MSalary;
import com.vcr.money.salary.service.i.MSalaryService;
import com.vcr.money.salary.service.mapper.MSalaryMapper;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
public class MSalaryServiceImpl extends ServiceImpl<MSalaryMapper, MSalary> implements MSalaryService {

    @Override
    public List<MSalary> listByUserId(String userId) {
        LambdaQueryWrapper<MSalary> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(MSalary::getConnectXUserId, userId)
                .orderByDesc(MSalary::getBelongMonth, MSalary::getCreatedAt);
        return list(wrapper);
    }

    @Override
    public List<MSalary> listByBelongMonth(Integer belongMonth) {
        LambdaQueryWrapper<MSalary> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(MSalary::getBelongMonth, belongMonth)
                .orderByDesc(MSalary::getCreatedAt);
        return list(wrapper);
    }

    @Override
    public List<MSalary> listByPayStatus(Integer payStatus) {
        LambdaQueryWrapper<MSalary> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(MSalary::getPayStatus, payStatus)
                .orderByDesc(MSalary::getCreatedAt);
        return list(wrapper);
    }

    @Override
    public List<MSalary> listByLedgerTimeRange(Date start, Date end) {
        LambdaQueryWrapper<MSalary> wrapper = new LambdaQueryWrapper<>();
        wrapper.between(MSalary::getLedgerStartTime, start, end)
                .or()
                .between(MSalary::getLedgerEndTime, start, end)
                .orderByAsc(MSalary::getLedgerStartTime);
        return list(wrapper);
    }
}