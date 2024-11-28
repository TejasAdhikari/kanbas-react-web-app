import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import * as db from "../../Database"
import ProtectedEdit from "../../Account/ProtectedEdit";
import { addQuiz, updateQuiz } from "./reducer";
import { useSelector, useDispatch } from "react-redux"; 
import * as coursesClient from "../client";
import * as quizzesClient from "./client";

export default function QuizDetailsEditor() {
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
    const [quizType, setQuizType] = useState("");


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
            quizType: quizType,
            due_date_num: quizDue,
            available_date_num: quizFrom,
            until_date_num: quizUntil,
            course: cid 
        };
        await quizzesClient.updateQuiz(updatedquiz);
        dispatch(updateQuiz(updatedquiz));
    };

    const saveAndPublishQuiz = async () => {
        const updatedquiz = { 
            ...quiz,
            title: quizName,
            description: quizDesc,
            published: true,
            points: quizPoints,
            quizType: quizType,
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
            setQuizType(quiz.quizType);
            setquizFrom(quiz.available_date_num);
            setquizDue(quiz.due_date_num);
            setquizUntil(quiz.until_date_num);
        }
    }, [quiz]);

    const dispatch = useDispatch();


// Due date - date the assignment is due
// Available date - date assignment is available
// Until date - date assignment is available until

    return (
      <div id="wd-quizzes-editor">
        <br />
        <label htmlFor="wd-name">Title</label>
        <div className="input-group mb-4">
            <input id="wd-name" className="form-control" defaultValue={quizName}
                onChange={(e) => setquizName(e.target.value)} />
        </div>
                
        <label htmlFor="wd-name">Description</label>
        <div className="input-group mb-4">
            <textarea id="wd-description" className="form-control" defaultValue={quizDesc}
                onChange={(e) => setquizDesc(e.target.value)} />
        </div>
                
        
        
                <div id="wd-css-responsive-forms-2">
                    <form>
                        <div className="row mb-3">
                            <label htmlFor="wd-points" className="text-end col-sm-3 col-form-label">
                                Points 
                            </label>
                            <div className="col-sm-9">
                                <input id="wd-points" type="number" className="form-control" defaultValue={quizPoints} 
                                    onChange={(e) => setquizPoints(e.target.value)}/>
                            </div> 
                        </div>

                        {(qid !== "new") ? (
                        <div>
                        <div className="row mb-3">
                            <label htmlFor="wd-group" className="text-end col-sm-3 col-form-label">
                                Quiz Type
                            </label>
                            <div className="col-sm-9">
                                <select id="wd-group" className="form-select">
                                    <option selected value="Publish All">Graded Quiz</option>
                                    <option value="Publish Selected">Practice Quiz</option>
                                    <option value="Publish All">Graded Survey</option>
                                    <option value="Publish All">Ungraded Survey</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="wd-group" className="text-end col-sm-3 col-form-label">
                                Assignment Group
                            </label>
                            <div className="col-sm-9">
                                <select id="wd-group" className="form-select">
                                    <option selected value="Publish All">Quizzes </option>
                                    <option value="Publish Selected">Exams</option>
                                    <option value="Publish Selected">Assignments</option>
                                    <option value="Publish Selected">Project</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="wd-group" className="text-end col-sm-3 col-form-label">
                            Shuffle Answers
                            </label>
                            <div className="col-sm-9">
                                <select id="wd-group" className="form-select">
                                    <option selected value="Publish All">Yes </option>
                                    <option value="Publish Selected">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="wd-points" className="text-end col-sm-3 col-form-label">
                                Time Limit 
                            </label>
                            <div className="col-sm-9">
                                <input id="wd-time-limit" className="form-control" type="number" defaultValue={quizPoints} 
                                    onChange={(e) => setquizPoints(e.target.value)}/>
                            </div> 
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="wd-group" className="text-end col-sm-3 col-form-label">
                            Multiple Attempts
                            </label>
                            <div className="col-sm-9">
                                <select id="wd-group" className="form-select">
                                    <option selected value="Publish All">No </option>
                                    <option value="Publish Selected">Yes</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="wd-group" className="text-end col-sm-3 col-form-label">
                            Show Correct Answers
                            </label>
                            <div className="col-sm-9">
                                <select id="wd-group" className="form-select">
                                    <option selected value="Publish All">Immediately </option>
                                    <option value="Publish Selected">Late</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="wd-points" className="text-end col-sm-3 col-form-label">
                                Access Code 
                            </label>
                            <div className="col-sm-9">
                                <input id="wd-points" className="form-control" defaultValue={quizPoints} 
                                    onChange={(e) => setquizPoints(e.target.value)}/>
                            </div> 
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="wd-group" className="text-end col-sm-3 col-form-label">
                            One Question at a Time
                            </label>
                            <div className="col-sm-9">
                                <select id="wd-group" className="form-select">
                                    <option selected value="Publish All">Yes </option>
                                    <option value="Publish Selected">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="wd-group" className="text-end col-sm-3 col-form-label">
                            Webcam Required
                            </label>
                            <div className="col-sm-9">
                                <select id="wd-group" className="form-select">
                                    <option selected value="Publish All">Yes </option>
                                    <option value="Publish Selected">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="wd-group" className="text-end col-sm-3 col-form-label">
                            Lock Questions After Answering
                            </label>
                            <div className="col-sm-9">
                                <select id="wd-group" className="form-select">
                                    <option selected value="Publish All">Yes </option>
                                    <option value="Publish Selected">No</option>
                                </select>
                            </div>
                        </div>
                        
                        </div>) : (<div></div>)}


                        <div className="row mb-3">
                            <label id="wd-assign" htmlFor="wd-assign" 
                            className="text-end col-sm-3 col-form-label">
                                Assign
                            </label>
                            <div className="col-sm-9 border">

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
                {/* {(qid !== "new") ? ( */}
                    <a href={`#/Kanbas/Courses/${cid}/Quizzes`}>
                        <button className="btn btn-secondary me-1">
                            Cancel
                        </button>
                    </a>
                    <a href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>
                        <button className="btn btn-danger me-1" 
                            onClick={savequiz}
                            id={`wd-update-${qid}-click`}>
                            Save
                        </button> 
                    </a>
                    <a href={`#/Kanbas/Courses/${cid}/Quizzes`}>
                        <button className="btn btn-primary" 
                            onClick={saveAndPublishQuiz}
                            id={`wd-update-${qid}-click`}>
                            Save and Publish
                        </button> 
                    </a>
                    {/* ) : ( */}
                    {/* <a href={`#/Kanbas/Courses/${cid}/Quizzes`}>
                        <button className="btn btn-secondary me-1">
                            Cancel
                        </button>
                        <button className="btn btn-danger" 
                            onClick={createquizForCourse}
                            id={`wd-update-${qid}-click`}>
                            Save
                        </button> 
                    </a> */}
                    {/* ) */}
                {/* } */}
            </div>
        </ProtectedEdit>
    </div>
);}
