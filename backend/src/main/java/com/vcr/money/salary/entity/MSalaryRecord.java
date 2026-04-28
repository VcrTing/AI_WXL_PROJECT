package com.vcr.money.salary.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MSalaryRecord {
    Date workDay;
    String workStartTime;
    String workEndTime;
    // 工资类型
    Integer salaryType;
    // 钱
    String salary;
    // 是否属于工作时间内
    Integer isForWork;
    String remark;
    // 关联ID
    String connectXUserId;
    String connectMSalaryId;
    String connectMSalaryTypeCode;
    // 已完结
    Integer isFinish;

    @TableLogic  // MyBatis-Plus 逻辑删除注解，deleted=0 表示未删除
    private Integer delFlag;
    @TableId
    String id;
    Date createdAt;
    Date updatedAt;
    String createdBy;
}
