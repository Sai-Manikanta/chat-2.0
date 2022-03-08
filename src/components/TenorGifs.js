import { useContext } from 'react'
import Tenor from "react-tenor";
import { useHistory } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext'
import { UploadContext } from '../contexts/UploadContext'
import firebase from '../utils/firebase';
import getTime from '../utils/time'
import "react-tenor/dist/styles.css";

function TenorGifs() {

    const { name } = useContext(AuthContext);
    const { setUploadStatus } = useContext(UploadContext);
    const history = useHistory();

    const handleGifSelect = result => {
        const src = result.media[0].tinygif.url;

        const chatRef = firebase.database().ref('Chats');
        chatRef.push({ name, type: "gif", src, time: getTime() })
         .then(res => {
            setUploadStatus(false);
         })
         .catch(err => {
            setUploadStatus(false);
            console.log(err);
         })

         history.push('/');
    };

    return (
        <div className="mt-4 bg-white rounded">
            <Tenor 
                autoFocus 
                defaultResults 
                token="E9NHTTR579GC" 
                limit={6}
                searchPlaceholder="Gif search karo bey"
                onSelect={handleGifSelect} 
            />
        </div>
    )
}

export default TenorGifs
