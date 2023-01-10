

var strGeoJson = "";
var strAdmiCd = "";
var strMegaNm = "";
var strCtyNm = "";
var strAdmiNm = "";
var strAreaNm = "";
var strUpjongCd = "";
var strUpjongNm = "";
var strGeomType = "";
var strAdmiNm = "";
var strRadius = 0;
var strReportGubun = "";

var fPoint = '';
var path = '';
var custom = false;
var rClick = false;
var custPoint = '';
var geomType = "";

var fileInfo = {};

var CENTER
var mapOptions = {};
var map;
var areaJsonArr = [] // 지역 선택 범위
var geoJsonArr = []; // 범위 목록
var markers = [];	// 마커 목록
var geoJsonArrRising = []; // 범위
var circle = [];
var polygon = [];
var infoWindow = null;      // 정보창
var marker = null;          // 마커

var mousemoveListener;
var clickListener;
var dragendListener;
var geomClickListener;
var densityClickListener;
var mouseoutListener;
var rightClickListener;

var strResponse; // resize 할때 다시 부르기 위해

var strCenterx;	// 지역선택에서 뒤로가기 눌렀을때 다시 분석자리로 복귀 하기 위해
var strCentery;	// 지역선택에서 뒤로가기 눌렀을때 다시 분석자리로 복귀 하기 위해


var fillColor = {
	0: 'rgba(182,182,182,0.71)'
	, 5: '#8500ab80'
	, 4: '#542EC080'
	, 3: '#1F67FD70'
	, 2: '#16b1d370'
	, 1: '#71CEB280'
};
var strokeColor = {
	0: 'rgb(182 182 182)'
	, 5: '#9f33b7'
	, 4: '#775dbe'
	, 3: '#7aa0fa'
	, 2: '#65bece'
	, 1: '#9ad2c3'
};
var mouseoverAfterColor = {
	0: 'rgb(112,112,112)'
	, 5: '#8500ab'
	, 4: '#542EC0'
	, 3: '#1F67FD'
	, 2: '#16b1d3'
	, 1: '#71CEB2'
};


var numberMouseSw = false;

$( document ).ready(function() {

	CENTER = new naver.maps.LatLng(37.56648, 126.97787);
	mapOptions = {
		center: new naver.maps.LatLng(37.56648, 126.97787),
		zoom: 14,
	};

	map = new naver.maps.Map('map', mapOptions);

	setTimeout(function (){
		// 초기 좌표 지역명 세팅
		var data={
			xAxis: 126.97787
			, yAxis: 37.56648
			, zoomStatus : "admiCd"
		}
		getAjax("getAreaNm", "/analysis/admiFeatures", data, function (id, response){
			var html = '<div class="loca_input ico16 ico_location_full_c">' +
							response.data[0].megaNm + " " + response.data[0].ctyNm + " " + response.data[0].admiNm +
							'</div>' +
							'<button class="loca_input again ico16 ico_again_line_wh" id="reSearch" style="display: none;">' +
							'현 지도에서 검색' +
							'</button>' ;
			$("#map").append(html);

			//현 지도에서 검색
			$("#reSearch").on('click', function (){
				$(this).hide();
			});
		}, fn_error,"POST", false);
	}, 100);

	addListener();
});

function addListener(){
// 기본보고서 Listener
	removeListener();

	// 범위 삭제
	geoJsonArr.forEach(function (val, idx) {
		map.data.removeGeoJson(val);
	});
	geoJsonArr = [];
	// 범위 삭제
	areaJsonArr.forEach(function (val, idx){
		map.data.removeGeoJson(val);
	});
	areaJsonArr = [];


	// 지도 마우스 이동
/*	mousemoveListener = naver.maps.Event.addListener(map, 'mousemove', function (e){
		var zoomStatus = "blockCd";
		setFeatures(e.latlng.x, e.latlng.y, zoomStatus, 'move');
	});*/

	// 지도 클릭
	clickListener = naver.maps.Event.addListener(map, 'click', function (e){
		if((geomType == "" || geomType == "circle") && !custom){
			removeMarkers();
			if (marker != null) marker.setMap(null);
			if (circle.length != 0) circle.setMap(null);
			if (polygon.length != 0) polygon.setMap(null);

			// 네이버 api
			searchCoordinateToAddress(e.coord);
		}else{
			var fLat = e.latlng.y;
			var fLng = e.latlng.x;
			var point = e.coord;

			if(fPoint == ''){
				fPoint = fLng + ' ' + fLat;
				var marker = new naver.maps.Marker({
					map: map,
					position : new naver.maps.LatLng(fLat, fLng)
				});
			}
			custPoint += fLng + ' ' + fLat + ',';
			path = polygon.getPaths().getAt(0);
			path.push(point);

			// 최초 클릭 마커 안보이도록
			$("map[name^='nmarker']").parent().hide();
		}
	});

	rightClickListener = naver.maps.Event.addListener(map, 'rightclick', function(e){
		rightClick(e);
	});

	// 지도 드레그 종료
	dragendListener = naver.maps.Event.addListener(map, 'dragend', function (e){
		var data={
			xAxis: e.latlng.x
			, yAxis: e.latlng.y
			, zoomStatus : "admiCd"
		}
		// 현위치 주소 조회
		getCenterAddress(data);
	});

	// 지도 로딩 완료 이벤트
	naver.maps.Event.addListener(map, 'tilesloaded', function (e){
		// 네이버 로고
		$("#map > div:nth-child(2)").css('display','none');
		$("#map > div:nth-child(3)").css('display','none');
	});
}

// 현위치 주소 조회
function getCenterAddress(data){
	var data={
		xAxis: data.xAxis
		, yAxis: data.yAxis
		, zoomStatus : data.zoomStatus
	}
	getAjax("getAreaNm", "/analysis/admiFeatures", data, function (id, response){
		$(".loca_input.ico16.ico_location_full_c").text(response.data[0].megaNm + " " + response.data[0].ctyNm + " " + response.data[0].admiNm);
		$("#reSearch").show();
	}, fn_error,"POST", false);
}

function setFeatures(centerx,centery, zoomStatus, gubun){
	var data={
		xAxis: centerx
		, yAxis: centery
		, zoomStatus : zoomStatus
		, gubun : gubun
		, upjongCd : strUpjongCd
		, admiCd : strAdmiCd
	}
	getAjax("features", "/analysis/admiFeatures", data, fn_succ_features, fn_error,"POST", false);
}

function removeListener(){
	naver.maps.Event.removeListener(mousemoveListener);
	naver.maps.Event.removeListener(clickListener);
	naver.maps.Event.removeListener(geomClickListener);
	naver.maps.Event.removeListener(densityClickListener);
	naver.maps.Event.removeListener(mouseoutListener);

}

function fn_error(response) {
	console.log(response);
	console.log('error');
	alert(response.message);
}

function fn_succ_features(id, response, param){
	if(!common.isEmpty(strGeoJson)) map.data.removeGeoJson(strGeoJson);

	if(common.isEmpty(response.data[0])){
		return;
	}

	strMegaNm = response.data[0].megaNm;
	strCtyNm = response.data[0].ctyNm;
	strAdmiNm = response.data[0].admiNm;
	strAreaNm = response.data[0].megaNm + " " + response.data[0].ctyNm + " " + response.data[0].admiNm;

	if(response.result != "success"){
		alert(response.message);
		return;
	}

	// geomjson 데이터로 변경하기
	// 범위 데이터 삭제
	geoJsonArr.forEach(function (val, idx){
		map.data.removeGeoJson(val);
	});
	geoJsonArr = [];

	var result = getGeomJson("blockFeatures", "FeatureCollection", response.data);
	strGeoJson = result;
	geoJsonArr.push(strGeoJson);
	map.data.addGeoJson(result);
	map.data.setStyle(function(feature){
		var styleOptions = {
			fillOpacity : 1
			, fillColor : "rgba(31, 103, 253, 0.25)"
			, strokeColor : "rgba(31, 103, 253)"
			, storkeWeight:3
			, storkeOpacity : 1
		}

		return styleOptions;
	});

	/*if(!map.data.hasListener('click')){
		map.data.addListener('click', function (e){

			console.log("-------------1");
			removeMarkers();
			if (marker != null) marker.setMap(null);
			if (circle.length != 0) circle.setMap(null);
			if (polygon.length != 0) polygon.setMap(null);

			// 네이버 api
			searchCoordinateToAddress(e.coord);


			// strCenterx = e.coord.x;
			// strCentery = e.coord.y;
			//
			// if (marker != null) marker.setMap(null);
			// if (circle.length != 0) circle.setMap(null);
			//
			// marker = new naver.maps.Marker({
			// 	map     : map,
			// 	position: new naver.maps.LatLng(strCentery, strCenterx),
			// 	icon    : {
			// 		content : '<img class="pic" src="/olive/assets/olive/images/icons/ico_map_pic.svg" style="width: 32px;">',
			// 		size    : new naver.maps.Size(24, 34),
			// 		origin  : new naver.maps.Point(0, 0),
			// 		anchor  : new naver.maps.Point(13,15),
			// 	}
			// });
			//
			// var contentString = makeInfowindowString();
			//
			// if(infoWindow != null){
			// 	infoWindow.close();
			// 	infoWindow = "";
			// }
			// infoWindow = new naver.maps.InfoWindow({
			// 	content        : contentString,
			// 	maxWidth       : 0,
			// 	backgroundColor: "rgba(0,0,0,0)",
			// 	borderColor    : "transparent",
			// 	borderWidth    : 1,
			// 	anchorSize     : new naver.maps.Size(0, 0),
			// 	anchorSkew     : false,
			// 	anchorColor    : "#94B58B",
			// 	pixelOffset    : new naver.maps.Point(130, 30)
			// });
			//
			// if (infoWindow != null) {
			// 	infoWindow.open(map, marker);
			// } else {
			// 	infoWindow.close();
			// }

		});
	}*/
}

// 반경 버튼 선택
function getRd(radiusVal) {
	strGeomType = 'circle';
	geomType = 'circle';

	if (circle.length != 0) circle.setMap(null);
	if (polygon.length != 0) polygon.setMap(null);
	strRadius = radiusVal;

	circle = new naver.maps.Circle({
		map : map
		, center: new naver.maps.LatLng(strCentery, strCenterx)
		, radius : strRadius
		, strokeColor : '#ff8383'
		, fillColor : 'rgba(255,180,180,0.5)'
		, strokeOpacity : 1
		, storkeWeight: 3
	});
}

function getDraw(){
	alert('영역 선택이 완료 되었다면 영역 밖에서 우클릭, 취소시 ESC를 눌러주세요.');

	strGeomType = 'polygon';
	geomType = 'polygon';

	if (circle.length != 0) circle.setMap(null);
	if (polygon.length != 0) polygon.setMap(null);

	custom = true;
	rClick = false;

	polygon = new naver.maps.Polygon({
		map:map
		, paths:[[]]
		, strokeColor : '#ff8383'
		, fillColor : 'rgba(255,180,180,0.5)'
		, fillOpacity : 0.3
		, storkeOpacity : 0.6
		, storkeWeight : 3
		, clickavle: true
	});

	// 마우스 클릭을 위해 팝업 비활성화
	$(".map_pop").parent().parent().hide();
	// 마우스 이동 이벤트 제거
	naver.maps.Event.removeListener(mousemoveListener);
}

function rightClick(e){
	if(custom && !rClick){
		custPoint = custPoint + fPoint;
		// 우클릭 반복 금지를 위해
		geomType = "";
		rClick = true;

		// 팝업 활성화
		$(".map_pop").parent().parent().show();

		custom = false;
		polygon.setOptions('strokeColor', '#ff8383');
		polygon.setOptions('fillColor', 'rgba(255,180,180,0.5)');
	}
}


function reSearch(){

	var mapCenter = map.getCenter();
	var drag_lng = mapCenter.lng();	// x
	var drag_lat = mapCenter.lat();	// y

	strCenterx = mapCenter.lng();
	strCentery = mapCenter.lat();

	$(".reSearch").css('display','none');

	LoadingBar(true);
}

function removeMarkers(){
	for(var i=0; i< markers.length; i++){
		markers[i].setMap(null);
	}
	markers = [];
}

function LoadingBar(gubun){
	gubun ? $(".modal.modal2").show() : $(".modal.modal2").hide();
	gubun ? $(".loader.loader--style3").show() : $(".loader.loader--style3").hide();
}
function mapPopClose(){
	removeMarkers();
	if (circle.length != 0) circle.setMap(null);
	if (polygon.length != 0) polygon.setMap(null);
	infoWindow.close();

	strRadius = 0;
	strGeomType = "";
	custPoint = "";
	strAdmiNm = "";
}
const makeInfowindowString = () =>{
    const contentString = [
		'<div class="map_pop">'
		+'	<div class="map_pop_header cb">'
		+'		<p class="fl ico16 ico_location_full_c">광희동-E-24</p>'
		+'		<div class="close_map_pop fr">'
		+'			<a class="ico20 ico_close_line_g" href="javascript:;" onclick="mapPopClose();"></a>'
		+'		</div>'
		+'	</div>'
		+'	<div class="map_pop_body pad">'
		+'		<div class="radio_base">'
		+'			<div class="pad w100 on">'
		+'				<label for="which_report1">'
		+'					<input type="radio" id="which_report1" name="which_report" checked="checked">'
		+'						<span>출점후보지 상세보고서</span>'
		+'				</label>'
		+'			</div>'
		+'			<div class="pad w100">'
		+'				<label for="which_report2">'
		+'					<input type="radio" id="which_report2" name="which_report">'
		+'						<span>상권 상세보고서</span>'
		+'				</label>'
		+'				<p class="reference">반경을 추가하여 상권 상세보고서 생성</p>'
		+'				<div class="btn_align_box" style="display: none;">'
		+'					<div class="btn_align mb4">'
		+'						<button class="btn4" value=400 onclick="getRd(this.value);">400m</button>'
		+'						<button class="btn4" value=500 onclick="getRd(this.value);">500m</button>'
		+'					</div>'
		+'					<div class="btn_align mb8">'
		+'						<button class="btn4" value=1000 onclick="getRd(this.value);">1000m</button>'
		+'						<button class="btn4" value=1500 onclick="getRd(this.value);">1500m</button>'
		+'					</div>'
		+'					<div class="btn_align">'
		+'						<button class="btn4 ico14 ico_pencil_line_b w100" id="getDraw" onclick="getDraw();">직접그리기</button>'
		+'					</div>'
		+'				</div>'
		+'			</div>'
		+'		</div>'
		+'	</div>'
		+'	<div class="map_pop_footer pad">'
		+'		<div class="button_box">'
		+'			<button class="btn6 ico20 ico_heart_line_g" id="setBookMark">'
		+'				관심구역'
		+'			</button>'
		+'			<button class="btn1 ico14 ico_board_line_wh" id="getReport">'
		+'				상세보고서 생성'
		+'			</button>'
		+'		</div>'
		+'	</div>'
		+'</div>'
    ].join('');
    return contentString;
}


function infoWindowEvent(data){

	$(".fl.ico16.ico_location_full_c").text(data.address);

	$("#which_report1").on('click', function (){
		$(".pad.w100").removeClass('on');
		$(this).parent().parent().addClass('on');
		$(".btn_align_box").hide();

		strGeomType = "";
		if (circle.length != 0) circle.setMap(null);
		if (polygon.length != 0) polygon.setMap(null);
	});

	$("#which_report2").on('click', function (){
		$(".pad.w100").removeClass('on');
		$(this).parent().parent().addClass('on');
		$(".btn_align_box").show();

		strGeomType = "";
		if (circle.length != 0) circle.setMap(null);
		if (polygon.length != 0) polygon.setMap(null);
	});

	// 북마크 등록 기능
	$("#setBookMark").on('click', function (){
		if($(this).hasClass("on")){
			var data = {
				bookmarkNo : $(this).data('bookmarkno')
				, delYn : 'Y'
			}
			getAjax("setBookMark", "/analysis/setBookmark", data, function (id, response, param){
				console.log(response);
				var param = {
					memNo : sessionStorage.getItem("memNo")
				}
				getAjax("getBookmark", '/analysis/getBookmark', param, fn_list, fn_error);
			}, fn_error);
		}else{
			var data = {
				memNo : sessionStorage.getItem("memNo")
				, centerx : strCenterx
				, centery : strCentery
				, range : strRadius
				, type : $("#which_report1").prop('checked') ? "0" : ($("#which_report2").prop('checked') ? "1" : "0")
				, gubun : strGeomType
				, custPoint : 'LINESTRING( ' + custPoint + ' )'
				, admiNm : strAdmiNm
				, delYn : 'N'
			}
			getAjax("setBookMark", "/analysis/setBookmark", data, function (id, response, param){
				console.log(response);
				if(response.message != "success"){
					alert('북마크 등록 실패');
				}else{
					var param = {
						memNo : sessionStorage.getItem("memNo")
					}
					getAjax("getBookmark", '/analysis/getBookmark', param, fn_list, fn_error);
				}
			}, fn_error);
		}
	});


}

function bookmarkCheck(data){
	getAjax("getBookmark", '/analysis/getBookmark', data, function (id, response, param){
		console.log(response);
		if(response.message == "success"){
			$("#setBookMark").addClass('on');
			$("#setBookMark").attr('data-bookmarkno', response.data[0].bookmarkNo);
			(response.data[0].type == '0') ? $("#which_report1").click() : $("#which_report2").click()
		}
	}, fn_error);

}