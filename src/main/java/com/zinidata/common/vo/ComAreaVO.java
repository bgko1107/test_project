package com.zinidata.common.vo;

import lombok.Data;

@Data
public class ComAreaVO {
    // input
    private String megaCd;
    private String ctyCd;
    private String admiCd;

    // output
    private String megaNm;
    private String ctyNm;
    private String admiNm;
    private String regDate;
    private String cd;
    private String nm;
    private String minx;
    private String maxx;
    private String miny;
    private String maxy;
    private String centerx;
    private String centery;
    private String geometry;

}