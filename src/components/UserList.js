import React, { useState, useEffect } from 'react'
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
export default function UserList() {

    const [friendReq, setFriendReq] = useState([])
    let friendReqArr = []
    const [userList, setUserList] = useState()
    const db = getDatabase();
    const auth = getAuth();

    useEffect(() => {
        let userArr = []
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {


            userArr = []
            snapshot.forEach((item) => {
                userArr.push(
                    {
                        username: item.val().username,
                        email: item.val().email,
                        id: item.key
                    }
                );
            })
            setUserList(userArr);
        });
    }, [])


    useEffect(() => {
        const friendReqRefRef = ref(db, 'friendRequest/');
        onValue(friendReqRefRef, (snapshot) => {
            const data = snapshot.val();

            friendReqArr = []
            snapshot.forEach((item) => {


                console.log(auth.currentUser.uid);
                friendReqArr.push(item.val().receiverId)


            })
            setFriendReq(friendReqArr);
        });
    }, [])


    console.log(friendReq)








    let handleFriendRequest = (userInfo) => {
        set(push(ref(db, 'friendRequest/')), {
            name: auth.currentUser.displayName,
            receiverId: userInfo.id,
            senderId: auth.currentUser.uid
        });
    }


    return (
        <div className='groupList friendList'>
            <h2>User List</h2>

            {userList && userList.map((item) => (

                auth.currentUser.uid !== item.id &&

                <div div className="groupBox" >
                    <div className="img">
                        <img src="assets/images/req-1.png" alt="" />
                    </div>
                    <div className="name">
                        <h3>{item.username}</h3>
                        <p>{item.id}</p>
                    </div>
                    {friendReq.includes(item.id) ?

                        <div className="button"><button><BsCheck /></button></div>

                        :

                        <div className="button"><button onClick={() => handleFriendRequest(item)}><AiOutlineUserAdd /></button></div>
                    }
                </div>
            ))
            }

        </div>
    )
}
