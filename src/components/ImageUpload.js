import { useContext } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import { useHistory } from 'react-router-dom';
import fileExtension from 'file-extension'; 
import { AuthContext } from '../contexts/AuthContext';
import { UploadContext } from '../contexts/UploadContext';
import firebase from '../utils/firebase'
import getTime from '../utils/time';
import TenorGifs from './TenorGifs';

function ImageUpload() {
    const { name } = useContext(AuthContext)
    const { setUploadStatus } = useContext(UploadContext);
    
    const history = useHistory();

    const handleChange = () => {
        setUploadStatus(true);
        history.push('/')
    }

    const onError = err => {
        console.log("upload Error");
        console.log(err);
        setUploadStatus(false);
    };
    
    const onSuccess = res => {
        if(res.fileType === 'image'){
            const chatRef = firebase.database().ref('Chats');
            chatRef.push({ name, type: "image", src: res.filePath, time: getTime() })
             .then(res => {
                setUploadStatus(false);
             })
             .catch(err => {
                setUploadStatus(false);
                console.log(err);
             })

        } else {
            const videoExtention = fileExtension(res.filePath);
            const allowedExtentions = ['mp4', 'mov'];
            const allowedOrNot = allowedExtentions.includes(videoExtention); // boolean
            if(allowedOrNot){
                const chatRef = firebase.database().ref('Chats');
                chatRef.push({ name, type: "video", src: res.filePath, time: getTime() })
                .then(res => {
                    setUploadStatus(false);
                })
                .catch(err => {
                    setUploadStatus(false);
                    console.log(err);
                })
            }
        }
    };


    return (
        <div>
            <IKContext 
                publicKey="public_6Z7p3M/rOoplkEAkbXolSXM41IA=" 
                urlEndpoint="http://localhost:3000/" 
                authenticationEndpoint="https://shielded-sea-23165.herokuapp.com/auth" 
            >
                <IKUpload
                    onError={onError}
                    onSuccess={onSuccess}
                    onChange={handleChange}
                    folder="/chat"
                />
            </IKContext>
            <TenorGifs />
        </div>
    )
}

export default ImageUpload
