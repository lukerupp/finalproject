const express = require('express')
const sqlite3 = require('sqlite3')
const app = new express()
const db = new sqlite3.Database('leaguenews2.db')

app.use(express.static('public'))
app.use(express.json())

app.get("/teams", (req,res) => {
    const sql = "SELECT * FROM teams;"
    db.all(sql,[],(err, rows) => {
        res.send(rows)
    })
})

app.post("/login", (req, res) => {
    const user = req.body
    //5. retrieve all users from database
    //6. only retrieve users with matching username and password
    const sql2 = "SELECT id, first_name, last_name FROM users WHERE username = ? AND password = ?"
    db.all(sql2,[user.username, user.password],(err, rows) => {
        console.log(rows)
        if (rows && rows.length > 0) {
            res.send({
                message: "Successful login!",
                user: rows[0]
            })
        }
    

    //let userMatch = users.find( (u) => u.username == user.username && u.password == user.password )
    //Does userMatch exist?
    
    else {
        if (user.username.length >= 4 && user.password.length >= 4) {
            //save new account on server
            //4. New user is stored in database
            const sql = "INSERT INTO users (username, password, first_name, last_name, favoriteteam) VALUES (?,?,?,?,?)"
            db.run(sql,[user.username, user.password, user.first_name, user.last_name, user.favoriteteam],function(err)  {
                if (err) console.error(err)
                res.send({
                    message: "Your account was successfully created.",
                    userId: this.lastID
                })
            })
        }
        else {
            res.status(401)
            res.send({
                message: "Username or password is invalid."
            })
        }
    }
    })
}) 

app.listen(8080, () => console.log("Server started"))