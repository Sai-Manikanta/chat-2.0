import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { IKImage } from 'imagekitio-react'

function ImageChat({ chat }) {
    const { name } = useContext(AuthContext);

    return (
        <div className={`flex ${chat.name === name && 'justify-end'} mb-4`}>
            <span className={`rounded p-1 ${chat.name === 'Mani' ? 'bg-indigo-300' : 'bg-pink-300'} overflow-hidden shadow`}>
                <IKImage
                    path={chat.src}
                    transformation={[{
                        //"height": "240",
                        "width": "246"
                    }]}
                    loading="lazy"
                    lqip={{ active: true }}
                    className="rounded-sm"
                />
            </span>
        </div>
    )
}

export default ImageChat
