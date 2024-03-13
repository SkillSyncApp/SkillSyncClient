import { useState, useEffect } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';
import { Conversation } from '../types/Conversation';
import { getTokens } from '../services/authService';
import { Message } from '../types/Message';
import { User } from '../types/User';

export type RecieveNewMessageResponse = {
    conversationId: Conversation['_id'];
    senderId: User['_id'];
} & Pick<Message, '_id' | 'content' | 'createdAt'>;

type SendNewMessageInput = {
    conversationId: Conversation['_id'];
    content: string;
}

type ServerToClientEvents = {
    recieveMessage: (data: RecieveNewMessageResponse) => void;
}

type ClientToServerEvents = {
    joinRoom: (roomId: string) => void;
    sendMessage: (data: SendNewMessageInput) => void;
}

const useChatSocket = (onNewMessage: (data: RecieveNewMessageResponse) => void) => {
    const [socketInstance, setSocketInstance] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = socketIOClient(import.meta.env.VITE_REACT_APP_API_URL, {
            auth: {
                token: getTokens().accessToken
            }
        })
        setSocketInstance(socket);

        function onConnect() {
            setIsConnected(true)
        }

        function onDisconnect() {
            setIsConnected(false)
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        }
    }, []);

    useEffect(() => {
        socketInstance?.on('recieveMessage', onNewMessage);

        return () => {
            socketInstance?.off('recieveMessage', onNewMessage);
        }
    }, [socketInstance, onNewMessage])

    const sendMessage = (data: SendNewMessageInput) => {
        socketInstance?.emit('sendMessage', data);
    }

    const listenToConversations = (conversationIds: Conversation['_id'][]) => {
        conversationIds.forEach(conversation => {
            socketInstance?.emit('joinRoom', conversation);
        })
    }

    return {
        isConnected,
        listenToConversations,
        sendMessage,
        socket: socketInstance,
    };
}

export default useChatSocket;