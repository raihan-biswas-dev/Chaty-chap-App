import React, { useState, useEffect } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Alert } from '@mui/material';

export default function FriendRequest() {
    const db = getDatabase();
    const auth = getAuth();


    const [friendReq, setFriendReq] = useState([])
    // let [message, setMessage] = useState('')
    let friendReqArr = []

    useEffect(() => {
        const friendReqRefRef = ref(db, 'friendRequest/');
        onValue(friendReqRefRef, (snapshot) => {
            const data = snapshot.val();

            friendReqArr = []
            snapshot.forEach((item) => {

                if (item.val().receiverId == auth.currentUser.uid) {
                    console.log(auth.currentUser.uid);
                    friendReqArr.push(
                        {
                            name: item.val().name,
                            receiverId: item.val().receiverId,
                            senderId: item.val().senderId,
                        })
                }

            })
            setFriendReq(friendReqArr);
        });
    }, [])



    return (
        <div>
            <div className='groupList'>
                <h2>Friend  Request</h2>
                {
                    friendReq.map(item => (
                        item.receiverId == auth.currentUser.uid &&
                        <div className="groupBox">
                            <div className="img">
                                <img src="assets/images/friend-1.png" alt="" />
                            </div>
                            <div className="name">
                                <h3>{item.name}</h3>
                                <p>Hi Guys, Wassup!</p>
                            </div>
                            <div className="button"><button>Accept</button></div>
                        </div>
                    ))}

                {friendReq.length == 0 &&
                    <Alert style={{ marginTop: '40px' }} severity="info">No Friend Request</Alert>
                }

            </div>
        </div>
    )
}