package com.vcr.money.salary.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.vcr.money.salary.entity.MSalaryType;
import com.vcr.money.salary.service.i.MSalaryTypeService;
import com.vcr.money.salary.service.mapper.MSalaryTypeMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import java.util.List;

@Service
public class MSalaryTypeServiceImpl extends ServiceImpl<MSalaryTypeMapper, MSalaryType> implements MSalaryTypeService {

    @Override
    public MSalaryType getByCode(Integer code) {
        LambdaQueryWrapper<MSalaryType> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(MSalaryType::getCode, code);
        return getOne(wrapper);
    }

    @Override
    public List<MSalaryType> listByNameLike(String name) {
        LambdaQueryWrapper<MSalaryType> wrapper = new LambdaQueryWrapper<>();
        if (StringUtils.hasText(name)) {
            wrapper.like(MSalaryType::getName, name);
        }
        wrapper.orderByAsc(MSalaryType::getCode);
        return list(wrapper);
    }
}