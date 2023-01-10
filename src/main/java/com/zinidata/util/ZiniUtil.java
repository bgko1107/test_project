package com.zinidata.util;

import com.zinidata.common.mapper.ComAdminMapper;
import com.zinidata.common.vo.ComLoginVO;
import com.zinidata.common.vo.TokenResponseNoDataVO;
import com.zinidata.config.JWTAuthorizationFilter;
import eproject.Sys;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.core.env.Environment;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

@Slf4j
public class ZiniUtil {

    private static Environment environment;

    private static ComAdminMapper comAdminMapper;

    @Autowired
    private Environment activeEnvironment;

    private static JwtProvider jwtProvider;

    @PostConstruct
    private void init () {
        environment = this.activeEnvironment;
    }

    /**
     * null check
     * @param str
     * @return
     */
    public static boolean isEmpty(Object str) {
        return str == null || "".equals(str) || str.toString().equals("[]");
    }

    public static String CurrentDateTime(){
        LocalDateTime now = LocalDateTime.now();
        String formatedNow = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        return formatedNow;
    }

    public static String escapeCharDecode(String data){
        if(isEmpty(data)){
            return "";
        }
        data = StringUtils.replace(data, "\\\\n", "\\n");
        data = StringUtils.replace(data, "\\\\r", "\\r");
        data = StringUtils.replace(data, "\\\\t", "\\t");
        data = StringUtils.replace(data, "\\\\/", "\\/");
        data = StringUtils.replace(data, "\\\\'", "\\'");
        //data = StringUtils.replace(data, "\\\\\"", "\\\"");
        return data;
    }

    public static String setTimestampInJsonOutputVo(){
        StringBuffer sb = new StringBuffer();
        sb.append(getTimeStamp());
        sb.append("_");
        return sb.toString();
    }

    public static String getTimeStamp() {

        String rtnStr = null;

        // 문자열로 변환하기 위한 패턴 설정(년도-월-일 시:분:초:초(자정이후 초))
        String pattern = "yyyyMMddhhmmssSSS";

        SimpleDateFormat sdfCurrent = new SimpleDateFormat(pattern, LocaleContextHolder.getLocale());
        Timestamp ts = new Timestamp(System.currentTimeMillis());

        rtnStr = sdfCurrent.format(ts.getTime());

        return rtnStr;
    }

    /**
     * 특수문자를 웹 브라우저에서 정상적으로 보이기 위해 특수문자를 처리('<' -> & lT)하는 기능이다
     * @param 	srcString 		- '<'
     * @return 	변환문자열('<' -> "&lt"
     * @exception NullPointerException
     * @see
     */
    public static String getSpclStrCnvr(String srcString) throws NullPointerException{

        String rtnStr = null;

        try {
            StringBuffer strTxt = new StringBuffer("");

            char chrBuff;
            int len = srcString.length();

            for (int i = 0; i < len; i++) {
                chrBuff = (char) srcString.charAt(i);

                switch (chrBuff) {
                    case '<':
                        strTxt.append("&lt;");
                        break;
                    case '>':
                        strTxt.append("&gt;");
                        break;
                    case '&':
                        strTxt.append("&amp;");
                        break;
                    default:
                        strTxt.append(chrBuff);
                }
            }

            rtnStr = strTxt.toString();

        } catch (NullPointerException e) {
            return srcString;
        }

        return rtnStr;
    }

    public static int certNumber(){
        return ThreadLocalRandom.current().nextInt(100000, 1000000);
    }

    public static String randomValue(String type, int cnt) {
        type = type.toLowerCase();

        StringBuffer strPwd = new StringBuffer();
        char[] str = new char[1];
        int i;
        if (type.equals("p")) {
            for(i = 0; i < cnt; ++i) {
                str[0] = (char)((int)(Math.random() * 94.0D + 33.0D));
                strPwd.append(str);
            }
        } else if (type.equals("a")) {
            for(i = 0; i < cnt; ++i) {
                str[0] = (char)((int)(Math.random() * 26.0D + 65.0D));
                strPwd.append(str);
            }
        } else if (type.equals("string")) {
            for(i = 0; i < cnt; ++i) {
                str[0] = (char)((int)(Math.random() * 26.0D + 97.0D));
                strPwd.append(str);
            }
        } else {
            //int i;
            if (type.equals("number")) {
                int[] strs = new int[1];

                for(i = 0; i < cnt; ++i) {
                    strs[0] = (int)(Math.random() * 9.0D);
                    strPwd.append(strs[0]);
                }
            } else if (type.equals("c")) {
                Random rnd = new Random();

                for(i = 0; i < cnt; ++i) {
                    if (rnd.nextBoolean()) {
                        strPwd.append((char)(rnd.nextInt(26) + 97));
                    } else {
                        strPwd.append(rnd.nextInt(10));
                    }
                }
            } else if(type.equals("e")){
                char[] passwordTable =  {'!', '@', '#', '$', '%', '^', '&', '*','(', ')'};
                Random random = new Random(System.currentTimeMillis());
                for(i = 0; i < cnt; i++) {
                    strPwd.append(Character.toString(passwordTable[random.nextInt(passwordTable.length)]));
                }
            }
        }

        return strPwd.toString();
    }
}
