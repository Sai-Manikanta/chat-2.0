import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import getTime from '../../utils/time'
import RenderStatus from './RenderStatus'
import firebase from 'firebase'

function PartnerStatus() {
    const { name } = useContext(AuthContext);
    const [statuses, setStatuses] = useState([]);
    const [refetch, setRefetch] = useState(false); // toggle and set ui
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

    const updateToSeenStatus = (id, seenByPartner) => {
        if(seenByPartner) return null

        const statusesRef = firebase.database().ref('Statuses').child(id);
        statusesRef.update({
            seenByPartner: true,
            seenByPartnerTime: getTime()
        })
        .then(() => {})
        .catch(err => console.log(err))
    }
    
    return (
        <div>
            {(statuses.filter(s => s.name !== name).length === 0) && (
                <p>No Statuses from { name === 'Mani' ? 'Chinnu' : 'Mani' }</p>
            )}
            <div className="flex justify-between space-x-2">
                {statuses.filter(s => s.name !== name).map((status, index) => (
                    <button 
                        key={status.id}
                        className={`${ status.id === selectedStatus.id ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-pink-300' } flex-grow text-center rounded-lg text-white focus:outline-none`}
                        onClick={() => {
                            setSelectedStatus(status)
                            updateToSeenStatus(status.id, status.seenByPartner)
                        }}
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
                        isPartnerStatus={true}
                    />
                </div>
            )}
        </div>
    )
}

export default PartnerStatus

