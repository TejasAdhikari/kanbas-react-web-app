import { FaPlus, FaTrash } from "react-icons/fa";

export default function FITBEditor({ questionId }:{ questionId: string }
  ) {
    return (
                <div className="modal-body">
                    FITB
                    <label htmlFor="wd-points" className="text-start col-sm-2 mt-2 col-form-label">
                        {"Question: "} 
                    </label>
                    <textarea className="form-control" defaultValue="Question Description" 
                        placeholder="Module Name"
                            //  onChange={(e) => setModuleName(e.target.value)}
                    />
                    <label htmlFor="wd-points" className="text-start col-sm-2 mt-2 col-form-label">
                        {"Answer: "} 
                    </label>
                        
                    <div className="row">
                        
                        <label htmlFor="wd-points" className="text-end col-sm-4 mt-2 col-form-label">
                            {"Correct Answer "} 
                        </label>
                        
                        <div className="col-sm-6 mt-2">
                            <input id="wd-points" className="form-control" 
                            // defaultValue={quizPoints} 
                            // onChange={(e) => setquizPoints(e.target.value)}
                            />
                        </div>
                        <div className="col-sm-2 mt-2">
                            <FaTrash className="text-danger me-2" 
                                    // onClick={() => deleteModule(moduleId)}
                                    />
                        </div>
                    </div> 
                    <a 
                      // href=""
                      // onClick={() => setqsId("new")}
                      >
                        <button className="btn btn-primary mt-4"
                          // onClick={() => setqsId("new")
                            >
                            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                            Add Answer
                        </button>
                    </a>
                </div>
                
    );
}
    
    