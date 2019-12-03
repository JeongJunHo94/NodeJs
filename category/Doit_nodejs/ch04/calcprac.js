var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Calc = function(){
  var self = this;
  
  this.on('stop', function() {
    console.log(`Calc에 stop event 전달됨.`);
  });
};

util.inherits(Calc, EventEmitter);

// Calc.prototype.add = function(a,b) {
//   return a + b;
// }
// console.log(Calc.emit());
// Calc.emit('stop');

module.exports = Calc;
module.exports.title = `계산기라능`;



// var Calc = require(`./calcprac`);

var calc = new Calc();
calc.emit(`stop`);

console.log(`${Calc.title}에 stop이벤트 전달함.`);

