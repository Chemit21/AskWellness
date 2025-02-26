import express from 'express';
import cors from 'cors';
import users from './routers/users.js';
import questions from './routers/questions.js';
import answers from './routers/answers.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/users',users);                // localhost:5000/users
app.use('/questions',questions);
app.use('/answers',answers);
app.get('/',(req, res) => {             // localhost:5
    res.send('howdy');
});
app.listen(5001, ()=> {
    console.log('listening at port 5001');
});