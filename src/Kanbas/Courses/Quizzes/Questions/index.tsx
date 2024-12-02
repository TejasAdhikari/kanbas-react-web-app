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
import { FaPlus, FaTrash } from "react-icons/fa";
import NewQuestionEditor from "./NewQuestionEditor";
import { setQuestions, deleteQuestion } from "../Questions/reducer";
import * as questionsClient from "./client"
import QuestionDelete from "./QuestionDelete";


export default function QuizQuestionsEditor() {
    const { pathname } = useLocation();
    const { cid, qid } = useParams();
    const [ qsId, setqsId ] = useState("new");
    
    
    // Set up local state for form inputs
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const quiz = quizzes.find((quiz: any) => quiz._id === qid);

    //To get all the question in the quiz
    const { questions } = useSelector((state: any) => state.questionReducer);
    // const quizQuestions = questions.find((question: any) => question.quiz === qid);

    
    
    const fetchQuestions = async () => {
        const questions = await quizzesClient.findQuestionsForQuiz(qid as string);
        console.log(questions);
        dispatch(setQuestions(questions));
    };

    const removeQuestion = async (questionId: string) => {
        await questionsClient.deleteQuestion(questionId);
        dispatch(deleteQuestion(questionId));
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
        
        <div id="wd-quizzes-questions-editor" className="text-nowrap">    
            <hr />
            <div className="d-flex justify-content-end">
                <span>{"Points: " + quiz.points}</span>
            </div>
            <hr />

            <div className="container">
                <h4>{quiz.title}</h4>

                <div className="d-flex justify-content-center">
                    <a >
                        <button className="btn btn-secondary mt-4 mb-5"
                            onClick={() => setqsId("new")}
                            data-bs-toggle="modal" data-bs-target="#wd-add-question-dialog">
                            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                            New Question
                        </button>
                    </a>
                </div>
            </div>
            <hr />
            <ul id="wd-modules" className="list-group p-5 rounded-0">
                {questions.map((question: any) => (
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        {"Question Number"}
                    </div>
                    <ul className="wd-questions list-group rounded-0">
                        <li className="wd-lesson list-group-item p-3 ps-1">
                            {question.description}
                            <div className="float-end">
                                {/* <ProtectedEdit> */}
                                <FaTrash className="text-danger me-2 mb-1" 
                                    data-bs-toggle="modal" data-bs-target={`#wd-delete-${question._id}-dialog`}/>
                                {/* </ProtectedEdit>  */}
                                {/* <GreenCheckmark /> */}
                                {/* <IoEllipsisVertical className="fs-4" /> */}
                                <QuestionDelete dialogTitle="Delete Assignment" 
                                                questionId={question._id}
                                                deleteQuestion={removeQuestion} />
                                </div>
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
                </li>
            ))}
            </ul> 
        <hr />
            <div className="d-flex justify-content-end">  
                    <a href={`#/Kanbas/Courses/${cid}/Quizzes`}>
                        <button className="btn btn-secondary me-1">
                            Cancel
                        </button>
                    </a>
                    <a href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>
                        <button className="btn btn-danger me-1" 
                            // onClick={savequiz}
                            id={`wd-update-${qid}-click`}>
                            Save
                        </button> 
                    </a>
                    
            </div>
            <NewQuestionEditor questionId={qsId}/>
        </div>
    )
};