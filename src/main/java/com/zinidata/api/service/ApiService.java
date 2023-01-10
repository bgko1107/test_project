package com.zinidata.api.service;

import com.google.gson.Gson;
import com.zinidata.api.mapper.ApiMapper;
import com.zinidata.api.vo.ApiVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApiService {

	@Autowired
	private final ApiMapper apiMapper;

	//상품권 판매점 현황
	public String getTime(ApiVO apiVO) {

		String outVo = apiMapper.getTime(apiVO);

		System.out.println(outVo);

		Gson gson = new Gson();
		String result = gson.toJson(outVo);

		return result;
	}
}
