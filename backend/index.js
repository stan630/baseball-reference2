const express = require ("express")
const app = express()
const mysql = require ("mysql") 
const cors = require ('cors')
const bodyParser = require ("body-parser")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "redsox",
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get("/api/get", (req,res)=>{
    const query = "SELECT * FROM roster"
    db.query(query, (error,result)=>{
        res.send(result)
    })
})

// app.get("/users", (req,res)=>{
//     const query = "SELECT * FROM users"
//     db.query(query, (err,data)=>{
//         if(err) return res.json(err)
//         return res.json(data)
//     })
// })

app.post("/api/post", (req,res) => {
    const {first_name,last_name,age,email,position} = req.body
    const sqlInsert = "INSERT INTO roster(first_name,last_name,age,email,position) VALUES (?,?,?,?,?)"
    db.query(sqlInsert, [first_name,last_name,age,email,position], (error,result) => {
       if(error) {
        console.log(error)
       }
    })
})

app.delete("/api/remove/:id", (req,res) => {
    const {id} = req.params
    const sqlRemove = 
        "DELETE FROM roster WHERE id=?"
    db.query(sqlRemove, id,(error, result) => {
        if(error) {
            console.log(error)
        }
    })
})

app.get("/api/get/:id", (req,res) => {
    const {id} = req.params
    const sqlGet ="SELECT * FROM roster WHERE id = ?"
    db.query(sqlGet, id, (error,result)=> {
        if (error) {
            console.log(error)
        }
        res.send(result)
    })
    
})

app.put("/api/update/:id", (req,res)=> {
    const {id} = req.params
    const {first_name,last_name,age,email,position} =req.body
    const sqlUpdate = "UPDATE roster SET first_name = ?,last_name=?,age=?,email=?, postion=? WHERE id = ?"
    db.query(sqlUpdate, [first_name,last_name,age, email,position,id], (error,result)=> {
        if(error) {
            console.log(error)
        }
        res.send(result)
    })
})




app.listen(8000, ()=>{
    console.log("Connected to backend")
})