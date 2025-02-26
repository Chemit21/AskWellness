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
    console.log("handling localhost:5001/answers GET")  
    try {
          const data =  await connection.promise().query(
            `SELECT *  from answers;`
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

  router.get("/:id", async (req, res) => {       // localhost:5000/answers/1 [GET]
    const {id} = req.params;
    console.log("handling localhost:5001/answers/" + id + " GET")  
    try {
          const data =  await connection.promise().query(
            `SELECT *  from answers WHERE ID=?;`,[id]
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

  router.post("/", async (req, res) => {       // localhost:5000/answers/ [POST]
    console.log("handling localhost:5001/answers/ POST")  
    const {id, answer} = req.body;
    try {
          const data =  await connection.promise().query(
            `INSERT INTO answers (id, answer) VALUES (?, ?)`,[id,answer]
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

  