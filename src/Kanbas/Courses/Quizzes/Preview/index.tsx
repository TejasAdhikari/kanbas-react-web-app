import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import * as db from "../../../Database"
import ProtectedEdit from "../../../Account/ProtectedEdit";
import ProtectedRouteStudent from "../../../Account/ProtectedRouteStudent";
import { addQuiz, updateQuiz } from "../reducer";
import { useSelector, useDispatch } from "react-redux"; 
import * as coursesClient from "../../client";
import * as quizzesClient from "../client";
import { MdOutlineEdit } from "react-icons/md";
import QuestionBox from "./QuestionBox";
import { setQuestions, deleteQuuestion } from "../Questions/reducer";

export default function QuizPreview() {
    const { pathname } = useLocation();
    const { cid, qid } = useParams();
    
    
    // Set up local state for form inputs
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const quiz = quizzes.find((quiz: any) => quiz._id === qid);

    const { questions } = useSelector((state: any) => state.questionReducer);
    // const question = quizzes.find((quiz: any) => quiz._id === qid);
    // const [quizName, setquizName] = useState("");
    const [questionDesc, setquestionDesc] = useState("");
    const [questionPoints, setquestionPoints] = useState<number>();
    

    const fetchQuestions = async () => {
        const questions = await quizzesClient.findQuestionsForQuiz(qid as string);
        console.log(questions);
        dispatch(setQuestions(questions));
    };
    
    useEffect(() => {
        if(qid !== "new"){
            // setquestionDesc(quiz.description);
            // setquestionPoints(quiz.points);
            fetchQuestions();
        }
    }, []);

    const dispatch = useDispatch();

    return (
      <div id="wd-quizzes-editor">    
        
        <div className="container">
            <h3>{quiz.title}</h3>
        </div>
        <hr />

        {/* <QuestionBox /> */}
        <ul id="wd-modules" className="list-group p-5 rounded-0">
            {questions.map((question: any) => (
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary">
                    {"Question Number"}
                </div>
                {/* {module.lessons && ( */}
                <ul className="wd-questions list-group rounded-0">
                  {/* {module.lessons.map((lesson: any) => ( */}
                    <li className="wd-lesson list-group-item p-3 ps-1">
                        {question.description}
                        <hr />
                        <form >
                        {question.possibleAnswers.map((answer: any) => (
                            <div className="ps-2 col-12">
                                <div className="list-group" id="list-tab" role="tablist">
                                    <div className="form-check">                                        
                                        <label key={answer.text} className="form-check-label">
                                            <input className="form-check-input" 
                                                type="radio" 
                                                name="exampleRadios"
                                                value={answer.text}/>
                                            {answer.text}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}</form>
                    </li>
                </ul>


                {/* <form>
                    {questions.map((question: any) => (
                    <div key={question.id} style={{ marginBottom: "20px" }}>
                        <h3>{question.question}</h3>
                        {question.possibleAnswers.map((answer: any) => (
                        <label key={answer.text} style={{ display: "block", margin: "5px 0" }}>
                            <input
                            type="radio"
                            name={`question-${question._id}`}
                            value={answer.text}
                            // checked={userAnswers[question.id] === option}
                            // onChange={() => handleAnswerChange(question.id, option)}
                            />
                            {answer.text}
                        </label>
                        ))}
                    </div>
                    ))}
                </form> */}
            </li>
        ))}
        </ul> 
        <hr />
        <div className="modal-footer">
            <a href={`#/Kanbas/Courses/${cid}/Quizzes`}>
                <button type="button" className="btn btn-secondary me-2">
                    Cancel 
                </button>
            </a>
            <a href="">
                <button type="button" className="btn btn-danger">
                    Submit Quiz 
                </button>
            </a>
        </div>
    </div>
);}
