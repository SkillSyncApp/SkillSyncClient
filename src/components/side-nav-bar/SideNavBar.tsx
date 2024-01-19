import './SideNavBar.css';
import { Squares2X2Icon as Squares2X2IconOutlined, ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconOutlined } from '@heroicons/react/24/outline';
import { Squares2X2Icon as Squares2X2IconSolid, ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconSolid } from '@heroicons/react/24/solid';

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
        <div className="nav-item active cursor-pointer">{ICON_PER_STATE.discover.active}Discover</div>
        <div className="nav-item cursor-pointer">{ICON_PER_STATE.inbox.static}Inbox</div>
    </nav>
}

export default SideNavBar;