const nodemailer = require('nodemailer')
const url = require('url')
const http = require('http')
const fs = require('fs')
const axios = require('axios')






http.createServer((req, res) => {

    var { correos, asunto, contenido } = url.parse(req.url, true).query
    
    
    

    if (req.url == '/') {
        // res.setHeader('conten-type', 'text/html')
        // fs.readFile('index.html', 'utf8', (err, data) => {
        //     res.end(data)
        // })
    }
    if (req.url.startsWith('/mailing')) {
        getMonedas().then(x=>{
            let mensaje=  `Hola! los indicadores economicos son los siguientes

            El Dolar esta a ${x['dolar'].valor}
            El Euro esta a ${x['euro'].valor}
            La UF esta a ${x['uf'].valor}
            La UTM esta a ${x['utm'].valor}`
            enviar(correos, asunto, contenido+mensaje);
            console.log("Mensaje enviado");

        })
        
    }

}).listen(3000, console.log('escuchando'))

enviar = (to, subject, text) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '####',
            pass: '####',
        },
    })


    let mailOptions = {
        from: 'nodemailerADL@gmail.com',
        to,
        subject,
        text,
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) console.log(err)
        if (data) {
            console.log(para, " ", asunto, " ", contenido);
        }
    })
}
async function getMonedas(){
    let {data} = await axios.get('https://mindicador.cl/api')

    return data;

}

