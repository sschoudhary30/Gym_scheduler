import classes from './Homepage.module.css'
import back from '../../assets/back2.jpg'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [name, setname] = useState("");
    const [pass, setpass] = useState("");
    const navigate = useNavigate();

    const HandleSubmit = (e) => {
        e.preventDefault();
        axios
            .get("https://gym-scheduler-01.onrender.com/login", {
                params: { name: name, password: pass }
            })
            .then((res) => {
                console.log(res.data)
                if (res.data.length < 1) {
                    alert("Invalid credentials.. try again!!");
                    setname("")
                    setpass("")
                } else {
                    navigate(`../${name}`, { state: { name: name } })
                }

            })
            .catch((error) => {
                console.error("Error while making the POST request:", error);
                alert("Invalid credentials.. try again!!");
            });

        setname("")
        setpass("")
    }

    const handleIt = () => {
        navigate(`/`)
    }
    return (
        <div className={classes.body}>
            <img src={back} alt='' className={classes.back} />
            {/* form */}
            <div className={classes.register}>
                <h1 className={classes.h1}>Log In</h1>

                <form className={classes.form}>
                    <label htmlFor='name' className={classes.label}>UserName</label>
                    <input type='text' name='name' placeholder='TrainMe' required value={name} className={classes.input} onChange={(e) => { setname(e.target.value) }} />
                    <label htmlFor='password' className={classes.label}>Password</label>
                    <input type='password' name='password' value={pass} required className={classes.input} onChange={(e) => { setpass(e.target.value) }} />

                    <input type='submit' value='Login' className={classes.submit} onClick={HandleSubmit} />

                    <div className={classes.line}></div>
                    <p className={classes.ask}>Don't have an account? <span className={classes.span} onClick={handleIt}>Sign Up</span></p>
                </form>
            </div>
        </div>
    )
}

export default Login
