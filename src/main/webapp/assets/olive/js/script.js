
var timeMinVal = "0";
var timeMaxVal = "24";
var timeMinValText = "00시";
var timeMaxValText = "24시";

var saleMinVal = "5000";
var saleMaxVal = "150001";
var saleMinValText = "5000미만";
var saleMaxValText = "15000이상";

$(document).ready(function(){


	//공통 - 모바일, 탭 오류 height 100%

	//모바일 화면 창에서 vh100 오류 수정
	function setScreenSize() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}
	setScreenSize();
	window.addEventListener('resize', setScreenSize);

	//window height 크기
	function windowHtSize(){
		var height = $(window).height();
		$('body').css('height',height);
		$('html').css('height',height);
	}
	windowHtSize();

	var tab_inner = $('.pc_tab_right').width();
	var echart_inner = tab_inner - 64;
	document.documentElement.style.setProperty('--inner', `${echart_inner}px`);

	//지역 | 매장 선택
	$( '.select_main' ).click( function() {
		$(this).toggleClass('on');
		$(this).parents().children('.select_main_show').toggleClass('on');
	} );

	//지역분석 > 집객시설확인 작은 버튼
	$( '.btn_allin > .btn4').click( function() {
		$(this).toggleClass('on');
	} );

	//하트 누르고 빼기
	$( '.heart_a').click( function() {
		$(this).toggleClass('on');
	} );

	// 우측상단 프로필
	$( '#showUserNavi' ).click( function() {
		$(this).toggleClass('on');
		$('.user_navi_ul').toggleClass('on');
	});

	//지역,매장선택하고 확인 클릭시에 탭리포트 보이기
	//pc_tab_right 에 show, tab_right_handle에 show
	$( '.select_main_show .btn1').click( function() {
		//select_main_show 닫기
		$(this).parents('.select_main_show').removeClass('on');
		$(this).parents('.select_main_box').children('.select_main').removeClass('on');

		/*//탭리포트
		$(this).parents('.pc_sheet').children('.pc_tab_right').addClass('show');
		$(this).parents('.pc_sheet').children('.tab_right_handle').addClass('show');
		//탭 리포트 보일시에 .loca_input.again위치 조정 class
		$('.loca_input').addClass('reloc');
		$('.loca_input.again').addClass('reloc');*/
	} );


	// 취소
	$( '.select_main_show .btn2').click( function() {
		$(this).parents('.select_main_show').removeClass('on');
		$(this).parents('.select_main_box').children('.select_main').removeClass('on');
	});

	// // 최상단 탭(매출, 고객, 금융, 지역, 오늘드림, 관심지역) 클릭시 각 탭 열리고 닫힘
	// $(".tab_box > ul > li > a").on("click", function(){
	// 	$('.here').addClass("on");
	// 	$(".fixed_main_box").addClass('left');
	// 	$(".ico_location_full_c").addClass('left');
	// 	$(".ico_again_line_wh").addClass('left');
	// });

	// alert close 누를시에 닫기
	$('.close_alert').click(function(){
		$(this).parents('.alrt_pop').removeClass('show');
		$('.modal').css('display','none');
	});

	// 매출 > 매출분석요약 > 버튼 클릭시 팝업
	//오늘드림
	$('#predictionShow').click(function(){
		$('.modal').css('display','block');
		$('.pop1').addClass('show');
	});

	//표준타입
	$('#standardShow').click(function(){
		$('.modal').css('display','block');
		$('.pop2').addClass('show');
	});

	//몰타입
	$('#mallShow').click(function(){
		$('.modal').css('display','block');
		$('.pop3').addClass('show');
	});

	//마트타입
	$('#martShow').click(function(){
		$('.modal').css('display','block');
		$('.pop4').addClass('show');
	});

	//시뮬레이션
	$('#simulation').click(function(){
		$('.modal').css('display','block');
		$('.pop5').addClass('show');
	});

	//지역선택, 매장선택
	/*$(".show_header > ul > li").on('click', function (idx, val){
		$(".show_header > ul > li").removeClass('on');
		$(this).addClass('on');
		// $(".show_body.body_loca").hide();
		$(".show_body.body_shop").css('display','none');
		if($(this).data('gubun') == "area"){
			$(".in_box.list_box").hide();
		}else if($(this).data('gubun') == "shop"){
			$(".in_box.list_box").show();
			// 매장 선택 텝으로 이동했는데 아무것도 선택이 안되어있으면 처음꺼 선택 되도록
			if($(".show_body").find(".select.mega").val() == 0) {
				var tmp = $(".show_body option:eq(1)").prop("selected", true).val();
				$(".show_body").find(".select.mega").val(tmp).trigger('change');
			}
		}
	});*/

	// 사이드
	$(".handle.side").on('click', function (){
		if($(this).parent().hasClass("on")){
			$(this).parent().removeClass('on');
			$(".fixed_main_box").removeClass('left');
			$(".ico_location_full_c").removeClass('left');
			$(".reSearch").removeClass('left');
			$(".ico_again_line_wh").removeClass('left');
			$(".handle.tab_right_handle").click();
		}else{
			let tmp_menu = false;
			$(".sideMenu").each(function (){
				if($(this).hasClass('on')){
					tmp_menu = true;
				}
			});
			if(tmp_menu){
				$(this).parent().addClass('on');
				$(".fixed_main_box").addClass('left');
				$(".ico_location_full_c").addClass('left');
				$(".ico_again_line_wh").addClass('left');
			}else{
				$("#sales").click();
			}
		}
	});

	// 요약보고서 닫기
	$(".handle.tab_right_handle").on('click', function (){
		$('.handle.side').removeClass('open');
		$('.loca_input.ico16.ico_location_full_c').css('left','');
		$(".pc_tab_right").removeClass('show');
		$(".tab_right_handle").removeClass('show');
	});

	$(".ico16.ico_again_line_g.btn_reset").on('click', function (){

	});

	$(".user_navi_ul > ul > li > a").on('click', function (){
		var nav = $(this).data('nav');
		if(nav == "auth" || nav == "mypage"){
			location.href = "/" + nav;
		}else if(nav == "logout"){
			logout();
		}else if(nav == "help"){
			alert('도움말');
		}
	});

});

function slider(){
	//레인지 피커 시작
	var maxAge = 70;

	const sliders = document.querySelectorAll('.dual-range-slider');
	sliders.forEach(slider => {
		const minRange = slider.querySelector('.min-range')
		const maxRange = slider.querySelector('.max-range')
		const children = slider.childNodes[1].childNodes

		minRange.addEventListener('input', () => {
			// Make sure the sliders don't cross eachother
			var minValue = Math.min(minRange.value, maxRange.value)
			minRange.value = minValue;

			// Set width of slider elements
			const value = minValue / parseInt(minRange.max) * 100
			children[1].style.width = value + '%'
			children[5].style.left = value + '%'
			children[7].style.left = value + '%'
			// children[11].style.left = value + '%'
			// children[11].childNodes[1].innerHTML = minValue // Set bubble text


			// If the thumb handles are on top of eachother,
			// give the most recently changed thumb handle height priority
			if (Math.abs(minRange.value - maxRange.value) === 0) {
				children[7].style.zIndex = 1
				children[9].style.zIndex = 0
				minRange.style.zIndex = 1
				maxRange.style.zIndex = 0
			} else {
				children[7].style.zIndex = 3
				children[9].style.zIndex = 3
				minRange.style.zIndex = 3
				maxRange.style.zIndex = 3
			}
		});

		maxRange.addEventListener('input', () => {
			// Make sure the sliders don't cross eachother
			const maxValue = Math.max(minRange.value, maxRange.value)
			maxRange.value = maxValue

			// Set width of slider elements
			let value = maxValue / parseInt(maxRange.max) * 100
			children[3].style.width = 100 - value + '%'
			children[5].style.right = 100 - value + '%'
			children[9].style.left = value + '%'
			// children[13].style.left = value + '%'
			// children[13].childNodes[1].innerHTML = maxValue // Set bubble text

			// If the thumb handles are on top of eachother,
			// give the most recently changed thumb handle height priority
			if (Math.abs(minRange.value - maxRange.value) === 0) {
				children[9].style.zIndex = 1
				children[7].style.zIndex = 0
				maxRange.style.zIndex = 1
				minRange.style.zIndex = 0
			} else {
				children[9].style.zIndex = 3
				children[7].style.zIndex = 3
				maxRange.style.zIndex = 3
				minRange.style.zIndex = 3
			}
		});

		minRange.addEventListener('input', () => {
			const resultElement = document.getElementById('ageFilterResult');
			var tmpMin = minRange.value;
			if($(".select_main_show.sub_show.sub_show_3").hasClass('on')) {
				if (tmpMin == "0") {
					timeMinVal = '0';
					timeMinValText = '00시';
				} else if (tmpMin == "14.28") {
					timeMinVal = '6';
					timeMinValText = '06시';
				} else if (tmpMin == "28.56") {
					timeMinVal = '8';
					timeMinValText = '08시';
				} else if (tmpMin == "42.84") {
					timeMinVal = '12';
					timeMinValText = '12시';
				} else if (tmpMin == "57.12") {
					timeMinVal = '15';
					timeMinValText = '15시';
				} else if (tmpMin == "71.4") {
					timeMinVal = '18';
					timeMinValText = '18시';
				} else if (tmpMin == "85.68") {
					timeMinVal = '21';
					timeMinValText = '21시';
				} else if (tmpMin == "99.96") {
					timeMinVal = '24';
					timeMinValText = '24시';
				}
				$(".select_main_show.sub_show").each(function () {
					if ($(this).hasClass('on')) {
						if (timeMinVal == timeMaxVal) {
							$(this).find(".show_body_sub").text(timeMinValText)
						} else {
							$(this).find(".show_body_sub").text(timeMinValText + '~' + timeMaxValText)
						}
					}
				});
			} else if($(".select_main_show.sub_show.sub_show_4").hasClass('on')){
				if (tmpMin == "0") {
					saleMinVal = '5000';
					saleMinValText = '5000미만';
				} else if (tmpMin == "12.5") {
					saleMinVal = '10000';
					saleMinValText = '10000미만';
				} else if (tmpMin == "25") {
					saleMinVal = '20000';
					saleMinValText = '20000미만';
				} else if (tmpMin == "37.5") {
					saleMinVal = '30000';
					saleMinValText = '30000미만';
				} else if (tmpMin == "50") {
					saleMinVal = '50000';
					saleMinValText = '50000미만';
				} else if (tmpMin == "62.5") {
					saleMinVal = '70000';
					saleMinValText = '70000미만';
				} else if (tmpMin == "75") {
					saleMinVal = '100000';
					saleMinValText = '10000미만';
				} else if (tmpMin == "87.5") {
					saleMinVal = '150000';
					saleMinValText = '150000미만';
				}else if (tmpMin == "100") {
					saleMinVal = '150001';
					saleMinValText = '150000이상';
				}
				$(".select_main_show.sub_show").each(function () {
					if ($(this).hasClass('on')) {
						console.log(saleMinVal);
						console.log(saleMaxVal);
						if (saleMinVal == saleMaxVal) {
							$(this).find(".show_body_sub").text(saleMinValText)
						} else {
							$(this).find(".show_body_sub").text(saleMinValText + '~' + saleMaxValText)
						}
					}
				});
			}

		});
		maxRange.addEventListener('input', () => {
			const resultElement = document.getElementById('ageFilterResult');
			var tmpMax = maxRange.value;
			if($(".select_main_show.sub_show.sub_show_3").hasClass('on')){
				tmpMax = tmpMax;
				if(tmpMax == "0" ){
					timeMaxVal = '0';
					timeMaxValText = '00시';
				}else if(tmpMax == "14.28"){
					timeMaxVal = '6';
					timeMaxValText = '06시';
				}else if(tmpMax == "28.56"){
					timeMaxVal = '8';
					timeMaxValText = '08시';
				}else if(tmpMax == "42.84"){
					timeMaxVal = '12';
					timeMaxValText = '12시';
				}else if(tmpMax == "57.12"){
					timeMaxVal = '15';
					timeMaxValText = '15시';
				}else if(tmpMax == "71.4"){
					timeMaxVal = '18';
					timeMaxValText = '18시';
				}else if(tmpMax == "85.68"){
					timeMaxVal = '21';
					timeMaxValText = '21시';
				}else if(tmpMax == "99.96"){
					timeMaxVal = '24';
					timeMaxValText = '24시';
				}
				$(".select_main_show.sub_show").each(function (){
					if($(this).hasClass('on')){
						if(timeMinVal == timeMaxVal){
							$(this).find(".show_body_sub").text(timeMinValText)
						}else{
							$(this).find(".show_body_sub").text(timeMinValText + '~' + timeMaxValText)
						}
					}
				});
			} else if($(".select_main_show.sub_show.sub_show_4").hasClass('on')){
				if (tmpMax == "0") {
					saleMaxVal = '5000';
					saleMaxValText = '5000미만';
				} else if (tmpMax == "12.5") {
					saleMaxVal = '10000';
					saleMaxValText = '10000미만';
				} else if (tmpMax == "25") {
					saleMaxVal = '20000';
					saleMaxValText = '20000미만';
				} else if (tmpMax == "37.5") {
					saleMaxVal = '30000';
					saleMaxValText = '30000미만';
				} else if (tmpMax == "50") {
					saleMaxVal = '50000';
					saleMaxValText = '50000미만';
				} else if (tmpMax == "62.5") {
					saleMaxVal = '70000';
					saleMaxValText = '70000미만';
				} else if (tmpMax == "75") {
					saleMaxVal = '100000';
					saleMaxValText = '10000미만';
				} else if (tmpMax == "87.5") {
					saleMaxVal = '150000';
					saleMaxValText = '150000미만';
				}else if (tmpMax == "100") {
					saleMaxVal = '150001';
					saleMaxValText = '150000이상';
				}
				$(".select_main_show.sub_show").each(function () {
					if ($(this).hasClass('on')) {
						if (saleMinVal == saleMaxVal) {
							$(this).find(".show_body_sub").text(saleMinValText)
						} else {
							$(this).find(".show_body_sub").text(saleMinValText + '~' + saleMaxValText)
						}
					}
				});
			}
		});
	});
	//레인지 피커 끝
}

const normalizeToSentiment = (value) => {
	// Value is between 0 and 100
	return roundTo(value / 50 - 1, 1)
}

function roundTo(number, decimals) {
	return Math.round((number + Number.EPSILON) * 10 ** decimals) / 10 ** decimals
}