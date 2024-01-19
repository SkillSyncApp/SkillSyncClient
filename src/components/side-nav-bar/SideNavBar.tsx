import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconOutlined, Squares2X2Icon as Squares2X2IconOutlined } from '@heroicons/react/24/outline';
import { ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconSolid, Squares2X2Icon as Squares2X2IconSolid } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';
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
        <NavLink className={({ isActive }) => `nav-item cursor-pointer ${isActive ? 'active' : ''}`} to='/'>
            {({ isActive }) => (
                <>{ICON_PER_STATE.discover[isActive ? 'active' : 'static']}Discover</>
            )}
        </NavLink>
        <NavLink className={({ isActive }) => `nav-item cursor-pointer ${isActive ? 'active' : ''}`} to='/inbox'>
            {({ isActive }) => (
                <>{ICON_PER_STATE.inbox[isActive ? 'active' : 'static']}inbox</>
            )}
        </NavLink>
    </nav>
}

export default SideNavBar;