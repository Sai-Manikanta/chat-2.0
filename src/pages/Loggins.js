import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../utils/firebase'

function Loggins() {
    const [loggins, setLoggins] = useState([]);

    const handleDelete = () => {        
        const logginsRef = firebase.database().ref("Loggins");
        logginsRef.remove();
    }

    useEffect(() => {
        const logginsRef = firebase.database().ref("Loggins");

        logginsRef.on('value', (snapshot) => {
            const loggins = snapshot.val();
            const logginsList = [];
            for(let id in loggins){
                logginsList.push({ id, ...loggins[id]});
            }
            setLoggins(logginsList);
        })
    }, [])

    console.log(loggins);

    return (
        <div className="p-4 text-gray-800">
            <table className="border w-full">
                <tr className="text-left border-b">
                    <th className="p-2">User</th>
                    <th className="p-2">Loggin</th>
                </tr>
                {loggins.map(login => (
                    <tr key={login.id} className="border-b">
                        <td className="p-2">{login.name}</td>
                        <td className="p-2">{login.loginAt}</td>
                    </tr>
                ))}
            </table>
            <div className="flex justify-between">
                <Link to="/" className="px-3 py-1 bg-blue-400 text-white mt-4 rounded">
                    Home
                </Link>
                <button 
                    className="px-3 py-1 bg-blue-400 text-white mt-4 rounded"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Loggins
