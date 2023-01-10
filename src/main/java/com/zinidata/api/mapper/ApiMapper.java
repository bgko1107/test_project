package com.zinidata.api.mapper;

import com.zinidata.api.vo.ApiVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.transaction.annotation.Transactional;

@Mapper
public interface ApiMapper {	
	//상품권 판매점 현황

	@Transactional(readOnly = true)
	String getTime(ApiVO apiVO);

}
