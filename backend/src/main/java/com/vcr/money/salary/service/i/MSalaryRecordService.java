package com.vcr.money.salary.service.i;
import com.baomidou.mybatisplus.extension.service.IService;
import com.vcr.money.salary.entity.MSalaryRecord;
import java.util.*;

public interface MSalaryRecordService extends IService<MSalaryRecord> {
    List<MSalaryRecord> listByWorkDayBetween(Date startDate, Date endDate);
}