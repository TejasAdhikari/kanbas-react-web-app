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
import { setQuestions } from "../Questions/reducer";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { divide } from "../../../../Labs/Lab3/Math";

export default function PreviousAttempt() {
    const { pathname } = useLocation();
    const { cid, qid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    
    // Set up local state for form inputs
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const quiz = quizzes.find((quiz: any) => quiz._id === qid);

    const { questions } = useSelector((state: any) => state.questionReducer);
    // const question = quizzes.find((quiz: any) => quiz._id === qid);
    // const [quizName, setquizName] = useState("");
    const [questionDesc, setquestionDesc] = useState("");
    const [questionPoints, setquestionPoints] = useState<number>();
    const [answers, setAnswers] = useState(
        questions.map((q: any) => ({ question: q._id, selectedAnswer: null }))
    );
    const [previousAnswers, setPreviousAnswers] = useState<any>([]);
    const [ displayPrev, setdisplayPrev] = useState<Boolean>(true);


    const fetchQuestions = async () => {
        const questions = await quizzesClient.findQuestionsForQuiz(qid as string);
        // console.log(questions);
        dispatch(setQuestions(questions));
    };

    const fetchSubmission = async () => {
        // const userId = currentUser._id; 
        // const submission = await quizzesClient.getSubmission(qid, userId);
        // console.log("Submission: " + submission);
        // setPreviousAnswers(submission || []);

        try {
            const userId = currentUser._id;
            const submission = await quizzesClient.getSubmission(qid, userId);
    
            // Log the fetched data for debugging
            console.log("Submission score:", submission?.score);
    
            // Set default values if submission is null/undefined
            setPreviousAnswers(submission || { answers: [] });
        } catch (error) {
            console.error("Error fetching submission:", error);
    
            // Ensure a fallback state
            setPreviousAnswers({ answers: [] });
        }
    };
      
    //Handle answer Changes
    const handleAnswerChange = (questionId: any, selectedAnswer: any) => {
        console.log("SelectedAnswer: " + selectedAnswer);
        setAnswers((prev: any) =>
            prev.map((a: any) =>
                a.question === questionId ? { ...a, selectedAnswer } : a
            )
        );
        // console.log(answers);
    };

    const handleSubmitQuiz = async () => {
        const userId = currentUser._id; 
        // console.log(answers);
        await quizzesClient.submitQuiz(qid, { userId, answers });
        alert("Quiz submitted successfully!");
    };
      

      
    useEffect(() => {
        if(qid !== "new"){
            // setquestionDesc(quiz.description);
            // setquestionPoints(quiz.points);
            fetchQuestions();
            fetchSubmission();
        }
        // console.log(answers);
        console.log("Previous Answers: " + previousAnswers.score);

    }, [answers]);

    const dispatch = useDispatch();
    // console.log("Previous Answers: " + previousAnswers);
    
    return (
      <div id="wd-quizzes-editor">    
        <div className="wd-title p-3 ps-2 d-flex justify-content-between align-items-center">
            <h3>{quiz.title}</h3>
            
        </div>
        
        <hr />
        <h5>{"Previous Score: " + (previousAnswers?.score !== undefined ? previousAnswers.score :"Not Attempted")}</h5>
        <h5>{"Submitted At: " + (previousAnswers?.submittedAt !== undefined ? previousAnswers.submittedAt :"Not Attempted")}</h5>

        <hr />
        <ul id="wd-modules" className="list-group p-5 rounded-0">
            {questions.map((question: any, index: any) => (
                    <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray" key={index}>
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            {"Question " + (index + 1)}
                            <div className="float-end">
                                {"Points: " + question.points}
                            </div>
                        </div>
                        {/* {module.lessons && ( */}
                        <ul className="wd-questions list-group rounded-0">
                        {/* {module.lessons.map((lesson: any) => ( */}
                            <li className="wd-lesson list-group-item p-3 ps-1">
                                {question.description}
                                <hr />
                                    <form >
                                        <div className="ps-2 col-12 mb-2" >
                                            <div className="mb-2">
                                                {previousAnswers?.answers?.[index].isCorrect ? 
                                                            <TiTick className="text-success float-end"/> 
                                                            : previousAnswers?.answers?.[index].isCorrect === null ? 
                                                                <RxCross2 className="text-danger float-end"/> : 
                                                                <div></div> }
                                            </div>
                                            <div>{"Your Answer: " + 
                                                (previousAnswers?.answers?.[index]?.selectedAnswer !== null ? 
                                                    previousAnswers?.answers?.[index]?.selectedAnswer :
                                                     "Not Answered")

                                            // previousAnswers.answers[index].selectedAnswer 
                                            }
                                            </div>
                                        </div>
                                        {question.possibleAnswers.map((answer: any) => (
                                            (answer.isCorrect && <div className="ps-2 col-12">
                                                <div className="list-group" id="list-tab" role="tablist">
                                                    <div className="form-check">                                        
                                                        <label key={answer.text} className="form-check-label">
                                                            {"Correct Answer: " + answer.text}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>)
                                        ))}
                                    </form>
                            </li>
                        </ul>
                    </li>
            ))}
            
        </ul> 
        <hr />
        <div className="modal-footer">
            <a href={"javascript:history.back()"}>
                <button type="button" className="btn btn-secondary me-2">
                    Back 
                </button>
            </a>
        </div>
    </div>
);}
