import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useParams } from "react-router";
import * as quizClient from "../client";
import { addQuestion } from "./reducer";
import { useDispatch } from "react-redux";


export default function FITBEditor({ questionId, createquestionForQuiz}:
    { questionId: string, createquestionForQuiz: (qs: any) => void }
  ) {

    
    const { qid } = useParams();

    const [ type, settype ] = useState("Fill in the Blank"); 
    const [questionPoints, setquestionPoints] = useState<number>(5);
    const [questionDesc, setquestionDesc] = useState("");
    const [questionCorrAns, setquestionCorrAns] = useState("");
    const [possibleAnswers, setPossibleAnswers] = useState([
        {
            text: "",
            isCorrect: false,
        },
    ]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setPossibleAnswers((prev) =>
            prev.map((answer, i) =>
                i === index ? { ...answer, text: e.target.value, isCorrect: true } : answer
            )
        );
    };

    const addAnswer = () => {
        setPossibleAnswers((prev) => [
            ...prev,
            { text: '', isCorrect: false }, // Add a new default object
        ]);
    };

    // const handleSubmit = async () => {
    //     if (!questionDesc || !questionCorrAns) {
    //         alert("Please fill in the question and correct answer.");
    //         return;
    //     }

    //     if (!questionDesc.includes("___")) {
    //         alert("Please include a blank (___) in the question text.");
    //         return;
    //     }
    
    //     const newQuestion = {
    //         questionType: "Fill-in-the-Blank",
    //         description: questionDesc,
    //         correctAnswer: questionCorrAns,
    //         points: questionPoints, // Add if points are required
    //         quiz: qid, // Replace with the ID of the quiz
    //     };
    
    //     try {
    //         const question = await quizClient.createQuestionForQuiz(qid as string, newQuestion);
    //         dispatch(addQuestion(question));
    //         console.log("Question submitted:", question);
    //     } catch (err) {
    //         console.error("Error submitting question:", err);
    //     }
    // };
    
    const dispatch = useDispatch();


    return (
            <div className="modal-body">
                FITB
                <label htmlFor="wd-points" className="text-start col-sm-2 mt-2 col-form-label">
                    {"Question: "} 
                </label>
                <textarea
                    value={questionDesc}
                    className="form-control"
                    onChange={(e) => setquestionDesc(e.target.value)}
                    placeholder="Type your question and include a blank like this: 'The capital of France is ___.'"
                />


                <label htmlFor="wd-points" className="text-start col-sm-2 mt-2 col-form-label">
                    {"Answer: "} 
                </label>
                <div className="row">
                    
                    <label htmlFor="wd-points" className="text-end col-sm-4 mt-2 col-form-label">
                        {"Correct Answers: "} 
                    </label>

                    {possibleAnswers.map((answer, index) => (
                        <div key={index} className="d-flex">
                            {/* <input
                                type="checkbox"
                                checked={answer.isCorrect}
                                onChange={() => toggleIsCorrect(index)}
                            /> */}
                            <input className="form-control ms-2"
                                type="text"
                                value={answer.text}
                                onChange={(e) => handleInputChange(e, index)}
                            />
                        </div>
                    ))}
                             
                    {/* <div className="col-sm-6 mt-2">
                        
                        <input
                            type="text"
                            className="form-control"
                            value={questionCorrAns}
                            onChange={(e) => setquestionCorrAns(e.target.value)}
                            placeholder="Enter the correct answer"
                        />      
                    </div> */}

                    <a 
                      // href=""
                      // onClick={() => setqsId("new")}
                      >
                        <button className="btn btn-primary mt-4"
                          // onClick={() => setqsId("new")
                          onClick={addAnswer}
                            >
                            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                            Add Correct Answer
                        </button>

                    </a>
                    
                </div> 
                
                <div className="modal-footer mt-4">
                    <button type="button" className="btn btn-secondary"
                        
                        data-bs-dismiss="modal">
                        Cancel 
                    </button>
                    <button type="button" data-bs-dismiss="modal" 
                        // onClick={() => handleSubmit()}
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
                            // handleSubmit();
                            // handleInputChange();
                            // createquestionForQuiz({
                            //     type,
                            //     questionDesc,
                            //     questionPoints,
                            //     questionCorrAns,
                            //     possibleAnswers
                            // });
                        }}
                        className="btn btn-danger">
                        Add Question 
                    </button>
                </div>
            </div>
                
    );
}
    
    