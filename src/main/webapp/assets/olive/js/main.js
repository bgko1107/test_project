
var pageHistory = [];
var objPage = {
    navbar : "analysis"
    , side : "sales"
    , page : "/analysis/sales"
};

$(function() {
    $('html').removeClass('no-js');

    $(".navbar .head").click(function (){
        $("#" + $(this).data().nav).find(".sideMenu:first").addClass("on");
    });

    $(".sideMenu").click(function (){
        if(!$(this).hasClass('on')){
            $(".sideMenu").removeClass("on");
            $(this).addClass("on");
            $('.here').addClass("on");
            $(".fixed_main_box").addClass('left');
            $(".ico_location_full_c").addClass('left');
            $(".ico_again_line_wh").addClass('left');
            $(".handle.tab_right_handle").click();

            menuActive("analysis", $(this).data().id, $(this).data().url);
            onlyBodyLoad($(this).data().url);
        }else{
            // 지도 범위 삭제
            removeAreaGeom();
            // 맵 마커 삭제
            removeMapMarkers();

            $(".sideMenu").removeClass("on");
            $(".pc_sheet.onlypc.here").removeClass('on');
            $('.here').removeClass("on");
            $(".fixed_main_box").removeClass('left');
            $(".ico_location_full_c").removeClass('left');
            $(".ico_again_line_wh").removeClass('left');
            $(".handle.tab_right_handle").click();
        }
    });

    /*// 메뉴이동
    $(".nav-link.navbar").on('click', function (){
        var navId = $(this).data('nav');
        var sideId = $(this).data('side');
        menuActive(navId, sideId);
        onlyBodyLoad($(this).data().url);
    });*/
});

function menuActive(navbar, side, url){
    objPage.navbar = navbar;
    objPage.side = side;
    objPage.page = url;
}

function fn_error(response) {
    console.log(response);
    console.log('error');
}

function loginCheck(){
    if(common.isEmpty(sessionStorage.getItem("sessionId")) || common.isEmpty(sessionStorage.getItem("userNm")) || common.isEmpty(sessionStorage.getItem("loginId"))){
        alert("로그인 정보가 없습니다");
        logout();
    }else{
        var param = {
            userNm : sessionStorage.getItem("userNm")
            , userId : sessionStorage.getItem("loginId")
        }
        getAjax("loginCheck", "/common/loginCheck", param, function (id, response, param){
            setTimeout(function (){
                if(response.data[0].resAuthCd == "AUTH1111"){
                    $(".user_navi").addClass('admin');
                }else{
                    $(".user_navi").removeClass('admin');
                }
            }, 100);
            $(".userNm").text(sessionStorage.getItem("userNm") + "님");
            $(".department").text(response.data[0].department);
        }, function (response){
            console.log("loginCheck");
            console.log(response);
            // 토큰 정보 확인 실패
            if(response.status == 403){
                alert("로그인 정보가 없습니다");
                logout();
            }else{
                alert("에러 발생 [관리자 문의]");
            }
        });
    }
}

function logout(){
    sessionStorage.clear();
    localStorage.clear();
    location.href = "/";
}
function onlyBodyLoad(page){

    $(".pc_by_wrap").show();
    $( '.select_main' ).removeClass('on');
    $('.select_main_show').removeClass('on');
    // $(".loca_input.ico16.ico_location_full_c").removeClass('left');
    // $(".loca_input.again.ico16.ico_again_line_wh").removeClass('left');

    $("#onlyBody").load(page, loginCheck());
    history.pushState(objPage, null);
    strMenuName = "";
    $(".sideMenu").each(function (){
        if($(this).hasClass('on')){
            strMenuName = $(this).children().text();
            strMenuGubun = $(this).data('idx');
            return false;
        }
    });
    if(strMenuGubun == "5" || strMenuGubun == "6"){
        $('#sub_title').text(strMenuName);
    }else{
        $('#sub_title').text(strMenuName + "분석");
    }

    if(strMenuGubun != "6") {
        if ($(".olive_pic").hasClass("on")) {
            // 상점 마커를 클릭한 상태인지 확인(열려있으면 메뉴 구분에 맞는 상점 데이터 조회)
            var olivePicData = {
                storeCd: $(".olive_pic.on").data('storecd')
            }
            olivePicRight(olivePicData);
        } else {
            // 상점 마커를 클릭하지 않았으면 right 닫기
            $(".pc_tab_right").removeClass('show');
            $(".tab_right_handle").removeClass('show');
        }
    }else{
        // 관심지역에서는 안보이도록
        $(".pc_tab_right").removeClass('show');
        $(".tab_right_handle").removeClass('show');
    }
}

window.onpopstate = function (e) {

    // 뒤로가기 했을경우 팝업이 열려 있으면 팝업 닫기
    $(".modal2").hide();
    $(".rpt_pop.cb").hide();

    $("#onlyBody").load(e.state.page, loginCheck());

    $(".side-nav").hide();
    $(".navbar").removeClass("on");
    $(".sideMenu").removeClass("on");
    // 상단메뉴
    $("." + e.state.navbar).addClass("on");
    // side 활성화
    $("#" + e.state.navbar).show();
    $("#" + e.state.side).addClass("on");

    // 뒤로가기시 매장 클릭 되어있으면 닫기
    $(".map_pop.shop").hide();
    $(".map_pic.ico42.olive_pic").removeClass('on');
    $(".handle.tab_right_handle").click();
    strMenuName = "";
    $(".sideMenu").each(function (){
        if($(this).hasClass('on')){
            strMenuName = $(this).children().text();
            strMenuGubun = $(this).data('idx');
            return false;
        }
    });
    setTimeout(function (){
        $('.header > h2').text(strMenuName);
    }, 100);
};


function LoadingBar(gubun){
    gubun ? $(".modal.modal2").show() : $(".modal.modal2").hide();
    gubun ? $(".loader.loader--style3").show() : $(".loader.loader--style3").hide();
}