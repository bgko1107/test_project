
var infoWindow = new naver.maps.InfoWindow({
	anchorSkew: true
});

$( document ).ready(function() {
	$('#address').on('keydown', function (e) {
		var keyCode = e.which;

		if (keyCode === 13) { // Enter Key
			searchAddressToCoordinate($('#address').val());
		}
	});

	$('#submit').on('click', function (e) {
		e.preventDefault();

		searchAddressToCoordinate($('#address').val());
	});
});

function searchAddressToCoordinate(address) {
	naver.maps.Service.geocode({
		query: address
	}, function(status, response) {
		if (status === naver.maps.Service.Status.ERROR) {
			return alert('Something Wrong!');
		}

		if (response.v2.meta.totalCount === 0) {
			return alert('주소를 찾을 수 없습니다.\n정확한 주소를 입력 해주세요.');
		}

		var htmlAddresses = [],
			item = response.v2.addresses[0],
			point = new naver.maps.Point(item.x, item.y);

		mapPopClose();

		console.log(item.roadAddress);
		strAdmiNm = item.roadAddress;
		// 이거로 우리 주소 한번더 검색하기
		// item.roadAddress
		// var param = {
		// 	address :item.roadAddress
		// };
		// getAjax('addressInfo', "/analysis/getAddressInfo" ,param, function (id, response, param){
		// 	console.log(response);
		// }, fn_error);

		strCenterx = item.x;
		strCentery = item.y;

		marker = new naver.maps.Marker({
			map     : map,
			position: new naver.maps.LatLng(strCentery, strCenterx),
			icon    : {
				content : '<img class="pic" src="/olive/assets/olive/images/icons/loca_pic.svg" style="width: 32px;">',
				size    : new naver.maps.Size(24, 34),
				origin  : new naver.maps.Point(0, 0),
				anchor  : new naver.maps.Point(13,15),
			}
		});
		markers.push(marker);

		var contentString = makeInfowindowString();

		if(infoWindow != null){
			infoWindow.close();
			infoWindow = "";
		}
		infoWindow = new naver.maps.InfoWindow({
			content        : contentString,
			maxWidth       : 0,
			backgroundColor: "rgba(0,0,0,0)",
			borderColor    : "transparent",
			borderWidth    : 1,
			anchorSize     : new naver.maps.Size(0, 0),
			anchorSkew     : false,
			anchorColor    : "#94B58B",
			pixelOffset    : new naver.maps.Point(195, 225)
		});

		if (infoWindow != null) {
			infoWindow.open(map, marker);
		} else {
			infoWindow.close();
		}

		// 지도 이동
		var tmp = {
			centerx : item.x
			, centery : item.y
		}
		mapMove(tmp);

		// 팝업 이벤트 function
		var data = {
			address : item.roadAddress
		}
		infoWindowEvent(data);

		// 올리브 정보 팝업 열려있으면 제거 하도록
		$(".map_pop.shop").hide();
		$(".map_pic.ico42.olive_pic").removeClass('on');

		getBlockGeom(data);

	});
}

function searchCoordinateToAddress(latlng, gubun) {

	mapPopClose();

	naver.maps.Service.reverseGeocode({
		coords: latlng,
		orders: [
			naver.maps.Service.OrderType.ADDR,
			naver.maps.Service.OrderType.ROAD_ADDR
		].join(',')
	}, function(status, response) {
		if (status === naver.maps.Service.Status.ERROR) {
			return alert('Something Wrong!');
		}

		var items = response.v2.results,
			address = '',
			htmlAddresses = [];

		for (var i=0, ii=items.length, item, addrType; i<ii; i++) {
			item = items[i];
			address = makeAddress(item) || '';
			addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';
		}

		console.log(address);
		strAdmiNm = address;

		markerx = latlng.x;
		markery = latlng.y;

		marker = new naver.maps.Marker({
			map     : map,
			position: new naver.maps.LatLng(markery, markerx),
			icon    : {
				content : '<img class="pic" src="/olive/assets/olive/images/icons/loca_pic.svg" style="width: 32px;">',
				size    : new naver.maps.Size(24, 34),
				origin  : new naver.maps.Point(0, 0),
				anchor  : new naver.maps.Point(13,15),
			}
		});
		markers.push(marker);

		var contentString = makeInfowindowString();

		if(infoWindow != null){
			infoWindow.close();
			infoWindow = "";
		}
		infoWindow = new naver.maps.InfoWindow({
			content        : contentString,
			maxWidth       : 0,
			backgroundColor: "rgba(0,0,0,0)",
			borderColor    : "transparent",
			borderWidth    : 1,
			anchorSize     : new naver.maps.Size(0, 0),
			anchorSkew     : false,
			anchorColor    : "#94B58B",
			pixelOffset    : new naver.maps.Point(195, 225)
		});

		if (infoWindow != null) {
			infoWindow.open(map, marker);
		} else {
			infoWindow.close();
		}

		// 팝업 이벤트 function (주소 세팅 부분 있음)
		var data = {
			address : address
		}
		infoWindowEvent(data);

		var data = {
			centerx : markerx
			, centery : markery
		}
		if(!common.isEmpty(latlng.bookmarkNo)){
			data.bookmarkNo = latlng.bookmarkNo;
		}
		// 북마크 등록 여부 체크
		bookmarkCheck(data);

		// 올리브 정보 팝업 열려있으면 제거 하도록
		$(".map_pop.shop").hide();
		$(".map_pic.ico42.olive_pic").removeClass('on');

		if(common.isEmpty(gubun)){
			getBlockGeom(data);
		}
	});
}

function makeAddress(item) {
	if (!item) {
		return;
	}

	var name = item.name,
		region = item.region,
		land = item.land,
		isRoadAddress = name === 'roadaddr';

	var sido = '', sigugun = '', dongmyun = '', ri = '', rest = '';

	if (hasArea(region.area1)) {
		sido = region.area1.name;
	}

	if (hasArea(region.area2)) {
		sigugun = region.area2.name;
	}

	if (hasArea(region.area3)) {
		dongmyun = region.area3.name;
	}

	if (hasArea(region.area4)) {
		ri = region.area4.name;
	}

	if (land) {
		if (hasData(land.number1)) {
			if (hasData(land.type) && land.type === '2') {
				rest += '산';
			}

			rest += land.number1;

			if (hasData(land.number2)) {
				rest += ('-' + land.number2);
			}
		}

		if (isRoadAddress === true) {
			if (checkLastString(dongmyun, '면')) {
				ri = land.name;
			} else {
				dongmyun = land.name;
				ri = '';
			}

			if (hasAddition(land.addition0)) {
				rest += ' ' + land.addition0.value;
			}
		}
	}
	return [sido, sigugun, dongmyun, ri, rest].join(' ');
}

function hasArea(area) {
	return !!(area && area.name && area.name !== '');
}

function hasData(data) {
	return !!(data && data !== '');
}

function checkLastString (word, lastString) {
	return new RegExp(lastString + '$').test(word);
}

function hasAddition (addition) {
	return !!(addition && addition.value);
}

function getBlockGeom(data){
	var proj4 = {"x" : data.centerx, "y" : data.centery}
	var param = {
		xAxis: common.proj4(proj4, 6645).x
		, yAxis: common.proj4(proj4, 6645).y
		, zoomStatus : "blockCd"
	}
	getAjax("getBlockGeom", "/analysis/admiFeatures", param, function (id, response, param){
		// geomjson 데이터로 변경하기
		// 범위 데이터 삭제
		markerGeoJsonArr.forEach(function (val, idx){
			map.data.removeGeoJson(val);
		});
		markerGeoJsonArr = [];

		var result = getGeomJson("blockFeatures", "FeatureCollection", response.data);
		markerGeoJsonArr.push(result);
		map.data.addGeoJson(result);
		map.data.setStyle(function(feature){
			if(feature.getProperty('id') == response.data[0].id){
				var styleOptions = {
					fillOpacity : 1
					, strokeColor : '#ff8383'
					, fillColor : 'rgba(255,180,180,0.5)'
					, storkeWeight : 0.1
					, storkeOpacity : 0.1
				}

				return styleOptions;
			}
		});

	}, fn_error);
}