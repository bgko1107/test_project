
var strMenuGubun = "0"; // 0: 아무것도 선택 안함, 1:매출, 2:고객, 3:금융, 4:지역, 5:오늘드림, 6:관심지역
var strMenuName = "";

var strGeoJson = "";
var strAdmiCd = "";
var strMegaNm = "";
var strCtyNm = "";
var strAreaNm = "";
var strUpjongCd = "";
var strUpjongNm = "";
var strGeomType = "";
var strAdmiNm = "";
var strRadius = 0;

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
var geoJsonArrRising = []; // 범위
var circle = [];
var polygon = [];
var infoWindow = null;      // 정보창
var marker = null;          // 마커
var markers = [];          // 마커
var markerx;			// 마커 x
var markery;			// 마커 y
var markerGeoJsonArr = []; // 범위 목록


var oliveMarkers = [];			// 올리브 마커 목록
var oliveMarker = null; 		// 올리브 마커
var oliveInfoWindow = null;     // 올리브 정보창

var mapMarkers = [];	// 메뉴별 마커 목록
var mapMarker = null;	// 메뉴 마컬

var taskGeoJsonArr = [];		// 매출, 고객, 금융, 지역, 오늘드림 범위 데이터

var mouseoverBeforColor = "";
var mouseoverAfterColor = 'rgba(36,133,255,0.9)';

var mousemoveListener;   // 지도 마우스 무브
var clickListener;       // 지도 클릭
var dragendListener;	 // 지도 드래그
var geomClickListener;   // 상세 보고서 범위
var mouseoverListener;   // 지도 범위 마우스 오버
var mouseoutListener;    // 지도 범위 마우스 아웃
var rightClickListener;	 // 지도 마우스 우클릭
var areaClickListener;   // 지도 범위 클릭
var areaRightClickListener;   // 지도 범위에서 우클릭

var strResponse; // resize 할때 다시 부르기 위해

var strCenterx;	// 지역선택에서 뒤로가기 눌렀을때 다시 분석자리로 복귀 하기 위해
var strCentery;	// 지역선택에서 뒤로가기 눌렀을때 다시 분석자리로 복귀 하기 위해

var legend = {
	1 : '#EE6737'
	, 2 : '#F38951'
	, 3 : '#ECC34C'
	, 4 : '#A2CC80'
	, 5 : '#80AD9A'
	, 0 : '#9fa2b2'
}

var numberMouseSw = false;

$( document ).ready(function() {

	$(document).keydown(function(event) {

		// 키보드 esc 키 입력 이벤트
		if ( event.keyCode == 27 || event.which == 27 ) {
			custPoint = "";
			fPoint = "";
			geomType = "";
			rClick = false;
			custom = false;
			strRadius = 0;
			strGeomType = "";

			if (circle.length != 0) circle.setMap(null);
			if (polygon.length != 0) polygon.setMap(null);

			// 팝업 활성화
			$(".map_pop").parent().parent().show();
			$(".btn_align_box > .btn_align > .btn4").removeClass('on');
		}
	});

	strCenterx = 126.97787;
	strCentery = 37.56648;

	CENTER = new naver.maps.LatLng(strCentery, strCenterx);
	mapOptions = {
		center: new naver.maps.LatLng(strCentery, strCenterx),
		zoom: 14,
	};

	map = new naver.maps.Map('map', mapOptions);

	setTimeout(function (){
		// 초기 좌표 지역명 세팅
		var data={
			xAxis: strCenterx
			, yAxis: strCentery
			, zoomStatus : "admiCd"
		}
		getAjax("getAreaNm", "/analysis/admiFeatures", data, function (id, response){
			setTimeout(function (){
				$(".loca_input.ico16.ico_location_full_c").text(response.data[0].megaNm + " " + response.data[0].ctyNm + " " + response.data[0].admiNm);

				var html = '<button class="loca_input again ico16 ico_again_line_wh" id="reSearch" style="display: none;">' +
								'현 지도에서 검색' +
								'</button>' ;
				$("#map").append(html);

				$(".ico_location_full_c").show();

				//현 지도에서 검색
				$("#reSearch").on('click', function (){
					$(this).hide();
					removeOliveMarkers();
					//요약보고서 창 닫기
					$(".handle.tab_right_handle").click();
					//
					mapPopClose();
					$('.pc_body_ul > li').each(function (idx){
						if($(this).hasClass('on')){
							if(strMenuGubun == "1"){
								(idx == 0) ? salesTask('task1') : "";
								(idx == 1) ? salesTask('task2') : "";
							}else if(strMenuGubun == "2"){
								console.log("run CustomerTask");
								var idx = 0;
								if($('.pc_body_ul > li').eq(1).hasClass("on")){
									idx = 1
								}else if($('.pc_body_ul > li').eq(2).hasClass("on")){
									idx = 2;
								}
								CustomerTask(idx);
							}else if(strMenuGubun == "3"){
								FinanceTask();
							}else if(strMenuGubun == "4"){
								if(idx == 0){
									getMapGeom(1000);
									getFlowpop();
								}
								(idx == 1) ? getSisul() : "";
							}else if(strMenuGubun == "5"){
								getMapGeom(2000, "admi");
								areaJsonMouseListenerEvent();
							}
						}
					});
				});
			}, 100);

		}, fn_error,"POST", true);
	}, 100); // 최초 megaCd 조회 이후 map에 넣어야 지도 안깨짐

	addListener();
});

function addListener(){
	// 기본보고서 Listener
	removeListener();

	// 마커 범위 삭제
	geoJsonArr.forEach(function (val, idx) {
		map.data.removeGeoJson(val);
	});
	geoJsonArr = [];

	// 지도 범위 삭제
	removeAreaGeom()

	// 지도 클릭
	clickListener = naver.maps.Event.addListener(map, 'click', function (e){
		if((geomType == "" || geomType == "circle") && !custom){
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
		var mapCenter = map.getCenter();
		strCenterx = mapCenter.lng();
		strCentery = mapCenter.lat();

		var data={
			centerx: strCenterx
			, centery: strCentery
			, zoomStatus : "admiCd"
		}

		// 현위치 주소 조회
		getCenterAddress(data);
		oliveInfoWindowMove();
	});

	// 지도 로딩 완료 이벤트
	naver.maps.Event.addListener(map, 'tilesloaded', function (e){
		// 네이버 로고
		$("#map > div:nth-child(2)").css('display','none');
		$("#map > div:nth-child(3)").css('display','none');
	});


	naver.maps.Event.addListener(map, 'drag', function (e){
		$(".map_pop.shop").hide();
	});

	// 네이버 지도 줌 변화 감지
	naver.maps.Event.addListener(map, 'zoom_changed', function(zoom) {
		setTimeout(function (){
			oliveInfoWindowMove();
		}, 50);
	});
}

// 현위치 주소 조회
function getCenterAddress(data){
	data.xAxis = data.centerx;
	data.yAxis = data.centery;
	getAjax("getAreaNm", "/analysis/admiFeatures", data, function (id, response){
		if(!common.isEmpty(response.data)){

			strMegaCd = response.data[0].megaCd;
			strCtyCd = response.data[0].ctyCd;
			strAdmiCd = response.data[0].admiCd;
			$(".loca_input.ico16.ico_location_full_c").text(response.data[0].megaNm + " " + response.data[0].ctyNm + " " + response.data[0].admiNm);
			if(strMenuGubun != 0 && strMenuGubun != 6){
				$("#reSearch").show();
			}
		}
	}, fn_error,"POST", true);
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
	naver.maps.Event.removeListener(mouseoverListener);
	naver.maps.Event.removeListener(mouseoutListener);
	naver.maps.Event.removeListener(areaClickListener);
	naver.maps.Event.removeListener(areaRightClickListener);
}

function fn_error(response) {
	console.log(response);
	console.log('error');
	// alert(response.message);
	if(response.status == 403){
		alert("로그인 정보가 없습니다");
		logout();
	}else{
		alert("에러 발생 [관리자 문의]");
	}
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

	$(".handle.tab_right_handle").click();

	strGeomType = 'circle';
	geomType = 'circle';

	if (circle.length != 0) circle.setMap(null);
	if (polygon.length != 0) polygon.setMap(null);
	strRadius = radiusVal;

	$(".btn_align_box > .btn_align > .btn4").removeClass('on');
	$(".m" + radiusVal).addClass('on');

	circle = new naver.maps.Circle({
		map : map
		, center: new naver.maps.LatLng(markery, markerx)
		, radius : strRadius
		, strokeColor : '#ff8383'
		, fillColor : 'rgba(255,180,180,0.5)'
		, strokeOpacity : 3
		, storkeWeight: 6
	});
}

function getDraw(){
	alert('영역 선택이 완료 되었다면 영역 밖에서 우클릭, 취소시 ESC를 눌러주세요.');

	$(".handle.tab_right_handle").click();

	strGeomType = 'polygon';
	geomType = 'polygon';

	if (circle.length != 0) circle.setMap(null);
	if (polygon.length != 0) polygon.setMap(null);

	custom = true;
	rClick = false;

	$(".btn_align_box > .btn_align > .btn4").removeClass('on');
	$(".draw").addClass('on');

	polygon = new naver.maps.Polygon({
		map:map
		, paths:[[]]
		, strokeColor : '#ff8383'
		, fillColor : 'rgba(255,180,180,0.5)'
		, fillOpacity : 1
		, storkeOpacity : 1
		, storkeWeight : 3
		, clickavle: true
	});

	// 마우스 클릭을 위해 팝업 비활성화
	$(".map_pop.marker").parent().parent().hide();
	// 마우스 이동 이벤트 제거
	naver.maps.Event.removeListener(mousemoveListener);
}

function rightClick(e){
	if(custom && !rClick){
		custPoint = custPoint + fPoint;
		fPoint = "";
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


/*function reSearch(){

	var mapCenter = map.getCenter();
	var drag_lng = mapCenter.lng();	// x
	var drag_lat = mapCenter.lat();	// y

	strCenterx = mapCenter.lng();
	strCentery = mapCenter.lat();

	$(".reSearch").css('display','none');

	LoadingBar(true);
}*/

function removeMarkers(){
	for(var i=0; i< markers.length; i++){
		markers[i].setMap(null);
	}
	markers = [];
	geoJsonArr.forEach(function (val, idx) {
		map.data.removeGeoJson(val);
	});
	geoJsonArr = [];

}
function removeOliveMarkers(){
	for(var i=0; i< oliveMarkers.length; i++){
		oliveMarkers[i].setMap(null);
	}
	oliveMarkers = [];
	$(".map_pop.shop").hide();
}
function removeMapMarkers(){
	for(var i=0; i< mapMarkers.length; i++){
		mapMarkers[i].setMap(null);
	}
	mapMarkers = [];
}
function removeAreaGeom(){
	areaJsonArr.forEach(function (val, idx) {
		map.data.removeGeoJson(val);
	});
	areaJsonArr = [];
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
		'<div class="map_pop marker">'
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
		+'						<button class="btn4 m400" value=400 onclick="getRd(this.value);">400m</button>'
		+'						<button class="btn4 m500" value=500 onclick="getRd(this.value);">500m</button>'
		+'					</div>'
		+'					<div class="btn_align mb8">'
		+'						<button class="btn4 m1000" value=1000 onclick="getRd(this.value);">1000m</button>'
		+'						<button class="btn4 m1500" value=1500 onclick="getRd(this.value);">1500m</button>'
		+'					</div>'
		+'					<div class="btn_align">'
		+'						<button class="btn4 ico14 ico_pencil_line_b w100 draw" id="getDraw" onclick="getDraw();">직접그리기</button>'
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

		var data = {
			centerx: markerx
			, centery: markery
		};
		getBlockGeom(data);
	});

	$("#which_report2").on('click', function (){
		$(".pad.w100").removeClass('on');
		$(this).parent().parent().addClass('on');
		$(".btn_align_box").show();

		strGeomType = "";
		if (circle.length != 0) circle.setMap(null);
		if (polygon.length != 0) polygon.setMap(null);

		markerGeoJsonArr.forEach(function (val, idx){
			map.data.removeGeoJson(val);
		});
		markerGeoJsonArr = [];
	});

	// 북마크 등록 기능
	$("#setBookMark").on('click', function (){
		if($(this).hasClass("on")){
			if(confirm("관심지역에서 해제 하시겠습니까?")) {
				var data = {
					centerx: markerx
					, centery: markery
					, delYn: 'Y'
				}
				getAjax("setBookMark", "/analysis/setBookmark", data, function (id, response, param) {
					bookmarkCheck(param);

					custPoint = "";
					fPoint = "";
					geomType = "";
					rClick = false;
					custom = false;
					strRadius = 0;
					strGeomType = "";
					if (circle.length != 0) circle.setMap(null);
					if (polygon.length != 0) polygon.setMap(null);

					if (strMenuGubun == 6) {
						var param = {};
						getAjax("getBookmark", '/analysis/getBookmark', param, fn_bookmarkList, fn_error);
					}
				}, fn_error);
			}
		}else{
			var data = {
				centerx : markerx
				, centery : markery
				, range : strRadius
				, type : $("#which_report1").prop('checked') ? "0" : ($("#which_report2").prop('checked') ? "1" : "0")
				, gubun : strGeomType
				, custPoint : 'LINESTRING( ' + custPoint + ' )'
				, admiNm : strAdmiNm
				, delYn : 'N'
			}
			getAjax("setBookMark", "/analysis/setBookmark", data, function (id, response, param){
				if(response.message != "success"){
					alert('북마크 등록 실패');
				}else{
					bookmarkCheck(param);
					if (strMenuGubun == 6) {
						var param = {};
						getAjax("getBookmark", '/analysis/getBookmark', param, fn_bookmarkList, fn_error);
					}
				}
			}, fn_error);
		}

	});


	$("#getReport").on('click', function (){
		if($("#which_report1").prop('checked')){
			strReportGubun = "opening";
		}
		if($("#which_report2").prop('checked')){
			strReportGubun = "place";
		}
		setReport();
		// var param = {
		// };
		// getAjax("getReport", '', param, setReport, fn_error);
	});
}

function bookmarkCheck(param){
	getAjax("getBookmark", '/analysis/getBookmark', param, function (id, response, param){
		if(common.isEmpty(response.data)){
			$("#setBookMark").removeClass('on');
			$("#setBookMark").attr('data-bookmarkno', '');

			if(param.gubun != 'store') {
				$(".heart_a.tab_right").removeClass('on');
				$(".heart_a.tab_right").attr('data-bookmarkno', '');
			}else{
				$(".heart_a." + param.storeKey).removeClass('on');
				$(".heart_a." + param.storeKey).attr('data-bookmarkno', '');
			}

			$(".ico_heart_line_g").removeClass('on');
			$(".ico_heart_line_g").attr('data-bookmarkno', '');
		}else{
			$("#setBookMark").addClass('on');
			$("#setBookMark").attr('data-bookmarkno', response.data[0].bookmarkNo);

			if(param.gubun != 'store'){
				$(".heart_a.tab_right").addClass('on');
				$(".heart_a.tab_right").attr('data-bookmarkno', response.data[0].bookmarkNo);
			}else{
				$(".heart_a." + param.storeKey).addClass('on');
				$(".heart_a." + param.storeKey).attr('data-bookmarkno', response.data[0].bookmarkNo);
			}

			$(".ico_heart_line_g").addClass('on');
			$(".ico_heart_line_g").attr('data-bookmarkno', response.data[0].bookmarkNo);

			(response.data[0].type == '0') ? $("#which_report1").click() : $("#which_report2").click();
		}
	}, fn_error);
}

function storeBookmarkEvent(){
	$(".heart_a").off("click");
	$(".heart_a").on('click', function (){
		if($(this).hasClass("on")){
			if(confirm("관심지역에서 해제 하시겠습니까?")) {
				var data = {
					gubun: "store"
					, storeKey: $(this).data('storecd')
					, delYn: 'Y'
				}
				getAjax("setBookMark", "/analysis/setBookmark", data, function (id, response, param) {
					bookmarkCheck(param);
					// 관심지역 페이지면 list 새로고침
					if (strMenuGubun == 6) {
						var param = {};
						getAjax("getBookmark", '/analysis/getBookmark', param, fn_bookmarkList, fn_error);
					}
				}, fn_error);
			}
		}else{
			var data = {
				centerx : $(this).data('xaxis')
				, centery : $(this).data('yaxis')
				, range : 0
				, type : 0
				, gubun : "store"
				, custPoint : ""
				, admiNm : $(this).data('addr')
				, delYn : 'N'
				, storeKey : $(this).data('storecd')
			}
			getAjax("setBookMark", "/analysis/setBookmark", data, function (id, response, param){
				if(response.message != "success"){
					alert('북마크 등록 실패');
				}else{
					bookmarkCheck(param);
					// 관심지역 페이지면 list 새로고침
					if (strMenuGubun == 6) {
						var param = {};
						getAjax("getBookmark", '/analysis/getBookmark', param, fn_bookmarkList, fn_error);
					}
				}
			}, fn_error);
		}
	});
}


function setTabRightScript(){

	// 지역/매장선택 에서 상점 목록 열려 있으면 닫기
	$(".select_main_show.on > .show_foot > .button_box > .btn2").click();

	//탭리포트 활성화
	$('.pc_tab_right').addClass('show');
	$('.tab_right_handle').addClass('show');
	//탭 리포트 보일시에 .loca_input.again위치 조정 class
	$('.loca_input').addClass('left');
	$('.loca_input.ico16.ico_location_full_c').css('left','834px');
	$('.fixed_main_box').addClass('left');
	$('.loca_input.again').addClass('left');
	$('.handle.side').addClass('open');

	$(".ico_arrow_line_b.back").on('click', function (){
		$(".handle.tab_right_handle").click();
	});

	/*$(".heart_a.tab_right").off("click");
	$(".heart_a.tab_right").on("click", function (){
		if($(this).hasClass("on")){
			if(confirm("관심지역에서 해제 하시겠습니까?")) {
				var data = {
					centerx: markerx
					, centery: markery
					, delYn: 'Y'
				}
				getAjax("setBookMark", "/analysis/setBookmark", data, function (id, response, param) {
					bookmarkCheck(param);

					custPoint = "";
					fPoint = "";
					geomType = "";
					rClick = false;
					custom = false;
					strRadius = 0;
					strGeomType = "";
					if (circle.length != 0) circle.setMap(null);
					if (polygon.length != 0) polygon.setMap(null);

					if (strMenuGubun == 6) {
						var param = {};
						getAjax("getBookmark", '/analysis/getBookmark', param, fn_bookmarkList, fn_error);
					}
				}, fn_error);
			}
		}else{
			var data = {
				centerx : markerx
				, centery : markery
				, range : 0
				, type : $("#which_report1").prop('checked') ? "0" : ($("#which_report2").prop('checked') ? "1" : "0")
				, gubun : ""
				, custPoint : ""
				, admiNm : strAdmiNm
				, delYn : 'N'
			}
			getAjax("setBookMark", "/analysis/setBookmark", data, function (id, response, param){
				if(response.message != "success"){
					alert('북마크 등록 실패');
				}else{
					bookmarkCheck(param);
					if (strMenuGubun == 6) {
						var param = {};
						getAjax("getBookmark", '/analysis/getBookmark', param, fn_bookmarkList, fn_error);
					}
				}
			}, fn_error);
		}
	});*/

	$(".storeReport").on('click', function (){
		strReportGubun = "store";
		setReport();
	});


	// 매출 > 매출분석요약 > 버튼 클릭시 팝업
	//오늘드림
	$('#predictionShow').click(function(){
		$('.modal1').css('display','block');
		$('.pop1').addClass('show');
	});

	//표준타입
	$('#standardShow').click(function(){
		$('.modal1').css('display','block');
		$('.pop2').addClass('show');
	});

	//시뮬레이션
	$('.simulation').click(function(){
		$('.modal1').css('display','block');
		$('.pop5').addClass('show');
	});

	$(".ico32.ico_close_line_g").on('click', function (){
		$('.modal1').hide();
		$(".alrt_pop").removeClass('show');
	});

}

function getMapGeom(range, gubun){
	var proj4 = {"x" : strCenterx, "y" : strCentery}
	var param = {
		centerx: common.proj4(proj4, 6645).x
		, centery: common.proj4(proj4, 6645).y
		, range: range
	}
	if(!common.isEmpty(gubun)){
		param.gubun = gubun;
	}
	getAjax("getMapGeom", '/analysis/getMapGeom', param, function (id, response, param){
		removeAreaGeom();

		var result = getGeomJson("getMapGeom", "FeatureCollection", response.data);
		strGeoJson = result;
		areaJsonArr.push(strGeoJson);
		map.data.addGeoJson(result);
		map.data.setStyle(function(feature){
			var styleOptions = {
				fillOpacity : 0.5
				, fillColor : "rgba(255,255,255,0.45)"
				, strokeColor : "rgba(87,87,87,0.7)"
				, storkeWeight : 0.5
				, storkeOpacity : 0.5
			}

			return styleOptions;
		});

		areaJsonMouseListenerEvent();

	}, fn_error);


}

function mapMove(data, removeSw){

	strCenterx = data.centerx;
	strCentery = data.centery;

	// 지도 이동
	var center = new naver.maps.Point(strCenterx, strCentery);
	map.setCenter(center);

	data.zoomStatus = "admiCd";
	getCenterAddress(data);
}


function areaJsonMouseListenerEvent(){

	naver.maps.Event.removeListener(mouseoverListener);
	naver.maps.Event.removeListener(mouseoutListener);
	naver.maps.Event.removeListener(areaClickListener);
	naver.maps.Event.removeListener(areaRightClickListener);

	// 범위 마우스 오버
	mouseoverListener = map.data.addListener('mouseover', function(e){
		mouseoverBeforColor = e.overlay.fillColor;
		map.data.overrideStyle(e.feature, {
			fillColor : mouseoverAfterColor
		});
	});

	// 범위 마우스 아웃
	mouseoutListener = map.data.addListener('mouseout', function(e){
		map.data.overrideStyle(e.feature, {
			fillColor : mouseoverBeforColor
		});
	});

	areaRightClickListener = map.data.addListener('rightclick', function (e){
		rightClick(e);
	});

	// 범위 클릭 (right 팝업 정보 조회)
	areaClickListener = map.data.addListener('click', function (e){
		if((geomType == "" || geomType == "circle") && !custom){
			// 범위 클릭시 메뉴가 닫혀 있으면 열기
			$(".pc_sheet.onlypc.here").addClass('on');
			searchCoordinateToAddress(e.coord, "area");

			// 네이버 주소 가져온 이후 처리 되도록
			setTimeout(function (){
				// 블럭 정보 조회
				var param = {
					blkCd : e.feature.id
					, admiCd : e.feature.id
				};

				if(strMenuGubun == 1){
					getAjax("getSalesBlock", "/sales/getSalesBlock", param, getBlockInfo, fn_error, "POST", true, true);
				}else if(strMenuGubun == 2){
					getAjax("getCustomerBlockTask", "/customer/getCustomerBlockTask", param, getBlockInfo, fn_error, "POST", true, true);
				}else if(strMenuGubun == 3){

				}else if(strMenuGubun == 4){
					getAjax("getAreaBlock", "/area/getAreaBlock", param, getBlockInfo, fn_error, "POST", true, false);
				}else if(strMenuGubun == 5){
					param.gubun = tabGubun;
					getAjax("getTodayAdmi", "/today/getTodayAdmi", param, getBlockInfo, fn_error, "POST", true, true);
				}
			}, 100);
		}else{
			var fLat = e.coord.y;
			var fLng = e.coord.x;
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

}

function getBlockInfo(id, response, param){
	if(common.isEmpty(response.data[0])){
		response.data.addr = strAdmiNm;
	}else{
		response.data[0].addr = strAdmiNm;
	}
	$(".pc_tab_right").html('');
	var template = $('#tmp_pc_tab_right').html();
	var templateScript = Handlebars.compile(template);
	var context = response.data;
	var html = templateScript(context);
	$(".pc_tab_right").html(html);

	// 탭 생성 이벤트
	setTabRightScript();

	if(strMenuGubun == 5){
		$(".mini_rpt_5-1").hide();
		$(".mini_rpt_5-2").hide();
		// 오늘드림 chart 생성
		if(tabGubun == "today") {
			$(".mini_rpt_5-1").show();
		}else if(tabGubun == "area"){
			// setTimeout 안넣으면 2번 데이터로 1,2번 다 그려짐
			setTimeout(function (){
				start1(response.data.chart1);
				setTimeout(function (){
					start2(response.data.chart2);
				}, 100);
			}, 100);
			$(".mini_rpt_5-2").show();
		}
	}
}