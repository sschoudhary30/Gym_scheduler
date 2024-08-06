import classes from './Homepage.module.css'
import back from '../../assets/back2.jpg'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {

  const [name, setname] = useState("");
  const [pass, setpass] = useState("");
  const navigate = useNavigate();

  const HandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://gym-scheduler-01.onrender.com/register", {
        name: name,
        password: pass
      })
      .then(() => {
        alert("Account create Successfully!!")
        navigate(`/main/${name}`, { state: { name: name } })
      })
      .catch((error) => {
        console.error("Error while making the POST request:", error);
        alert("Caanot create account, try again by a different usename")
        setname("")
        setpass("")
      });
  }

  const HandleIt = () => {
    navigate(`/Login`)
  }
  return (
    <div className={classes.body}>

      <img src={back} alt='' className={classes.back} />
      <h1 className={classes.h2}>NEVER GIVE UP!!</h1>

      {/* form */}
      <div className={classes.register}>
        <h1 className={classes.h1}>Create an Account</h1>

        <form className={classes.form}>
          <label htmlFor='name' className={classes.label}>Gym Name</label>
          <input type='text' name='name' placeholder='TrainMe' required value={name} className={classes.input} onChange={(e) => { setname(e.target.value) }} />
          <label htmlFor='password' className={classes.label}>Password</label>
          <input type='password' name='password' value={pass} required className={classes.input} onChange={(e) => { setpass(e.target.value) }} />

          <input type='submit' value='Create Account' className={classes.submit} onClick={HandleSubmit} />

          <div className={classes.line}></div>
          <p className={classes.ask}>Already have an account? <span className={classes.span} onClick={HandleIt}>Sign In</span></p>
        </form>
      </div>
    </div>
  )
}

export default Homepage
