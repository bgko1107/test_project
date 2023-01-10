package com.zinidata.common.mapper;

import com.zinidata.common.vo.BizBatchLogVO;
import com.zinidata.common.vo.ComAreaVO;
import com.zinidata.common.vo.ComLoginVO;
import com.zinidata.common.vo.ComUpjongVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface ComAdminMapper {

    // 회원가입
    ComLoginVO getMemberSeq();
    int setMember(ComLoginVO comLoginVO);
    int setAuth(ComLoginVO comLoginVO);
    int loginIdDuplicated(ComLoginVO comLoginVO);
    //로그인
    ArrayList<ComLoginVO> memNoInfo(ComLoginVO comLoginVO);
    ArrayList<ComLoginVO> getMember(ComLoginVO comLoginVO);
    // 선택한 지역 가져오기
    ArrayList<ComAreaVO> getArea(ComAreaVO comAreaVO);
    // 선택한 지역 범위 가져오기
    ArrayList<ComAreaVO> getAreaGeom(ComAreaVO comAreaVO);
    // 업종 가져오기
    ArrayList<ComUpjongVO> getUpjong(ComUpjongVO comUpjongVO);
    // 데이터기준 날짜 가져오기
    BizBatchLogVO getBatchLog();
}
