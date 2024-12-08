import { FaPlus } from "react-icons/fa";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FITBEditor from "./FITBEditor";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addQuestion, updateQuestion } from "./reducer";
import * as quizClient from "../client";


export default function NewQuestionEditor({ questionId, fetchQuestions }:{ 
  questionId: string,
  fetchQuestions: () => void
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
      // const [questionType, setquestionType] = useState("");
      // const [question, setquizFrom] = useState("");

      const createquestionForQuiz = async (qs: any) => {
          if (!qid) return;
          const newquestion = { 
              questionType: qs.type,
              description: qs.questionDesc,
              points: qs.questionPoints,
              correctAnswer: qs.possibleAnswers.find((a: any) => a.isCorrect)?.text || possibleAnswers[0].text,
              possibleAnswers: qs.possibleAnswers,
              quiz: qid 
          };
          const question = await quizClient.createQuestionForQuiz(qid, newquestion);
          dispatch(addQuestion(question));
          fetchQuestions();
      };

      const dispatch = useDispatch();

    //   useEffect(() => {
    //     if(qid !== "new"){
    //         // setquestionDesc(quiz.description);
    //         // setquestionPoints(quiz.points);
    //         fetchQuestions();
    //     }
    // }, []);

    // console.log(questionId);

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
                                <option value="multiple choice">Multiple Choice </option>
                                <option value="True/False">True/False</option>
                                <option value="Fill in the Blank">Fill in the Blank</option>
                            </select>
                        </div>
                        <label htmlFor="wd-points" className="text-end col-sm-2 col-form-label">
                            Points 
                        </label>
                        <div className="col-sm-3">
                            <input id="wd-points" type="number" className="form-control" 
                            // defaultValue={questionPoints} 
                            //     onChange={(e) => setquestionPoints(Number(e.target.value))}
                                />
                        </div> 
                    </div>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              
              {type === "multiple choice" && 
                  (<MultipleChoiceEditor questionId={questionId}
                                          createquestionForQuiz={createquestionForQuiz}
                                          // questionDesc={questionDesc} 
                                          // questionPoints={questionPoints} 
                                          // questionCorrAns={questionCorrAns} 
                                          // possibleAnswers={possibleAnswers}
                                          // setquestionPoints={setquestionPoints}
                                          // setquestionDesc={setquestionDesc}
                                          // setquestionCorrAns={setquestionCorrAns}
                                          // setPossibleAnswers={setPossibleAnswers}
                                          />)}
              {type === "True/False" && (<TrueFalseEditor questionId={questionId} 
                                        createquestionForQuiz={createquestionForQuiz}
                                        // quizId={qid as string}
                                        />)}
              {type === "Fill in the Blank" && (<FITBEditor questionId={questionId} 
                                                  createquestionForQuiz={createquestionForQuiz}/>)}

            
            </div>
          </div>
        </div>
      );
    }
    
    