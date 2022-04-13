import { useState } from 'react'
import Modal from 'react-modal';
import { IKContext, IKUpload } from 'imagekitio-react';
import { ToastContainer, toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg'
import firebase from '../utils/firebase'
import getTime from '../utils/time';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    content: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      border: 0,
      borderRadius: 0
    },
};

function GalleryUploadModal({ isOpen, setIsOpen }) {
    const [uploadStatus, setUploadStatus] = useState(false);

    const handleChange = () => {
      setUploadStatus('true');
    }

    const onError = err => {
        console.log(err)
        toast.error("Upload fail ra ☹️")
        setUploadStatus('false');
    };

    const onSuccess = res => {
        if(res.fileType === 'image'){
            const galleryRef = firebase.database().ref('Gallery');
            galleryRef.push({ fileId: res.fileId, type: "image", src: res.filePath, time: getTime() })
            .then(res => {
              setUploadStatus(false);
              setIsOpen(false);
            })
            .catch(err => {
              setUploadStatus(false);
              toast.error("Upload fail ra ☹️")
            })
        } else {
            toast.error("Invalid Format ra 😭");
        }
    };


  return (
    <>
      <ToastContainer />
      <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
      >
        {uploadStatus ? (
          <div className="flex flex-col h-screen items-center justify-center">
            <CgSpinner size="3.6rem" className="animate-spin" />
            <p className="mt-3">Plese wait ra, Upload Avuthundhi ⏱</p>
          </div>
        ) : (
          <>
            <IKContext 
              publicKey="public_6Z7p3M/rOoplkEAkbXolSXM41IA=" 
              urlEndpoint="http://localhost:3000/" 
              authenticationEndpoint="https://shielded-sea-23165.herokuapp.com/auth" 
            >
              <IKUpload
                onError={onError}
                onSuccess={onSuccess}
                onChange={handleChange}
                folder="/gallery"
              />
            </IKContext>
            <button onClick={() => setIsOpen(false)} className="mt-4">Close</button>
          </>
        )}
      </Modal>
    </>
  )
}

export default GalleryUploadModal