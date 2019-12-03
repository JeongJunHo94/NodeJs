var Users = [{name: '소녀시대', age:20}, {name:'걸스데이', age:22},{name:'티아라',age:23}];

console.log(`배열요소의 수 : ${Users.length}`);

for(var i = 0; i < Users.length; i++){
  console.log(`배열요소 #` + i +` :`+Users[i].name);
  
}


console.log(`\nforEach 구문 사용하기`);
Users.forEach(function(a, b){
  console.log(`배열요소 #${b}: ${a.name}`);
  
});

var sliceSome = Users.slice(0,2);
console.dir(`sliceSome : ${sliceSome}`);

