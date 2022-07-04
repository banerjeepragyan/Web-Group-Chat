const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io')

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
var port = process.env.PORT || 3000;

app.get('/', (req, res) => 
{
    res.render('index')
})

app.post('/room', (req, res) => 
{
    roomname = req.body.roomname;
    username = req.body.username;
    let x = Math.floor((Math.random() * 100000000) + 1);
    if (roomname == "random")
    {
        res.redirect(`/room?username=${username}&roomname=${x}`)
    }
    else
    {
        res.redirect(`/room?username=${username}&roomname=${roomname}`)
    }
})

app.get('/room', (req, res)=>
{
    res.render('room')
})

const server = app.listen(port, () => 
{
    console.log(`Server Running on ${port}`)
})

const io = socket(server);
require('./utils/socket')(io);