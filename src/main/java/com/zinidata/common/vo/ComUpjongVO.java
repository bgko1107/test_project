package com.zinidata.common.vo;

import lombok.Data;

@Data
public class ComUpjongVO {
    // input
    private String upjong1Cd;
    private String upjong2Cd;
    private String upjong3Cd;
    private String gubun;

    // output
    private String upjong1Nm;
    private String upjong2Nm;
    private String upjong3Nm;
    private String crt_dt;
    private String upd_dt;
    private String status;
}
