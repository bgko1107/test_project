(function(window, undefined) {
  'use strict';

  /*
  NOTE:
  ------
  PLACE HERE YOUR OWN JAVASCRIPT CODE IF NEEDED
  WE WILL RELEASE FUTURE UPDATES SO IN ORDER TO NOT OVERWRITE YOUR JAVASCRIPT CODE PLEASE CONSIDER WRITING YOUR SCRIPT HERE.  */

})(window);


function isEmpty(value){
  if(typeof value === 'function'){
    return false;
  }
  return (value == null || value.length === 0);
}

function getAjax(dst_id, dst_url, dst_params, successFunc, errorFunc, option, async, loading) {
  // 파라미터에 memNo 없을때 세션에 가지고 있던 memNo 넣기
  (common.isEmpty(dst_params.memNo)) ? dst_params.memNo = Number(sessionStorage.getItem("memNo")) : "";

  (loading) ? LoadingBar(true) : "";
  $.ajax({
    beforeSend : function(xhr){
      // xhr.setRequestHeader("Content-type","application/json");
      // xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem("token"));
    },
    headers: {
      // 'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
    },
    type: isEmpty(option) ? 'POST' : option,
    url: dst_url,
    dataType: 'json',
    data: dst_params,
    contentType: 'application/x-www-form-urlencoded; charset=euc-kr',
    async: isEmpty(async) ? true : async,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true
  }).done(function (data) {
    $('#fade').hide();
    $('#loading').hide();
    if (successFunc != null){
      // console.log("[ajax 통신 결과] url:", dst_url);
      // console.log("dst_id:", dst_id);
      // console.log("dst_params:", dst_params);
      // console.log("data:", data);
      successFunc(dst_id, data, dst_params);
      (loading) ? LoadingBar(false) : "";
    }
  }).fail(function (data, textStatus, jqXHR) {
    try {
      if (errorFunc != null) {
        errorFunc(data, textStatus, jqXHR);
      } else {
        commonAjaxError(data, textStatus, jqXHR);
      }
    } catch (e) {
      // function call fail skip
      alert(e);
      //showAlert('A', e);
    }
  });
}

function commonAjaxError(data, textStatus, jqXHR) {
  try {
    // console.log(data);
    if (textStatus == 'parsererror' && 0 < data.responseText.indexOf('로그인')) {
      alert('세션이 만료되어 로그인 페이지로 이동합니다.');
      location.href = '/index.html';
    }
  } catch (e) {

  }
}

function getGeomJson(name, type, response){

  var list = [];

  for(var i=0;i<response.length;i++){

    var geometry = JSON.parse(response[i].geometry.replace(/$#34;/g,"'"));
    // geometry 삭제
    delete response[i].geometry;

    var tmp = {
      "type" : "Feature"
      , "id" : response[i].id
      , "maxx": response[i].maxx
      , "maxy": response[i].maxy
      , "minx": response[i].minx
      , "miny": response[i].miny
      , "geometry" : geometry
      , "properties" : response[i]
    };

    list.push(tmp);
  }

  var result = {
    "crs" : { "properties" : {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}
    , "type" : "name"}
    , "name": name
    , "type": type
    , "features" : list
  }

  return result;
}

var epsg4326 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
var openmate = "+proj=tmerc +lat_0=38.0 +lon_0=128.0 +x_0=400000.0 +y_0=600000.0 +k=0.9999 +ellps=bessel +a=6377397.155 +b=6356078.9628181886 +units=m +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";
// epsg4326, openmate, x좌표, y좌표
function fn_projTransform(from, to, x_axis, y_axis) {

  var coordinates = [parseFloat(x_axis), parseFloat(y_axis)];
  var result = proj4(from, to, coordinates);

  return result;
}