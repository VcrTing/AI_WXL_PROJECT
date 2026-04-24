package com.vcr.auth.model;
import com.vcr.auth.AuthDefined;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(AuthDefined.TABLE_X_USER)  // 根据实际表名调整
public class XUser implements UserDetails {
    @TableId
    String id;
    String password;
    String username;
    String realname;
    String avatar;
    String email;

    @TableLogic  // MyBatis-Plus 逻辑删除注解，deleted=0 表示未删除
    private Integer delFlag;

    // UserDetails 方法实现
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 此处可扩展角色权限，暂时返回空
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return this.email;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        // 逻辑删除字段，deleted=0 时账户有效
        return this.delFlag == null || this.delFlag == 0;
    }

    // Getter / Setter 方法（省略，请自行生成或用 Lombok @Data）
}
