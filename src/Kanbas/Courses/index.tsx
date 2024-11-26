import { Routes, Route, Navigate, useParams, useLocation} from "react-router";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules"
import Home from "./Home";
import Assignments from "./Assignments"
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import People from "./People";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/Editor";


export default function Courses ({ courses }: { courses: any[]; }) {
    //Get the current ourse ID
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);

    //Get the current Path
    const { pathname } = useLocation();
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name}  &gt; {pathname.split("/")[4]}
            </h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CoursesNavigation />
                </div>
                <div className="flex-fill">
                    <Routes>
                    <Route path="/" element={<Navigate to="Home" />} />
                    <Route path="Home" element={<Home />} />
                    <Route path="Modules" element={<Modules />} />
                    <Route path="Piazza" element={<h2>Piazza</h2>} />
                    <Route path="Zoom" element={<h2>Zoom</h2>} />
                    <Route path="Assignments" element={<Assignments />} />
                    <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                    <Route path="Quizzes" element={<Quizzes />} />
                    <Route path="Quizzes/:qid" element={<QuizEditor />} />
                    <Route path="Grades" element={<h2>Grades</h2>} />
                    <Route path="People" element={<People />} />
                    </Routes>
                </div>
            </div>     
        </div>
    );
}
  