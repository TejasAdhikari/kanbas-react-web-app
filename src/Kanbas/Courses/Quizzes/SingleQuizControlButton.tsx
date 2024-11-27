import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import QuizDelete from "./QuizDelete";
import ProtectedEdit from "../../Account/ProtectedEdit";
import { MdOutlineEdit } from "react-icons/md";
import { useParams } from "react-router";


export default function SingleQuizControlButton({ quizId, deleteQuiz }: 
    { quizId: string; 
      deleteQuiz: (quizId: string) => void; }) {
      
  const { cid } = useParams();

  return (
    <div className="float-end">
      <GreenCheckmark />
      <ProtectedEdit>
        {/* <FaTrash className="text-danger me-2 mb-1" 
        data-bs-toggle="modal" data-bs-target={`#wd-delete-${quizId}-dialog`}/> */}
      
      
      {/* <IoEllipsisVertical className="fs-4"> */}
        <div className="dropdown d-inline me-1 float-end">
          <button id="wd-publish-all-btn" className="btn btn-lg btn-white "
            type="button" data-bs-toggle="dropdown">
            {/* <GreenCheckmark />
            Publish All */}
            <IoEllipsisVertical className="fs-4"/>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item" 
                href={`#/Kanbas/Courses/${cid}/Quizzes/${quizId}`}>
                <MdOutlineEdit className="text-primary me-2 mb-1"/>
                Edit</a>
            </li>
            <li>
              <a id="wd-publish-modules-only-button" className="dropdown-item" 
                data-bs-toggle="modal" data-bs-target={`#wd-delete-${quizId}-dialog`}>
                <FaTrash className="text-danger me-2 mb-1" 
                  data-bs-toggle="modal" data-bs-target={`#wd-delete-${quizId}-dialog`}/>
                Delete</a>
            </li>
            <li>
              <a id="wd-unpublish-all-modules-and-items" className="dropdown-item" href="#">
                <GreenCheckmark />
                Publish</a>
            </li>
          </ul>
        </div>
      </ProtectedEdit> 
      {/* </IoEllipsisVertical> */}
      <QuizDelete dialogTitle="Delete Quiz" 
                    quizId={quizId}
                    deleteQuiz={deleteQuiz} />
    </div>
);}

// onClick={() => deleteAssignment(assignmentId)}