const express = require("express");
const app = express();

const mysql = require("mysql");

const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pruebareactcrud"
});

app.post("/create",(req,res) =>{

    const name= req.body.name;
    const age= req.body.age;
    const country= req.body.country;
    const position= req.body.position;
    const years= req.body.years;

    db.query('INSERT INTO employes(name,age,country,position,years) VALUES(?,?,?,?,?)',[name,age,country,position,years],
    (err,resu)=>{
        if(err){
            console.log(err)
        }else{
            res.send("registed")
        }

    });

});
app.get("/employes",(req,res) =>{

    db.query('SELECT * FROM employes',
    (err,resu)=>{
        if(err){
            console.log(err)
        }else{
            res.send(resu);
        }

    });

});
app.put("/update",(req,res) =>{

    const id= req.body.id;
    const name= req.body.name;
    const age= req.body.age;
    const country= req.body.country;
    const position= req.body.position;
    const years= req.body.years;

    db.query('UPDATE employes SET name=?,age=?, country=?, position=?, years=? WHERE  id=?' ,[name,age,country,position,years,id],
    (err,resu)=>{
        if(err){
            console.log(err)
        }else{
            res.send("updated")
        }

    });

});
app.delete("/delete/:id",(req,res) =>{

    const id= req.params.id;

    db.query('DELETE FROM employes WHERE  id=?' ,id,
    (err,resu)=>{
        if(err){
            console.log(err)
        }else{
            res.send("removed")
        }

    });

});

app.listen(3001, ()=>{
    console.log("en el puerto 3001");
})