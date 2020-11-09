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
    var gender = req.body.gender;
    var query = 'INSERT INTO USERINFO (firstName, lastName, regNumber, gender) VALUES("'+firstName+'","'+lastName+'","'+regNumber+'","'+gender+'")'

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
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var regNumber = req.body.regNumber;
    var gender = req.body.gender
    var newGender = req.body.newGender
    var newFirstName = req.body.newFirstName;
    var newLastName = req.body.newLastName;
    var newRegNumber = req.body.newRegNumber;
    var query = `UPDATE USERINFO SET firstName = "${newFirstName}" , lastName = "${newLastName}" , regNumber = ${newRegNumber} WHERE firstName = "${firstName}" AND lastName = "${lastName}" AND regNumber = ${regNumber} `;
    con.query(query, (err, results) => {
      if (err) {
        res.send(err.message);
        // console.log(err);
        console.log(err.message);
      } else {
        console.log("Data has been updated.");
        res.send({
          status: 200,
          message: "Data is updated.",
        });
      }
    });
})


app.delete('/deleteData', (req,res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var regNumber = req.body.regNumber;
    var gender = req.body.gender;
    var query =`DELETE FROM userinfo WHERE firstName = "${firstName}" AND lastName = "${lastName}" AND regNumber = ${regNumber} `;
    con.query(query, (err, results) => {
        console.log(results)
      if (err) {
        res.send(err.message);
        console.log(err.message);
      } else {
        console.log("Data has been deleted.");
        res.send({
          status: 200,
          message: "Data is deleted.",
        });
      }
    });
    console.log(req.body)
})

app.listen(4000, () => {
    console.log('Server is running on port 4000')
})
