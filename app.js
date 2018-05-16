const express = require('express');
const path = require('path');
const stylus = require('stylus');
const app = express();
const http = require('http');
const reload = require('reload');


app.set('views', path.join(__dirname,'views'));
app.set('view engine','pug');
app.use(stylus.middleware(
  { src: path.join(__dirname,'/stylus')
  ,	dest: path.join(__dirname,'/docs', '/css')
  }
));
app.use(express.static(__dirname + '/docs'));

// home route
app.get('/', function(req,res){
	res.render("index");
});

const server = http.createServer(app);
server.listen(3001,function(){
	console.log("server started on port 3001");
})
reload(app);