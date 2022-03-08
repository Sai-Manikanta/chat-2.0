import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { CgMenuRightAlt } from "react-icons/cg"
import { AuthContext } from '../../contexts/AuthContext'
import firebase from '../../utils/firebase'

function Header() {
    const [typing, setTyping] = useState({});
    const { name } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        const opoSiteTyperDocIndex = name === 'Mani' ? 1 : 0;

        const typingRef = firebase.database().ref('Typing'); // .child(opoSiteTyperDocId)
        typingRef.on('value', (snapshot) => {
            const typers = snapshot.val();
            const typersList = [];
            for(let id in typers){
                typersList.push({ id, ...typers[id]});
            }
            setTyping(typersList[opoSiteTyperDocIndex])
        })
    }, [name]) 

    return (
        <div className={`bg-white dark:bg-gray-800 ${name === 'Mani' ? 'text-blue-600' : 'text-pink-500'} tracking-wide dark:text-white  flex px-3 py-3 items-center justify-between flex-shrink-0 shadow`}>
            {typing.typing && (
                <div>{`${typing.name} is typing...`}</div>
            )}
            {/* <div>{JSON.stringify(typing)}</div> */}
            {!typing.typing && (
                <div className="font-bold">Welcome...</div>
            )}
            {/* <div className="font-bold">Welcome bey</div> */}
            <button onClick={() => history.push('/feachers/menu')}>
                <CgMenuRightAlt size="2em" className={`${name === 'Mani' ? 'text-blue-600' : 'text-pink-500'} dark:text-white`} />
            </button>
        </div>
    )
}

export default Header
