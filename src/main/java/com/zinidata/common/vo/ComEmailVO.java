package com.zinidata.common.vo;

import lombok.Data;

@Data
public class ComEmailVO {
    // input
    private String title;
    private String fromAddr;
    private String fromName;
    private String toAddr;
    private String message;
}
