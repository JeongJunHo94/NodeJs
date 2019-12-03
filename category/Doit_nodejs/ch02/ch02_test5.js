var calculation = require('./calc');
console.log('모듈로 분리한 후 상태 - calc.add : ' + calculation.add(20,20));

var calc2 = require('./calc2');
console.log('모듈로 분리한 후 - calc2.add 함수 호출 결과 : ' + calc2.add(10,10));
