import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Quesion.css";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import profile from '../../imgs/User.png'
const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const id = useParams();
  const { questionId } = useParams();
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_base_url}/user/questions/byname`
      );
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const avatarStyle = {
    width: '80px', 
    height: '80px',
    borderRadius: '50%', 
    border: '1px solid #333',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', 
    backgroundColor: 'gray',
  };



  return (
    <div>
      <h1>Questions</h1>
      <hr />
      {questions.map((question) => (
        <div key={question.question_id}>
          <h3>Asked by: </h3>
          <div className="question-container">
            <div className="question-header">
              
      <img style={avatarStyle} src={profile} alt="Avatar" />
             <h5 className="m-3">{question.user_name}</h5>
            </div>

            <div className="question-content">
              {/* <p>User ID: {question.user_id}</p> */}
              <Link
                to={`/answers/${question.question_id}`}
                state={{ question }}
                className="links"
                title="Click here to Repley"
              >
                <div className="question-link">
                  <h2 className="question-link">{question.question}</h2>
                </div>
                <button
            className="slider-button slider-button-left d-sm-none d-md-block">
          <ArrowForwardIosSharpIcon  className="fs-1" />
          </button>
              </Link>
            </div>
            <h5>Time: {question.time}</h5>
           
          </div>
         
          <hr />
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
