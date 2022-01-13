const express = require("express");
const bodyparser = require('body-parser');

const {loadUsers, addUser} = require('./utils')
const app = express();
app.use(express.json());

app.get('/users',(req, res) => {
    try{
        res.status(200).send(loadUsers(req.body))
    }
    catch(e){
        res.status(400).send({error: e.message})
    }
    
})

app.post('/users', (req, res) =>{
    try{
        res.status(201).send(addUser(req.body))
    }
    catch(e) {
        res.status(400).send({error:e.message})
    }
})





const PORT = 3000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})