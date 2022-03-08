import ImageChat from "./ImageChat";
import TextChat from "./TextChat";
import VideoChat from "./VideoChat";
import GifChat from "./GifChat";

function Chat({ chat }) {
    switch (chat.type) {
        case 'text':
              return <TextChat chat={chat} />
            break;
        case 'image':
              return <ImageChat chat={chat} />
            break;
        case 'video':
              return <VideoChat chat={chat} />
            break;
        case 'gif':
              return <GifChat chat={chat} />
            break;
        default:
              return null
            break;
    }
}

export default Chat
