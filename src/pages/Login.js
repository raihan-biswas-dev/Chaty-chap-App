import React, { useState } from 'react'
import { Grid, TextField, Button, Collapse, Alert, IconButton } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import CloseIcon from '@mui/icons-material/Close';





function Login() {

    const auth = getAuth();
    let navigate = useNavigate();

    const [open, setOpen] = React.useState(false);


    let [wrongEmailErr, setWrongtemailErr] = useState('')
    let [wrongPasswordErr, setWrongPasswordErr] = useState('')

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    let [emailErr, setEmailErr] = useState('')
    let [passwordErr, setPasswordErr] = useState('')
    let [passwordLengthErr, setPasswordLengthErr] = useState('')
    let [checkPassword, setCheckPassword] = useState(false)


    let handleSubmit = (e) => {
        if (!email) {
            setEmailErr("Please enter your email")
        } else if (!password) {
            setPasswordErr('Enter your password')
            setEmailErr('')
        } else if (password.length < 8) {
            setPasswordLengthErr('Password must be greater than 8 character')
            setPasswordErr('')
        } else {
            setPasswordLengthErr('')
            signInWithEmailAndPassword(auth, email, password).then((user) => {
                console.log(user)
                navigate('/home')
            }).catch((error) => {
                console.log(error)
                const errorCode = error.code
                console.log(errorCode)

                if (errorCode.includes('user')) {
                    setWrongtemailErr('Email Not Found, Try Again')
                    setOpen(true)
                    setWrongPasswordErr('')
                } else if (errorCode.includes('password')) {
                    setWrongPasswordErr('Password Does not Match')
                    setOpen(true)
                    setWrongtemailErr('')
                }
            })

        }
    }

    let handleEyeIcon = () => {
        setCheckPassword(!checkPassword)
    }

    let handleGoogleSignin = () => {
        console.log('hmm google click')
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                navigate('/home')
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }



    let handleFacebookSignin = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
            
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            console.log('ami thik achi')
            navigate('/home')
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);

                // ...
            });

    }

    return (
        <div>
            <section className='login-part'>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div className="box">
                            <div className='left'>
                                <h2>Login to your account!</h2>



                                <div className='social-login'>
                                    <div onClick={handleGoogleSignin} className="option"> <img src="./assets/images/google.png" alt="" /> Login with Google</div>
                                    <div onClick={handleFacebookSignin} className="option"> <img src="./assets/images/facebook.png" alt="" /> Login with Facebook</div>
                                </div>

                                <Collapse style={{ marginTop: '15px' }} in={open}>
                                    <Alert variant="filled" severity="error"
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => {
                                                    setOpen(false);
                                                }}
                                            >
                                                <CloseIcon className='closeIconBtn' fontSize="inherit" />
                                            </IconButton>
                                        }
                                        sx={{ mb: 2 }}
                                    >
                                        {wrongEmailErr ? wrongEmailErr : wrongPasswordErr && wrongPasswordErr}
                                    </Alert>
                                </Collapse>
                                <TextField
                                    helperText={emailErr}
                                    id="demo-helper-text-misaligned"
                                    label="Email Addres"
                                    style={{ width: '368px', marginTop: '34px' }}
                                    type='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                /><br />

                                <div className="eyeShowHide">
                                    <TextField
                                        helperText={passwordErr ? passwordErr : passwordLengthErr ? passwordLengthErr : ''}
                                        id="demo-helper-text-misaligned"
                                        label="Password"
                                        style={{ width: '368px', marginTop: '34px' }}
                                        type={checkPassword ? 'text' : 'password'}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    {checkPassword ? <AiFillEye onClick={handleEyeIcon} className='eyeIcon' /> :
                                        <AiFillEyeInvisible onClick={handleEyeIcon} className='eyeIcon' />
                                    }

                                    <br />
                                </div>

                                <Button
                                    style={{ width: '368px', padding: '18px 0', borderRadius: '8px', background: '#5F35F5', marginTop: '40px' }}
                                    variant="contained" onClick={handleSubmit}>Login to Continue</Button>
                                <p className='loginMsg'>Don’t have an account  ? <Link style={{ color: '#5F35F5', fontSize: '16px', fontWeight: '700' }} to='/'> Sign up</Link></p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <img style={{ width: '100%', height: '100vh' }} src="./assets/images/login.png" alt="" />
                    </Grid>
                </Grid>
            </section>
        </div>
    )
}

export default Login