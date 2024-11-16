import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import "./styles.css";
import { useParams, useLocation } from "react-router";
import PeopleEditor from "./PeopleEditor";


export default function PeopleControls({ personId, setPersonId, addPerson }:
    { personId: string; 
      setPersonId: (title: string) => void; 
      addPerson: () => void; }) {
  
//   const { cid } = useParams();
  
  return (
    <div id="wd-assigment-controls" className="text-nowrap">
        <div className="flex" >
            <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end"
                data-bs-toggle="modal" data-bs-target="#wd-add-module-dialog">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Person
            </button>
            <div id="wd-search-box" className="border justify-content-start">
                <span >
                <CiSearch className="me-1 fs-3"/> 
                </span>
                <span>
                <input id="wd-search-assignment" type="text" placeholder="Search..." 
                    className="me-1 border-0"/>
                </span>
            </div>
            <PeopleEditor dialogTitle="Add Module" PersonId={personId}
                setPersonId={setPersonId} addPerson={addPerson} />
        </div> 
    </div>
);}
