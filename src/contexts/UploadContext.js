import { createContext, useState } from 'react'

export const UploadContext = createContext();

function UploadContextProvider({ children }) {
    const [uploadStatus, setUploadStatus] = useState(false);

    return (
        <UploadContext.Provider value={{ 
            uploadStatus, 
            setUploadStatus
        }}>
            { children }
        </UploadContext.Provider>
    )
}

export default UploadContextProvider
