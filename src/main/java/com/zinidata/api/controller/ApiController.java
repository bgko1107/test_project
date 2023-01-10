package com.zinidata.api.controller;

import com.zinidata.api.service.ApiService;
import com.zinidata.api.vo.ApiVO;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api")
public class ApiController {
	
	private final ApiService service;

	
	@PostMapping(value="getTime")
	@ResponseBody
	@ApiOperation(value="테스트입니다.1")
    @ApiResponses(value = {
    		@ApiResponse(code=200, message = "테스트입니다2)")
    })
	public String getTime(ApiVO apiVO){
		String result = service.getTime(apiVO);
		return result;
	}

}
