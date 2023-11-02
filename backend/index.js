import express from "express";
import mysql from "mysql"
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "redsox",
})


app.get("/", (req,res)=>{
    res.json("This is the backend")
})

app.get("/roster", (req,res)=>{
    const query = "SELECT * FROM roster"
    db.query(query, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/roster", (req,res)=>{
    const query = "INSERT INTO roster (`first_name`, `last_name`,`age`,`email`,`position`) VALUES(?)"
    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.age,
        req.body.email,
        req.body.position,
    ]
    db.query(query,[values], (err,data) => {
        if(err) return res.json(err)
        return res.json("A player has been added")
    })
})

app.listen(8000, ()=>{
    console.log("Connected to backend")
})