import React, { useState, useEffect } from 'react'
import { AiOutlineHome, AiOutlineMessage, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { Box, Modal, Fade, Button, Typography, Backdrop } from '@mui/material';


export default function LeftUserBar(props) {



    const auth = getAuth();
    let navigate = useNavigate();
    const [name, setName] = useState('')

    const [open, setOpen] = React.useState(false);


    let handleSignOut = () => {
        signOut(auth).then(() => {
            console.log('Sign-out successful')
            navigate('/login')
        }).catch((error) => {
            console.lof(error)
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setName(user.displayName)
                // ...
            }
        });
    }, [])


    let handleProfileDetails = () => {
        setOpen(true)
    }

    let handleClose = () => {
        setOpen(false)
    }

    return (
        <div className='leftUserBar'>
            <img className='profileImg' src="assets/images/registrations.png" alt="" />
            <h4 onClick={handleProfileDetails}>{name}</h4>
            <div className='icons'>

                <ul>
                    <li className={props.active == 'home' && 'active'}>
                        <AiOutlineHome className='icon' />
                    </li>
                    <li className={props.active == 'msg' && 'active'}>
                        <AiOutlineMessage className='icon' />
                    </li>
                    <li className={props.active == 'notification' && 'active'}>
                        <IoMdNotificationsOutline className='icon' />
                    </li>
                    <li className={props.active == 'settings' && 'active'}>
                        <AiOutlineSetting className='icon' />
                    </li>
                    <li onClick={handleSignOut}>
                        <AiOutlineLogout className='icon' />
                    </li>
                </ul>
            </div>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    className='userModalMain'

                >
                    <Fade in={open}>
                        <Box className='userModalBox'>
                            <Typography id="transition-modal-title">
                                Text in a modal
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </div>
    )
}
