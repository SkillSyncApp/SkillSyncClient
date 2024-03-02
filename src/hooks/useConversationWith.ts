import { useMutation, useQuery } from "react-query";
import { User } from "../types/User";
import { getConversationWith, addConversation } from "../services/chatService";
import { GET_CONVERSATION_WITH } from "../query-keys/queries";

const useConversationWith = (userId: User['_id']) => {
    const { refetch: getConversationWithQuery } = useQuery([GET_CONVERSATION_WITH, userId],
        () => getConversationWith(userId), {
        enabled: false,
    });

    const startConversationWithMutation = useMutation(() =>
        addConversation(userId)
    );

    const getConversation = async () => {
        const conversation = await getConversationWithQuery();
        if (conversation.data?.data?._id) {
            return conversation.data.data;
        }
        return null;
    }

    const startConversation = async () => {
        const newConversation = await startConversationWithMutation.mutateAsync();
        return newConversation.data;
    }

    return { getConversation, startConversation };
};

export default useConversationWith;