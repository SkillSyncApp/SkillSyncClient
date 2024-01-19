import ConversationList from "../../components/inbox/conversation-list/ConversationList";
import Conversation from "../../components/inbox/conversation/Conversation";
import { ConversationOverview } from "../../types/ConversationOverview";
import { Message } from "../../types/Message";

function Inbox() {

    const conversations: ConversationOverview[] = [
        {
            id: '123',
            sender: {
                name: "Amazon Inc.",
                image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/620731182528277.652f6b6a0ea18.jpg"
            }
        }
    ]

    const messages: Message[] = [
        {
            sender: { type: "me", name: "You", image: "" }, content: "My first message"
        },
        {
            sender: { type: "other", name: "Amazon Inc.", image: "" }, content: "dunt ut labore et dolore magna aliqua. Massa massa ultricies mi quis hendrerit dolor. Aliquam ut porttitor leo a diam sollicitudin tempor id eu. Faucibus turpis in eu mi bibendum. Pretium vulputate sapien nec sagittis. Ut porttitor leo a diam sollicitudin tempor. Ipsum a arcu cursus vitae. Sit amet massa vitae tortor condimentum lacinia. At imperdiet dui accumsan sit amet nulla facilisi. Interdum posuere lorem ipsum dolor sit. Vel pretium lectus quam id. Commodo ullamcorper a lacus vestibulum sed arcu no"
        },
        {
            sender: { type: "other", name: "Amazon Inc.", image: "" }, content: "dunt ut labore et dolore magna aliqua. Massa massa ultricies mi quis hendrerit dolor. Aliquam ut porttitor leo a diam sollicitudin tempor id eu. Faucibus turpis in eu mi bibendum. Pretium vulputate sapien nec sagittis. Ut porttitor leo a diam sollicitudin tempor. Ipsum a arcu cursus vitae. Sit amet massa vitae tortor condimentum lacinia. At imperdiet dui accumsan sit amet nulla facilisi. Interdum posuere lorem ipsum dolor sit. Vel pretium lectus quam id. Commodo ullamcorper a lacus vestibulum sed arcu no"
        },
        {
            sender: { type: "other", name: "Amazon Inc.", image: "" }, content: "dunt ut labore et dolore magna aliqua. Massa massa ultricies mi quis hendrerit dolor. Aliquam ut porttitor leo a diam sollicitudin tempor id eu. Faucibus turpis in eu mi bibendum. Pretium vulputate sapien nec sagittis. Ut porttitor leo a diam sollicitudin tempor. Ipsum a arcu cursus vitae. Sit amet massa vitae tortor condimentum lacinia. At imperdiet dui accumsan sit amet nulla facilisi. Interdum posuere lorem ipsum dolor sit. Vel pretium lectus quam id. Commodo ullamcorper a lacus vestibulum sed arcu no"
        },
        {
            sender: { type: "me", name: "You", image: "" }, content: "My second message is here asd asdlkas jasl"
        },
        {
            sender: { type: "me", name: "You", image: "" }, content: "My second message is here asd asdlkas jasl"
        },
        {
            sender: { type: "other", name: "Amazon Inc.", image: "" }, content: "dunt ut labore et dolore magna aliqua. Massa massa ultricies mi quis hendrerit dolor. Aliquam ut porttitor leo a diam sollicitudin tempor id eu. Faucibus turpis in eu mi bibendum. Pretium vulputate sapien nec sagittis. Ut porttitor leo a diam sollicitudin tempor. Ipsum a arcu cursus vitae. Sit amet massa vitae tortor condimentum lacinia. At imperdiet dui accumsan sit amet nulla facilisi. Interdum posuere lorem ipsum dolor sit. Vel pretium lectus quam id. Commodo ullamcorper a lacus vestibulum sed arcu no"
        },
    ]

    return <div className="flex flex-1">
        <ConversationList conversations={conversations} />
        <Conversation messages={messages} />
    </div>
}

export default Inbox;