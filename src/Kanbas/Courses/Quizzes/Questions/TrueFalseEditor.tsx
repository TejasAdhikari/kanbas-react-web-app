import { FaPlus } from "react-icons/fa";

export default function TrueFalseEditor({ questionId }:{ questionId: string }
  ) {
    return (
                <div className="modal-body">
                    True False
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
                        <div className="form-check ms-4">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioTrue"/>
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                True
                            </label>
                        </div>
                        <div className="form-check ms-4">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioFalse"/>
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                False
                            </label>
                        </div>
                    </div> 
                    
                </div>
                
    );
}
    
    