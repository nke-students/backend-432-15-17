const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(cors())

app.post('/auth/',(req,res) =>{
    const email = req.body.email    
    const password = req.body.password

    console.log('got request!', email, password)
    if (email === 'nke@nake.ru' && password === '1234') {
        res.json({
            status: true,
            token: `${email}-token`
        })
    } else {
        res.json({
            status: false
        })
    }
})
app.listen(5050, () => console.log('Started!'))