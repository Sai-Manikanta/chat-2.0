import { createContext, useState } from 'react'

export const VideoCallContext = createContext();

function VideoCallContext({ children }) {
  // const [roomId, setRoomId] = useState(callId);
  const [joinCode, setJoinCode] = useState("");

  return (
    <VideoCallContext.Provider>
        { children }
    </VideoCallContext.Provider>
  )
}

export default VideoCallContext