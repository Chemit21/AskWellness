import express from 'express';
import mysql from 'mysql2';

const router = express.Router()
// connecting Database
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "mydb"
});  

router.post("/", async (req, res) => {       // localhost:5000/users [POST}]
  try {
      const {uname} = req.body;
      console.log(`uname=${uname}`)

      const data =  await connection.promise().query(
        `SELECT *  from USERS WHERE UNAME=?;`,[uname]
      );
      console.log(`data[0]=${JSON.stringify(data[0])}`)
      res.status(202).json({  // res.send(data)
        users: data[0]
      });
    } catch (err) {
      res.status(500).json({
        message: err
      });
    }
});

router.post("/register", async (req, res) => {       // localhost:5000/users/register [POST}]
  try {
      const {uname} = req.body;
      const {pword} = req.body;
      console.log(`uname=${uname}, pword=${pword}`)

      const data =  await connection.promise().query(
        `INSERT INTO users VALUES (?,?)`,[uname,pword]
      );
      console.log(`data[0]=${JSON.stringify(data[0])}`)
      res.status(202).json({  // res.send(data)
        users: data[0]
      });
    } catch (err) {
      res.status(500).json({
        message: err
      });
    }
});
export default router;