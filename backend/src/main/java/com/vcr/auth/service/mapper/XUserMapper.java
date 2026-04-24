package com.vcr.auth.service.mapper;
import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.vcr.auth.model.XUser;
import com.vcr.framework.define.DSDefined;
import org.apache.ibatis.annotations.Mapper;

@DS(DSDefined.MASTER)
@Mapper
public interface XUserMapper extends BaseMapper<XUser> {
    // 如有自定义查询可在此添加
}