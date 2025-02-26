import express from 'express';
import mysql from 'mysql2';

const router = express.Router()

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "mydb"
});  

router.get("/", async (req, res) => {       // localhost:5000/answers/ [GET]
    console.log("handling localhost:5001/questions GET")  
    try {
          const data =  await connection.promise().query(
            `SELECT *  from questions;`
          );
          console.log(data[0])
          res.status(202).json({  // res.send(data)
            answers: data[0]
          });
        } catch (err) {
          res.status(500).json({
            message: err
          });
        }
  });

  router.get("/:id", async (req, res) => {       // localhost:5001/questions/1 [GET]
    const {id} = req.params;
    console.log("handling localhost:5001/questions/" + id + " GET")  
    try {
          const data =  await connection.promise().query(
            `SELECT *  from questions WHERE ID=?;`,[id]
          );
          console.log(data[0])
          res.status(202).json({  // res.send(data)
            answers: data[0]
          });
        } catch (err) {
          res.status(500).json({
            message: err
          });
        }
  });

  router.post("/", async (req, res) => {       // localhost:5001/questions/ [POST]
    console.log("handling localhost:5001/questions/ POST")  
    const {id, question} = req.body;
    try {
          const data =  await connection.promise().query(
            `INSERT INTO questions (id, question) VALUES (?, ?)`,[id,question]
          );
          console.log(data[0])
          res.status(202).json({  // res.send(data)
            actors: data[0]
          });
        } catch (err) {
          res.status(500).json({
            message: err
          });
        }
  });

  export default router;