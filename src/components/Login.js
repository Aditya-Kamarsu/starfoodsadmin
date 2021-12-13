import React from 'react'
import { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom';
const Login=()=>{
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    let navigate = useNavigate();
    const paperStyle={padding :20,height:'50vh',width:500, margin:"200px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'10px 0'}
    
    const handleEmailFieldChange = (e) => {
        setEmail(
            e.target.value
        )
        console.log(email);
    }
    const handlePasswordFieldChange = (e) => {
        setPassword(e.target.value)
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/adminlogin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        });
        const json = await response.json()
        console.log(json.authToken);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token',json.authToken); 
            navigate('/adminDashBoard');
        }
        else{
            alert("Invalid credentials");
        }
    }
    return(
        
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <Formik  onSubmit={onSubmit} >
                    {(props) => (
                <Form>
                    <Field as={TextField} fullWidth name='email' type="email" label='Email'  onChange={handleEmailFieldChange} value={email} placeholder="Enter your email" required helperText={<ErrorMessage name="email" />} />
                    
                    <Field as={TextField} fullWidth name='password' type="password" label='Password'  onChange={handlePasswordFieldChange} value={password} placeholder="Enter your password" helperText={<ErrorMessage name="password" />} />
                    <Field as={FormControlLabel} name='remember'
                        control={
                            <Checkbox color="primary"/>
                                }
                                label="Remember me"
                            /><br /><br />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} disabled={props.isSubmitting} onClick={onSubmit}>{props.isSubmitting ? "Loading" : "Sign in"}</Button>
                </Form>
                )}
                </Formik>
                <Typography >
                <Link href="#" >Forgot password ?</Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="#" >Sign Up </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login