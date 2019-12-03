var number = [9,4,0,6,1,4];

//모든 배열값 더하기

var i = 0;
var total = 0;
while(i < number.length){
  total = total + number[i];
  i = i + 1
  
}
console.log(`total : ${total}`);