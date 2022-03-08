import { useRef, useState, useContext } from "react";
import { AuthContext } from './../contexts/AuthContext'
import getTime from './../utils/time'
import { ReactComponent as HangupIcon } from "./icons/hangup.svg";
import { ReactComponent as CopyIcon } from "./icons/copy.svg";
import firebase from '../utils/firebase';

import { firestore } from '../utils/firebase'

import './videocall.css'

// Initialize WebRTC
const servers = {
    iceServers: [
        {
            urls: [
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
            ],
        },
    ],
    iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

function VideoCall() {
    /// const [currentPage, setCurrentPage] = useState("hom");
    const [joinCode, setJoinCode] = useState("");

    return (
        <div className="app">
            {/* {currentPage === "home" ? (
                <Menu
                    joinCode={joinCode}
                    setJoinCode={setJoinCode}
                    setPage={setCurrentPage}
                />
            ) : ( */}
                <Videos
                    /// mode={currentPage}
                    //callId={joinCode}
                    /// setPage={setCurrentPage}
                />
            {/* )} */}
        </div>
    );
}

// function Menu({ joinCode, setJoinCode, setPage }) {
//     return (
//         <div className="home">
//             <div className="create box">
//                 <button onClick={() => setPage("create")}>Create Call</button>
//             </div>

//             <div className="answer box">
//                 <input
//                     value={joinCode}
//                     style={{ padding: '7px 20px' }}
//                     onChange={(e) => setJoinCode(e.target.value)}
//                     placeholder="Join with code"
//                 />
//                 <button onClick={() => setPage("join")}>Answer</button>
//             </div>
//         </div>
//     );
// }

function Videos({ mode, callId, setPage }) {
    const [webcamActive, setWebcamActive] = useState(false);
    const [roomId, setRoomId] = useState(callId);
    const { name } = useContext(AuthContext);

    const localRef = useRef();
    const remoteRef = useRef();

    const setupSources = async () => {
        const localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        const remoteStream = new MediaStream();

        localStream.getTracks().forEach((track) => {
            pc.addTrack(track, localStream);
        });

        pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track);
            });
        };

        localRef.current.srcObject = localStream;
        remoteRef.current.srcObject = remoteStream;

        setWebcamActive(true);

        if (mode === "create") {
            const callDoc = firestore.collection("calls").doc();
            const offerCandidates = callDoc.collection("offerCandidates");
            const answerCandidates = callDoc.collection("answerCandidates");

            // firebase.ref("Loggins");

            setRoomId(callDoc.id);

            pc.onicecandidate = (event) => {
                event.candidate &&
                    offerCandidates.add(event.candidate.toJSON());
            };

            const offerDescription = await pc.createOffer();
            await pc.setLocalDescription(offerDescription);

            const offer = {
                sdp: offerDescription.sdp,
                type: offerDescription.type,
            };

            await callDoc.set({ offer });

            callDoc.onSnapshot((snapshot) => {
                const data = snapshot.data();
                if (!pc.currentRemoteDescription && data?.answer) {
                    const answerDescription = new RTCSessionDescription(
                        data.answer
                    );
                    pc.setRemoteDescription(answerDescription);
                }
            });

            answerCandidates.onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        const candidate = new RTCIceCandidate(
                            change.doc.data()
                        );
                        pc.addIceCandidate(candidate);
                    }
                });
            });
        } else if (mode === "join") {
            const callDoc = firestore.collection("calls").doc(callId);
            const answerCandidates = callDoc.collection("answerCandidates");
            const offerCandidates = callDoc.collection("offerCandidates");

            pc.onicecandidate = (event) => {
                event.candidate &&
                    answerCandidates.add(event.candidate.toJSON());
            };

            const callData = (await callDoc.get()).data();

            const offerDescription = callData.offer;
            await pc.setRemoteDescription(
                new RTCSessionDescription(offerDescription)
            );

            const answerDescription = await pc.createAnswer();
            await pc.setLocalDescription(answerDescription);

            const answer = {
                type: answerDescription.type,
                sdp: answerDescription.sdp,
            };

            await callDoc.update({ answer });

            offerCandidates.onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        let data = change.doc.data();
                        pc.addIceCandidate(new RTCIceCandidate(data));
                    }
                });
            });
        }

        pc.onconnectionstatechange = (event) => {
            if (pc.connectionState === "disconnected") {
                hangUp();
            }
        };
    };

    const hangUp = async () => {

        pc.close();

        if (roomId) {
            let roomRef = firestore.collection("calls").doc(roomId);
            await roomRef
                .collection("answerCandidates")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    });
                });
            await roomRef
                .collection("offerCandidates")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    });
                });

            await roomRef.delete();
        }

        window.location.reload();
    };

    return (
        <div className="videos">
            <video
                ref={localRef}
                autoPlay
                playsInline
                className="local"
                muted
            />
            <video ref={remoteRef} autoPlay playsInline className="remote" />
            <div className="buttonsContainer">
                <button
                    onClick={hangUp}
                    disabled={!webcamActive}
                    className="hangup button"
                    
                >
                    <HangupIcon />
                </button>
                <div tabIndex={0} role="button" className="more button" onClick={() => {
                    const chatRef = firebase.database().ref('Chats');
                    chatRef.push({ name, type: "text", text: `Video call join id: ${roomId}`, time: getTime() })
                    .then(res => {
                        console.log('SENT WAIT')
                    })
                    .catch(err => console.log(err))
                }}>
                    <CopyIcon />
                    {/* <div className="popover">
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(roomId);
                            }}
                        >
                            <CopyIcon /> Copy joining code
                        </button>
                    </div> */}
                </div>
            </div>

            {!webcamActive && (
                <div className="modalContainer">
                    <div className="modal">
                        <h3>
                            Turn on your camera and microphone Chinnu Bangaram and start the
                            call 
                        </h3>
                        <div className="container">
                            <button
                                onClick={() => setPage("home")}
                                className="secondary"
                            >
                                Cancel
                            </button>
                            <button onClick={setupSources}>Start</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VideoCall;
