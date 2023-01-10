package com.zinidata.common.vo;

import lombok.Data;

@Data
public class ComPropertiesVO {
    // input
    private String jdbcUrl;
    private String username;
    private String password;

    // output
    private String jdbcUrlEnc;
    private String usernameEnc;
    private String passwordEnc;
    private String jdbcUrlDec;
    private String usernameDec;
    private String passwordDec;
}
