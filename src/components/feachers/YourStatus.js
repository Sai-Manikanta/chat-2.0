import { useState, useContext, useEffect } from 'react'
import { IKContext, IKUpload } from 'imagekitio-react';
import fileExtension from 'file-extension'; 
import getTime from '../../utils/time'
import { AuthContext } from '../../contexts/AuthContext'
import RenderStatus from './RenderStatus'
import firebase from '../../utils/firebase'

function YourStatus() {
    const [uploadStatus, setUploadStatus] = useState(false);
    const [refetch, setRefetch] = useState(false); // toggle and set ui
    const { name } = useContext(AuthContext);
    const [statuses, setStatuses] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});

    useEffect(() => {
        const statusesRef = firebase.database().ref('Statuses');

        statusesRef.on('value', (snapshot) => {
            const statuses = snapshot.val();
            const statusesList = [];
            for(let id in statuses){
                statusesList.push({ id, ...statuses[id]});
            }
            setStatuses(statusesList)
        })
    }, []) 

    const handleChange = () => {
        setUploadStatus(true);
    }

    const onError = err => {
        console.log("upload Error");
        console.log(err);
        setUploadStatus(false);
    };
    
    const onSuccess = res => {
        
        if(res.fileType === 'image'){

            const statusesRef = firebase.database().ref('Statuses');
            statusesRef.push({ name, type: 'image', src: res.filePath, text: '', time: getTime(), seenByPartner: false, seenByPartnerTime: '', statusText: '' })
             .then(() => {
                setRefetch(!refetch);
                setUploadStatus(false);
             })
             .catch(err => {
                setUploadStatus(false);
             })

        } else {

            const videoExtention = fileExtension(res.filePath);
            const allowedExtentions = ['mp4', 'mov'];
            const allowedOrNot = allowedExtentions.includes(videoExtention); // boolean
            if(allowedOrNot){
                const statusesRef = firebase.database().ref('Statuses');
                statusesRef.push({ name, type: 'video', src: res.filePath, text: '', time: getTime(), seenByPartner: false, seenByPartnerTime: '', statusText: '' })
                 .then(() => {
                    setRefetch(!refetch);
                    setUploadStatus(false);
                 })
                 .catch(err => {
                    setUploadStatus(false);
                 })
            }

        }
    }

    return (
        <>
           {uploadStatus && <p>Uploading...</p>}
           {!uploadStatus && (
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
           )}
           <div className="mt-4">
               <div className="flex justify-between space-x-2">
                   {statuses.filter(s => s.name === name).map((status, index) => (
                       <button 
                          key={status.id}
                          className={`${ status.id === selectedStatus.id ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-pink-300' } flex-grow text-center rounded-lg text-white focus:outline-none`}
                          onClick={() => setSelectedStatus(status)}
                        >
                           { index + 1 }
                       </button>
                   ))}
               </div>
               { selectedStatus.id && (
                   <div className="mt-4">
                       <RenderStatus 
                          status={selectedStatus} 
                          refetch={refetch} 
                          setRefetch={setRefetch}
                          setSelectedStatus={setSelectedStatus}
                       />
                   </div>
                ) }
           </div>
        </>
    )
}

export default YourStatus