let EventEmitter = require('events').EventEmitter
let util = require('util')

let Sol = function() {
  let self = this

  this.on('stop', function() {
    console.log('zzzzz')
  }) 
}

util.inherits(Sol, EventEmitter)

Sol.prototype.add = function(a,b) {
  return a+b
} 

 module.exports = Sol
module.exports.title = '한솔천재'

// 내보낸거 받아서 쓰기
let sol = new Sol()

sol.emit('stop')