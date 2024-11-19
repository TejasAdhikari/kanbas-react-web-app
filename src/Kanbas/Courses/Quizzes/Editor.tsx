import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import * as db from "../../Database"
import ProtectedEdit from "../../Account/ProtectedEdit";
// import { addquiz, updatequiz } from "./reducer";
import { useSelector, useDispatch } from "react-redux"; 
import * as coursesClient from "../client";
import * as quizzesClient from "./client";

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
    
    const createquizForCourse = async () => {
        if (!cid) return;
        const newquiz = { 
            title: quizName,
            description: quizDesc,
            points: quizPoints,
            due_date_num: quizDue,
            available_date_num: quizFrom,
            course: cid 
        };
        // const quiz = await coursesClient.createquizForCourse(cid, newquiz);
        // dispatch(addquiz(quiz));
    };
    
    const savequiz = async () => {
        const updatedquiz = { 
            _id: qid,
            title: quizName,
            description: quizDesc,
            points: quizPoints,
            due_date_num: quizDue,
            available_date_num: quizFrom,
            course: cid 
        };
        // await quizzesClient.updatequiz(updatedquiz);
        // dispatch(updatequiz(updatedquiz));
    };
    
    
    useEffect(() => {
        if(qid !== "new"){
            setquizName(quiz.title);
            setquizDesc(quiz.description);
            setquizPoints(quiz.points);
            setquizFrom(quiz.available_date_num);
            setquizDue(quiz.due_date_num);
        }
    }, [quiz]);

    const dispatch = useDispatch();

    return (
      <div id="wd-quizzes-editor">
        <label htmlFor="wd-name"><h5>Quiz Name</h5></label>
        
                    <div className="input-group mb-4">
                        <input id="wd-name" className="form-control" defaultValue={quizName}
                            onChange={(e) => setquizName(e.target.value)} />
                    </div>
                
        
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
                                <input id="wd-points" className="form-control" defaultValue={quizPoints} 
                                    onChange={(e) => setquizPoints(e.target.value)}/>
                            </div> 
                        </div>

                        {(qid !== "new") ? (
                        <div>
                        <div className="row mb-3">
                            <label htmlFor="wd-group" className="text-end col-sm-3 col-form-label">
                                quiz Group
                            </label>
                            <div className="col-sm-9">
                                <select id="wd-group" className="form-select">
                                    <option selected value="Publish All">quiz</option>
                                    <option value="Publish Selected">Non-quiz</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label id="wd-display-grade-as" htmlFor="wd-group" 
                            className="text-end col-sm-3 col-form-label">
                                Display Grade as
                            </label>
                            <div className="col-sm-9">
                                <select id="wd-display-grade-as" className="form-select">
                                    <option selected value="Publish All">Percentage</option>
                                    <option value="Publish Selected">GPA</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label id="wd-submission-type" htmlFor="wd-group" 
                            className="text-end col-sm-3 col-form-label">
                                Submission Type
                            </label>
                            <div className="col-sm-9 border">
                                <select id="wd-submission-type" className="form-select mt-3 mb-3">
                                    <option selected value="Publish All">Online</option>
                                    <option value="Publish Selected">Offline</option>
                                </select>
                                <h5>Online entry options</h5>
                                <div className="form-check">
                                    <input className="form-check-input mt-2" type="checkbox" name="check-genre" id="wd-chkbox-comedy"/>
                                    <label className="form-check-label mt-2" id ="wd-text-entry" htmlFor="wd-text-entry">
                                        Text Entry
                                    </label><br/>

                                    <input className="form-check-input mt-2" type="checkbox" name="check-genre" id="wd-chkbox-drama"/>
                                    <label className="form-check-label mt-2" id="wd-website-url" htmlFor="wd-website-url">
                                        Website URL
                                    </label><br/>

                                    <input className="form-check-input mt-2" type="checkbox" name="check-genre" id="wd-chkbox-scifi"/>
                                    <label className="form-check-label mt-2" id="wd-media-recordings" htmlFor="wd-media-recordings">
                                        Media Recordings
                                    </label><br/>

                                    <input className="form-check-input mt-2" type="checkbox" name="check-genre" id="wd-chkbox-fantasy"/>
                                    <label className="form-check-label mt-2"id="wd-student-annotation" htmlFor="wd-student-annotation">
                                        Student Annotation
                                    </label><br />

                                    <input className="form-check-input mt-2" type="checkbox" name="check-genre" id="wd-chkbox-fantasy"/>
                                    <label className="form-check-label mt-2 mb-4" id="wd-file-upload" htmlFor="wd-file-upload">
                                        File Uploads
                                    </label>
                                </div>
                            </div>
                        </div>
                        </div>) : (<div></div>)}


                        <div className="row mb-3">
                            <label id="wd-assign" htmlFor="wd-assign" 
                            className="text-end col-sm-3 col-form-label">
                                Assign
                            </label>
                            <div className="col-sm-9 border">
                                {(qid !== "new") ? (
                                <div>
                                <label htmlFor="wd-assign-to" className="mt-3">
                                    <h5>Assign to</h5>
                                </label>
                                <input className="form-control mb-4" id="wd-assign-to" value={"Everyone"} />
                                </div>) : (<div> </div>)}

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
                                            defaultValue={quizDue}/>
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
                <Link to="./..">
                    <button className="btn btn-secondary me-1">
                        Cancel
                    </button>
                </Link>
                <Link to="./..">
                    {(qid !== "new") ? (
                        <button className="btn btn-danger" 
                            // onClick={savequiz}
                            id={`wd-update-${qid}-click`}>
                            Save
                        </button>) : (
                        <button className="btn btn-danger" 
                            // onClick={createquizForCourse}
                            id={`wd-update-${qid}-click`}>
                            Save
                        </button>)
                    }
                </Link>
            </div>
        </ProtectedEdit>
    </div>
);}
