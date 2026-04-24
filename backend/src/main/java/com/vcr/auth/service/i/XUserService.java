package com.vcr.auth.service.i;
import com.baomidou.mybatisplus.extension.service.IService;
import com.vcr.auth.model.XUser;

public interface XUserService extends IService<XUser> {
    // 可添加业务方法
    XUser getByUsername(String username);
}