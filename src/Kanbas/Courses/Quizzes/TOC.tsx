import { useLocation, useParams } from "react-router";


export default function TOC() {
  const { pathname } = useLocation();
  const { cid, qid } = useParams();
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a id="wd-a1" href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/editor/details`}
          className={`nav-link ${pathname.includes("details") ? "active" : ""}`}>
          Details
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a2" href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/editor/questions`}
          className={`nav-link ${pathname.includes("questions") ? "active" : ""}`}>
          Questions
        </a>
      </li>
    </ul>
  );
}

  