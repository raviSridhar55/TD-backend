const express = require('express')
const mysql = require('mysql')
const bodyparser = require('body-parser')
const app = express();

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "newDatabase"
})

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/" + "index.html")
})

app.post('/sendData',(req,res) => {
    var firstName = req.body.firstName
    var lastName = req.body.lastName
    var regNumber = req.body.regNumber

    var query = 'INSERT INTO USERINFO (firstName, lastName, regNumber) VALUES(" '+firstName+' "," '+lastName+' ", " '+regNumber+' " )'

    con.query(query,(err,results) => {
        if(err) {
            console.log(err)
            console.log(err.message)
            res.send(err.message)
        }else {
            console.log("Data is entered.")
            res.send({
                status:200,
                message:"Data is entered." 
            })
        }
    })
})

app.put('/updateData', (req,res) => {
    res.send('The data is updated')
})


app.delete('/deleteData', (req,res) => {
    res.send('The data is deleted')
})

app.listen(4000, () => {
    console.log('Server is running on port 4000')
})
