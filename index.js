const express = require('express');
const MercadoPago = require('mercadopago');
const app = express();

MercadoPago.configure({
    sendbox: true,
    access_token: 'TEST-1651957823620068-072813-8e02da2a0968e20b4fd1feb3ccf57341-223068134'
})

app.get('/', (req, res) => {
    res.send("Olá, Mundo!")
});

app.get('/pagar', async (req, res) => {
    let id = "" + Date.now();
    let emailDoPagador = "lucas.alemida@ctprice.com.br";
    let dados = {
        items: [
            item = {
                id: id,
                title: "5x Super Bola",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            }
        ],
        payer: {
            email: emailDoPagador
        },
        external_reference: id
    }
    try {
        let pagamento = await MercadoPago.preferences.create(dados)
        console.log(pagamento);
        res.redirect(pagamento.body.init_point);
    } catch (err) {
        console.log(err);
        res.send(err);
    }

});

app.listen(3000, (req, res) => {
    console.log('ON!');
})