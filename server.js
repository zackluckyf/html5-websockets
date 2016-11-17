(function() {

    'use strict';

    var app = require('express')();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    io.on('connection', function(socket) {
        console.log('a user connected');
        socket.on('chat message', function(msg) {
            console.log('message: ' + msg);
            io.emit('chat message', msg);
        });
        socket.on('disconnect', function() {
            console.log('user disconnected');
            io.emit('chat message', 'user disconnected!');
        });
    });

    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    http.listen(3000, function() {
        console.log('Example app listening on port 3000!');
    });

})();
