const express = require('express');
const path = require('path');
const { clearInterval } = require('timers');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.render('index.html');
});

app.use('/adminedi0212lima', (req, res) => {
    res.render('admin.html');
});

let id = 0;
const listOfPlayers = [];
let stop;

function generateFruit() {

    const cX = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540, 560, 580];

    const cY = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540, 560, 580, 600];

    var x = getRandomIntInclusive(0, 29);
    var y = getRandomIntInclusive(0, 30);

    const coordinates = {
        x: cX[x],
        y: cY[y]
    }

    console.log(coordinates);

    io.emit('previousPixels', coordinates);

};

function getRandomIntInclusive(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;

};



io.on('connection', (socket) => {

    console.log(socket.id + '  IDENTIFICADOR');

    socket.on('setInterval', (number) => {

        const interval = number;

        if (interval > 0) {

            console.log('start');

            stop = setInterval(generateFruit, interval);
        }

        if (interval == false) {

            console.log('stop');

            clearInterval(stop);
        }
    });

    listOfPlayers.push(socket.id);
    io.emit('listOfPlayers', listOfPlayers);

    const playerPoints = {
        client: {}
    }

    id++

    playerPoints.client[id] = {
        id: socket.id,
        point: 0
    }

    socket.on('sendPlayerLeft', (parameters) => {

        const player = {
            parameters: parameters,
            id: socket.id
        }

        socket.broadcast.emit('receiverPlayerLeft', player);

    });

    socket.on('sendPlayerUp', (parameters) => {

        const player = {
            parameters: parameters,
            id: socket.id
        }

        socket.broadcast.emit('receiverPlayerUp', player);

    });

    socket.on('sendPlayerRight', (parameters) => {

        const player = {
            parameters: parameters,
            id: socket.id
        }

        socket.broadcast.emit('receiverPlayerRight', player);

    });

    socket.on('sendPlayerDown', (parameters) => {

        const player = {
            parameters: parameters,
            id: socket.id
        }

        socket.broadcast.emit('receiverPlayerDown', player);

    });

    socket.on('sendPoints', (points) => {

        for (const i in playerPoints.client) {

            if (playerPoints.client[i].id === points.id) {
                playerPoints.client[i].point++

                io.emit('receiverPoints', playerPoints.client[i]);

            }
        }

    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('servidor de pé em http://localhost:3000');
});