import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

function GifChat({ chat }) {
    const { name } = useContext(AuthContext);

    return (
        <div className={`flex ${chat.name === name && 'justify-end'} mb-4`}>
            <span className={`rounded p-1 ${chat.name === 'Mani' ? 'bg-indigo-300' : 'bg-pink-300'} overflow-hidden shadow`} style={{ height: '160px', minWidth: '160px' }}>
                <img 
                    src={chat.src} 
                    alt={chat.src}
                    style={{ height: '100%', display: 'block', margin: '0px auto' }}
                />
            </span>
        </div>
    )
}

export default GifChat
