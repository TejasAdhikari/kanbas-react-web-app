import { Link, useParams, useLocation, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import * as db from "../../Database"
import ProtectedEdit from "../../Account/ProtectedEdit";
import { addQuiz, updateQuiz } from "./reducer";
import { useSelector, useDispatch } from "react-redux"; 
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import TOC from "./TOC";
import QuizDetailsEditor from "./DetailsEditor";
import QuizQuestionsEditor from "./Questions";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    
    // Set up local state for form inputs
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const quiz = quizzes.find((quiz: any) => quiz._id === qid);
    const [quizName, setquizName] = useState("");
    const [quizDesc, setquizDesc] = useState("");
    const [quizPoints, setquizPoints] = useState("");
    const [quizDue, setquizDue] = useState("");
    const [quizFrom, setquizFrom] = useState("");
    const [quizUntil, setquizUntil] = useState("");


    const createquizForCourse = async () => {
        if (!cid) return;
        const newquiz = { 
            title: quizName,
            description: quizDesc,
            points: quizPoints,
            due_date_num: quizDue,
            available_date_num: quizFrom,
            until_date_num: quizUntil,
            course: cid 
        };
        const quiz = await coursesClient.createQuizForCourse(cid, newquiz);
        dispatch(addQuiz(quiz));
    };
    
    const savequiz = async () => {
        const updatedquiz = { 
            ...quiz,
            title: quizName,
            description: quizDesc,
            points: quizPoints,
            due_date_num: quizDue,
            available_date_num: quizFrom,
            until_date_num: quizUntil,
            course: cid 
        };
        await quizzesClient.updateQuiz(updatedquiz);
        dispatch(updateQuiz(updatedquiz));
    };
    
    
    useEffect(() => {
        if(qid !== "new"){
            setquizName(quiz.title);
            setquizDesc(quiz.description);
            setquizPoints(quiz.points);
            setquizFrom(quiz.available_date_num);
            setquizDue(quiz.due_date_num);
            setquizUntil(quiz.until_date_num);
        }
    }, [quiz]);

    const dispatch = useDispatch();

    return (
      <div id="wd-quizzes-editor">
        {(qid !== "new") ? 
            <div><TOC />
            <Routes>
                <Route path="details" element={<QuizDetailsEditor />} />
                <Route path="questions" element={<QuizQuestionsEditor />} />
            </Routes> </div> :
        <div>
            <label htmlFor="wd-name">Quiz Name</label>
        
                <div className="input-group mb-4">
                    <input id="wd-name" className="form-control" defaultValue={quizName}
                        onChange={(e) => setquizName(e.target.value)} />
                </div>

                <div id="wd-css-responsive-forms-2">
                    <form>
                        {/* <div className="row mb-3">
                            <label htmlFor="wd-points" className="text-end col-sm-3 col-form-label">
                                Points 
                            </label>
                            <div className="col-sm-9">
                                <input id="wd-points" className="form-control" defaultValue={quizPoints} 
                                    onChange={(e) => setquizPoints(e.target.value)}/>
                            </div> 
                        </div> */}

                        <div className="row mb-3">
                            <label id="wd-assign" htmlFor="wd-assign" 
                            className="text-end col-sm-1 col-form-label">
                                Assign
                            </label>
                            <div className="col-sm-7 border">
                                <label id="wd-due-date" htmlFor="wd-assign-to"> Due </label>
                                <input className="form-control mb-4" type="date"
                                    id="wd-due-date"
                                    defaultValue={quizDue}
                                    onChange={(e) => setquizDue(e.target.value)}/>
                                <div className="d-flex mb-4">
                                    <div className="flex-fill">
                                        <label htmlFor="wd-available-from">
                                            Available from
                                        </label>
                                        <div><input className="form-control" type="date"
                                            id="wd-available-from"
                                            defaultValue={quizFrom}
                                            onChange={(e) => setquizFrom(e.target.value)}/>
                                        </div>
                                    </div>

                                    <div className="flex-fill">
                                        <label htmlFor="wd-available-until">Until</label>
                                        <div>
                                        <input className="form-control" type="date"
                                            id="wd-available-until"
                                            defaultValue={quizUntil}
                                            onChange={(e) => setquizUntil(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
        <hr />
        
        <ProtectedEdit>
            <div className="d-flex justify-content-end">  
                <a href={`#/Kanbas/Courses/${cid}/Quizzes`}>
                    <button className="btn btn-secondary me-1">
                        Cancel
                    </button>
                    <button className="btn btn-danger" 
                        onClick={createquizForCourse}
                        id={`wd-update-${qid}-click`}>
                        Save
                    </button> 
                </a>
            </div>
        </ProtectedEdit> </div>}
    </div>
);}
