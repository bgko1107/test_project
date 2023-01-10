package com.zinidata.common.service;

import com.zinidata.common.mapper.ComAdminMapper;
import com.zinidata.common.vo.*;
import com.zinidata.config.SecureHashAlgorithm;
import com.zinidata.util.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;

@Slf4j
@RequiredArgsConstructor
@Service
public class ComAdminService {

    @Value("${bizmap.home.dir}")
    private String homeDir;

    @Autowired
    GsonUtil gsonUtil;



    private final ComAdminMapper comAdminMapper;
    private final JwtProvider jwtProvider;

    public BizBatchLogVO getBatchLog(){
        BizBatchLogVO outVo = comAdminMapper.getBatchLog();
        return outVo;
    }

    public String registProc(HttpServletRequest request, ComLoginVO comLoginVO) throws NoSuchAlgorithmException {
        String result = "";

        // 비밀번호 sha256 변환
        comLoginVO.setPwd(SecureHashAlgorithm.encryptSHA256(comLoginVO.getPwd()));

        try{
            ComLoginVO memberSeq = comAdminMapper.getMemberSeq();
            comLoginVO.setMemNo(memberSeq.getMemNo());

            comAdminMapper.setMember(comLoginVO);
            comAdminMapper.setAuth(comLoginVO);
            result = gsonUtil.toJson(new JsonOutputVo(Status.성공));
        }catch (Exception e){
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패, e));
        }

        return result;
    }

    public String registProc(HttpServletRequest request, ComLoginVO comLoginVO, String tmp) throws NoSuchAlgorithmException {
        String result = "";

        // 비밀번호 sha256 변환
        comLoginVO.setPwd(SecureHashAlgorithm.encryptSHA256(comLoginVO.getPwd()));

        try{
            comAdminMapper.setMember(comLoginVO);
            result = gsonUtil.toJson(new JsonOutputVo(Status.성공));
        }catch (Exception e){
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패, e));
        }

        return result;
    }

    public String login(HttpServletRequest request, HttpServletResponse response, ComLoginVO comLoginVO) throws NoSuchAlgorithmException {
        String result = "";

        HashMap outVo = new HashMap<>();

        comLoginVO.setPwd(SecureHashAlgorithm.encryptSHA256(comLoginVO.getPwd()));

        ArrayList<ComLoginVO> outVoLogin = comAdminMapper.getMember(comLoginVO);
        if(!ZiniUtil.isEmpty(outVoLogin)){
            // 조회한 어드민 타입 넣기
            // session 저장
            HttpSession session = request.getSession(true);
            outVoLogin.get(0).setSessionId(session.getId());

            String tokenResponse = jwtProvider.createToken(Integer.toString(outVoLogin.get(0).getMemNo()));

            Cookie cookie = new Cookie("token", tokenResponse);
            session.setAttribute("Authorization", tokenResponse);
            response.setHeader("Authorization", tokenResponse);

            outVo.put("outVoLogin", outVoLogin);            // 로그인정보
            outVo.put("authorization", tokenResponse);      // 토큰정보

            // 인증번호 sms 보내기
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        }else{
            // 로그인 실패 (아이디 없음)
            result = gsonUtil.toJson(new JsonOutputVo(Status.비밀번호오류));
        }

        return result;
    }

    public String loginIdDuplicated(ComLoginVO comLoginVO){

        int outVo = comAdminMapper.loginIdDuplicated(comLoginVO);

        String result = "";
        if(outVo < 1){
            result = gsonUtil.toJson(new JsonOutputVo(Status.성공));
        }else{
            // 로그인 실패 (아이디 없음)
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }

        return result;
    }

    public ArrayList<ComLoginVO> memNoInfo(ComLoginVO comLoginVO){

        ArrayList<ComLoginVO> outVo = comAdminMapper.memNoInfo(comLoginVO);
        return outVo;
    }

    public String getArea(HttpServletRequest request, ComAreaVO comAreaVO){
        String result = "";

        ArrayList<ComAreaVO> outVo = comAdminMapper.getArea(comAreaVO);

        if(!ZiniUtil.isEmpty(outVo)){
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        }else{
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }

        return result;
    }

    public String getAreaGeom(HttpServletRequest request, ComAreaVO comAreaVO){
        ArrayList<ComAreaVO> outVo = comAdminMapper.getAreaGeom(comAreaVO);

        String result = "";
        if(!ZiniUtil.isEmpty(outVo)){
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        }else{
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }

        return result;
    }

    public String getUpjong(HttpServletRequest request, ComUpjongVO comUpjongVO){
        String result = "";

        HashMap<String, ArrayList<ComUpjongVO>> map = new HashMap<>();
        ArrayList<ComUpjongVO> outVo = comAdminMapper.getUpjong(comUpjongVO);
        if(comUpjongVO.getGubun().equals("upjong2")){

            ComUpjongVO inputVo = new ComUpjongVO();
            inputVo.setGubun("upjong3");
            inputVo.setUpjong1Cd(comUpjongVO.getUpjong1Cd());

            ArrayList<ComUpjongVO> outVo2 = comAdminMapper.getUpjong(inputVo);
            map.put("upjong2", outVo);
            map.put("upjong3", outVo2);
        }else{
            map.put("upjong1", outVo);
        }

        if(!ZiniUtil.isEmpty(map)){
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, map));
        }else{
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }

        return result;
    }

}
