var nconf = require('nconf');
nconf.env();


console.log('OS환경변수의 값 : ' + nconf.get('OS'));

