package com.zinidata.common.controller.api;

import com.zinidata.common.vo.ComPropertiesVO;
import com.zinidata.util.GsonUtil;
import com.zinidata.util.JsonOutputVo;
import com.zinidata.util.Status;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping("/common/AESEncyptTest")
class ComAESEncyptTestControllerApi {

    @Autowired
    GsonUtil gsonUtil;

    @Value("${bizmap.home.dir}")
    private String homePath;

    @ResponseBody
    @PostMapping(value="/test")
    @ApiOperation(value="프로퍼티암호화")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "프로퍼티암호화")
    })
    public String AESEncyptTest(ComPropertiesVO comPropertiesVO){
        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        encryptor.setProvider(new BouncyCastleProvider());
        encryptor.setPoolSize(2);
        encryptor.setPassword("password");
        encryptor.setAlgorithm("PBEWithSHA256And128BitAES-CBC-BC");

        String jdbcUrlEnc = encryptor.encrypt(comPropertiesVO.getJdbcUrl().replaceAll("amp;", ""));
        String jdbcUrlDec = encryptor.decrypt(jdbcUrlEnc);
        String usernameEnc = encryptor.encrypt(comPropertiesVO.getUsername().replaceAll("amp;", ""));
        String usernameDec = encryptor.decrypt(usernameEnc);
        String passwordEnc = encryptor.encrypt(comPropertiesVO.getPassword().replaceAll("amp;", ""));
        String passwordDec = encryptor.decrypt(passwordEnc);

        comPropertiesVO.setJdbcUrlEnc(jdbcUrlEnc);
        comPropertiesVO.setJdbcUrlDec(jdbcUrlDec);
        comPropertiesVO.setUsernameEnc(usernameEnc);
        comPropertiesVO.setUsernameDec(usernameDec);
        comPropertiesVO.setPasswordEnc(passwordEnc);
        comPropertiesVO.setPasswordDec(passwordDec);


        log.info("jdbcUrl   = " + comPropertiesVO.getJdbcUrl().replaceAll("amp;", ""));
        log.info("username  = " + comPropertiesVO.getUsername().replaceAll("amp;", ""));
        log.info("password  = " + comPropertiesVO.getPassword().replaceAll("amp;", ""));


        log.info("jdbcUrlEnc  = " + jdbcUrlEnc);
        log.info("usernameEnc = " + usernameEnc);
        log.info("passwordEnc = " + passwordEnc);

        log.info("jdbcUrlDec  = " + jdbcUrlDec);
        log.info("usernameDnc = " + usernameDec);
        log.info("passwordDnc = " + passwordDec);

        return gsonUtil.toJson(new JsonOutputVo(Status.성공, comPropertiesVO));

    }
}
