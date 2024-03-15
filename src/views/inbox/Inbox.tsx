import { useCallback, useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import MessagesIcon from "../../assets/images/messages.png";
import ConversationList from "../../components/inbox/conversation-list/ConversationList";
import ConversationChat from "../../components/inbox/conversationChat/ConversationChat";
import useChatSocket, {
  RecieveNewMessageResponse,
} from "../../hooks/useChatSocket";
import { GET_CONVERSATIONS, GET_MESSAGES } from "../../query-keys/queries";
import { getConversations, getMessages } from "../../services/ChatService";
import { userState } from "../../store/atoms/userAtom";
import { Conversation } from "../../types/Conversation";
import { Message } from "../../types/Message";
import Lottie from "react-lottie";
import ComputerAnimation from "./chat-animation.json";

function Inbox() {
  const navigate = useNavigate();
  const { conversationId: selectedConversationId } = useParams();
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user.type == "unknown" || user.bio == "") navigate("/logInGoogle", { replace: true });
  }, [user.type]);

  const queryClient = useQueryClient();
  const { data: conversationsData, isLoading: isConversationsLoading } =
    useQuery(GET_CONVERSATIONS, getConversations, {});
  const conversations: Conversation[] = useMemo(
    () => conversationsData?.data || [],
    [conversationsData]
  );

  const { data: messagesData, isLoading: isMessagesLoading } = useQuery(
    [GET_MESSAGES, selectedConversationId],
    () => getMessages(selectedConversationId),
    { enabled: selectedConversationId !== undefined }
  );
  const selectedConversationMessages: Message[] = useMemo(
    () => messagesData?.data || [],
    [messagesData]
  );

  const onNewMessage = useCallback(
    (data: RecieveNewMessageResponse) => {
      console.log({ newMessage: data });
      const {
        conversationId,
        _id: messageId,
        content,
        createdAt,
        senderId,
      } = data;

      if (senderId !== user._id) {
        console.log(
          `Got message on conversation ${conversationId}, contenet: ${content}, while selected is ${selectedConversationId}`
        );
        if (conversationId === selectedConversationId) {
          console.log("new message to display on current chat: ", content);

          const conversation = conversations[selectedConversationId];
          console.log({ selectedConversationId, conversations, conversation });
          if (conversation) {
            const conversationLead = conversation.users.find(
              (conversationUser) => conversationUser._id !== user._id
            );

            const newMessages: Message[] = [
              ...selectedConversationMessages,
              { _id: messageId, content, createdAt, sender: conversationLead },
            ];
            queryClient.setQueryData([GET_MESSAGES, selectedConversationId], {
              data: newMessages,
            });
          }
        } else {
          console.log("new message to display on background chat: ", content);
          const newConversations: Conversation[] = [...conversations];
          const conversation = newConversations.find(
            (conversation) => conversation._id === conversationId
          );

          if (conversation) {
            conversation.messagesBehind =
              (conversation.messagesBehind || 0) + 1;
            queryClient.setQueryData(GET_CONVERSATIONS, {
              data: newConversations,
            });
          }
        }
      }
    },
    [
      conversations,
      queryClient,
      selectedConversationId,
      selectedConversationMessages,
      user._id,
    ]
  );

  const { sendMessage, listenToConversations } = useChatSocket(onNewMessage);

  const onConversationSelect = (conversationId: Conversation["_id"]) => {
    const newConversations: Conversation[] = [...conversations];
    const conversation = newConversations.find(
      (conversation) => conversation._id === conversationId
    );

    if (conversation) {
      conversation.messagesBehind = 0;
      queryClient.setQueryData(GET_CONVERSATIONS, { data: newConversations });
    }
    navigate(`${conversationId}`);
  };

  const sendNewMessage = async (
    conversationId: Conversation["_id"],
    content: string
  ) => {
    if (selectedConversationId && content !== "") {
      sendMessage({ conversationId, content });

      const newMessages: Message[] = [
        ...(selectedConversationMessages || []),
        {
          _id: crypto.randomUUID().toString(),
          content,
          createdAt: new Date(),
          sender: user,
        },
      ];
      queryClient.setQueryData([GET_MESSAGES, selectedConversationId], {
        data: newMessages,
      });
    }
  };

  useEffect(() => {
    if (conversations && conversations.length > 0) {
      listenToConversations(
        conversations.map((conversation) => conversation._id)
      );
    }
  }, [conversations]);

  return (
    <div className="flex flex-1">
      <ConversationList
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        onConversationSelect={onConversationSelect}
        loading={isConversationsLoading}
      />
      {selectedConversationId ? (
        <ConversationChat
          messages={selectedConversationMessages}
          onNewMessage={(message) =>
            sendNewMessage(selectedConversationId, message)
          }
          loading={isMessagesLoading}
        />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Lottie
            options={{ animationData: ComputerAnimation, loop: true }}
            isClickToPauseDisabled
            style={{ height: 300, width: 400, cursor: "default" }}
          />
          {conversations.length === 0 ? (
            <>
              <div className="font-bold opacity-60 text-lg">
                no conversations yet
              </div>
              <div className="opacity-60 text-sm">
                it's time to start contact with other users
              </div>
            </>
          ) : (
            <>
              <div className="font-bold opacity-60 text-lg">
                no conversation was chosen
              </div>
              <div className="opacity-60 text-sm">
                select a chat from the left pane
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Inbox;
