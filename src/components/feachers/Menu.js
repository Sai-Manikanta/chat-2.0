import { useContext } from 'react';
import { motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { MdNotificationsActive, MdDeleteSweep, MdMovie } from 'react-icons/md'
import { BiVideo } from 'react-icons/bi'
import { FiSun } from 'react-icons/fi'
import { FaRegMoon } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import firebase from '../../utils/firebase';
import { ThemeContext } from '../../contexts/ThemeContext'
import 'react-toastify/dist/ReactToastify.css';
import LinkBox from './LinkBox';

function Menu() {
   const history = useHistory();
   const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

   const smsSuccess = () => toast.success("Success...");
   const smsFailed = () => toast.error("Failed...");

   const deleteSuccess = () => toast.success("Successfully Cleared");
   const deleteFailed = () => toast.error("Failed...");
   const sendSms = () => {
      axios.get('https://shielded-sea-23165.herokuapp.com/api/v1/notify')
         .then(res => {
            smsSuccess()
         })
         .catch(err => {
            smsFailed()
         })
   }

   const deleteChat = () => {
      const chatRef = firebase.database().ref('Chats');
      chatRef.remove()
         .then(() => deleteSuccess())
         .catch(() => deleteFailed())
   }

   return (
      <div>
         <ToastContainer />
         <div className="flex">
            <motion.button
               whileTap={{ scale: 1.5 }}
               className="flex items-center mr-2 rounded py-3 pl-5 w-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white focus:outline-none shadow border-2 border-white"
               onClick={sendSms}
               styles={{ cursor: "none" }}
            >
               <MdNotificationsActive size="1.5em" className="mr-2" />
               Notify
            </motion.button>
            <motion.button
               whileTap={{ scale: 1.5 }}
               className="flex items-center ml-2 rounded py-3 pl-5 w-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white focus:outline-none shadow border-2 border-white"
               onClick={() => history.push('/video-call')}
               styles={{ cursor: "none" }}
            >
               <BiVideo size="1.5em" className="mr-2" />
               Video Call
            </motion.button>
         </div>
         

         <div className="flex">
            <motion.button
               whileTap={{ scale: 1.5 }}
               className="flex items-center py-3 pl-5 mr-2 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded focus:outline-none shadow border-2 border-white mt-3"
               onClick={deleteChat}
               styles={{ cursor: "none" }}
            >
               <MdDeleteSweep size="1.5em" className="mr-2" />
               Clear Chat
            </motion.button>
            <motion.button
               whileTap={{ scale: 1.5 }}
               className="flex items-center py-3 pl-5 ml-2 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded shadow border-2 border-white mt-3 focus:outline-none"
               onClick={() => setIsDarkTheme(!isDarkTheme)}
               styles={{ cursor: "none" }}
            >
               {isDarkTheme ? <FiSun size="1.5em" className="mr-2" /> : <FaRegMoon size="1.5em" className="mr-2" />}
               {isDarkTheme ? 'Set Light' : 'Set Dark'}
            </motion.button>
         </div>

         <div className="flex" style={{ marginTop: '13px' }}>
            <motion.button
               whileTap={{ scale: 1.5 }}
               className="flex items-center mr-2 rounded py-3 pl-5 w-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white focus:outline-none shadow border-2 border-white"
               onClick={() => history.push('/movies')}
               styles={{ cursor: "none" }}
            >
               <MdMovie size="1.5em" className="mr-2" />
               Movies
            </motion.button>
         </div>

         {/* Links Box */}
         <LinkBox />
      </div>
   )
}

export default Menu
