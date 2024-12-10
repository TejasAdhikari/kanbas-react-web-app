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
import { setQuestions } from "../Questions/reducer";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

export default function QuizPreview() {
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
    );;
    const [previousAnswers, setPreviousAnswers] = useState<any>([]);
    const [ displayPrev, setdisplayPrev] = useState<Boolean>(true);
    const [ displayCorrect, setdisplayCorrect] = useState<Boolean>(false);


    const fetchQuestions = async () => {
        const questions = await quizzesClient.findQuestionsForQuiz(qid as string);
        // console.log(questions);
        dispatch(setQuestions(questions));
    };

    const fetchSubmission = async () => {
        const userId = currentUser._id; 
        const submission = await quizzesClient.getSubmission(qid, userId);
        console.log("Submission: " + submission?.answers);
        setPreviousAnswers(submission || []);
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
        console.log("Previous Answers: " + previousAnswers);

    }, [answers]);

    const dispatch = useDispatch();
    // console.log("Previous Answers: " + previousAnswers);
    
    return (
      <div id="wd-quizzes-editor">    
        <div className="wd-title p-3 ps-2 d-flex justify-content-between align-items-center">
            <h3>{quiz.title}</h3>
            {displayPrev && <div className="float-end">
                <a href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/editor/questions`}>
                    <button  className="btn btn-lg btn-primary me-1">
                            Edit
                    </button>
                </a>
            </div>   }  
        </div>
        
        <hr />

        {displayPrev && 
            <div className="d-flex justify-content-center">
                <button className="btn btn-danger mb-4 me-4"
                    onClick={(e) => setdisplayPrev(!displayPrev)}>
                    Take Quiz
                </button>
                <h5 className="me-2">{"Previous Score: " + (previousAnswers?.score !== undefined ? previousAnswers.score :"Not Attempted")}</h5>
                <h5>{"Submitted At: " + (previousAnswers?.submittedAt !== undefined ? previousAnswers.submittedAt :"Not Attempted")}</h5>
            </div>
        }
        {!displayPrev && <div className="d-flex justify-content-center">Quiz Started</div>}
        <hr />
        <ul id="wd-modules" className="list-group p-5 rounded-0">




        {/* {questions.map((question: any, index: any) => {
            const previousAnswer = previousAnswers.find(
                (a: any) => a.question === question._id
            )?.selectedAnswer;

            return (
                <li key={question._id} className="list-group-item">
                    <div>{question.description}</div>
                    {question.possibleAnswers.map((answer: any) => (
                        <label key={answer.text}>
                        <input
                            type="radio"
                            name={`question-${question._id}`}
                            value={answer.text}
                            checked={answers.find((a: any) => a.question === question._id)?.selectedAnswer === answer.text || previousAnswer === answer.text}
                            onChange={() => handleAnswerChange(question._id, answer.text)}
                            disabled={!!previousAnswer}
                        />
                        {answer.text}
                        </label>
                    ))}
                </li>
            );
        })} */}



            



        {displayPrev ?

            // "Test"
            (questions?.map((question: any, index: any) => (
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
                                        <div>
                                            {previousAnswers?.answers?.[index]?.isCorrect ? 
                                                            <TiTick className="text-success float-end"/> 
                                                            : (previousAnswers?.answers?.[index]?.isCorrect !== undefined
                                                            && previousAnswers?.answers?.[index]?.selectedAnswer !== null) ? 
                                                                <RxCross2 className="text-danger float-end"/> : 
                                                                <div></div> }
                                        </div>
                                        <div>{"Your Answer: " + 
                                           ((previousAnswers?.answers?.[index]?.selectedAnswer !== undefined
                                                && previousAnswers?.answers?.[index]?.selectedAnswer !== null
                                           ) ? 
                                            previousAnswers?.answers?.[index]?.selectedAnswer :
                                             "Not Answered")

                                           // previousAnswers.answers[index].selectedAnswer 
                                           }
                                        </div>
                                    </div>
                                    {question.possibleAnswers.map((answer: any) => (
                                        <div className="ps-2 col-12">
                                            <div className="list-group" id="list-tab" role="tablist">
                                                <div className="form-check">                                        
                                                    <label key={answer.text} className="form-check-label">
                                                        {answer.isCorrect && ("Correct Answer: " + answer.text)}
                                                    </label>

                                                    
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </form>
                        </li>
                    </ul>
                </li>
            )))
            :
             (questions.map((question: any, index: any) => (
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
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

                            {question.questionType === "Fill in the Blank" ? 
                                <div className="row">
                                    
                                    <label htmlFor="wd-answer" className="text-end col-sm-4 mt-2 col-form-label">
                                        {"Answer "} 
                                    </label>

                                    <div className="col-sm-6 mt-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            // value={questionCorrAns}
                                            // onChange={(e) => setquestionCorrAns(e.target.value)}
                                            placeholder="Enter your answer"
                                            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                                        />      
                                    </div>
                                </div> 
                                :<form >
                                    {question.possibleAnswers.map((answer: any) => (
                                        <div className="ps-2 col-12">
                                            <div className="list-group" id="list-tab" role="tablist">
                                                <div className="form-check">                                        
                                                    <label key={answer.text} className="form-check-label">
                                                        <input className="form-check-input" 
                                                            type="radio" 
                                                            // name="exampleRadios"
                                                            
                                                            name={`question-${question._id}`}
                                                            value={answer.text}
                                                            // checked={answers.find((a: any) => a.question === question._id)?.selectedAnswer === answer.text || previousAnswer === answer.text}
                                                            onChange={() => handleAnswerChange(question._id, answer.text)}
                                                            // disabled={!!previousAnswer}    
                                                        />
                                                        {answer.text}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </form>
                            } 
                        </li>
                    </ul>
                </li>
            )))
        }
        </ul> 
        <hr />
        <div className="modal-footer">
            <a href={"javascript:history.back()"}>
                <button type="button" className="btn btn-secondary me-2">
                    Cancel 
                </button>
            </a>
            {!displayPrev && 
            <a href={"javascript:history.back()"}>
                <button type="button" className="btn btn-danger" onClick={handleSubmitQuiz}>
                    Submit Quiz 
                </button>
            </a>}
        </div>
    </div>
);}
