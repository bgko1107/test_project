$(document).ready(function(){

        //인풋 폼 css 효과
        $('input').blur(function () {
            var $this = $(this);
            if ($this.val())
                $this.addClass('used');
            else
                $this.removeClass('used');
        });

        var $ripples = $('.ripples');

        $ripples.on('click.Ripples', function (e) {

            var $this = $(this);
            var $offset = $this.parent().offset();
            var $circle = $this.find('.ripplesCircle');

            var x = e.pageX - $offset.left;
            var y = e.pageY - $offset.top;

            $circle.css({
                top: y + 'px',
                left: x + 'px'
            });

            $this.addClass('is-active');

        });

        $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function (e) {
            $(this).removeClass('is-active');
        });
  //공통 - 모바일, 탭 오류 height 100%

    //모바일 화면 창에서 vh100 오류 수정
    function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setScreenSize();
    window.addEventListener('resize', setScreenSize);
    
    //window height 크기
//    function windowHtSize(){
//        var height = $(window).height();
//        $('body').css('height',height);    
//        $('html').css('height',height);    
//    }
//    windowHtSize();
    

    //--inner 크기 설정
    var tab_inner = $('.pc_tab_right').width();
    var echart_inner = tab_inner - 64;
    document.documentElement.style.setProperty('--inner', `${echart_inner}px`);

    //main page chart
    $('#main_chart2').css('height','calc((var(--vh, 1vh) * 100 - 610px) / 2 )');
    $('#main_chart3').css('height','calc((var(--vh, 1vh) * 100 - 610px) / 2 )');
    $('#main_chart4').css('height','calc((var(--vh, 1vh) * 100 - 610px) / 2 )');
    $('#main_chart2').css('min-height','280px');
    $('#main_chart3').css('min-height','280px');
    $('#main_chart4').css('min-height','280px');
    
    //클릭시 열기

    //지역 | 매장 선택
    $( '.select_main' ).click( function() {
        if($(this).hasClass("on")){
            $( '.select_main' ).removeClass('on');
            $( '.select_main' ).parents().children('.select_main_show').removeClass('on');
        }else{

            $( '.select_main' ).removeClass('on');
            $( '.select_main' ).parents().children('.select_main_show').removeClass('on');
            $(this).addClass('on');
            $(this).parents().children('.select_main_show').addClass('on');
        }
      });
    
      //유저 navigation 버튼 (오른쪽 최상단 클릭)
      $( '#showUserNavi' ).click( function() {
        
          $(this).toggleClass('on');
          $('.user_navi_ul').toggleClass('on');
        } )
      
      //지역분석 > 집객시설확인 작은 버튼
    $( '.btn_allin > .btn4').click( function() {
        $(this).toggleClass('on');
      } );

      //하트 누르고 빼기
    $( '.heart_a').click( function() {
        $(this).toggleClass('on');
      } );

      //지역,매장선택하고 확인 클릭시에 탭리포트 보이기
      //pc_tab_right 에 show, tab_right_handle에 show
    $( '.select_main_show .btn1').click( function() {
      //탭리포트
        $(this).parents('.pc_sheet').children('.pc_tab_right').addClass('show');
        $(this).parents('.pc_sheet').children('.tab_right_handle').addClass('show');

        //select_main_show 닫기
        $(this).parents('.select_main_show').removeClass('on');
        $(this).parents('.select_main_box').children('.select_main').removeClass('on');

        //탭 리포트 보일시에 .loca_input.again위치 조정 class
        $('.loca_input').addClass('left');
        $('.loca_input.again').addClass('left');

        var param = {};
        $(".standard").find('input').each(function (){
            if($(this).prop('checked')){
                param.standardType = $(this).val();
            }
        });

        $(".point").find('input').each(function (){
            if($(this).prop('checked')){
                param.pointType = $(this).val();
            }
        });

        // 점유율동향
        shareFilter(param);
    } );

    $( '.select_main_show .btn2').click( function() {
        //탭리포트
        $(this).parents('.pc_sheet').children('.pc_tab_right').addClass('show');
        $(this).parents('.pc_sheet').children('.tab_right_handle').addClass('show');

        //select_main_show 닫기
        $(this).parents('.select_main_show').removeClass('on');
        $(this).parents('.select_main_box').children('.select_main').removeClass('on');

        //탭 리포트 보일시에 .loca_input.again위치 조정 class
        $('.loca_input').addClass('left');
        $('.loca_input.again').addClass('left');
    } );

    // 최상단 탭(매출, 고객, 금융, 지역, 오늘드림, 관심지역) 클릭시 각 탭 열리고 닫힘
/*    $(".tab_box > ul > li > a").on("click", function(){
        var num = $(".tab_box > ul > li > a").index($(this));
        var num2 = num+1;

        // tab 이동시에 두번째 mini report는 닫기
        $('.pc_tab_right').removeClass('on');
        $('.tab_right_handle').removeClass('show');

        // tab_box에 on 넣기
       $(".tab_box > ul > li").removeClass("on");
        $('.tab_box > ul > li:eq(' + num + ')').addClass("on");


        // pc_sheet 기존 열렸던것 닫기
        $('.pc_sheet').removeClass("on");
        $('.pc_tab_right').removeClass("show");
        $('.select_main_show').removeClass("on");

        // tab_box index 맞춰서 pc_sheet 보이기
        $('.here' + num2 + '').addClass("on");

    });*/

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


//레인지 피커 시작

      const sliders = document.querySelectorAll('.dual-range-slider')
	sliders.forEach(slider => {
		const minRange = slider.querySelector('.min-range')
		const maxRange = slider.querySelector('.max-range')
		const children = slider.childNodes[1].childNodes

		minRange.addEventListener('input', () => {
			// Make sure the sliders don't cross eachother
			const minValue = Math.min(minRange.value, maxRange.value)
			minRange.value = minValue

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
		})

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
		})

        minRange.addEventListener('input', () => {
            const resultElement = document.getElementById('ageFilterResult')
            console.log(minRange.value);
            if(minRange.value == 0 ){
                minAge = '15살 미만'
                financeMinAge = ''
            }else if(minRange.value == 14.28){
                minAge = '15'
                financeMinAge = '15'
            }else if(minRange.value == 28.56){
                minAge = '20'
                financeMinAge = '20'
            }else if(minRange.value == 42.84){
                minAge = '30'
                financeMinAge = '30'
            }else if(minRange.value == 57.12){
                minAge = '40'
                financeMinAge = '40'
            }else if(minRange.value == 71.40){
                minAge = '50'
                financeMinAge = '50'
            }else if(minRange.value == 85.68){
                minAge = '60'
                financeMinAge = '60'
            }else{
                minAge = '70살 초과'
                financeMinAge = '70'
            }
            if(minAge == maxAge){
                resultElement.innerText = minAge;
            }else{
                resultElement.innerText = minAge + '~' + maxAge;
            }

        })
        maxRange.addEventListener('input', () => {
            const resultElement = document.getElementById('ageFilterResult')
            if(maxRange.value == 0 ){
                maxAge = '15살 미만'
                financeMaxAge = ''
            }else if(maxRange.value == 14.28){
                maxAge = '20살'
                financeMaxAge = '15'
            }else if(maxRange.value == 28.56){
                maxAge = '30살'
                financeMaxAge = '20'
            }else if(maxRange.value == 42.84){
                maxAge = '40살'
                financeMaxAge = '30'
            }else if(maxRange.value == 57.12){
                maxAge = '50살'
                financeMaxAge = '40'
            }else if(maxRange.value == 71.40){
                maxAge = '60살'
                financeMaxAge = '50'
            }else if(maxRange.value == 85.68){
                maxAge = '70살'
                financeMaxAge = '60'
            }else{
                maxAge = '70살 초과'
                financeMaxAge = '70'
            }
            if(minAge == maxAge){
                resultElement.innerText = minAge
            }else{
                resultElement.innerText = minAge + '~' + maxAge;
            }

        })
    })


	const normalizeToSentiment = (value) => {
		// Value is between 0 and 100
		return roundTo(value / 50 - 1, 1)
	}


	/**
	 * Rounds a decimal number to a certain amount of decimals
	 * 
	 * @param {Number} number The number to round
	 * @param {Number} decimals The amount of decimals to round to
	 */
	function roundTo(number, decimals) {
		return Math.round((number + Number.EPSILON) * 10 ** decimals) / 10 ** decimals
	}

  //레인지 피커 끝
});


function LoadingBar(gubun){
    gubun ? $(".modal.modal2").show() : $(".modal.modal2").hide();
    gubun ? $(".loader.loader--style3").show() : $(".loader.loader--style3").hide();
}