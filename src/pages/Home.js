import React, { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Alert, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import LeftUserBar from '../components/LeftUserBar';


export default function Home() {

    const auth = getAuth();
    let navigate = useNavigate();

    const [emailVerify, setEmailVerify] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmailVerify(user.emailVerified)
                // ...
            } else {
                navigate('/login')
            }
        });
    }, [])


    return (

        <>
            {emailVerify ?

                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <LeftUserBar active='home' />
                    </Grid>
                    <Grid item xs={4}>
                        left middle
                    </Grid>
                    <Grid item xs={3}>
                        friend
                    </Grid>
                    <Grid item xs={3}>
                        user list
                    </Grid>
                </Grid>

                :

                <Grid container spacing={2}>

                    <Grid item xs={4}>

                    </Grid>
                    <Grid item xs={4}>
                        <Alert variant="filled" severity="info">
                            Please check your mail for verify your account!
                        </Alert>
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                </Grid>

            }
        </>
    )
}
