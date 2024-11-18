import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import AssignmentDelete from "./QuizDelete";
import ProtectedEdit from "../../Account/ProtectedEdit";

export default function SingleQuizControlButton({ assignmentId, deleteAssignment }: 
    { assignmentId: string; 
      deleteAssignment: (assignmentId: string) => void; }) {
  return (
    <div className="float-end">
      <ProtectedEdit>
        <FaTrash className="text-danger me-2 mb-1" 
        data-bs-toggle="modal" data-bs-target={`#wd-delete-${assignmentId}-dialog`}/>
      </ProtectedEdit> 
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      <AssignmentDelete dialogTitle="Delete Assignment" 
                    assignmentId={assignmentId}
                    deleteAssignment={deleteAssignment} />
    </div>
);}

// onClick={() => deleteAssignment(assignmentId)}