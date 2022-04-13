import Modal from 'react-modal';
import { AiTwotoneDelete } from 'react-icons/ai'
import axios from 'axios'
import firebase from '../utils/firebase';
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
      borderRadius: 0,
      padding: 0
    },
};

function SelectedGalleryModal({ selectedGallery, setSelectedGallery }) {

  const handleDelete = () => {
    axios.delete(`https://gallery-controll.herokuapp.com/delete-gallery/${selectedGallery.fileId}`)
      .then(res => {
        /// Delete gallery document from realtime Database
        const chatRef = firebase.database().ref('Gallery').child(selectedGallery.id);
        chatRef.remove()
         .then(() => setSelectedGallery({}))
         .catch(() => console.log('Gallery doc not deleted from realtime Database'))
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <Modal
        isOpen={selectedGallery.hasOwnProperty('src')}
        style={customStyles}
        contentLabel="Example Modal"
    >
        <div className="flex flex-col h-screen justify-center bg-gray-900">
          <img 
              src={'https://ik.imagekit.io/42vct06fb' + selectedGallery.src} 
              alt='gallery' 
              width="100%"
              onDoubleClick={() => setSelectedGallery({})}
          />
          <div>
            <button onClick={handleDelete} className="fixed bottom-3 left-2 p-2 bg-gray-800 mt-2">
              <AiTwotoneDelete size="1.4rem" className="text-white" />
            </button>
          </div>
        </div>
  </Modal>
  )
}

export default SelectedGalleryModal