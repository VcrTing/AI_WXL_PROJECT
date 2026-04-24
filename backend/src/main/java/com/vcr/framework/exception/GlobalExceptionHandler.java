package com.vcr.framework.exception;
import com.vcr.framework.result.ApiResult;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ---------- 业务异常 ----------
    @ExceptionHandler(BusinessException.class)
    public ApiResult<Void> handleBusinessException(BusinessException e) {
        return ApiResult.error(e.getCode(), e.getMessage());
    }

    // ---------- Spring Security 认证异常（通常被 AuthenticationEntryPoint 拦截，此处处理 Controller 中可能抛出的）----------
    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResult<Void> handleBadCredentials(BadCredentialsException e) {
        return ApiResult.error(401, "用户名或密码错误");
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResult<Void> handleUsernameNotFound(UsernameNotFoundException e) {
        return ApiResult.error(401, e.getMessage());
    }

    @ExceptionHandler(DisabledException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ApiResult<Void> handleDisabled(DisabledException e) {
        return ApiResult.error(403, "账户已被禁用");
    }

    @ExceptionHandler(LockedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ApiResult<Void> handleLocked(LockedException e) {
        return ApiResult.error(403, "账户已被锁定");
    }

    // ---------- 参数校验异常（@Valid 校验）----------
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResult<Void> handleMethodArgumentNotValid(MethodArgumentNotValidException e) {
        String msg = e.getBindingResult().getFieldErrors().stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining("；"));
        return ApiResult.error(400, msg);
    }

    @ExceptionHandler(BindException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResult<Void> handleBindException(BindException e) {
        String msg = e.getFieldErrors().stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining("；"));
        return ApiResult.error(400, msg);
    }

    // ---------- 单参数校验异常（@RequestParam 上 @NotBlank 等）----------
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResult<Void> handleConstraintViolation(ConstraintViolationException e) {
        String msg = e.getConstraintViolations().stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.joining("；"));
        return ApiResult.error(400, msg);
    }

    // ---------- 其他未知异常 ----------
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResult<Void> handleException(Exception e) {
        // 可记录日志
        e.printStackTrace();
        return ApiResult.error(500, "系统内部错误，请稍后重试");
    }
}