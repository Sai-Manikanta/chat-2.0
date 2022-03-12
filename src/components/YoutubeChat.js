import { useContext } from 'react';
import ReactPlayer from 'react-player'
import { AuthContext } from '../contexts/AuthContext';

function YoutubeChat({ chat }) {
    const { name } = useContext(AuthContext);

    return (
        <div className={`flex ${chat.name === name && 'justify-end'} mb-4`}>
            <span className={`rounded p-1 ${chat.name === 'Mani' ? 'bg-indigo-300' : 'bg-pink-300'} overflow-hidden shadow`}>
                <ReactPlayer 
                    url={chat.src} 
                    width='100%'
                    height='200px'
                    controls={true}
                />
            </span>
        </div>
    )
}

export default YoutubeChat
