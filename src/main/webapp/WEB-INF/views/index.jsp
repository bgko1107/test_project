<%--
    PageName    :
    FileName    : index.jsp
    Description : 나이스비즈맵 관리자 페이지
    Author      : 
    Make DT     :
    Modify DT   :
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%--<%@ include file = "/loginCheck.jsp"%>--%>
<%
	response.setHeader("cache-control", "no-cache"); //-- HTTP 1.1
	response.setHeader("expires", "-1"); //-- HTTP 1.0
	response.setHeader("pragma", "no-cache");

	request.setCharacterEncoding("euc-kr");

	String cjcode = "CJ02";
%>
<!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">

<link rel="stylesheet" type="text/css" href="/olive/assets/olive/css/pretendard.css">
<link rel="stylesheet" type="text/css" href="/olive/assets/olive/css/style.css">

<!-- echart -->
<script type="text/javascript" src="/olive/assets/lib/charts.min.js"></script>
<script type="text/javascript" src="/olive/assets/lib/echarts.min.js"></script>

<!-- min js -->
<script type="text/javascript" src="/olive/assets/lib/jquery.min.js"></script>
<script type="text/javascript" src="/olive/assets/lib/handlebars-v4.7.2.js"></script>
<script type="text/javascript" src="/olive/assets/js/helper.js"></script>
<script type="text/javascript" src="/olive/assets/js/common.js"></script>
<script type="text/javascript" src="/olive/assets/js/commonUtil.js"></script>
<script type="text/javascript" src="/olive/assets/js/scripts.js"></script>
<script type="text/javascript" src="/olive/assets/olive/js/main_script.js"></script>


<title>test</title>
</head>

<body>
</body>


</html>


<script type="text/javascript">


		var param = {};
		getAjax("getOliveGrowth", '/main/getOliveGrowth', param, function (id, response) {
			data.oliveGrowth = response.data;

			var gubun = 'gubun1';
			var template = $('#tmp_table_gubun' + gubun).html();
			var templateScript = Handlebars.compile(template);
			var context = data;
			var html = templateScript(context);
			$(".alrt_bdy.no_ul").html(html);
			$(".mega_nm").text($(".select.mega option:selected").text());

			$(".table_show").addClass("show");
			$(".modal1").show();
		}, fn_error, "POST", "", true);

</script>



<script type="text/x-handlebars-template" id="tmp_table_gubun1">
	<div class="pop_section mb40">
		<h5 class="mb12 " id="tableSubTitle">올리브영 vs 화장품업종 전월대비 성장률 상위 10개지역</h5>
		<div class="table_box hastwo_table mb12 flx">
			<table>
				<colgroup>
					<col style="width: 20%">
					<col style="width: auto">
					<col style="width: auto">
				</colgroup>
				<thead>
					<tr>
						<th scope="col">올리브영 <br />기준 순위
						</th>
						<th scope="col">시/도</th>
						<th scope="col">성장률<span class="gr"> (%)</span></th>
					</tr>
				</thead>
				<tbody>
					{{#each this.oliveGrowth.olive}}
					<tr>
						<td>{{rowNum}}</td>
						<td><strong>{{megaNm}}</strong></td>
						<td>{{oliveDiff}}%</td>
					</tr>
					{{/each}}
				</tbody>
			</table>

			<table>
				<colgroup>
					<col style="width: 20%">
					<col style="width: auto">
					<col style="width: auto">
				</colgroup>
				<thead>
					<tr>
						<th scope="col">화장품 업종<br />기준 순위
						</th>
						<th scope="col">시/도</th>
						<th scope="col">성장률<span class="gr"> (%)</span></th>
					</tr>
				</thead>
				<tbody>
					{{#each this.oliveGrowth.beauty}}
					<tr>
						<td>{{rowNum}}</td>
						<td><strong>{{megaNm}}</strong></td>
						<td>{{beautyDiff}}%</td>
					</tr>
					{{/each}}
				</tbody>
			</table>
		</div>
		<p class="reference t_align_r">* 단위:%</p>
	</div>
</script>


