const express = require('express')
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express()

const whitelist = ['http://localhost:3000', 'https://andriiyarotskiy.github.io'];


app.use(cors({
    origin: whitelist,
    methods: "GET,PUT,POST,DELETE, OPTIONS",
    preflightContinue: true,
    optionsSuccessStatus: 204
}));

app.use(function(req, res, next) {
    if(whitelist.indexOf(req.headers.origin) > -1) res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


let smt_login = process.env.SMTP_LOGIN || "----";
let smt_password = process.env.SMTP_PASSWORD || "----";


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: smt_login,  // generated ethereal user
        pass: smt_password,// generated ethereal password
    },

});


app.get('/', function (req, res) {
    res.send('Hello World')
});

app.post('/sendMessage', async function (req, res) {

    let {message, contacts, name} = req.body

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'HR', // sender address
        to: "andriiyarotskiy@gmail.com", // list of receivers
        subject: "HR ✔", // Subject line
        text: "Описание", // plain text body
        html: `<b>Сообщение с вашего Portfolio</b>
        <div>name: ${name}</div>
        <div>contacts: ${contacts}</div>
        <div>message: ${message}</div>`
    });
    res.send("ok")
})

let port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Example app listening on port 3010')
})