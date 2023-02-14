const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(cors())
let token = ''
const users = [
{email: "seregazloy@mail.ru",
password: "baza2015",
name: "Sergey",
age: "40"},
{email: "tankist@yahoo.com",
password: "sdfsf",
name: "Volodya",
age: "50"},
{email: "Sanya_CS@mail.ru",
password: "Toxic",
name: "Alexandr",
age: "10"}
]

const auth = () =>{
    return
} 


app.get('/me/',(req,res) => {
    var auth = req.headers.authorization
    auth = auth.split(' ')
    if (auth[1] === token) {
        auth = auth[1].substring(0, auth[1].length - 6)
        res.json({
            auth
        }) 
    } else
    res.json({
        message: "Bad token",
    })
})

app.post('/auth/',(req,res) =>{
    const email = req.body.email    
    const password = req.body.password
    let user = users.find(da => da.email == email)
    if (!user) {
        res.json({
            message:"User not found"
        })
    } else {
        let userId = users.indexOf(user)
        let userMail = users[userId].email
        let userPassword = users[userId].password
        token = `${email}-token`
        console.log('got request!', email, password)
            if (email === userMail && password === userPassword) {
                res.json({
                status: true,
                token: token
             })
    }   else {
            res.json({
                userId,
                status: false
            })
    }
    }
    
})
app.listen(5050, () => console.log('Started!'))