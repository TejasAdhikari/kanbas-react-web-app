import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import "./styles.css";
import { useParams, useLocation } from "react-router";


export default function QuizControls() {
  
  const { cid } = useParams();
  
  return (
    <div id="wd-assigment-controls" className="text-nowrap">
        <div className="flex" >
          <a className="wd-new-assignment-link btn btn-lg btn-danger me-1 float-end justify-content-end"
            href={`#/Kanbas/Courses/${cid}/Quizzes/new`}>
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Quiz
          </a>

          <div id="wd-search-box" className="border justify-content-start">
            <span >
              <CiSearch className="me-1 fs-3"/> 
            </span>
            <span>
              <input id="wd-search-assignment" type="text" placeholder="Search..." 
                className="me-1 border-0"/>
            </span>
          </div>
        </div> 
    </div>
);}
