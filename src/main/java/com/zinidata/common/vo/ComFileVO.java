package com.zinidata.common.vo;

import lombok.Data;

@Data
public class ComFileVO {
    // input
    private String idx;
    private String memNo;

    // output
    private String fileName;
    private String original;
    private String type;
    private String strToday;
    private String filePath;
    private String orgFileNm;

}
