package com.zinidata.util;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

/**
 * JSON output을 위한 VO
 */
@Getter
@Setter
public class JsonOutputVo {

    public JsonOutputVo(){}

    public JsonOutputVo(Status status){
        setStatus(status);
        setTimestamp(ZiniUtil.setTimestampInJsonOutputVo());
    }

    public JsonOutputVo(Status status, Object data){
        setStatus(status);
        setData(data);
        setTimestamp(ZiniUtil.setTimestampInJsonOutputVo());
    }

    public JsonOutputVo(Status status, Object data, ArrayList validationMessageDetail){
        setStatus(status);
        setData(data);
        setTimestamp(ZiniUtil.setTimestampInJsonOutputVo());

        setValidationMessageDetail(validationMessageDetail);
    }

    public JsonOutputVo(ErrorStatus errorStatus){
        setErrorStatus(errorStatus);
        setTimestamp(ZiniUtil.setTimestampInJsonOutputVo());
    }

    public JsonOutputVo(ErrorStatus errorStatus, Object data){
        setErrorStatus(errorStatus);
        setData(data);
        setTimestamp(ZiniUtil.setTimestampInJsonOutputVo());
    }

    private String methodName;

    public JsonOutputVo(ErrorStatus errorStatus, Object data, ArrayList validationMessageDetail, String methodName){
        setErrorStatus(errorStatus);
        setData(data);
        setTimestamp(ZiniUtil.setTimestampInJsonOutputVo());
        setValidationMessageDetail(validationMessageDetail);
        setMethodName(methodName);
    }

    private String result;

    private String code;
    private String messageKey;
    private String message;

    private Object data = "";

    private Object summary;

    private String timestamp;
    public JsonOutputVo(Status status, Object data, ArrayList validationMessageDetail, String methodName){
        setStatus(status);
        setData(data);
        setTimestamp(ZiniUtil.setTimestampInJsonOutputVo());
        setValidationMessageDetail(validationMessageDetail);
        setMethodName(methodName);
    }

    private ArrayList validationMessageDetail = new ArrayList<String>();

    public void setStatus(Status status){
        setCode(status.getMessageCode());
        setMessageKey(status.getMessageKey());
        setResult(status.getResult());
    }

    public void setErrorStatus(ErrorStatus errorStatus){
        setCode(errorStatus.getErrorCode());
        setMessageKey(errorStatus.getMessageKey());
        setResult(errorStatus.getResult());
    }

}
