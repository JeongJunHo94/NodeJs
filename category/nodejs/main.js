var http = require('http');
var fs = require('fs');
//require 요구하다 무엇을? url을.
//기능을 비슷한 것 끼리 그룹핑 해놓은 것을 모듈이라고 함. url이라는 모듈을 사용
var url = require('url');
var qs = require(`querystring`);

function templateHTML(title, list, body, control) {

  return `
          <!doctype html>
          <html>
          <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
          </head>
          <body>
          <h1><a href="/">WEB1</a></h1>
          ${list}
          ${control}
          ${body}
          </body>
          </html>
          `;
}

function templateList(filelist) {
  var list = '<ul>';
  var i = 0;
  while (i < filelist.length) {
    list = list + `<li><a href= "/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i++;
  }
  list = list + '</ul>';
  return list;
}



var app = http.createServer(function (request, response) {
  var _url = request.url;
  //queryData에 담겨있는 값은 객체이다.
  var queryData = url.parse(_url, true).query;
  // console.log(require('url').parse(request.url, true));
  var pathname = url.parse(_url, true).pathname;


  //주어진 URL정보를 분석해서 보여준다.
  // console.log(url.parse(_url, true));
  // console.log(url.parse(_url, true).pathname);

  if (pathname === '/') {
    if (queryData.id === undefined) {

      fs.readdir('./data', function (error, filelist) {
        console.log(filelist);
        var title = 'Welcome';
        var description = "Hello, Node.js";
        var list = templateList(filelist);
        var template = templateHTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>`);
        response.writeHead(200);
        // response.end(fs.readFileSync(__dirname + url));
        //사용자가 접속한 url에 따라서 다른 파일들을 읽어주는 코드
        //queryData.id에서  template로 변경
        response.end(template);
      })
    } else {
      fs.readdir('./data', function (error, filelist) {
        //data디렉토리 밑에 있는 queryData.id =title
        fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>
            <a href="/update?id=${title}">update</a> 
            <!--<a href="/delete?id=${title}">delete</a>-->
            <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <input type="submit" value="delete">
            `);
          response.writeHead(200);
          // response.end(fs.readFileSync(__dirname + url));
          //사용자가 접속한 url에 따라서 다른 파일들을 읽어주는 코드
          //queryData.id에서  template로 변경
          response.end(template);
        });
      });
    }
  } else if (pathname === '/create') {
    fs.readdir('./data', function (error, filelist) {
      console.log(filelist);
      var title = 'WEB - create';
      var list = templateList(filelist);
      var template = templateHTML(title, list, `
      <!-- form 태그는 submit시 action 이 가리키는 곳으로 각각의 속성을 보내는 기능 -->
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
      `, ``);
      response.writeHead(200);
      // response.end(fs.readFileSync(__dirname + url));
      //사용자가 접속한 url에 따라서 다른 파일들을 읽어주는 코드
      //queryData.id에서  template로 변경
      response.end(template);
    })
  } else if (pathname === '/create_process') {

    var body = ``;
    //post방식으로 전송되는 데이터가 많을 경우
    //서버쪽에서 조각조각 데이터를 받을시마다 함수 호출,
    //function의 data인자를 통해 데이터를 받기로 함
    request.on(`data`, function (data) {
      body = body + data;
    });
    //end에 해당되는 콜백이 실행됐을시, 수신이 끝났다고 생각할 수 있음
    request.on(`end`, function () {
      //post변수에 post전송내용이 들어있다.
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      console.log(title, description);
      //콜백이 실행된다는 것은 파일의 저장이 끝난것을 의미
      fs.writeFile(`data/${title}`, description, `utf8`,
        function (err) {
          //다른곳으로 리다이렉션 302
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();
        })
    });
  } else if (pathname === `/update`) {
    fs.readdir('./data', function (error, filelist) {
      //data디렉토리 밑에 있는 queryData.id =title
      fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
        var title = queryData.id;
        var list = templateList(filelist);
        var template = templateHTML(title, list,
          //body를 구성하는 title+description을 form으로 전환
          // `<h2>${title}</h2>${description}`,
          `
          <form action="/update_process" method="post">
          <!--인풋정보를 사용자가 수정하면 안되니 히든을 준다-->
          <input type="hidden" name="id" value="${title}">
          <!--value값에다가 title의 기본값을 지정해준다. -->
           <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p>
           <textarea name="description" placeholder="description">${description}</textarea>
           </p>
           <p>
              <input type="submit">
            </p>
          </form>
          `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
        response.writeHead(200);
        // response.end(fs.readFileSync(__dirname + url));
        //사용자가 접속한 url에 따라서 다른 파일들을 읽어주는 코드
        //queryData.id에서  template로 변경
        response.end(template);
      });
    });

  } else if (pathname === `/update_process`) {
    var body = ``;
    //post방식으로 전송되는 데이터가 많을 경우
    //서버쪽에서 조각조각 데이터를 받을시마다 함수 호출,
    //function의 data인자를 통해 데이터를 받기로 함
    request.on(`data`, function (data) {
      body = body + data;
    });
    //end에 해당되는 콜백이 실행됐을시, 수신이 끝났다고 생각할 수 있음
    request.on(`end`, function () {
      //post변수에 post전송내용이 들어있다.
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function (error) {
        //기존의 파일의 이름을 수정한다음에는 수정한 파일에 해당되는것에
        // 우리가 받은 description정보를 주고 그 id값으로 들어간다
        fs.writeFile(`data/${title}`, description, `utf8`,
          function (err) {
            //다른곳으로 리다이렉션 302
            response.writeHead(302, { Location: `/?id=${title}` });
            response.end();
          })
      })
      console.log(post);

      // console.log(title, description);
      // //콜백이 실행된다는 것은 파일의 저장이 끝난것을 의미
      // fs.writeFile(`data/${title}`, description, `utf8`,
      //   function (err) {
      //     //다른곳으로 리다이렉션 302
      //     response.writeHead(302, { Location: `/?id=${title}` });
      //     response.end();
      //   })
    });
  } else {
    response.writeHead(404);
    response.end('Not Found');
  }
});
app.listen(3000);
