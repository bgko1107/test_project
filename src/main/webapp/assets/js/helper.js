
/**
 * Number Add Comma
 * 숫자 콤마 추가
 */
Handlebars.registerHelper("addComma", function (value,blank) {
    return common.addComma(value, blank);
})


/**
 * Number Remove Comma
 * 숫자 콤마 제거
 */
Handlebars.registerHelper("removeComma", function (value) {
    return common.removeComma(value);
})


/**
 * Number Convert To Date
 * 숫자를 날짜로 변환
 *
 *  # Format
 *   ex.) YYYY-MM-DD HH:mm:ss:SSS
 *
 */
Handlebars.registerHelper("convertToDate", function (date, format) {
    if(common.isEmpty(date)){
        return "-";
    }
    if(common.isEmpty(format)){
        format = "YYYY.MM.DD";
    }
    return moment(date).format(format);
})

/**
 * Date 구분자 제거
 *
 */
Handlebars.registerHelper("dateToNumber", function (value) {
    var regExp = /\d/gi;

    return value.toString().replace(regExp, "");
})


Handlebars.registerHelper('json', function(obj) {
    return JSON.stringify(obj);
});


/**
 * if
 *
 * ex.)
 * {{#dalbit_if value1 "==" "test1"}}
 *      true code      {{! value1 == "test1" }}
 * {{else}}
 *      false code      {{! value1 != "test1" }}
 * {{/dalbit_if}}
 *
 */
Handlebars.registerHelper("ifCond", function(v1, operator, v2, options){
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
})


/**
 *  테이블 목록 index
 */
Handlebars.registerHelper("index", function(index, no)
{
    return common.isEmpty(index) ? no : parseInt(index) + 1;
});

Handlebars.registerHelper("indexDesc", function(totalCnt, rownum)
{
    return common.isEmpty(totalCnt) ? 0 : totalCnt - rownum + 1;
});

Handlebars.registerHelper("indexDescWithoutRownum", function(totalCnt, pageStart, pageCnt, index)
{
    return common.isEmpty(totalCnt) ? 0 : totalCnt - ((pageStart - 1) * pageCnt) - index;
});

Handlebars.registerHelper("getCommonCodeText", function(value, targetCode)
{
    return util.getCommonCodeText(value, targetCode);
});

Handlebars.registerHelper("getCommonCodeSelect", function(value, targetCode, isExcludeAllYn, name)
{
    return util.getCommonCodeSelect(value, targetCode, isExcludeAllYn, name);
});

Handlebars.registerHelper("getCommonCodeSelectForName", function(value, targetCode, isExcludeAllYn, name)
{
    return util.getCommonCodeSelectForName(value, targetCode, isExcludeAllYn, name);
});

Handlebars.registerHelper("getCommonCodeRadio", function(value, targetCode, isExcludeAllYn, name)
{
    return util.getCommonCodeRadio(value, targetCode, isExcludeAllYn, name);
});

Handlebars.registerHelper("getCommonCodeCheck", function(value, targetCode, isExcludeAllYn, name)
{
    return util.getCommonCodeCheck(value, targetCode, isExcludeAllYn, name);
});

Handlebars.registerHelper("replaceHtml", function(value)
{
    return common.replaceHtml(value);
});

Handlebars.registerHelper("replaceHtml_json", function(value)
{
    return common.replaceHtml_json(value);
});

Handlebars.registerHelper("equal", function (value, value2, opt){
    return common.equal(value, value2, opt);
});

Handlebars.registerHelper("getOnOffSwitch", function(value, name){
   return util.getOnOffSwitch(value, name);
});

Handlebars.registerHelper("timeStamp", function(value) {
   return common.timeStamp(value);
});

Handlebars.registerHelper("timeStampAll", function(value) {
    return common.timeStampAll(value);
});

Handlebars.registerHelper("phoneNumHyphen", function(value) {
    return common.phoneNumHyphen(value);
});

Handlebars.registerHelper("fontColor", function(value, minValue, fontColor) {
    return common.fontColor(value, minValue, fontColor);
});

Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "+": common.addComma(lvalue + rvalue),
        "-": common.addComma(lvalue - rvalue),
        "*": common.addComma(lvalue * rvalue),
        "/": common.addComma(lvalue / rvalue),
        "%": common.addComma(lvalue % rvalue)
    }[operator];
});

Handlebars.registerHelper("evalJS_isEmpty", function(varName, options) {
    var v = eval(varName);

    if(common.isEmpty(v)){
        return options.fn(this);
    }else{
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isChild", function(birthDate, options) {
    return common.isChild(birthDate) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("substr", function(value, st, ed) {
    return common.substr(value,st, ed);
});

Handlebars.registerHelper("moment", function(value, format) {
    return moment(value).format(format);
});

Handlebars.registerHelper("isCurrentDisplay", function(is_view, startDate, endDate) {

    var on_text = '<span style="color:blue;">ON</span>';
    var off_text = '<span style="color:gray">OFF</span>';

    if(is_view == 1){
        if(startDate != '0000-00-00 00:00:00'){
            var start = moment(startDate).format('YYYYMMDDHHmmss');
            var end = moment(endDate).format('YYYYMMDDHHmmss');
            var current = moment(new Date()).format('YYYYMMDDHHmmss');
            if(start <= current && current <= end){
                return on_text;
            }else{
                return off_text;
            }
        }
        return on_text
    }
    return off_text;
});

Handlebars.registerHelper('getCommonCodeRadio', function(code, targetCode, isExcludeAllYn, name){
    return util.getCommonCodeRadio(code, targetCode, isExcludeAllYn, name);
});

Handlebars.registerHelper('getCommonCodeCheck', function(code, targetCode, isExcludeAllYn, name){
    return util.getCommonCodeCheck(code, targetCode, isExcludeAllYn, name);
});

Handlebars.registerHelper('getCommonCodeSelect', function(code, targetCode, isExcludeAllYn, name){
    return util.getCommonCodeSelect(code, targetCode, isExcludeAllYn, name);
});

Handlebars.registerHelper('getCommonCodeSelectForName', function(code, targetCode, isExcludeAllYn, name){
    return util.getCommonCodeSelectForName(code, targetCode, isExcludeAllYn, name);
});

Handlebars.registerHelper("split", function (value, pattern ,location) {
    return value.split(pattern)[location];
});

Handlebars.registerHelper("rowNumDesc", function (total, value, pageNo, pageCnt) {
    pageNo = isNaN(Number(pageNo)) ? 1 : pageNo;
    pageCnt = isNaN(Number(pageCnt)) ? 0 : pageCnt;
    return total - value - ((pageNo - 1) * pageCnt);
});

Handlebars.registerHelper("rowNumAsc", function (total, value, pageNo, pageCnt) {
    pageNo = isNaN(Number(pageNo)) ? 1 : pageNo;
    pageCnt = isNaN(Number(pageCnt)) ? 0 : pageCnt;
    return value + ((pageNo - 1) * pageCnt) + 1;
});

Handlebars.registerHelper("upAndDownClass", function(value) {
    return common.upAndDownClass(value);
});

Handlebars.registerHelper("getCodeSelect", function(code, id, allYn, selectVal) {
    return util.getCodeSelect(code, id, allYn, selectVal);
});

Handlebars.registerHelper("getCodeMultiSelect", function(code, id, allYn) {
    return util.getCodeMultiSelect(code, id, allYn);
});

Handlebars.registerHelper("getCodeLabel", function(code, id) {
    return util.getCodeLabel(code, id);
});