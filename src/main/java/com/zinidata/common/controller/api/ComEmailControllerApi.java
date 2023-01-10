package com.zinidata.common.controller.api;

import com.zinidata.common.service.ComAdminService;
import com.zinidata.common.vo.ComAreaVO;
import com.zinidata.common.vo.ComEmailVO;
import com.zinidata.common.vo.ComLoginVO;
import com.zinidata.common.vo.ComUpjongVO;
import com.zinidata.util.*;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.Properties;

@RequiredArgsConstructor
@Controller
@RequestMapping("/common/email")
class ComEmailControllerApi {

    @Value("${bizmap.email.address}")
    private String emailAddress;

    @Autowired
    GsonUtil gsonUtil;


    /***
     * title        : 제목
     * fromName     : 보내는 사람 이름
     * toAddr       : 받는사람 메일
     * message      : 내용
     * @param request
     * @param comEmailVO
     * @return
     * @throws NoSuchAlgorithmException
     * @throws UnsupportedEncodingException
     * @throws MessagingException
     */
    @ResponseBody
    @PostMapping(value="send")
    @ApiOperation(value="메일전송")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "메일전송")
    })
    public String send(HttpServletRequest request, ComEmailVO comEmailVO) throws NoSuchAlgorithmException, UnsupportedEncodingException, MessagingException {
        String result = "";

        try
        {

            String subject = comEmailVO.getTitle();
            String fromAddr = emailAddress;
            String fromName = comEmailVO.getFromName();
            String emailAddr = comEmailVO.getToAddr();

            StringBuffer msg = new StringBuffer();

            msg.append(comEmailVO.getMessage());

            Properties p = System.getProperties();
            p.put("mail.smtp.starttls.enable", "true");
            p.put("mail.smtp.host", "smtp.naver.com");
            p.put("mail.smtp.auth", "true");
            p.put("mail.smtp.port", "587");

            Authenticator auth = new MyAuthentication();
            Session sess = Session.getInstance(p, auth);
            MimeMessage m_Msg = new MimeMessage(sess);
            try {
                m_Msg.setSentDate(new Date());
                InternetAddress from = new InternetAddress();

                from = new InternetAddress(fromAddr, fromName, "euc-kr");
                m_Msg.setFrom(from);

                InternetAddress to = new InternetAddress(emailAddr);
                m_Msg.setRecipient(Message.RecipientType.TO, to);

                m_Msg.setSubject(MimeUtility.encodeText(subject, "euc-kr", "B"));
                m_Msg.setText(msg.toString(), "euc-kr");
                m_Msg.setHeader("content-Type", "text/html");

                javax.mail.Transport.send(m_Msg);

                result = gsonUtil.toJson(new JsonOutputVo(Status.성공));
            } catch (AddressException addr_e) {
                result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
                addr_e.printStackTrace();
            } catch (MessagingException msg_e) {
                result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
                msg_e.printStackTrace();
            }
        }catch(Exception e){
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
            e.printStackTrace();
        }

        return result;
    }


}
