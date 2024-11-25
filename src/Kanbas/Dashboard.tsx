import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as db from "./Database";
import { enrollCourse, unenrollCourse, setEnrollments } from "./enrollmentReducer";
import ProtectedEdit from "./Account/ProtectedEdit";
import ProtectedRouteStudent from "./Account/ProtectedRouteStudent";
import * as enrollmentClient from "./enrollmentClient";

export default function Dashboard({ courses, setCourses, allCourses, setAllCourses,
        course, setCourse, addNewCourse, deleteCourse, updateCourse, enrolling, setEnrolling , updateEnrollment  }: {
        courses: any[]; allCourses: any[]; course: any; 
        setCourses: (courses: any) => void; 
        setAllCourses: (allCourses: any) => void;
        setCourse: (course: any) => void;
        addNewCourse: () => void; deleteCourse: (course: any) => void;
        updateCourse: () => void; 
        enrolling: boolean; setEnrolling: (enrolling: boolean) => void;
        updateEnrollment: (courseId: string, enrolled: boolean) => void}) {
    
    const [showAllCourses, setShowAllCourses] = useState(false);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    // const { enrollments } = useSelector((state: any) => state.enrollmentReducer); 
            
    // const enrolledCourses = courses.filter((course: any) => enrollments.some(
    //     (enrollment: any) => enrollment.user === currentUser._id && enrollment.course === course._id
    //   ));
    
    const dispatch = useDispatch();

    
    // enrolled course and All courses
    
    useEffect(() => {
        dispatch(setEnrollments(courses));
    }, []);
    

    // const enrollUserInCourse = async (courseId: any) => {
    //     console.log(currentUser._id);
    //     const newCourses = await enrollmentClient.enrollInCourse(currentUser._id, courseId);
    //     // console.log("Dashboard courses response: ", newCourses);
    //     dispatch(enrollCourse({user: currentUser._id, course: courseId}));
    //     setCourses(newCourses);
    // };

    // const unEnrollUseFromCourse = async (courseId: any) => {
    //     console.log(currentUser._id);
    //     const newCourses = await enrollmentClient.unEnrollFromCourse(currentUser._id, courseId);
    //     // console.log("Dashboard courses response: ", newCourses);
    //     dispatch(unenrollCourse({user: currentUser._id, course: courseId}));
    //     setCourses(newCourses);
    // };
    
    // const displayedCourses = showAllCourses ? allCourses : courses;
    // const displayedCourses = courses;
    return (
        <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">
            Dashboard
            {/* <ProtectedRouteStudent> */}
                <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
                    {enrolling ? "My Courses" : "All Courses"}
                </button>
                {/* <button className="btn btn-primary float-end"
                id="wd-enrollments-click" 
                onClick={() => setShowAllCourses(!showAllCourses)}>
                  {showAllCourses ? "Back" : "Enrollments"}
                </button> */}
            {/* </ProtectedRouteStudent> */}
        </h1> 
        
        <hr />
        <ProtectedEdit>
            <h5>New Course
                <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={addNewCourse} > Add </button>
                <button className="btn btn-warning float-end me-2"
                    onClick={updateCourse} id="wd-update-course-click">
                    Update
                </button>
            </h5><br />
            <input value={course.name} className="form-control mb-2" 
                onChange={(e) => setCourse({ ...course, name: e.target.value }) }/>
            <textarea value={course.description} className="form-control"
                onChange={(e) => setCourse({ ...course, description: e.target.value }) }/>
            <hr />
        </ProtectedEdit>
        
        <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
        <div id="wd-dashboard-courses" className="row">
            <div className="row row-cols-1 row-cols-md-5 g-4">
            {courses.map((course) => (
                <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                <div className="card rounded-3 overflow-hidden">
                    <Link to={courses.some(
                                (c: any) =>
                                    c._id === course._id ) ? (`/Kanbas/Courses/${course._id}/Home`) : ("/Kanbas/Dashboard")}
                        className="wd-dashboard-course-link text-decoration-none text-dark" >
                        <img src={`/images/${course._id}.jpg`} width="100%" height={160} 
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;  // type cast to HTMLImageElement
                                target.onerror = null;  // prevent infinite loop in case fallback image fails
                                target.src = '/images/coursethumbnail.jpg';  // fallback image path
                            }} 
                        />
                        <div className="card-body">
                            <h5 className="wd-dashboard-course-title card-title">
                                {enrolling && (
                                    <button onClick={(event) => {
                                            event.preventDefault();
                                            updateEnrollment(course._id, !course.enrolled);
                                        }}
                                        className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} >
                                        {course.enrolled ? "Unenroll" : "Enroll"}
                                    </button>
                                )}
                                {course.name}
                            </h5>
                            <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                            {course.description}
                            </p>
                            
                            <ProtectedEdit>
                                <button className="btn btn-primary"> Go </button>
                                <button onClick={(event) => {
                                    event.preventDefault();
                                    deleteCourse(course._id);
                                    }} className="btn btn-danger float-end"
                                    id="wd-delete-course-click">
                                        Delete
                                </button>
                                <button id="wd-edit-course-click"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setCourse(course);
                                    }}
                                    className="btn btn-warning me-2 float-end" >
                                    Edit
                                </button>
                            </ProtectedEdit>

                            {/* <ProtectedRouteStudent>
                                {courses.some(
                                    (c: any) =>
                                        c._id === course._id ) ? (
                                    <div>
                                        <button className="btn btn-primary"> Go </button>
                                        <button
                                            className="btn btn-danger ms-1 float-end"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                unEnrollUseFromCourse(course._id);
                                                // dispatch(unenrollCourse({ 
                                                //     user: currentUser._id, 
                                                //     course: course._id 
                                                // }))
                                            }}
                                        >
                                            Unenroll
                                        </button>
                                    </div>
                                    ) : (
                                    <button
                                        className="btn btn-success ms-1 float-end"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            enrollUserInCourse(course._id);
                                        }}
                                    >
                                        Enroll
                                    </button>
                                )}
                            </ProtectedRouteStudent> */}
                        </div>
                    </Link>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
}