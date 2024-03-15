import {
  ChatBubbleOvalLeftIcon as InboxIconOutlined,
  Squares2X2Icon as DiscoverIconOutlined,
  UserCircleIcon as ProfileIconOutlined,
} from "@heroicons/react/24/outline";
import {
  ChatBubbleOvalLeftIcon as InboxIconSolid,
  Squares2X2Icon as DiscoverIconSolid,
  UserCircleIcon as ProfileIconSolid,
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import "./SideNavBar.css";

const ICON_PER_STATE = {
  discover: {
    static: <DiscoverIconOutlined width={18} />,
    active: <DiscoverIconSolid width={18} />,
  },
  inbox: {
    static: <InboxIconOutlined width={18} />,
    active: <InboxIconSolid width={18} />,
  },
  profile: {
    static: <ProfileIconOutlined width={18} />,
    active: <ProfileIconSolid width={18} />,
  },
};

function SideNavBar() {
  return (
    <nav className="flex flex-col p-4 text-[18px] gap-2">
      <NavLink
        className={({ isActive }) =>
          `nav-item cursor-pointer ${isActive ? "active" : ""}`
        }
        to="/"
      >
        {({ isActive }) => (
          <>{ICON_PER_STATE.discover[isActive ? "active" : "static"]}Discover</>
        )}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `nav-item cursor-pointer ${isActive ? "active" : ""}`
        }
        to="/inbox"
      >
        {({ isActive }) => (
          <>{ICON_PER_STATE.inbox[isActive ? "active" : "static"]}inbox</>
        )}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `nav-item cursor-pointer ${isActive ? "active" : ""}`
        }
        to="/profile"
      >
        {({ isActive }) => (
          <>{ICON_PER_STATE.profile[isActive ? "active" : "static"]}profile</>
        )}
      </NavLink>
    </nav>
  );
}

export default SideNavBar;
