package com.vcr.money.salary.service;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.vcr.money.salary.entity.MSalaryRecord;
import com.vcr.money.salary.service.i.MSalaryRecordService;
import com.vcr.money.salary.service.mapper.MSalaryRecordMapper;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
public class MSalaryRecordServiceImpl extends ServiceImpl<MSalaryRecordMapper, MSalaryRecord>
        implements MSalaryRecordService {

    @Override
    public List<MSalaryRecord> listByWorkDayBetween(Date startDate, Date endDate) {
        LambdaQueryWrapper<MSalaryRecord> wrapper = new LambdaQueryWrapper<>();
        wrapper.between(MSalaryRecord::getWorkDay, startDate, endDate)
                .orderByAsc(MSalaryRecord::getWorkDay);
        return list(wrapper);
    }
}