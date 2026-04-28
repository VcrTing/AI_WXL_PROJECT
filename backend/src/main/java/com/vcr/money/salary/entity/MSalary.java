package com.vcr.money.salary.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MSalary {

    String connectXUserId;
    Date ledgerStartTime;
    Date ledgerEndTime;
    Integer belongMonth;
    // 时间天数
    Integer timeDayNum;
    // 需工作天数
    Integer needWorkDayNum;

    String name;
    String remark;

    BigDecimal salaryTotal;
    BigDecimal salaryAdditional;

    // Integer finishedStatus;
    Integer payStatus;

    @TableLogic  // MyBatis-Plus 逻辑删除注解，deleted=0 表示未删除
    private Integer delFlag;
    @TableId
    String id;
    Date createdAt;
    Date updatedAt;
    String updatedBy;
}
