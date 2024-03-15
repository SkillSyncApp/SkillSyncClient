
import { useQuery } from "react-query";
import { GET_ALL_USERS } from "../../query-keys/queries";
import { getUsers } from "../../services/userService";
import ProfileImage from "../profile-image/ProfileImage";
import Dialog from "../shared/dialog/Dialog";
import { useEffect, useState } from "react";
import useConversationWith from "../../hooks/useConversationWith";
import { User } from "../../types/User";

type StartConversationDialogProps = {
    show: boolean;
    onClose: () => void;
}

function StartConversationDialog({ show, onClose }: StartConversationDialogProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const { data } = useQuery(GET_ALL_USERS, getUsers, { staleTime: Infinity });
    const users = data?.data || [];

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const [selectedUserId, setSelectedUserId] = useState<User['_id']>();

    const { getConversation, startConversation, goToConversation } = useConversationWith(selectedUserId);

    const goToChat = async () => {
        const conversationWithUser = await getConversation();
        if (conversationWithUser) {
            goToConversation(conversationWithUser._id);
        } else {
            startConversation();
            onClose();
        }
    }

    useEffect(() => {
        if (selectedUserId) {
            goToChat();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedUserId]);

    return <Dialog show={show} onClose={onClose} title='Start Conversation'>
        <div className="flex flex-col gap-3 mt-3">
            <input id="searchQuery" placeholder="Search user or company.." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <div className="overflow-y-scroll h-[300px] flex flex-col gap-1 ">
                {filteredUsers.map(user => (
                    <div onClick={() => setSelectedUserId(user._id)} className="py-2 px-2 flex items-center gap-2 hover:bg-lightgray rounded-md cursor-pointer">
                        <ProfileImage src={user.image} className="w-[20px] h-[20px]" />
                        <span className="text-md font-medium">{user.name}</span>
                        <span className="text-sm opacity-30">({user.type})</span>
                    </div>
                ))}
                {filteredUsers.length === 0 && <span className="text-sm opacity-50 text-center"><b>Oops, no results</b><br/>try to search something else</span>}
            </div>

        </div>
    </Dialog>
}

export default StartConversationDialog;