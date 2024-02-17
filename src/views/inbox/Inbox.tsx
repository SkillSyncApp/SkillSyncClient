import ConversationList from "../../components/inbox/conversation-list/ConversationList";
import { ConversationOverview } from "../../types/ConversationOverview";
import { useQuery } from "react-query";
import {GET_CONVERSATION_MESSAGES, GET_CONVERSATIONS_OVERVIEW} from "../../query-keys/queries"; 
import { getConversationsOverView, getConversationMessages } from "../../services/ConversationService";
import { useState } from "react";
import Conversation from "../../components/inbox/conversation/Conversation";

function Inbox() {
    const { data: conversationsData } = useQuery(GET_CONVERSATIONS_OVERVIEW, getConversationsOverView, { staleTime: Infinity });
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

    const handleConversationClick = (userId: string) => {
        setSelectedConversation(userId);
    };

    const conversations: ConversationOverview[] = conversationsData?.data || [];

    const { data: messagesChat } = useQuery([GET_CONVERSATION_MESSAGES, selectedConversation], () => {
        return selectedConversation ? getConversationMessages(selectedConversation) : Promise.resolve(null);
    }, {enabled: selectedConversation !== null})

    const messages = messagesChat?.data ?? [];

    return <div className="flex flex-1">
        <ConversationList conversations={conversations} onConversationClick={handleConversationClick}/>
        <Conversation messages={messages}/>
    </div>
}

export default Inbox;