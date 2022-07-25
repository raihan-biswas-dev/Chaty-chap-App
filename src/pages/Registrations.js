import React, { useState } from 'react'
import { Grid, TextField, Button, Collapse, Alert, IconButton } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import CloseIcon from '@mui/icons-material/Close';

export default function Registrations() {

  const auth = getAuth();
  let navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [confirmPassword, setConfirmPassword] = useState('')

  let [nameErr, setNameErr] = useState('')
  let [emailErr, setEmailErr] = useState('')
  let [passwordErr, setPasswordErr] = useState('')
  let [confirmPasswordErr, setConfirmPasswordErr] = useState('')
  let [passwordLengthErr, setPasswordLengthErr] = useState('')
  let [matchPassword, setMatchPassword] = useState('')
  let [existEmailErr, setExistemailErr] = useState('')


  let handleSubmit = (e) => {
    console.log('password', password.length)
    if (!name) {
      setNameErr("Please enter your name")
    } else if (!email) {
      setEmailErr("Please enter your email")
      setNameErr('')
    } else if (!password) {
      setPasswordErr('Enter your password')
      setEmailErr('')
    } else if (password.length < 8) {
      setPasswordLengthErr('Password must be greater than 8 character')
      setPasswordErr('')
    } else if (!confirmPassword) {
      setConfirmPasswordErr('Enter your Confirm password')
      setPasswordLengthErr('')
    } else if (password !== confirmPassword) {
      setConfirmPasswordErr('')
      setMatchPassword('Password does not match')
    } else {
      setMatchPassword('')
      createUserWithEmailAndPassword(auth, email, password).then((user) => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log('Email verification sent!')

            updateProfile(auth.currentUser, {
              displayName: name,
            }).then(() => {
              console.log('Profile updated')
            }).catch((error) => {
              console.log(error)
            });
          });
        navigate('/login')
      }).catch((error) => {
        console.log(error)
        const errorCode = error.code;
        console.log(errorCode.includes('email'))
        console.log('errorCode', errorCode)

        if (errorCode.includes('email')) {
          setExistemailErr('Email Alrady In Use. Please try to use another email')
          setOpen(true)
        }
      })
    }
  }

  return (
    <div>
      <section className='registration-part'>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className="box">
              <div className='left'>
                <h2>Get started with easily register</h2>
                <p style={{ marginBottom: '20px' }}>Free register and you can enjoy it</p>

                <Collapse in={open}>
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
                    {existEmailErr}
                  </Alert>
                </Collapse>

                <TextField
                  helperText={nameErr}
                  id="demo-helper-text-misaligned"
                  label="Full Name"
                  style={{ width: '368px', marginTop: '34px' }}
                  type='text'
                  onChange={(e) => setName(e.target.value)}
                /><br />
                <TextField
                  helperText={emailErr}
                  id="demo-helper-text-misaligned"
                  label="Email Addres"
                  style={{ width: '368px', marginTop: '34px' }}
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                /><br />

                <TextField
                  helperText={passwordErr ? passwordErr : passwordLengthErr ? passwordLengthErr : ''}
                  id="demo-helper-text-misaligned"
                  label="Password"
                  style={{ width: '368px', marginTop: '34px' }}
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                /><br />
                <TextField
                  helperText={confirmPasswordErr ? confirmPasswordErr : matchPassword ? matchPassword : ''}
                  id="demo-helper-text-misaligned"
                  label="Confirm Password"
                  style={{ width: '368px', marginTop: '34px' }}
                  type='password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                /><br />

                <Button
                  style={{ width: '368px', padding: '18px 0', borderRadius: '86px', background: '#5F35F5', marginTop: '40px' }}
                  variant="contained" onClick={handleSubmit}>Sign up</Button>
                <p className='regMsg'>Already have an account  ? <Link style={{ color: '#5F35F5', fontSize: '16px', fontWeight: '700' }} to='/login'> LogIn</Link></p>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <img style={{ width: '100%', height: '100vh' }} src="./assets/images/registrations.png" alt="" />
          </Grid>
        </Grid>
      </section>
    </div>
  )
}
