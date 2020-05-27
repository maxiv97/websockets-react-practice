const express = require('express');
const app = express();
const socktIo = require('socket.io');
const http = require('http');
// path es una librería de nodejs que te permite trabajar con los directorios.
const path = require('path');

// webpack
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');

const server = http.createServer(app);
const io = socktIo(server);

// Middlewares
// Cada vez que el servidor reciba una petición va a tomar todo el código de ./src , lo va a transformar y lo va a colocar en ./public
app.use(webpackDevMiddleware(webpack(config)));

// Con la siguiente linea estamos declarando que vamos a enviar solo la carpeta "public" al navegador (es allí donde se encuentra nuestro código para la vista)
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log('Socket coneccted: ', socket.id);
    socket.on('message', body => {
        socket.broadcast.emit('message', {
            body,
            from: socket.id
        })
    })
})

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});