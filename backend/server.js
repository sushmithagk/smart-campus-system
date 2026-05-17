const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());


// ================= STUDENT REGISTER =================

app.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    const sql =
    "INSERT INTO students(name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, password], (err, result) => {

        if(err){
            res.send(err);
        }
        else{
            res.send("Student Registered Successfully");
        }

    });

});


// ================= STUDENT LOGIN =================

app.post("/student-login", (req, res) => {

    const { email, password } = req.body;

    const sql =
    "SELECT * FROM students WHERE email=? AND password=?";

    db.query(sql, [email, password], (err, result) => {

        if(err){
            res.send(err);
        }
        else{

            if(result.length > 0){
                res.json({
                    success: true,
                    student: result[0]
                });
            }
            else{
                res.json({
                    success: false,
                    message: "Invalid Credentials"
                });
            }

        }

    });

});


// ================= ADMIN LOGIN =================

app.post("/admin-login", (req, res) => {

    const { username, password } = req.body;

    const sql =
    "SELECT * FROM admins WHERE username=? AND password=?";

    db.query(sql, [username, password], (err, result) => {

        if(err){
            res.send(err);
        }
        else{

            if(result.length > 0){
                res.json({
                    success: true
                });
            }
            else{
                res.json({
                    success: false,
                    message: "Invalid Admin Credentials"
                });
            }

        }

    });

});


// ================= ADD COMPLAINT =================

app.post("/complaint", (req, res) => {

    const { student_name, issue, location } = req.body;

    const sql =
    "INSERT INTO complaints(student_name, issue, location, status) VALUES (?, ?, ?, ?)";

    db.query(
        sql,
        [student_name, issue, location, "Pending"],
        (err, result) => {

            if(err){
                res.send(err);
            }
            else{
                res.send("Complaint Submitted Successfully");
            }

        }
    );

});


// ================= GET COMPLAINTS =================

app.get("/complaints", (req, res) => {

    const sql = "SELECT * FROM complaints";

    db.query(sql, (err, result) => {

        if(err){
            res.send(err);
        }
        else{
            res.json(result);
        }

    });

});


// ================= UPDATE STATUS =================

app.put("/update-status/:id", (req, res) => {

    const id = req.params.id;

    const { status } = req.body;

    const sql =
    "UPDATE complaints SET status=? WHERE id=?";

    db.query(sql, [status, id], (err, result) => {

        if(err){
            res.send(err);
        }
        else{
            res.send("Status Updated");
        }

    });

});


// ================= SERVER =================

app.listen(5000, () => {
    console.log("Server Running On Port 5000");
});