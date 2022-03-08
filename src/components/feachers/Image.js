import React, { useState } from 'react';
import firebase from 'firebase'

function Image({ status, refetch, setRefetch, setSelectedStatus, isPartnerStatus }){
    const [statusText, setStatusText] = useState('');
    const [statusSetted, setStatusSetted] = useState('');

    const deleteStatus = id => {
        const statusesRef = firebase.database().ref('Statuses').child(id);
        statusesRef.remove()
         .then(() => {
            setRefetch(!refetch)
            setSelectedStatus({})
         })
         .catch(err => {
            console.log(err)
         })
    }

    const handleAddStatusText = e => {
        e.preventDefault();

        if(statusText === ''){
            return
        }

        const statuseRef = firebase.database().ref('Statuses').child(status.id);

        statuseRef.update({
            statusText: statusText
        });

        setStatusSetted(statusText);
        setStatusText('');
    }

    return (
        <>
          <img
            src={`https://ik.imagekit.io/42vct06fb${status.src}`}
            alt={status.src}
            className=" mx-auto rounded"
          />
          {status.statusText && (
              <p className="px-2 text-center py-4 border-b">{status.statusText}</p>
          )}
          {statusSetted && (
              <p className="px-2 text-center py-4 border-b">{statusSetted}</p>
          )}
          <p className="mt-2 text-sm">
              Uploaded at {status.time}
          </p>
          {(status.statusText.length === 0) && (statusSetted.length === 0) && (
              <form onSubmit={handleAddStatusText} className="bg-blue-200 mt-2 p-3 rounded flex">
                <input 
                    type="text" 
                    placeholder="Type text status" 
                    className="outline-none py-1 flex-grow" 
                    onChange={e => setStatusText(e.target.value)} 
                />
                <button className="bg-green-500 py-1 px-2 text-sm text-white rounded-r">
                    Add
                </button>
              </form>
          )}
          {status.seenByPartner && !isPartnerStatus && (
            <p className="text-green-500 mt-1">
                Seen by { status.name === 'Mani' ? 'Chinnu' : 'Mani' } at { status.seenByPartnerTime }
            </p>
           )}
           {!isPartnerStatus && (
               <button 
                    className="bg-red-500 py-1 px-2 text-sm text-white rounded mt-2"
                    onClick={() => deleteStatus(status.id)}
                >
                    Delete Status
                </button>
           )}
        </>
    )
}

export default Image