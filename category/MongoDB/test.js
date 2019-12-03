//mongodb 모듈로부터 MongoClient를 불러옴
var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');
// Connection URL (URL주소 + /db이름))
// var url = 'mongodb://localhost:27017';
// Use connect method to connect to the server
MongoClient.connect('mongodb://localhost:27017',{useUnifiedTopology:true}, function (err, client) {

  var db = client.db('test');
  assert.equal(null, err);
  console.log("Connected successfully to server");
  //collection이름을 쓸때는 아래와 같이 collection+(컬렉션이름)과 같이 쓴다. 또한 find()는 커서값으로, 주소값만 가져오며 실제 데이터를 가져오지 않는다.
  db.collection('user').insertOne({ first_connect: "Mongo" }).then(function (r) {

    res = db.collection('user').find()
    res.toArray(function (err, docs) {
      assert.equal(err, null);
      console.log(docs)
    });
    client.close();
  });
});
