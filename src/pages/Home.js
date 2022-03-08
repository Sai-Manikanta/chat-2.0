import { motion } from 'framer-motion'
import Header from '../components/home/Header';
import ChatBox from '../components/home/ChatBox';
import ChatSend from '../components/home/ChatSend'

function Home() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-screen flex flex-col max-w-lg mx-auto"
        >
            <Header />
            <ChatBox />
            <ChatSend />
        </motion.div>
    )
}

export default Home
