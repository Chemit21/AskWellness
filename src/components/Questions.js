import React from "react";
import { useState, useEffect } from "react";

export default function Questions({user}) {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [answer_body, setAnswer_body] = useState("")
    
    const handleSubmit = async (event, question_id) => {
        event.preventDefault();
        console.log (question_id, user.user_id, answer_body)
        const response = await axios.post ("http://localhost:5001/questions/", {question_id, user_id:user.user_id, answer_body})
        console.log ("response: ", response)
    }
    
    const handleAnswerChange = (event) => {
        setAnswer_body (event.target.value)
    }

    const fetchQuestion = async () => {
        try {
            const response = await axios.get ("http://localhost:5001/questions/")
            setQuestions (response.data)
        }
        catch (error) {
            console.log (error)
        }
    }
    const fetchAnswers = async (question_id) => {
        try {
            const response = await axios.get (`http://localhost:5001/answers?{question_id}`)
            setAnswers ((prevAnswer) => ({...prevAnswer, [question_id]: response.data}))
            console.log (answers)
        }
        catch (error) {
            console.log (error)
        }
    }
    useEffect (()=>{
        fetchQuestion()
    }, [])
}