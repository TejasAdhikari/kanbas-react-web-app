import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import * as db from "../../Database"
import ProtectedEdit from "../../Account/ProtectedEdit";
import ProtectedRouteStudent from "../../Account/ProtectedRouteStudent";
import { addQuiz, updateQuiz } from "./reducer";
import { useSelector, useDispatch } from "react-redux"; 
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import { MdOutlineEdit } from "react-icons/md";


export default function QuizDetails() {
    const { cid, qid } = useParams();
    
    
    // Set up local state for form inputs
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const quiz = quizzes.find((quiz: any) => quiz._id === qid);
    // const [quizName, setquizName] = useState("");
    // const [quizDesc, setquizDesc] = useState("");
    // const [quizPoints, setquizPoints] = useState("");
    // const [quizDue, setquizDue] = useState("");
    // const [quizFrom, setquizFrom] = useState("");

    
    
    // useEffect(() => {
    //     if(qid !== "new"){
    //         setquizName(quiz.title);
    //         setquizDesc(quiz.description);
    //         setquizPoints(quiz.points);
    //         setquizFrom(quiz.available_date_num);
    //         setquizDue(quiz.due_date_num);
    //     }
    // }, [quiz]);

    const dispatch = useDispatch();

    return (
      <div id="wd-quizzes-editor">
        <ProtectedEdit>
            <div className="d-flex justify-content-center">
                <a href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/preview`}>    
                    <button className="btn btn-secondary me-2">
                        Preview
                    </button>
                </a>
                <a href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/editor/details`}>
                    <button className="btn btn-secondary">
                        <MdOutlineEdit /> Edit
                    </button>
                </a>    
            </div>
            <hr />
        </ProtectedEdit>
        
        
        <div className="container">
            <h3>{quiz.title}</h3>

            <ProtectedRouteStudent> 
                <div className="d-flex justify-content-center">
                    <a href={`#/Kanbas/Courses/${cid}/Quizzes`}>
                        <button className="btn btn-danger mt-4 mb-5">
                            Start Quiz
                        </button>
                    </a>
                </div>
            </ProtectedRouteStudent>
            <ProtectedEdit>
            <table className="table table-borderless">
                <tbody>
                    <tr>
                        <th className="col-sm-4 text-end">Quiz Type</th>
                        <td className="text-start">{quiz.quizType}</td>
                    </tr>
                    <tr>
                        <th className="text-end">Points</th>
                        <td className="text-start">{quiz.points}</td>
                    </tr>
                    <tr>
                        <th className="text-end">Assignment Group</th>
                        <td className="text-start">{quiz.assignmentGroup}</td>
                    </tr>
                    <tr>
                        <th className="text-end">Shuffle Answers</th>
                        <td className="text-start">{quiz.shuffleAnswers ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <th className="text-end">Time Limit</th>
                        <td className="text-start">{quiz.timeLimit}</td>
                    </tr>
                    <tr>
                        <th className="text-end">Multiple Attempts</th>
                        <td className="text-start">{quiz.multipleAttempts ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <th className="text-end">How Many Attempts</th>
                        <td className="text-start">{quiz.numberAttempts}</td>
                    </tr>
                    {/* <tr>
                        <th className="text-end">View Responses</th>
                        <td className="text-start">Always</td>
                    </tr> */}
                    <tr>
                        <th className="text-end">Show Correct Answers</th>
                        <td className="text-start">{quiz.showCorrectAnswers}</td>
                    </tr>
                    <tr>
                        <th className="text-end">Access Code</th>
                        <td className="text-start">{quiz.accessCode} </td>
                    </tr>
                    <tr>
                        <th className="text-end">One Question at a Time</th>
                        <td className="text-start">{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
                    </tr>
                    {/* <tr>
                        <th className="text-end">Require Respondus LockDown Browser</th>
                        <td className="text-start">No</td>
                    </tr>
                    <tr>
                        <th className="text-end">Required to View Quiz Results</th>
                        <td className="text-start">No</td>
                    </tr> */}
                    <tr>
                        <th className="text-end">Webcam Required</th>
                        <td className="text-start">{quiz.webcamRequired ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <th className="text-end">Lock Questions After Answering</th>
                        <td className="text-start">{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            </ProtectedEdit>


            <table className="table border-secondary">
                <thead>
                    <tr>
                        <th className="text-center">Due</th>
                        {/* <th className="text-center">For</th> */}
                        <th className="text-center">Available From</th>
                        <th className="text-center">Until</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">{quiz.due_date_num}</td>
                        {/* <td className="text-center">Everyone</td> */}
                        <td className="text-center">{quiz.available_date_num}</td>
                        <td className="text-center">{quiz.until_date_num}</td>
                    </tr>
                </tbody>
            </table>
        </div>
                {/* <div id="wd-css-responsive-forms-2">
                    <form>
                        <div classNameName="row mb-3">
                            <label htmlFor="wd-points" classNameName="text-end col-sm-3 col-form-label">
                                Points 
                            </label>
                            <div classNameName="col-sm-9">
                                <input id="wd-points" classNameName="form-control" defaultValue={quizPoints} 
                                    onChange={(e) => setquizPoints(e.target.value)}/>
                            </div> 
                        </div>

                        {(qid !== "new") ? (
                        <div>
                        <div classNameName="row mb-3">
                            <label htmlFor="wd-group" classNameName="text-end col-sm-3 col-form-label">
                                quiz Group
                            </label>
                            <div classNameName="col-sm-9">
                                <select id="wd-group" classNameName="form-select">
                                    <option selected value="Publish All">quiz</option>
                                    <option value="Publish Selected">Non-quiz</option>
                                </select>
                            </div>
                        </div>
                        <div classNameName="row mb-3">
                            <label id="wd-display-grade-as" htmlFor="wd-group" 
                            classNameName="text-end col-sm-3 col-form-label">
                                Display Grade as
                            </label>
                            <div classNameName="col-sm-9">
                                <select id="wd-display-grade-as" classNameName="form-select">
                                    <option selected value="Publish All">Percentage</option>
                                    <option value="Publish Selected">GPA</option>
                                </select>
                            </div>
                        </div>
                        <div classNameName="row mb-3">
                            <label id="wd-submission-type" htmlFor="wd-group" 
                            classNameName="text-end col-sm-3 col-form-label">
                                Submission Type
                            </label>
                            <div classNameName="col-sm-9 border">
                                <select id="wd-submission-type" classNameName="form-select mt-3 mb-3">
                                    <option selected value="Publish All">Online</option>
                                    <option value="Publish Selected">Offline</option>
                                </select>
                                <h5>Online entry options</h5>
                                <div classNameName="form-check">
                                    <input classNameName="form-check-input mt-2" type="checkbox" name="check-genre" id="wd-chkbox-comedy"/>
                                    <label classNameName="form-check-label mt-2" id ="wd-text-entry" htmlFor="wd-text-entry">
                                        Text Entry
                                    </label><br/>

                                    <input classNameName="form-check-input mt-2" type="checkbox" name="check-genre" id="wd-chkbox-drama"/>
                                    <label classNameName="form-check-label mt-2" id="wd-website-url" htmlFor="wd-website-url">
                                        Website URL
                                    </label><br/>

                                    <input classNameName="form-check-input mt-2" type="checkbox" name="check-genre" id="wd-chkbox-scifi"/>
                                    <label classNameName="form-check-label mt-2" id="wd-media-recordings" htmlFor="wd-media-recordings">
                                        Media Recordings
                                    </label><br/>

                                    <input classNameName="form-check-input mt-2" type="checkbox" name="check-genre" id="wd-chkbox-fantasy"/>
                                    <label classNameName="form-check-label mt-2"id="wd-student-annotation" htmlFor="wd-student-annotation">
                                        Student Annotation
                                    </label><br />

                                    <input classNameName="form-check-input mt-2" type="checkbox" name="check-genre" id="wd-chkbox-fantasy"/>
                                    <label classNameName="form-check-label mt-2 mb-4" id="wd-file-upload" htmlFor="wd-file-upload">
                                        File Uploads
                                    </label>
                                </div>
                            </div>
                        </div>
                        </div>) : (<div></div>)}


                        <div classNameName="row mb-3">
                            <label id="wd-assign" htmlFor="wd-assign" 
                            classNameName="text-end col-sm-3 col-form-label">
                                Assign
                            </label>
                            <div classNameName="col-sm-9 border">
                                {(qid !== "new") ? (
                                <div>
                                <label htmlFor="wd-assign-to" classNameName="mt-3">
                                    <h5>Assign to</h5>
                                </label>
                                <input classNameName="form-control mb-4" id="wd-assign-to" value={"Everyone"} />
                                </div>) : (<div> </div>)}

                                <label id="wd-due-date" htmlFor="wd-assign-to"> Due </label>
                                <input classNameName="form-control mb-4" type="date"
                                    id="wd-due-date"
                                    defaultValue={quizDue}
                                    onChange={(e) => setquizDue(e.target.value)}/>
                                <div classNameName="d-flex mb-4">
                                    <div classNameName="flex-fill">
                                        <label htmlFor="wd-available-from">
                                            Available from
                                        </label>
                                        <div><input classNameName="form-control" type="date"
                                            id="wd-available-from"
                                            defaultValue={quizFrom}
                                            onChange={(e) => setquizFrom(e.target.value)}/>
                                        </div>
                                    </div>

                                    <div classNameName="flex-fill">
                                        <label htmlFor="wd-available-until">Until</label>
                                        <div>
                                        <input classNameName="form-control" type="date"
                                            id="wd-available-until"
                                            defaultValue={quizDue}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div> */}
        
        {/* <ProtectedEdit>
            <div classNameName="d-flex justify-content-end">
                <Link to="./..">
                    <button classNameName="btn btn-secondary me-1">
                        Cancel
                    </button>
                </Link>
                <Link to="./..">
                    {(qid !== "new") ? (
                        <button classNameName="btn btn-danger" 
                            onClick={savequiz}
                            id={`wd-update-${qid}-click`}>
                            Save
                        </button>) : (
                        <button classNameName="btn btn-danger" 
                            onClick={createquizForCourse}
                            id={`wd-update-${qid}-click`}>
                            Save
                        </button>)
                    }
                </Link>
            </div>
        </ProtectedEdit> */}
    </div>
);}
