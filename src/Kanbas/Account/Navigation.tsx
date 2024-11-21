import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();
  const active = (path: string) => (pathname.includes(path) ? "active" : "");

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
     {links.map((link) => (
       <NavLink key={link} to={`/Kanbas/Account/${link}`} 
        className={`list-group-item ${active(link)}`} > {link} </NavLink>
     ))}
     {currentUser && currentUser.role === "ADMIN" && (
       <NavLink to={`/Kanbas/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </NavLink> )}
   </div>

    // <div id="wd-account-navigation"  className="wd list-group fs-5 rounded-0">
    //   <NavLink
    //     id="wd-account-signin-link" to="/Kanbas/Account/Signin"
    //     className={({ isActive }) => `list-group-item border border-0 ${
    //       isActive ? "active" : "text-danger"}`}>
    //     Signin
    //   </NavLink>
    //   <NavLink
    //     id="wd-account-signup-link" to="/Kanbas/Account/Signup"
    //     className={({ isActive }) => `list-group-item border border-0 ${
    //       isActive ? "active" : "text-danger"}`}>
    //     Signup
    //   </NavLink>
    //   <NavLink
    //     id="wd-account-profile-link" to="/Kanbas/Account/Profile"
    //     className={({ isActive }) => `list-group-item border border-0 ${
    //       isActive ? "active" : "text-danger"}`}>
    //     Profile
    //   </NavLink> 
    // </div>
);}
