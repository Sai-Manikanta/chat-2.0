import { createContext, useState, useEffect } from 'react';
import firebase from '../utils/firebase'

export const ChatContext = createContext();

function ChatContextProvider({ children }) {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const chatRef = firebase.database().ref('Chats');

        chatRef.on('value', (snapshot) => {
            const chats = snapshot.val();
            const chatsList = [];
            for(let id in chats){
                chatsList.push({ id, ...chats[id]});
            }
            setChats(chatsList)
        })
    }, [])

    return (
        <ChatContext.Provider value={{
            chats,
            setChats
        }}>
            { children }
        </ChatContext.Provider>
    )
}

export default ChatContextProvider
