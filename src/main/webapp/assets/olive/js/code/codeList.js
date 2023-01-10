var COMMON_CODE = function(type, value, code){
    this.type = type;
    this.value = value;
    this.code = code;
};

var sellYn = [
    new COMMON_CODE('0', '0', '무료')
    , new COMMON_CODE('1', '1', '유료')
];

var dStatus = [
    new COMMON_CODE('0', '0', '미사용')
    , new COMMON_CODE('1', '1', '사용')
];

var displayYn = [
    new COMMON_CODE('Y', 'Y', '전시')
    , new COMMON_CODE('N', 'N', '미전시')
];

var prodType = [
    new COMMON_CODE('all', 'all', '전체')
    , new COMMON_CODE('01', '01', '단품')
    , new COMMON_CODE('02', '02', '패키지')
    , new COMMON_CODE('03', '03', '관리자용')
    , new COMMON_CODE('04', '04', '쿠폰')
    , new COMMON_CODE('05', '05', '전문가보고서')
    , new COMMON_CODE('06', '06', 'FRAN')
    , new COMMON_CODE('08', '08', '선불이용권')
];

var useLimit = [
    new COMMON_CODE('1', '1', '1')
    , new COMMON_CODE('2', '2', '2')
    , new COMMON_CODE('3', '3', '3')
    , new COMMON_CODE('5', '5', '5')
    , new COMMON_CODE('10', '10', '10')
    , new COMMON_CODE('12', '12', '12')
    , new COMMON_CODE('15', '15', '15')
    , new COMMON_CODE('20', '20', '20')
    , new COMMON_CODE('30', '30', '30')
    , new COMMON_CODE('40', '40', '40')
    , new COMMON_CODE('50', '50', '50')
    , new COMMON_CODE('100', '100', '100')
    , new COMMON_CODE('300', '300', '300')
    , new COMMON_CODE('500', '500', '500')
    , new COMMON_CODE('999', '999', '999')
];

var daysLimit = [
    new COMMON_CODE('0', '0', '무제한')
    , new COMMON_CODE('1', '1', '1일')
    , new COMMON_CODE('2', '2', '2일')
    , new COMMON_CODE('3', '3', '3일')
    , new COMMON_CODE('5', '5', '5일')
    , new COMMON_CODE('7', '7', '7일')
    , new COMMON_CODE('10', '10', '10일')
    , new COMMON_CODE('12', '12', '12일')
    , new COMMON_CODE('15', '15', '15일')
    , new COMMON_CODE('20', '20', '20일')
    , new COMMON_CODE('30', '30', '30일')
    , new COMMON_CODE('50', '50', '50일')
    , new COMMON_CODE('365', '365', '1년')
];

var reportList = [

];

var megaList = [
    new COMMON_CODE('11', '11', '서울')
    , new COMMON_CODE('26', '26', '부산')
    , new COMMON_CODE('27', '27', '대구')
    , new COMMON_CODE('28', '28', '인천')
    , new COMMON_CODE('29', '29', '광주')
    , new COMMON_CODE('30', '30', '대전')
    , new COMMON_CODE('31', '31', '울산')
    , new COMMON_CODE('41', '41', '경기도')
    , new COMMON_CODE('42', '42', '강원도')
    , new COMMON_CODE('43', '43', '충청북도')
    , new COMMON_CODE('44', '44', '충청남도')
    , new COMMON_CODE('45', '45', '전라북도')
    , new COMMON_CODE('46', '46', '전라남도')
    , new COMMON_CODE('47', '47', '경상북도')
    , new COMMON_CODE('48', '48', '경상남도')
    , new COMMON_CODE('50', '50', '제주')
];

var ctyList = [];
var admiList = [];

var upjongList = [
    new COMMON_CODE('F', 'F', '생활서비스')
    , new COMMON_CODE('S', 'S', '의료/건강')
    , new COMMON_CODE('O', 'O', '여가/오락')
    , new COMMON_CODE('Q', 'Q', '음식')
    , new COMMON_CODE('D', 'D', '소매/유통')
    , new COMMON_CODE('R', 'R', '학문/교육')
];

var upjong2List = [];
var upjong3List = [];


var faqGubun = [
    new COMMON_CODE('3', '3', '결제처리관련')
    , new COMMON_CODE('2', '2', '회원가입관련')
    , new COMMON_CODE('1', '1', '서비스이용관련')
];

var payMethod = [
      new COMMON_CODE('SC0010', 'SC0010', '신용카드')
    , new COMMON_CODE('SC0030', 'SC0030', '계좌이체')
    , new COMMON_CODE('SC0040', 'SC0040', '무통장')
    , new COMMON_CODE('SC0060', 'SC0060', '휴대폰')
    , new COMMON_CODE('SC0070', 'SC0070', '유선전화결제')
    , new COMMON_CODE('SC0090', 'SC0090', 'OK캐쉬백')
    , new COMMON_CODE('SC0111', 'SC0111', '문화상품권')
    , new COMMON_CODE('SC0112', 'SC0112', '게임문화상품권')
    , new COMMON_CODE('NI0010', 'NI0010', '전문가보고서(무료)')
    , new COMMON_CODE('NI0020', 'NI0020', '쿠폰(무료)')
    , new COMMON_CODE('NI0030', 'NI0030', '관리자용(무료)')
    , new COMMON_CODE('NI0040', 'NI0040', '선결제')
    , new COMMON_CODE('NI0050', 'NI0050', '회원가입쿠폰(무료)')
];

var receiveGubun = [
    new COMMON_CODE('Y', 'Y', '수신')
    , new COMMON_CODE('N', 'N', '미수신')
];

var memType = [
    new COMMON_CODE('1', '1', '예비창업자')
    , new COMMON_CODE('2', '2', '점포운영자')
    , new COMMON_CODE('3', '3', '사업종전환희망자용')
    , new COMMON_CODE('4', '4', '컨설턴트')
];

var memStat = [
    new COMMON_CODE('1', '1', '탈퇴')
    , new COMMON_CODE('2', '2', '회원')
];