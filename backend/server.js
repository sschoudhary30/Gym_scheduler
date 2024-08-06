const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db1 = mysql.createPool({
    host: "localhost,
    user: "root",
    password:"",
    database:"gym_scheduler"
})

// login check
app.get('/login', (req,res) => {
    const name = req.query.name;
    const pass = req.query.password
    const sql = "SELECT * FROM `register` WHERE NAME = ? AND PASSWORD = ?";
    db1.query(sql,[name, pass], (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})


// register user, create tables details and customer
app.post('/register', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    const sql = "INSERT INTO `register` (NAME,PASSWORD) VALUES (?, ?)";
    db1.query(sql, [name, password], (err, data) => {
        if (err) {
            console.error("Error inserting data:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            res.send({ message: "Data inserted successfully" });
        }
    });

    const sql3 = "CREATE TABLE " + name + "_CUSTOMER" + " (CUSTOMER_ID VARCHAR(20) UNIQUE , CUSTOMER_NAME VARCHAR(255), GENDER VARCHAR(20), ADDRESS VARCHAR(255), MEDICAL VARCHAR(255), CONTACT VARCHAR(20), WEIGHT FLOAT, HEIGHT FLOAT, TIME_SLOT VARCHAR(20))";
    db1.query(sql3, (err, data) => {
        if (err) {
            console.error("Error creating database:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            res.send({ message: "Database created successfully" });
        }
    });

});

// add data of user to details table, create schedule and machine table
app.post('/register_tab', (req,res) => {

    const name = req.body.name;
    const username = req.body.username;
    const address = req.body.address;
    const ocontact = req.body.ocontact;
    const rcontact = req.body.rcontact;

    const sql3 = "INSERT INTO `GYM_DETAILS` VALUES (?, ?, ?, ?, ?)";
    db1.query(sql3,[name, address, ocontact, rcontact, username], (err, data) => {
        if (err) {
            console.error("Error creating database:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            res.send({ message: "Database created successfully" });
        }
    });


    const sql4 = "CREATE TABLE `" + username + "_SCHEDULE`" + " (CUSTOMER_ID VARCHAR(20), MON1 VARCHAR(20), MON2 VARCHAR(20), MON3 VARCHAR(20), MON4 VARCHAR(20), TUES1 VARCHAR(20), TUES2 VARCHAR(20), TUES3 VARCHAR(20), TUES4 VARCHAR(20), WED1 VARCHAR(20), WED2 VARCHAR(20), WED3 VARCHAR(20), WED4 VARCHAR(20), THURS1 VARCHAR(20), THURS2 VARCHAR(20), THURS3 VARCHAR(20), THURS4 VARCHAR(20), FRI1 VARCHAR(20), FRI2 VARCHAR(20), FRI3 VARCHAR(20), FRI4 VARCHAR(20), SAT1 VARCHAR(20), SAT2 VARCHAR(20), SAT3 VARCHAR(20), SAT4 VARCHAR(20), SUN1 VARCHAR(20), SUN2 VARCHAR(20), SUN3 VARCHAR(20), SUN4 VARCHAR(20))";
    db1.query(sql4, (err, data) => {
        if (err) {
            console.error("Error creating database:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            res.send({ message: "Database created successfully" });
        }
    });

    const sql5 = "CREATE TABLE `" + username + "_MACHINE`" + " (MACHINE_ID VARCHAR(20), MACHINE_NAME VARCHAR(20), BODY_PART VARCHAR(20), TOT_ITEMS INT, MON_M INT, MON_E INT, TUES_M INT, TUES_E INT, WED_M INT, WED_E INT, THURS_M INT, THURS_E INT, FRI_M INT, FRI_E INT, SAT_M INT, SAT_E INT, SUN_M INT, SUN_E INT)";
    db1.query(sql5, (err, data) => {
        if (err) {
            console.error("Error creating database:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            res.send({ message: "Database created successfully" });
        }
    });

})


// display gym details
app.get('/gym_details', (req,res) => {
    const name = req.query.name;
    const sql = "SELECT * FROM `GYM_DETAILS` WHERE USERNAME = ?";
    db1.query(sql,[name], (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})


// update gym details
app.post('/update_gym_details', (req,res) => {

    const name = req.body.name;
    const address = req.body.address;
    const ocontact = req.body.ocontact;
    const rcontact = req.body.rcontact;
    const username = req.body.username;

    const sql3 = "UPDATE `GYM_DETAILS` SET NAME = ?, ADDRESS = ?, OCONTACT = ?, RCONTACT = ? WHERE USERNAME = ?";
    db1.query(sql3,[name, address, ocontact, rcontact, username], (err, data) => {
        if (err) {
            console.error("Error creating database:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            res.send({ message: "Database created successfully" });
        }
    });
})

// add new machine
app.post('/add_machine', (req,res) => {

    const name = req.body.name;
    const id = req.body.id;
    const username = req.body.username;
    const bodypart = req.body.bodypart;
    const total = req.body.total;

    const sql3 = "INSERT INTO `" + username + "_MACHINE` " + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db1.query(sql3,[id, name, bodypart, total, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], (err, data) => {
        if (err) {
            console.error("Error creating database:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            res.send({ message: "Database created successfully" });
        }
    });
})

// remove an existing machine
app.post('/update_machine', (req,res) => {
    const id = req.body.id;
    const total = req.body.total;
    const username = req.body.username;

    const sql3 = "UPDATE `" + username + "_MACHINE` " + "SET TOT_ITEMS = ? WHERE MACHINE_ID = ?";
    db1.query(sql3,[total, id], (err, data) => {
        if (err) {
            console.error("Error creating database:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            res.send({ message: "Database created successfully" });
        }
    });
})

// display machine details
app.get('/machine_details', (req,res) => {
    const name = req.query.name;
    const sql = "SELECT * FROM `" + name + "_MACHINE`";
    db1.query(sql, (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})


// add new customer
app.post('/add_new_customer', (req,res) => {

    const name = req.body.name;
    const id = req.body.id;
    const username = req.body.username;
    const wt = req.body.wt;
    const ht = req.body.ht;
    const address = req.body.address;
    const contact = req.body.contact;
    const gender = req.body.gender;
    const medical = req.body.medical;
    const timeslot = req.body.timeslot;

    const sql3 = "INSERT INTO `" + username + "_CUSTOMER` " + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db1.query(sql3,[id, name, gender, address, medical, contact, wt, ht, timeslot], (err, data) => {
        if (err) {
            console.error("Error creating database:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            res.send({ message: "Database created successfully" });
        }
    });
})

app.post('/add_schedule', (req,res) => {
    const id = req.body.id
    const username = req.body.username;
    const AB = req.body.data;
    const sql = "INSERT INTO `" + username + "_SCHEDULE` " + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db1.query(sql,[id, AB.MON1, AB.MON2, AB.MON3, AB.MON4, AB.TUES1, AB.TUES2, AB.TUES3, AB.TUES4, AB.WED1, AB.WED2, AB.WED3, AB.WED4, AB.THURS1, AB.THURS2, AB.THURS3, AB.THURS4, AB.FRI1, AB.FRI2, AB.FRI3, AB.FRI4, AB.SAT1, AB.SAT2, AB.SAT3, AB.SAT4, AB.SUN1, AB.SUN2, AB.SUN3, AB.SUN4], (err, data) => {
        if (err) {
            console.error("Error creating database:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            res.send({ message: "Database created successfully" });
        }
    });
})

app.post('/update_machine_on_schedule_i', (req,res) => {
    const id = req.body.id
    const username = req.body.username;
    const col = req.body.col;
    const sql3 = "UPDATE `" + username + "_MACHINE` " + "SET " + col + " = " + col + " + 1  WHERE MACHINE_ID = ?";
    db1.query(sql3,[id], (err, data) => {
        if (err) {
            console.error("Error creating database:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            res.send({ message: "Database created successfully" });
        }
    });
})

app.post('/update_machine_on_schedule_d', (req,res) => {
    const id = req.body.id
    const username = req.body.username;
    const col = req.body.col;
    const sql3 = "UPDATE `" + username + "_MACHINE` " + "SET " + col + " = " + col + " - 1  WHERE MACHINE_ID = ?";
    db1.query(sql3,[id], (err, data) => {
        if (err) {
            console.error("Error creating database:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            res.send({ message: "Database created successfully" });
        }
    });
})


app.listen(8081, () => {
    console.log("listening");
})

// display customer name details
app.get('/customers', (req,res) => {
    const name = req.query.name;
    const sql = "SELECT CUSTOMER_ID FROM `" + name + "_CUSTOMER`";
    db1.query(sql, (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

// display customer details
app.get('/customer_details', (req,res) => {
    const name = req.query.name;
    const id = req.query.id;
    const sql = "SELECT * FROM `" + name + "_CUSTOMER` WHERE CUSTOMER_ID = ?";
    db1.query(sql,[id], (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

// display schedule details
app.get('/customer_schedule', (req,res) => {
    const name = req.query.name;
    const id = req.query.id;
    const sql = "SELECT * FROM `" + name + "_SCHEDULE` WHERE CUSTOMER_ID = ?";
    db1.query(sql,[id], (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

// update customer details
app.post('/update_customer', (req,res) => {

    const name = req.body.name;
    const id = req.body.id;
    const username = req.body.username;
    const wt = req.body.wt;
    const ht = req.body.ht;
    const address = req.body.address;
    const contact = req.body.contact;
    const gender = req.body.gender;
    const medical = req.body.medical;
    const timeslot = req.body.timeslot;

    const sql3 = "UPDATE `" + username + "_CUSTOMER` " + "SET CUSTOMER_NAME = ?, GENDER = ?, ADDRESS = ?, MEDICAL = ?, CONTACT = ?, WEIGHT = ?, HEIGHT = ?, TIME_SLOT = ? WHERE CUSTOMER_ID = ?";
    db1.query(sql3,[name, gender, address, medical, contact, wt, ht, timeslot, id], (err, data) => {
        if (err) {
            console.error("Error creating database:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            res.send({ message: "Database created successfully" });
        }
    });
})


// update schedule
app.post('/update_schedule', (req,res) => {
    const id = req.body.id
    const username = req.body.username;
    const AB = req.body.data;
    const sql = "UPDATE `" + username + "_SCHEDULE` " + "SET MON1 = ?, MON2 = ?, MON3 = ?, MON4 = ?, TUES1 = ?, TUES2 = ?, TUES3 = ?, TUES4 = ?, WED1 = ?, WED2 = ?, WED3 = ?, WED4 = ?, THURS1 = ?, THURS2 = ?, THURS3 = ?, THURS4 = ?, FRI1 = ?, FRI2 = ?, FRI3 = ?, FRI4 = ?, SAT1 = ?, SAT2 = ?, SAT3 = ?, SAT4 = ?, SUN1 = ?, SUN2 = ?, SUN3 = ?, SUN4 = ? WHERE CUSTOMER_ID = ? ";
    db1.query(sql,[AB.MON1, AB.MON2, AB.MON3, AB.MON4, AB.TUES1, AB.TUES2, AB.TUES3, AB.TUES4, AB.WED1, AB.WED2, AB.WED3, AB.WED4, AB.THURS1, AB.THURS2, AB.THURS3, AB.THURS4, AB.FRI1, AB.FRI2, AB.FRI3, AB.FRI4, AB.SAT1, AB.SAT2, AB.SAT3, AB.SAT4, AB.SUN1, AB.SUN2, AB.SUN3, AB.SUN4, id], (err, data) => {
        if (err) {
            console.error("Error creating database:", err);
            res.status(500).send({ message: "Internal Server Error" });
        } else {
            res.send({ message: "Database created successfully" });
        }
    });
})
