//계산기 변수 선언
var calc = {};

 //함수에 할당하는 과정
 calc.add = function(a,b){
    return a+b;
 };

 console.log('모듈로 분리하기 전 상태 - calc.add : ' + calc.add(10,10));
 