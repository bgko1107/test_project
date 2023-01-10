package com.zinidata.common.vo;

import lombok.Data;

@Data
public class TokenDataResponseVO {

    private String token;
    private String id;
    private String issued_time;
    private String expired_time;

}
