const express = require('express')
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "andriiyarotskiy@gmail.com", // generated ethereal user
        pass: "andrvik1488", // generated ethereal password
    },

});


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.post('/sendMessage', async function (req, res) {

    let {message, contacts, name} = req.body

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Andrii 👻" <andriiyarotskiy@gmail.com>', // sender address
        to: "wnbroz20@meta.ua", // list of receivers
        subject: "Тест gmail ✔", // Subject line
        text: "Описание", // plain text body
        html: `<b>Сообщение с вашего Portfolio</b>
        <div>${name}</div>
        <div>${contacts}</div>
        <div>${message}</div>`

        // html body
    });

    res.send("ok")
})

app.listen(3010, () => {
    console.log('port 3010')
})