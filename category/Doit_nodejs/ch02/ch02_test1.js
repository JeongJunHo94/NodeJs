
var result = 0;

console.time('sum_time');

for (var i = 1; i <= 1000; i++) {
  result += i;
}

console.timeEnd('sum_time');
console.log('1부터 1000까지 더한 결과물 : ' + result);

console.log('현재 실행한 파일의 이름 : ' + __filename);
console.log('현재 실행한 파일의 패스 : ' + __dirname);

var Person = {name:"소녀시대", age:20};
console.dir(Person);