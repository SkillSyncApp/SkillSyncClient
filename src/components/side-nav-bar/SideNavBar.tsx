import './SideNavBar.css';
import { Squares2X2Icon as Squares2X2IconOutlined, ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconOutlined } from '@heroicons/react/24/outline';
import { Squares2X2Icon as Squares2X2IconSolid, ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconSolid } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

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
        <Link to='/' className="nav-item active cursor-pointer">{ICON_PER_STATE.discover.active}Discover</Link>
        <Link to='/inbox' className="nav-item cursor-pointer">{ICON_PER_STATE.inbox.static}Inbox</Link>
    </nav>
}

export default SideNavBar;