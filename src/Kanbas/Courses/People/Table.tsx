import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as client from "./client";
import { useDispatch, useSelector } from "react-redux";
import { addPerson, setPeople, deletePerson } from "./reducer";
import ProtectedEdit from "../../Account/ProtectedEdit";
import PeopleControls from "./PeopleControls";
import { FaTrash } from "react-icons/fa6";

export default function PeopleTable () {
  const { cid } = useParams();
  // const { users, enrollments } = db;
  const { enrollments } = useSelector((state: any) => state.peopleReducer);
  const [personId, setPersonId] = useState("");

  const dispatch = useDispatch();

  const fetchPeople = async () => {
    const people = await client.fetchAllPeople(cid as string);
    // console.log(people);
    dispatch(setPeople(people));
  };

  const createEntryForPerson = async () => {
    if (!cid) return;
    // const newModule = { name: personId, course: cid };
    const people = await client.enrollPersonInCourse(cid, personId);
    dispatch(addPerson(people));
    dispatch(setPeople(people));
  };

  const deleteEntryForPerson = async (user: any) => {
    console.log(user._id);
    const newPeople = await client.unenrollPersonFromCourse(cid, user._id);
    // console.log("Dashboard courses response: ", newCourses);
    dispatch(deletePerson({user: user._id, course: cid}));
    dispatch(setPeople(newPeople));
  }

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div id="wd-people-table">

      <ProtectedEdit>
        <PeopleControls personId={personId} setPersonId={setPersonId} addPerson={createEntryForPerson}/>
      </ProtectedEdit> 
      <br /><br /><br /><br />
    
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
        {enrollments.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
              <td className="wd-delete">
                <ProtectedEdit>
                  <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteEntryForPerson(user)}/>
                </ProtectedEdit>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
);}
