/**
 * 공통 자바스크립트 유틸
 */
var util = {};

/* 새창 띄우기 */
util.windowOpen = function(data, width, height, name){
    var url = '';
    if (typeof (data) == 'object') {
        url = data.url;
        width = data.width;
        height = data.height;
        name = data.name;
    } else {
        url = data;
    }
    name = name || 'popup';

    var left = (window.screen.width / 2) - (width / 2);
    var top = (window.screen.height / 2) - (height / 2);

    window.open(url, name, 'width=' + width + ' height=' + height + ' scrollbars=yes left=' + left + 'top=' + top);
}

util.changeLoadingBtn = function(btn, status, text) {
    var text = common.isEmpty(text) ? "Loading..." : text;

    if (status == 'loading' || status == 'start') {
        btn.data('afterText', btn.html());
        btn.empty().append('<i class="fa fa-refresh fa-spin"></i> ' + text);
        btn.prop('disabled', true);
    }

    if (status == 'reset' || status == 'stop') {
        btn.empty().append(btn.data('afterText'));
        btn.prop('disabled', false);
    }
},


/* 이미지 팝업 */
util.imagePopup = function(obj) {
    var url = obj.src;
    var title = obj.id;
    var option = "width=" + (obj.width + 20) + ", height=" + (obj.height + 20) + ",fullscreen=yes";

    window.open(url, title, option);
},

util.popupLink = function(display, url, width, height) {
    var template = '<a href="javascript://" class="_openPop" data-url="' + url + '" data-width="'+ width +'" data-height="'+ height +'">' + display + '</a>';
    return template;
},

util.memNoLink = function(display, memNo) {
    var template = '<a href="javascript://" class="_openMemberPop" data-memNo="' + memNo + '">' + display + '</a>';
    return template;
},

util.pushSendLink = function(memNoList, buttonVal) {
    $('#' + buttonVal).data('mem_no_list', memNoList);
    $('#' + buttonVal).addClass('_openSendPushPop');
},

util.memNoLink_sex = function(display, memNo, sex) {
    var template;
    if(sex == "m"){
        template = '<a href="javascript://" class="_openMemberPop" data-memNo="' + memNo + '" style="color: blue">' + display + '</a>';
    }else if(sex == "f"){
        template = '<a href="javascript://" class="_openMemberPop" data-memNo="' + memNo + '" style="color: red">' + display + '</a>';
    }else if(sex == "n"){
        template = '<a href="javascript://" class="_openMemberPop" data-memNo="' + memNo + '" style="color: #555555">' + display + '</a>';
    }
    return template;
},

util.roomNoLink = function(display, roomNo) {
    var template = '<a href="javascript://" class="_openBroadcastPop" data-roomNo="' + roomNo + '">' + display + '</a>';
    return template;
},

util.getCommonCodeSelect = function(code, targetCode, isExcludeAllYn, name) {
    targetCode = eval(targetCode);
    if (!common.isEmpty(targetCode)) {

        var header = targetCode[0];
        var selectName = common.isEmpty(name) ? header.value : name;
        var html = '<select id="' + selectName + '" name="' + selectName + '" class="form-control searchType">';
        targetCode.forEach(function (value) {
            if (!common.isEmpty(value.type)) {

                if (isExcludeAllYn == 'Y' && (value.type == 'all' || value.type == -1)) {
                    return;
                }

                html += '<option value="' + value.value + '" ' + (value.value == code ? 'selected="selected"' : '') + '>' + value.code + '</option>';
            }
        });
        html += '</select>'
        return html;
    }
},

util.getCommonCodeSelectForName = function(codeName, targetCode, isExcludeAllYn, name) {
    targetCode = eval(targetCode);
    if (!common.isEmpty(targetCode)) {

        var header = targetCode[0];
        var selectName = common.isEmpty(name) ? header.value : name;
        var html = '<select id="' + selectName + '" name="' + selectName + '" class="form-control searchType">';
        targetCode.forEach(function (value) {
            if (!common.isEmpty(value.type)) {

                if (isExcludeAllYn == 'Y' && (value.type == 'all' || value.type == -1)) {
                    return;
                }
                html += '<option value="' + value.value + '" ' + (value.code == codeName ? 'selected="selected"' : '') + '>' + value.code + '</option>';
            }
        });
        html += '</select>'
        return html;
    }
},

util.getCommonCodeRadio = function(code, targetCode, isExcludeAllYn, name) {
    targetCode = eval(targetCode);
    if (!common.isEmpty(targetCode)) {

        var header = targetCode[0];
        var html = '';
        var radioName = common.isEmpty(name) ? header.value : name;
        targetCode.forEach(function (value) {
            if (!common.isEmpty(value.type)) {

                if (isExcludeAllYn == 'Y' && (value.type == 'all' || value.type == -1)) {
                    return;
                }
                html += '<label class="control-inline fancy-radio custom-color-green">';
                html += '<input type="radio" value="' + value.value + '" id="' + radioName + value.value + '" name="' + radioName + '" class="form-control" ' + (value.value == code ? 'checked="checked"' : '') + '/>';
                html += '<span><i></i>' + value.code + '</span>'
                html += '</label>';
            }
        });
        return html;
    }
},

/**
 * 여러개 등록 할 시
 */
util.getCommonCodeRadioMulti = function(code, targetCode, isExcludeAllYn, name, order) {
    targetCode = eval(targetCode);
    if (!common.isEmpty(targetCode)) {

        var header = targetCode[0];
        var html = '';
        var radioName = common.isEmpty(name) ? header.value : name;
        targetCode.forEach(function (value, index) {
            if (!common.isEmpty(value.type)) {

                if (isExcludeAllYn == 'Y' && (value.type == 'all' || value.type == -1)) {
                    return;
                }
                html += '<label class="control-inline fancy-radio custom-color-green">';
                html += '<input type="radio" value="' + value.value + '" id="'+ order + '_' + radioName + index +'" name="' + radioName + '_' + order + '" class="form-control '+radioName+'" ' + (value.value == code ? 'checked="checked"' : '') + '/>';
                html += '<span><i></i>' + value.code + '</span>'
                html += '</label>';
            }
        });
        return html;
    }
},

util.getCommonCodeCheck = function(code, targetCode, isExcludeAllYn, name) {
    targetCode = eval(targetCode);
    if (!common.isEmpty(targetCode)) {

        var header = targetCode[0];
        var html = '';
        var checkName = common.isEmpty(name) ? header.value : name;
        targetCode.forEach(function (value) {
            if (!common.isEmpty(value.type)) {

                if (isExcludeAllYn == 'Y' && (value.type == 'all' || value.type == -1)) {
                    return;
                }
                html += '<label class="control-inline fancy-checkbox custom-color-green">';
                html += '<input type="checkbox" value="' + value.code + '" id="' + checkName + value.value + '" name="' + checkName + '" class="form-control" ' + (value.value == code ? 'checked="checked"' : '') + '/>';
                html += '<span><i></i>' + value.code + '</span>'
                html += '</label><br/>';
            }
        });
        return html;
    }
},

util.getCommonCodeCheck2 = function(code, targetCode, isExcludeAllYn, name) {
    targetCode = eval(targetCode);
    if (!common.isEmpty(targetCode)) {

        var header = targetCode[0];
        var html = '';
        var checkName = common.isEmpty(name) ? header.value : name;
        targetCode.forEach(function (value) {
            if (!common.isEmpty(value.type)) {

                if (isExcludeAllYn == 'Y' && (value.type == 'all' || value.type == -1)) {
                    return;
                }
                html += '<label class="control-inline fancy-checkbox custom-color-green">';
                html += '<input type="checkbox" value="' + value.value + '" id="' + checkName + '_' + value.value + '" name="' + checkName + '" class="form-control" ' + (value.value == code ? 'checked="checked"' : '') + '/>';
                html += '<span><i></i>' + value.code + '</span>'
                html += '</label>';
            }
        });
        return html;
    }
},

util.getCommonCodeHorizontalCheck = function(code, targetCode, isExcludeAllYn, name) {
    targetCode = eval(targetCode);
    if (!common.isEmpty(targetCode)) {

        var header = targetCode[0];
        var html = '';
        var checkName = common.isEmpty(name) ? header.value : name;
        targetCode.forEach(function (value) {
            if (!common.isEmpty(value.type)) {

                if (isExcludeAllYn == 'Y' && (value.type == 'all' || value.type == -1)) {
                    return;
                }
                html += '<label class="control-inline fancy-checkbox custom-color-green">';
                html += '<input type="checkbox" value="' + value.code + '" id="' + checkName + value.value + '" name="' + checkName + '" class="form-control" ' + (value.value == code ? 'checked="checked"' : '') + '/>';
                html += '<span><i></i>' + value.code + '</span>'
                html += '</label>';
            }
        });
        return html;
    }
},

util.getOnOffSwitch = function(data, name) {
    var checkName = name == null ? 'viewOn' : name;

    var html = '<div class="custom-control custom-switch pt-2 mr-2">';
    html += '<input type="checkbox" class="custom-control-input" name="'+checkName+'" id="detail_'+checkName+'" ' + (data == 1 ? 'checked="checked"': '') +'>';
    html += '<label class="custom-control-label" for="detail_'+checkName+'">';
    html += '</label>';
    html += '</div>';

    return html;
},

util.getCodeLabel = function(code, targetCode) {
    var targetCodeName = targetCode;

    targetCode = eval(targetCode);
    if (!common.isEmpty(targetCode)) {
        var html = "";
        targetCode.forEach(function (value) {
            if (!common.isEmpty(value.type)) {
                if (code == value.value) {
                    html = '<label id = "' + targetCodeName + '">' + value.code + '</label>';
                }
            }
        });
        return html;
    }
},

util.getCommonCodeText = function(code, targetCode) {
    targetCode = eval(targetCode);
    if (!common.isEmpty(targetCode)) {
        var codeText = "";
        targetCode.forEach(function (value) {
            if (!common.isEmpty(value.type)) {
                if (code == value.value) {
                    codeText = value.code + "";
                    console.log(codeText);
                }
            }
        });
        return codeText;
    }
},


util.replaceNewLineToBr = function(text){
    text = text.split("\\n").join("<br />");
    text = text.split("\n").join("<br />");
    text = text.split("\\r").join("");
    text = text.split("\r").join("");
    text = text.split("\\t").join("&nbsp;&nbsp;&nbsp;&nbsp;");
    text = text.split("\t").join("&nbsp;&nbsp;&nbsp;&nbsp;");
    return text;
},

util.renderPagingNavigation = function(targetId, pagingInfo){
    if(0 <= pagingInfo.totalCnt) {
        var totalPage = 0;
        var startPage = 0;
        var endPage = 0;
        var tmp = 0;

        if(pagingInfo.totalCnt < pagingInfo.pageCnt){
            totalPage = 1;
        }else if(pagingInfo.totalCnt % pagingInfo.pageCnt == 0){
            totalPage = Math.floor(pagingInfo.totalCnt / pagingInfo.pageCnt);
        }else{
            totalPage = Math.floor(pagingInfo.totalCnt / pagingInfo.pageCnt) + 1;
        }

        if(totalPage <= 10){
            startPage = 1;
            endPage = totalPage;
        }else{
            // 바로 startPage 에 넣으니까 작동안함.
            tmp = ((pagingInfo.pageNo-1) / 10) * 10 + 1;
            if(tmp > 10){
                var a = tmp / 10;
                if(tmp % 10 == 0){
                    a = a -1 ;
                    a = a * 10;
                }else{
                    a = Math.floor(a);
                    a = a*10;
                }
                startPage = a +1;
            }else{
                startPage = 1;
            }
            endPage = startPage + 10 - 1;
            if(totalPage < endPage){
                endPage = totalPage;
            }
        }

        var pagingPrefix = '<ul class="pagination borderless handlebarsPaging justify-content-center">';
        pagingPrefix += '<li class="paginate_button first '+ (pagingInfo.pageNo == 1 ? 'disabled' : '')+'" aria-controls="list_info" tabindex="0" id="list_info_first" data-index="1"><a href="javascript:;"><i class="fas fa-angle-double-left"></i></a></li>&nbsp;';
        pagingPrefix += '<li class="paginate_button previous '+ (pagingInfo.pageNo == 1 ? 'disabled' : '')+'" aria-controls="list_info" tabindex="0" id="list_info_previous"><a href="javascript:;"> Prev </a></li>&nbsp;';

        var pagingContent = '';
        for (var i = startPage; i <= endPage; i++) {
            pagingContent += '<li class="paginate_button num ' + (i == pagingInfo.pageNo ? 'active' : '') +'" style="' + (i == pagingInfo.pageNo ? 'font-weight: bold' : '') +'" aria-controls="list_info" tabindex="0" data-index="'+i+'"><a href="javascript://">' + i + '</a></li>&nbsp;';
        }

        var isEndPage = Math.floor(pagingInfo.totalCnt/pagingInfo.pageCnt) + (pagingInfo.totalCnt % pagingInfo.pageCnt == 0 ? 0 : 1);
        var pagingSurfix = '<li class="paginate_button next '+ (endPage <= 1 || isEndPage == pagingInfo.pageNo ? 'disabled' : '') +'" aria-controls="list_info" tabindex="0" id="list_info_next"><a href="javascript:;"> Next </a></li>&nbsp;';
        pagingSurfix += '<li class="paginate_button last '+ (endPage <= 1 || isEndPage == pagingInfo.pageNo ? 'disabled' : '') +'" aria-controls="list_info" tabindex="0" id="list_info_last" data-index="'+ isEndPage +'"><a href="javascirpt:;"><i class="fas fa-angle-double-right"></i></a></li>';
        pagingSurfix += '</ul>';

        var paging = pagingPrefix + pagingContent + pagingSurfix;

        $("#" + targetId).html(paging);
    }


    $("#"+targetId).find('.handlebarsPaging li.paginate_button').on('click', function(){

        var currentPage = Number($("#"+targetId).find('.handlebarsPaging li.paginate_button.active').data('index'));

        var me = $(this);
        if(me.hasClass('previous')) {
            pagingInfo.pageNo = currentPage - 1;
        }else if(me.hasClass('next')){
            pagingInfo.pageNo = currentPage + 1;
        }else{
            pagingInfo.pageNo = $(this).data('index');
        }

        if(pagingInfo.pageNo == 0){
            return;
        }
        if(pagingInfo.pageNo > endPage){
            return;
        }
        //한 페이지에 여러개의 페이징이 있을 경우 구분하기위해 targetId를 같이 보낸다.
        handlebarsPaging(targetId, pagingInfo);
    });
}

util.getCodeName = function(code, targetCode) {
    var result = "";
    if (!common.isEmpty(targetCode)) {
        targetCode.forEach(function (value) {
            var tCode = value.split(":")[0];
            var tCodeName = value.split(":")[1];
            if (tCode == code) {
                result = tCodeName;
            }
        });
    }
    return result;
},

util.thSort = function(sortType, listSort, desc, text) {
    var html = '<a href="javascript:;" data-sort="' + sortType + '" data-listsort="' + listSort + '" data-desc="' + desc + '" name="th_sort">' + text + '</a>';
    return html;
},

util.thSortEvent = function(callFunction){
    $("a[name=th_sort]").on('click', function (){
        pagingInfo = {
            totalCnt : 0
            , pageNo : 1
            , pageCnt : 10
        };
        var desc = "";
        if($(this).data().sort == $(this).data().listsort){
            if($(this).text() != "NO"){
                if($(this).data().desc == "desc"){
                    desc = "asc";
                }else if($(this).data().desc == "asc"){
                    desc = "desc";
                }
            }
        }else{
            desc = "asc";
        }
        callFunction($(this).data().sort, desc);
    });
},

util.editorInit = function() {
    var targetEditor = $('._editor');

    targetEditor.summernote({
        lang: 'ko-KR',
        height: 500,
        focus: false,
        callbacks: { // 콜백을 사용

        },
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'strikethrough', 'clear']]
            , ['fontname', ['fontname']]
            , ['fontsize', ['fontsize']]
            , ['color', ['color']]
            , ['view', ['codeview']]
        ],
    });

    $(".note-editor.note-frame.panel.panel-default").addClass("tal");
}

util.getCodeSelect = function(targetCode, id, allYn, selectVal) {
    targetCode = eval(targetCode);
    var html = "";
    if (!common.isEmpty(targetCode)) {
        html += '<select class="form-select form-select-sm '+ id +'" id="' + id + '" aria-label="status" name="' + id + '">';
        targetCode.forEach(function (value) {
            if(allYn == "N" || common.isEmpty(allYn)){
                if(value.value == "all"){
                    return;
                }
            }
            if(!common.isEmpty(selectVal)){
                html += '<option value="' + value.value + '" ' + (value.value == selectVal ? 'selected="selected"' : '') + '> ' + value.code + '</option>';
            }else{
                html += '<option value="' + value.value + '"> ' + value.code + '</option>';
            }
        });
        html += '</select>';
        return html;
    }
}

util.getCodeMultiSelect = function(targetCode, id, allYn) {
    targetCode = eval(targetCode);
    var html = "";
    if (!common.isEmpty(targetCode)) {
        html += '<select class="' + id + '" id="' + id + '" style="width:100%;height:200px;" multiple>';
        targetCode.forEach(function (value) {
            if(!common.isEmpty(allYn)){
                if(value.value == "all"){
                    return;
                }
            }
            html += '<option value="' + value.value + '"> ' + value.code + '</option>';
        });
        html += '</select>';
        return html;
    }
}