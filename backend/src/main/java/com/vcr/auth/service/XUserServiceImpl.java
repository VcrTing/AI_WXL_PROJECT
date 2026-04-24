package com.vcr.auth.service;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.vcr.auth.service.mapper.XUserMapper;
import com.vcr.auth.model.XUser;
import com.vcr.auth.service.i.XUserService;
import org.springframework.stereotype.Service;

@Service
public class XUserServiceImpl extends ServiceImpl<XUserMapper, XUser> implements XUserService {

    @Override
    public XUser getByUsername(String username) {
        LambdaQueryWrapper<XUser> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(XUser::getUsername, username);
        return this.getOne(wrapper);
    }
}