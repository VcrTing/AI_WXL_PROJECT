package com.vcr.framework.result;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ApiResult<T> {
    private int code;
    private String msg;
    private T data;

    public ApiResult(int code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public static <T> ApiResult<T> success(T data) {
        return new ApiResult<>(200, "success", data);
    }

    public static <T> ApiResult<T> success(String msg, T data) {
        return new ApiResult<>(200, msg, data);
    }

    public static <R> ApiResult<R> error(int code, String msg) {
        return new ApiResult<>(code, msg, null);
    }

    public static <R> ApiResult<R> error(int code, Exception e) {
        e.printStackTrace();
        return new ApiResult<>(code, e.getMessage(), null);
    }

    public static <R> ApiResult<R> error(Exception e) {
        e.printStackTrace();
        return new ApiResult<>(500, e.getMessage(), null);
    }

    public static <R> ApiResult<R> error(String msg) {
        return new ApiResult<>(500, msg, null);
    }

    // Getter / Setter 省略（或使用 Lombok @Data）
}
