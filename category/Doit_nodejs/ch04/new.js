var Calc = require(`./123123123`);

var calc = new Calc();
calc.emit(`stop`);

console.log(`${Calc.title}에 stop이벤트 전달함.`);
