package com.vcr.money.salary.service.i;
import com.baomidou.mybatisplus.extension.service.IService;
import com.vcr.money.salary.entity.MSalaryType;
import java.util.List;

public interface MSalaryTypeService extends IService<MSalaryType> {
    // 根据编码查询
    MSalaryType getByCode(Integer code);
    // 根据名称模糊查询
    List<MSalaryType> listByNameLike(String name);
}
