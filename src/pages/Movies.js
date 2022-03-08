import { useContext } from 'react'
import Header from '../components/home/Header';
import { AuthContext } from '../contexts/AuthContext'

const Movies = () => {
    const { name } = useContext(AuthContext);

    return (
        <>
            <Header />
            <div className="p-4">
                <h2 className={`text-xl  ${name === 'Mani' ? 'text-blue-600' : 'text-pink-500'} dark:text-white`}>
                    Our Favorite Movies Bangaram
                </h2>
                <div className="mt-4">
                    <iframe 
                        src="https://iframe.mediadelivery.net/embed/29320/0fdeb0cf-5d2e-4c58-bbe5-8f38a9347574?autoplay=true" 
                        loading="lazy" 
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                        allowfullscreen="true" 
                        className="w-full"
                    />
                </div>
            </div>
        </>
    )
}

export default Movies