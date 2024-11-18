import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import * as db from "../../Database"
import ProtectedEdit from "../../Account/ProtectedEdit";
// import { addAssignment, updateAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux"; 
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function QuizEditor() {
    const { cid, aid } = useParams();
    // const assignments = db.assignments;
    // Set up local state for form inputs
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const assignment = assignments.find((assignment: any) => assignment._id === aid);
    const [assignmentName, setAssignmentName] = useState("");
    const [assignmentDesc, setAssignmentDesc] = useState("");
    const [assignmentPoints, setAssignmentPoints] = useState("");
    const [assignmentDue, setAssignmentDue] = useState("");
    const [assignmentFrom, setAssignmentFrom] = useState("");
    
    const createAssignmentForCourse = async () => {
        if (!cid) return;
        const newAssignment = { 
            title: assignmentName,
            description: assignmentDesc,
            points: assignmentPoints,
            due_date_num: assignmentDue,
            available_date_num: assignmentFrom,
            course: cid 
        };
        const assignment = await coursesClient.createAssignmentForCourse(cid, newAssignment);
        // dispatch(addAssignment(assignment));
    };
    
    const saveAssignment = async () => {
        const updatedAssignment = { 
            _id: aid,
            title: assignmentName,
            description: assignmentDesc,
            points: assignmentPoints,
            due_date_num: assignmentDue,
            available_date_num: assignmentFrom,
            course: cid 
        };
        // await assignmentsClient.updateAssignment(updatedAssignment);
        // dispatch(updateAssignment(updatedAssignment));
    };
    
    
    useEffect(() => {
        if(aid !== "new"){
            setAssignmentName(assignment.title);
            setAssignmentDesc(assignment.description);
            setAssignmentPoints(assignment.points);
            setAssignmentFrom(assignment.available_date_num);
            setAssignmentDue(assignment.due_date_num);
        }
    }, [assignment]);

    const dispatch = useDispatch();

    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name"><h5>Assignment Name</h5></label>
        
                    <div className="input-group mb-4">
                        <input id="wd-name" className="form-control" defaultValue={assignmentName}
                            onChange={(e) => setAssignmentName(e.target.value)} />
                    </div>
                
        
                <div className="input-group mb-4">
                    <textarea id="wd-description" className="form-control" defaultValue={assignmentDesc}
                        onChange={(e) => setAssignmentDesc(e.target.value)} />
                </div>
                
        
        
                <div id="wd-css-responsive-forms-2">
                    <form>
                        <div className="row mb-3">
                            <label htmlFor="wd-points" className="text-end col-sm-3 col-form-label">
                                Points 
                            </label>
                            <div className="col-sm-9">
                                <input id="wd-points" className="form-control" defaultValue={assignmentPoints} 
                                    onChange={(e) => setAssignmentPoints(e.target.value)}/>
                            </div> 
                        </div>

                        {(aid !== "new") ? (
                        <div>
                        <div className="row mb-3">
                            <label htmlFor="wd-group" className="text-end col-sm-3 col-form-label">
                                Assignment Group
                            </label>
                            <div className="col-sm-9">
                                <select id="wd-group" className="form-select">
                                    <option selected value="Publish All">Assignment</option>
                                    <option value="Publish Selected">Non-Assignment</option>
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
                                {(aid !== "new") ? (
                                <div>
                                <label htmlFor="wd-assign-to" className="mt-3">
                                    <h5>Assign to</h5>
                                </label>
                                <input className="form-control mb-4" id="wd-assign-to" value={"Everyone"} />
                                </div>) : (<div> </div>)}

                                <label id="wd-due-date" htmlFor="wd-assign-to"> Due </label>
                                <input className="form-control mb-4" type="date"
                                    id="wd-due-date"
                                    defaultValue={assignmentDue}
                                    onChange={(e) => setAssignmentDue(e.target.value)}/>
                                <div className="d-flex mb-4">
                                    <div className="flex-fill">
                                        <label htmlFor="wd-available-from">
                                            Available from
                                        </label>
                                        <div><input className="form-control" type="date"
                                            id="wd-available-from"
                                            defaultValue={assignmentFrom}
                                            onChange={(e) => setAssignmentFrom(e.target.value)}/>
                                        </div>
                                    </div>

                                    <div className="flex-fill">
                                        <label htmlFor="wd-available-until">Until</label>
                                        <div>
                                        <input className="form-control" type="date"
                                            id="wd-available-until"
                                            defaultValue={assignmentDue}/>
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
                    {(aid !== "new") ? (
                        <button className="btn btn-danger" onClick={saveAssignment}
                            id={`wd-update-${aid}-click`}>
                            Save
                        </button>) : (
                        <button className="btn btn-danger" onClick={createAssignmentForCourse}
                            id={`wd-update-${aid}-click`}>
                            Save
                        </button>)
                    }
                </Link>
            </div>
        </ProtectedEdit>
    </div>
);}
