import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { addQuiz } from "../reducer";
import { useParams } from "react-router";
import * as quizClient from "../client";
import { addQuestion, setQuestions } from "../Questions/reducer"
import { useDispatch, useSelector } from "react-redux";


// type PossibleAnswer = {
//     text: string;
//     isCorrect: boolean;
// };


export default function MultipleChoiceEditor({ questionId, createquestionForQuiz
    // , questionDesc, questionPoints, 
    // questionCorrAns, possibleAnswers, setquestionPoints, 
    // setquestionDesc, setquestionCorrAns, setPossibleAnswers
}:{ 
    questionId: string,
    createquestionForQuiz: (qs: any) => void
    // questionDesc: string, 
    // questionPoints: number, 
    // questionCorrAns: string, 
    // possibleAnswers: PossibleAnswer[],
    // setquestionPoints: (points: number) => void,
    // setquestionDesc: (desc: string) => void,
    // setquestionCorrAns: (CorrAns: string) => void,
    // setPossibleAnswers: (PossAns: PossibleAnswer[]) => void,
 }
  ) {

    const { qid } = useParams();

    const [ type, settype ] = useState("multiple choice"); 
    const [questionPoints, setquestionPoints] = useState<number>(5);
    const [questionDesc, setquestionDesc] = useState("");
    const [questionCorrAns, setquestionCorrAns] = useState("");
    const [possibleAnswers, setPossibleAnswers] = useState([
        {
            text: "",
            isCorrect: false,
        },
    ]);

    const { questions } = useSelector((state: any) => state.questionReducer);
    const question = questions.find((question: any) => question._id === questionId);
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setPossibleAnswers((prev) =>
            prev.map((answer, i) =>
                i === index ? { ...answer, text: e.target.value } : answer
            )
        );
    };

    const addAnswer = () => {
        setPossibleAnswers((prev) => [
            ...prev,
            { text: '', isCorrect: false }, // Add a new default object
        ]);
    };
    
    const toggleIsCorrect = (index: number) => {
        setPossibleAnswers((prev) =>
            prev.map((answer, i) =>
                i === index ? { ...answer, isCorrect: !answer.isCorrect } : answer
            )
        );
    };

    const dispatch = useDispatch();

    // console.log("Multiple Choice 1");
    
    useEffect(() => {
        if(questionId !== "new"){
            settype(question.questionType)
            setquestionDesc(question.description);
            setquestionPoints(question.points);
            setquestionCorrAns(question.correctAnswer);
            setPossibleAnswers(question.possibleAnswers);
            // fetchQuestions();

        }
    }, []);
    
    return (
            <div>
                <div className="modal-body">
                    <label htmlFor="wd-points" className="text-start col-sm-2 mt-2 col-form-label">
                        {"Question: "} 
                    </label>
                    <textarea className="form-control" 
                    // defaultValue={questionId !== "new" ? questionDesc : "Question Description"} 
                        placeholder="Question Description"
                            onChange={(e) => setquestionDesc(e.target.value)}
                    />
                    <label htmlFor="wd-points" className="text-start col-sm-2 mt-2 col-form-label">
                        {"Answer: "} 
                    </label>
                        
                    {/* <div className="row">
                        <label htmlFor="wd-points" className="text-end col-sm-4 mt-2 col-form-label">
                            {"Correct Answer "} 
                        </label>
                        <div className="col-sm-6 mt-2">
                            <textarea id="wd-points" className="form-control" 
                              defaultValue={questionCorrAns} 
                              onChange={(e) => setquestionCorrAns(e.target.value)}
                            />
                        </div>
                        <div className="col-sm-2 mt-2">
                                <FaTrash className="text-danger me-2 mt-4 mb-1" 
                                    // onClick={() => deleteModule(moduleId)}
                                    />
                        </div>
                    </div> */}
                    <div className="row">
                        <label htmlFor="wd-points" className="text-end col-sm-4 mt-2 col-form-label">
                            {"Possible Answer "} 
                        </label>
                        <div className="col-sm-6 mt-2">
                            {/* <textarea id="wd-points" className="form-control" 
                              // defaultValue={quizPoints} 
                              onChange={(e) => setPossibleAnswers(e.target.value)}
                            /> */}
                            {/* {possibleAnswers.map((answer, index) => (
                                <input
                                    key={index}
                                    value={answer.text}
                                    onChange={(e) => handleInputChange(e, index)}
                                />
                            ))} */}
                            {possibleAnswers.map((answer, index) => (
                                <div key={index} className="d-flex">
                                    <input
                                        type="checkbox"
                                        checked={answer.isCorrect}
                                        onChange={() => toggleIsCorrect(index)}
                                    />
                                    <input className="form-control ms-2"
                                        type="text"
                                        value={answer.text}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                </div>
                            ))}
                        </div>
                        
                        <div className="col-sm-2 mt-2">
                                <FaTrash className="text-danger me-2 mt-4 mb-1" 
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
                          onClick={addAnswer}
                            >
                            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                            Add Possible Answer
                        </button>

                    </a>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary"
                        
                        data-bs-dismiss="modal">
                        Cancel 
                    </button>
                    <button type="button" data-bs-dismiss="modal" 
                        onClick={() => {
                            if (!questionDesc || questionPoints <= 0) {
                                // e.preventDefault();
                                alert('Please fill in all required fields properly.');
                                return;
                            }
                            createquestionForQuiz({
                                type,
                                questionDesc,
                                questionPoints,
                                questionCorrAns,
                                possibleAnswers
                            });
                        }}
                        className="btn btn-danger">
                        Add Question 
                    </button>
                </div>
        
            </div>
    );
}

    