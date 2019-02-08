const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const port = process.env.PORT||3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected');
    socket.emit('newEmail',{
    	from: 'ankirawat@gamil.com',
    	text: 'hey what is going on',
    	createAt: 123
    });
           
     socket.emit('newMessage', {
       from: 'amit',
       text: 'netflix subscription',
       createAt:123
     });
                 //emit used to creating an event and on listens event
    socket.on('createMessage', (message) => {
    	console.log('createMessage' , message);
    })

	socket.on('disconnect',() => {
			console.log('disconnected from server');
		});
});

server.listen(port, () =>{
	console.log('server is up running');
})