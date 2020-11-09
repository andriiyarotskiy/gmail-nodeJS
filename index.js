const express = require('express')
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express()

app.use(cors());
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