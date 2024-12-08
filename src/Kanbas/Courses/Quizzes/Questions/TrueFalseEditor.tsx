import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import * as quizClient from "../client";
import { addQuestion } from "./reducer";


export default function TrueFalseEditor({ questionId, createquestionForQuiz }:
    { questionId: string,
        createquestionForQuiz: (qs: any) => void,
     }
  ) {
    const { qid } = useParams();

    const [ type, settype ] = useState("True/False"); 
    const [questionPoints, setquestionPoints] = useState<number>(5);
    const [questionDesc, setquestionDesc] = useState("");
    const [questionCorrAns, setquestionCorrAns] = useState("");
    const [possibleAnswers, setPossibleAnswers] = useState([
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: false },
    ]);


    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    //     setPossibleAnswers((prev) =>
    //         prev.map((answer, i) =>
    //             i === index ? { ...answer, text: e.target.value } : answer
    //         )
    //     );
    // };

    const handleSubmit = async () => {
        const newQuestion = {
            questionType: "True/False",
            description: questionDesc, // Ensure this is set
            points: questionPoints, // Ensure this is set
            correctAnswer: possibleAnswers.find((a) => a.isCorrect)?.text || "True",
            possibleAnswers: possibleAnswers,
            quiz: qid, // Replace with your quiz ID
        };
    
        // createquestionForQuiz(newQuestion);
        const question = await quizClient.createQuestionForQuiz(qid as string, newQuestion);
        dispatch(addQuestion(question));
    };
    

    const addAnswer = () => {
        setPossibleAnswers((prev) => [
            ...prev,
            { text: '', isCorrect: false }, // Add a new default object
        ]);
    };
    
    // const toggleIsCorrect = (index: number) => {
    //     setPossibleAnswers((prev) =>
    //         prev.map((answer, i) =>
    //             i === index ? { ...answer, isCorrect: !answer.isCorrect } : answer
    //         )
    //     );
    // };

    const setCorrectAnswer = (index: number) => {
        setPossibleAnswers((prev) =>
            prev.map((answer, i) => ({
                ...answer,
                isCorrect: i === index, // Only the clicked option is correct
            }))
        );
    };

    const dispatch = useDispatch();

    
    return (
            <div>
                <div className="modal-body">
                    True False
                    <label htmlFor="wd-points" className="text-start col-sm-2 mt-2 col-form-label">
                        {"Question: "} 
                    </label>
                    <textarea className="form-control" defaultValue="Question Description" 
                        placeholder="Question Description"
                            onChange={(e) => setquestionDesc(e.target.value)}
                            //  onChange={(e) => setModuleName(e.target.value)}
                    />
                    <label htmlFor="wd-points" className="text-start col-sm-2 mt-2 col-form-label">
                        {"Answer: "} 
                    </label>
                        
                    <div className="row">
                        {/* <div className="form-check ms-4">
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
                        </div> */}

                        {possibleAnswers.map((answer, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        name="trueFalse"
                                        className="form-check-input ms-4 me-2"
                                        checked={answer.isCorrect}
                                        onChange={() => setCorrectAnswer(index)} // Set the selected answer as correct
                                    />
                                    {answer.text}
                                </label>
                            </div>
                        ))}
                    </div> 
                    
                </div>


                <div className="modal-footer">
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
                            handleSubmit();
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
    
    