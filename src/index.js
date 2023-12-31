const express = require("express");
const pagarme = require('pagarme');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {

    res.send('@underfined user for telegram support ')
});



app.post('/enc', (req, res) => {
    let { name, number, data, cvv, apikey } = req.body;



    pagarme.client.connect({ encryption_key: apikey })
        .then(client => {
            return client.security.encrypt({
                card_number: number,
                card_holder_name: name,
                card_expiration_date: data,
                card_cvv: cvv,
            })
        }).then(async card_hash => {

            res.json({
                card_hash: card_hash,
            });

            //res.send()
        })

})


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


module.exports = app;

/*

coded by @underfined 

 */