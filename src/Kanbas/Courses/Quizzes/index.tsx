import React, { useState, useEffect } from "react";
import { BsGripVertical } from "react-icons/bs";
import SingleQuizControlButton from "./SingleQuizControlButton";
import { IoMdArrowDropdown } from "react-icons/io";
import QuizControlButtons from "./QuizControlButtons";
import AssignmentControls from "./QuizControls";
import { useParams, useLocation } from "react-router";
import ProtectedEdit from "../../Account/ProtectedEdit";
import { setQuizzes, deleteQuiz } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import QuizControls from "./QuizControls";
import { MdOutlineQuiz } from "react-icons/md";
import * as quizzesClient from "./client"; 


export default function Quizzes() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);

  // var today = new Date();
  // var dd = String(today.getDate()).padStart(2, '0');
  // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  // var yyyy = today.getFullYear();
  // var currDate = yyyy + '-' + dd + '-' + mm;
  const today = new Date();
  const currDate = today.toISOString().split("T")[0];

  const dispatch = useDispatch();

  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  const removeQuiz = async (quizId: string) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

    return (
      <div id="wd-assignments">
        <ProtectedEdit>
          <QuizControls/>
        </ProtectedEdit> 
        <br /><br /><br /><br />

        <ul id="wd-assignment-list" className="list-group rounded-0">
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div id="wd-assignments-title" className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              <IoMdArrowDropdown className="me-1"/>
                Quizzes
              <QuizControlButtons />
            </div>
            {quizzes
                .map((quiz: any) => (
                    <li className="wd-lesson list-group-item p-3 ps-1">
                      <div className="d-flex">
                        <div className="align-self-center me-3">
                          <BsGripVertical className="me-2 fs-3" />
                          <MdOutlineQuiz className="me-1 text-success"/>
                        </div>
                        <div className="align-self-center flex-grow-1">
                          {(currentUser.role === "FACULTY" || quiz.published) ?
                            <a className="wd-assignment-link"
                              href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>
                              {quiz.title}
                            </a> :
                            quiz.title  
                          }
                          <br />
                          {/* <div className="wd-float-left text-danger me-1">
                            Multiple module | 
                          </div> */}
                          {new Date(quiz.due_date_num) >= new Date(currDate) ? 
                            new Date(quiz.available_date_num) > new Date(currDate) ?
                            <div className="wd-float-left me-1"> 
                              <b>Not available until</b> {quiz.available_date_num} at 12:00 am | <br /> 
                            </div > : <div className="wd-float-left me-1"> 
                                        <b>Available</b> | <br /> 
                                      </div > 
                            : <div className="wd-float-left me-1"> 
                                <b>Closed</b> | <br /> 
                              </div >
                          }
                          <div className="wd-float-left me-1">
                            <b>Due</b> {quiz.due_date_num} at 11:59pm | {quiz.points} pts | Questions | Score
                          </div>  
                        </div>
                        <div className="align-self-center">
                          <SingleQuizControlButton 
                            quiz = {quiz}
                            quizId={quiz._id}
                            deleteQuiz={(quizId) => removeQuiz(quizId)}/>
                        </div>
                      </div>
                  </li>
                  )
                )
              }
          </li>
        </ul>
      </div>
  );}
  