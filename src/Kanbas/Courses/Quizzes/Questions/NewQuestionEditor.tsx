import { FaPlus } from "react-icons/fa";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FITBEditor from "./FITBEditor";
import { useState } from "react";


export default function NewQuestionEditor({ questionId }:{ questionId: string }
  ) {

    const [ type, settype ] = useState("Multiple Choice"); 

      return (
        <div id="wd-add-question-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                {/* <div>
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    New Question 
                  </h1>
                </div> */}
                <div className="row">
                        {/* <label htmlFor="wd-group" className="text-end col-sm-2 col-form-label">
                          Type
                        </label> */}
                        <div className="col-sm-6">
                            <select id="wd-group" className="form-select"
                                // value={quizAssGrp} 
                                onChange={(e) => settype(e.target.value)}
                                >
                                <option value="Multiple Choice">Multiple Choice </option>
                                <option value="True/False">True/False</option>
                                <option value="Fill in the Blank">Fill in the Blank</option>
                            </select>
                        </div>
                        <label htmlFor="wd-points" className="text-end col-sm-2 col-form-label">
                            Points 
                        </label>
                        <div className="col-sm-3">
                            <input id="wd-points" type="number" className="form-control" 
                            // defaultValue={quizPoints} 
                                // onChange={(e) => setquizPoints(e.target.value)}
                                />
                        </div> 
                    </div>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              
              {type === "Multiple Choice" && (<MultipleChoiceEditor questionId={questionId}/>)}
              {type === "True/False" && (<TrueFalseEditor questionId={questionId} />)}
              {type === "Fill in the Blank" && (<FITBEditor questionId={questionId} />)}

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel </button>
                <button type="button" data-bs-dismiss="modal" className="btn btn-danger">
                  Add Question </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    