import ConversationList from "../../components/inbox/conversation-list/ConversationList";
import Conversation from "../../components/inbox/conversation/Conversation";
import { ConversationOverview } from "../../types/ConversationOverview";
import { Message } from "../../types/Message";
import { useQuery } from "react-query";
import {GET_CONVERSATIONS_OVERVIEW} from "../../query-keys/queries"; 
import { getConversations } from "../../services/ConversationService";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/atoms/userAtom";

function Inbox() {

    const {data} = useQuery(GET_CONVERSATIONS_OVERVIEW, getConversations, { staleTime: Infinity });
    const user = useRecoilValue(userState);

    const conversations: ConversationOverview[] = data?.data || [];

    const messages: Message[] = [
        {
            _id: "123456789",
            sender: {
                info: {
                    _id: "10101010101" 
                },
                name: "Amazon",
                image: ""
            },
            content:"lacus vestibulum sed arcu no"
        },
        {
            _id: "123456789",
            sender: {
                info: {
                    _id: user._id 
                },
                name: "Amazon",
                image: ""
            },
            content:"Hey"
        },
        {
            _id: "123456789",
            sender: {
                info: {
                    _id: user._id 
                },
                name: "Amazon",
                image: ""
            },
            content:"Aliquam ut porttitor leo a diam sollicitudin tempor id eu. Faucibus turpis in eu mi bibendum. Pretium vulputate sapien nec sagittis. Ut porttitor leo a diam sollicitudin tempor. Ipsum a arcu cursus vitae. Sit amet massa vitae tortor condimentum lacinia. At imperdiet dui accumsan sit amet nulla facilisi. Interdum posuere lorem ipsum dolor sit. Vel pretium lectus quam id. Commodo ullamcorper a lacus vestibulum sed arcu no"
        },
        {
            _id: "123456789",
            sender: {
                info: {
                    _id: "10101010101" 
                },
                name: "Amazon",
                image: ""
            },
            content:"Ut porttitor leo a diam sollicitudin tempor. Ipsum a arcu cursus vitae. Sit amet massa vitae tortor condimentum lacinia. At imperdiet dui accumsan sit amet nulla facilisi. Interdum posuere lorem ipsum dolor sit. Vel pretium lectus quam id. Commodo ullamcorper a lacus vestibulum sed arcu no"
        }
    ]

    return <div className="flex flex-1">
        <ConversationList conversations={conversations} />
        <Conversation messages={messages} />
    </div>
}

export default Inbox;