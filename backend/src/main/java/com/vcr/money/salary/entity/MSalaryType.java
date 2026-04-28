package com.vcr.money.salary.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MSalaryType {
    String name;
    Integer code;

    @TableLogic  // MyBatis-Plus 逻辑删除注解，deleted=0 表示未删除
    private Integer delFlag;
    @TableId
    String id;
    Date createdAt;
    Date updatedAt;
    String updatedBy;
}
