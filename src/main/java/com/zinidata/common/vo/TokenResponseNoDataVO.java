package com.zinidata.common.vo;

import lombok.Data;

@Data
public class TokenResponseNoDataVO<T> {
    private String code;
    private String msg;
    private String id;
}
