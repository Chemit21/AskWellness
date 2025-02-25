import {useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './home.css';
const Home = ({uname}) => {
  const navigate = useNavigate();  
  console.log(`HOME: uname=${uname}`)
  useEffect(() => {
    if (!uname) {
      console.log(`HOME: navigate( '/login')` );
      navigate('/login'); // <-- redirect
    }
  }, [uname, navigate]);

const [questions, setQuestions] = useState([]);
const idRef = useRef();
const questionRef = useRef();
const handleQueryQuestions = () =>{
  let parameters = {
    method: "GET",
  }
  console.log('handleQueryQuestions called')
  let url = `http:localhost:5001/questions`;
  fetch( url, parameters)
  .then( res => res.json())
  .then( json => {
    console.log(JSON.stringify(json))
    const questionsTemp = json.questions;
    console.log(`handleQueryQuestions: questions=${JSON.stringify(questionsTemp)}`);
    setQuestions(questionsTemp);
  })
}
const handleInsertQuestion = () =>{
  let question = {};
  question.id = idRef.current.value;
  question.question = questionRef.current.value;
  let parameters = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(question)
  }
  console.log('handleInsertQuestion called')
  let url = `http://localhost:5001/questions`;
  fetch( url, parameters)
  .then( res => res.json ())
  .then( json => {
    console.log(JSON.stringify(json))
    const affectedRows = json.questions.affectedRows;
    console.log(`handleInsertQuestion:affectedRows=${affectedRows}`);
    handleQueryQuestions();
  })
}
useEffect( () => {
  handleQueryQuestions();
},[]);
  return (
  <div className="Home">
  <h1>Wellness Hub</h1>  
  <h3>Login Successful {uname}</h3>
  <h3>Questions</h3>

  <table>
                <tr>
                    <th>ID</th>
                    <th>Questions</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>How can I improve my sleep quality?</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>How can I manage stress effectively?</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>What are the benefits of drinking water, and how much should I drink daily?</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>How can I boost my immune system naturally?</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>How can I improve my mental health and well-being?</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>What are some natural remedies for anxiety?</td>
                </tr>
            </table>
  
       <div>Question<input type="text" ref={questionRef} /></div>
        <div><button onClick={handleInsertQuestion}>Ask Question</button></div>
      
   
  
       
        </div>
  );
    }

export default Home;