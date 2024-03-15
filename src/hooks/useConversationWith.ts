import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { GET_CONVERSATIONS, GET_CONVERSATION_WITH } from "../query-keys/queries";
import { addConversation, getConversationWith } from "../services/chatService";
import { Conversation } from "../types/Conversation";
import { User } from "../types/User";

const useConversationWith = (userId?: User['_id']) => {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const { refetch: getConversationWithQuery } = useQuery([GET_CONVERSATION_WITH, userId],
        () => getConversationWith(userId), {
        enabled: false,
    });

    const startConversationWithMutation = useMutation(() =>
        addConversation(userId)
        , {
            onSuccess: () => {
                queryClient.invalidateQueries(GET_CONVERSATIONS);
            },
        });

    const goToConversation = (conversationId: Conversation['_id']) => {
        navigate(`/inbox/${conversationId}`, { replace: true });
    }

    const getConversation = async () => {
        const conversation = await getConversationWithQuery();
        if (conversation.data?.data?._id) {
            return conversation.data.data;
        }
        return null;
    }

    const startConversation = async () => {
        const newConversation = await startConversationWithMutation.mutateAsync();
        if (newConversation.data._id) {
            goToConversation(newConversation.data._id);
        }
    }

    return { getConversation, startConversation, goToConversation };
};

export default useConversationWith;