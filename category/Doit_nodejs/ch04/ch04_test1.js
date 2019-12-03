var url = require(`url`); // url 모듈에서 불러온 객체를 url 변수에 할당

var urlStr = `https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=popcorn`; //실제 주소

var curUrl = url.parse(urlStr);//parse시킨, 잘라진 url정보를 넣어주자

//parse된, 잘라진 정보를 출력해보자. parse실행시, 문자열이였던 기존 주소가 객체로 반환된다.
console.dir(curUrl);

console.log(`------------------------------------------------`);

//query라는 정보를 확인해보고 싶다.
console.log(`query -> ${curUrl.query}`);


console.log(`------------------------------------------------`);

//parse된 정보들을 통해서 다시 문자열의 주소를 만들고 싶다.
var curStr = url.format(curUrl);
console.log(`url -> ${curStr}`);


console.log(`------------------------------------------------`);

//curUrl String문자열 안에서 검색어만 뽑아내고 싶다.
var querystring = require(`querystring`);
var params = querystring.parse(curUrl.query); //parse되어 나눠져있던 쿼리들이 curUrl.query에 담겨있다.

console.log(`검색어 : ${params.query}`);
