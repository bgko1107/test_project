package com.zinidata.common.vo;

import lombok.Data;

@Data
public class TokenResponseVO<T> {


    private String code;
    private String msg;
    private T data;

}
