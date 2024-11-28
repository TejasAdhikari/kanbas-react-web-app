import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import QuizDelete from "./QuizDelete";
import ProtectedEdit from "../../Account/ProtectedEdit";
import ProtectedRouteStudent from "../../Account/ProtectedRouteStudent";
import { MdOutlineEdit } from "react-icons/md";
import { useParams } from "react-router";
import * as quizzesClient from "./client";
import { updateQuiz } from "./reducer";
import { useDispatch } from "react-redux";
import { MdDoNotDisturb  } from "react-icons/md";


export default function SingleQuizControlButton({ quiz, quizId, deleteQuiz }: 
    { quiz: any;
      quizId: string; 
      deleteQuiz: (quizId: string) => void; }) {
      
  const { cid } = useParams();
  const dispatch = useDispatch();

  const publishQuiz = async () => {
    const newPublish = !quiz.published;
    const updatedquiz = { 
        ...quiz,
        published: newPublish,
        course: cid 
    };
    await quizzesClient.updateQuiz(updatedquiz);
    dispatch(updateQuiz(updatedquiz));
  };

  

  return (
    <div className="float-end">
      <ProtectedRouteStudent>
        {quiz.published ? <GreenCheckmark />
            : <MdDoNotDisturb className="me-1 text-danger"/>}
      </ProtectedRouteStudent>
      
      <ProtectedEdit>
        {quiz.published ? <a onClick={publishQuiz}><GreenCheckmark /></a> 
          : <a onClick={publishQuiz}><MdDoNotDisturb className="me-1 text-danger"/></a>}
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
              <a id="wd-unpublish-all-modules-and-items" className="dropdown-item" 
                onClick={publishQuiz}>
                {quiz.published ? <MdDoNotDisturb className="me-2 text-danger"/>
                 : <GreenCheckmark />}
                {quiz.published ? 'Unpublish' : 'Publish'} </a>
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