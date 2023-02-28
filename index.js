const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json());
app.use(cors())
const users = [
{email: "seregazloy@mail.ru",
password: "baza2015",
name: "Sergey",
age: "40",
token:""},
{email: "tankist@yahoo.com",
password: "sdfsf",
name: "Volodya",
age: "50",
token:""},
{email: "Sanya_CS@mail.ru",
password: "Toxic",
name: "Alexandr",
age: "10",
token:""}
]

const authorizationHander = (req,res,next) =>{
    const [type,token] = req.headers.authorization.split(' ')
    const email = req.body.email 
    if (type.toLowerCase() != 'bearer'){
        res.json({
            message:"Bad token type"
        })
        return;
    }
    const user = users.find(
        item => item.token === token
    ) 
    if (!users) {
        res.json({
            message:"Bad token"
        })
    } else {
        req.locals = {
            user
        }
        next()
    }

}

app.get('/me/', authorizationHander,(req,res) => {
    var user = req.locals.user
    if (user){
    res.json({
        mail: user.email,
        name: user.name
    })
}else {
    res.json({
        status:"User error"
    })
}
})

app.get('/users/', authorizationHander,(req,res) => {

    res.json({
       users
    })
})


app.post('/reg', (req,res) => {
    const  username = req.headers.username
    const  password = req.headers.password
    const id =  users.length + 1
     users.push({id,username:username,password:password,friends:[],token:""})
     res.json({
         message:"User created"
     })
     
 })

app.post('/auth/',(req,res) =>{
    const email = req.body.email    
    const password = req.body.password
    if (password && email){ 
    let user = users.find(da => da.email == email && da.password === password)
    if (user) {
        let token = uuidv4();
        user.token = token
        res.json({
            status: true,
            token: token,
        })
    } else {
        res.json({
            status: false
        })
    }
}else {
    res.json({
        status:"false",
    })
}
})

app.listen(5050, () => console.log('Started!'))