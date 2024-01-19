import { Squares2X2Icon as Squares2X2IconOutlined, ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconOutlined } from '@heroicons/react/24/outline';
import { Squares2X2Icon as Squares2X2IconSolid, ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconSolid } from '@heroicons/react/24/solid';
import { Link, NavLink } from 'react-router-dom';
import './SideNavBar.css';

const ICON_PER_STATE = {
    discover: {
        static: <Squares2X2IconOutlined width={18} />,
        active: <Squares2X2IconSolid width={18} />
    },
    inbox: {
        static: <ChatBubbleOvalLeftIconOutlined width={18} />,
        active: <ChatBubbleOvalLeftIconSolid width={18} />,
    }
}

function SideNavBar() {
    return <nav className="flex flex-col p-4 text-[18px] gap-2">
        <NavLink className={({ isActive }) => `nav-item cursor-pointer ${isActive ? 'active' : ''}`} to='/'>{ICON_PER_STATE.discover.active}Discover</NavLink>
        <NavLink className={({ isActive }) => `nav-item cursor-pointer ${isActive ? 'active' : ''}`} to='/inbox'>{ICON_PER_STATE.inbox.static}Inbox</NavLink>
    </nav>
}

export default SideNavBar;