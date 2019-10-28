var express = require('express'); 
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();
//app.set('view engine', 'jade');
//app.engine('jade', require('jade').__express); 

var server = require('http').Server(app);
var io = require('socket.io').listen(server);

mongoose.connect("mongodb://mongo:27017/pizza", { useNewUrlParser: true, useNewUrlParser: true }, function(err){
  if(err) {
    console.log(err);
  } else {
    console.log('connected to mongo db successfully.')
  }
});

app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
});


let chatSchema = new mongoose.Schema({
  name: String,
  msg: String
});

var chatModel = mongoose.model('chat', chatSchema);


server.listen(process.env.PORT || 8080,function(){
  console.log('Listening on port '+server.address().port);
});

server.lastPlayderID = 0;
io.on('connection',function(socket){
    console.log('connection initiated');
    socket.on('registerUser',function(un){
      socket.user = {
        id: server.lastPlayerID,
        name: un
      };
      
      server.lastPlayerID++;


      socket.emit('allplayers',getAllConnections());

      socket.broadcast.emit('newuser',socket.user); // adding newly joined users to list of all active users

    });

    socket.on('processMsg', function(msg){
      chatModel.create({name:socket.user.name, msg: msg}, function(){
        chatModel.find({}, function(err, data){
          console.log(data);
          io.emit('newMsg',data);
        });
      });
    });


});


function getAllConnections(){
  var users = [];
  Object.keys(io.sockets.connected).forEach(function(socket){
      var user = io.sockets.connected[socket].user;
      if(user) users.push(user);
  });
  return users;
}