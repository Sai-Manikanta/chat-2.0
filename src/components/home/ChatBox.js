import { useEffect, useContext, useRef } from 'react';
import { IKContext } from 'imagekitio-react';
import Chat from '../Chat';
import { ChatContext } from '../../contexts/ChatContext'

function ChatBox() {
    const { chats } = useContext(ChatContext);

    const scrollDiv = useRef();

    useEffect(() => {
        scrollDiv.current?.scrollIntoView({behavior: "smooth"})
    }, [chats])

    return (
        <div 
            className="bg-gray-50 dark:bg-gray-800 flex-grow p-3 flex-shrink overflow-y-auto scrollbar-hide bg-cover"
        >
                {(chats.length > 0) && (
                    <IKContext urlEndpoint="https://ik.imagekit.io/42vct06fb">
                            {chats.map(chat => (
                                <Chat key={chat.id} chat={chat} />
                            ))} 
                            <div ref={scrollDiv}></div>
                    </IKContext>
                )}
        </div>
    )
}

export default ChatBox
