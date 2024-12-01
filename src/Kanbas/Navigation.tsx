import { Link, NavLink, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { GrFormSchedule } from "react-icons/gr";
import { HiMiniInboxArrowDown } from "react-icons/hi2";
import { TbDeviceDesktopCog } from "react-icons/tb";

export default function KanbasNavigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Dashboard", path: "/Kanbas/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses",   path: "/Kanbas/Dashboard", icon: LiaBookSolid },
    { label: "Calendar",  path: "/Kanbas/Calendar",  icon: GrFormSchedule },
    { label: "Inbox",     path: "/Kanbas/Inbox",     icon: HiMiniInboxArrowDown },
    { label: "Labs",      path: "/Labs",             icon: TbDeviceDesktopCog },
  ];

  
  return (
    <div id="wd-kanbas-navigation" style={{ width: 110 }} 
      className="list-group rounded-0 position-fixed
      bottom-0 top-0 d-none d-md-block bg-black z-2">
      <a id="wd-neu-link" target="_blank"
        href="https://www.northeastern.edu/" 
        className="list-group-item bg-black border-0 text-center">
          <img src="/images/NEU.png" width="75px" />
      </a>

      <Link to="/Kanbas/Account" className={`list-group-item text-center border-0 bg-black
            ${pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"}`}>
        <FaRegCircleUser className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`} />
        <br />
        Account
      </Link>
      {links.map((link) => (
        <Link key={link.path} to={link.path} className={`list-group-item bg-black text-center border-0
              ${pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"}`}>
          {link.icon({ className: "fs-1 text-danger"})}
          <br />
          {link.label}
        </Link>
      ))}
    </div>
);}
