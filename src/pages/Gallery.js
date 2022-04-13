import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IKContext, IKImage } from 'imagekitio-react'
import { BiArrowBack } from 'react-icons/bi'
import { CgSpinner } from 'react-icons/cg'
import { FiUpload } from 'react-icons/fi'
import GalleryUploadModal from './../components/GalleryUploadModal'
import SelectedGalleryModal from './../components/SelectedGalleyModal'
import firebase from './../utils/firebase'

const Gallery = () => { 
    const [isLoading, setIsLoading] = useState(true);
    const [gallery, setGallery] = useState([]);
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const [selectedGallery, setSelectedGallery] = useState({});

    useEffect(() => {
        setIsLoading(true);

        const galleryRef = firebase.database().ref('Gallery');

        galleryRef.on('value', (snapshot) => {
            const gallerys = snapshot.val();
            const galleryList = [];
            for(let id in gallerys){
                galleryList.push({ id, ...gallerys[id]});
            }
            setGallery(galleryList)
            setIsLoading(false)
        })

    }, [])

    return (
        <IKContext urlEndpoint="https://ik.imagekit.io/42vct06fb">
          {isLoading ? (
              <div className="h-screen dark:bg-gray-800">
                  <div className="p-4 border-b dark:border-gray-900 dark:bg-gray-900 flex justify-between">
                    <Link to="/feachers/menu">
                        <BiArrowBack size="1.8rem" className="dark:text-white" />
                    </Link>
                    <FiUpload className="dark:text-white" size="1.3rem" onClick={() => setOpenUploadModal(true)} /> 
                  </div>
                  <div className="flex justify-center items-center" style={{ height: 'calc(100% - 52px)' }}>
                    <CgSpinner size="3rem" className="animate-spin dark:text-white" />
                  </div>
              </div>
          ) : (
              <div className="h-screen">
                 <div className="sticky top-0 p-4 border-b drop-shadow-md bg-white dark:border-gray-800 dark:bg-gray-900 flex justify-between">
                    <Link to="/feachers/menu">
                        <BiArrowBack size="1.3rem" className="dark:text-white" />
                    </Link>
                    <FiUpload className="dark:text-white" size="1.3rem" onClick={() => setOpenUploadModal(true)} /> 
                 </div>
                 {gallery.length > 0 ? (
                     <div className="grid p-1 gap-1 grid-cols-3 dark:bg-gray-800">
                            {gallery.map(gallery => (
                                <IKImage
                                    key={gallery.src}
                                    path={gallery.src}
                                    transformation={[{
                                        "height": "180"
                                    }]}
                                    loading="lazy"
                                    lqip={{ active: true }}
                                    style={{ height: 180, width: '100%', objectFit: 'cover' }}
                                    onClick={() => setSelectedGallery(gallery)}
                                />
                            ))}
                     </div>
                 ) : (
                    <p className="mt-4 text-center">Emty Gallery ☹️</p>
                 )}
              </div>
          )}
          <GalleryUploadModal isOpen={openUploadModal} setIsOpen={setOpenUploadModal} />
          <SelectedGalleryModal selectedGallery={selectedGallery} setSelectedGallery={setSelectedGallery} />
        </IKContext>
    )
}

export default Gallery