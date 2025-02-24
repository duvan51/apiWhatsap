const qrcode = require('qrcode-terminal');
const {Client} = require('whatsapp-web.js');


const client = new Client()


client.on('qr', qr =>{
    qrcode.generate(qr, {small: true});
})

client.on('ready', ()=>{
    console.log('cliente logueado')
})

client.on('message', message=>{
    if(message.body != ""){
        client.sendMessage(message.from, 'hola como vas')
    }
})

client.initialize();