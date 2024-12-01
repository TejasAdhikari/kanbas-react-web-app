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


export default function QuestionBox() {
    const { pathname } = useLocation();
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
        
        <div className="container">
            <h3>{quiz.title}</h3>
        </div>
        <hr />

        Place holder

    </div>
);}
