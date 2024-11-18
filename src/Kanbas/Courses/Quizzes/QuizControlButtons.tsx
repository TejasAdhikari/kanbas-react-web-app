import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import "./styles.css"
import ProtectedEdit from "../../Account/ProtectedEdit";


export default function QuizControlButtons() {
  return (
    <div className="float-end">
      <span className="bg-grey wd-rounded-corners-all-around 
        border-thin wd-border-solid pt-1 pb-1 ps-2 pe-2">
          60% of Total
      </span>
      <ProtectedEdit><BsPlus className="fs-2"/></ProtectedEdit>
      <IoEllipsisVertical className="fs-4" />
    </div>
);}

