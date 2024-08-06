import bg from '../../assets/final.jpg'
import { useState } from 'react'
import classes from './Homepage.module.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';

const GymDetail = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("")
  const [address, setaddress] = useState("")
  const [ocontact, setocontact] = useState("")
  const [rcontact, setrcontact] = useState("")
  const location = useLocation();

  const HandleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://gym-scheduler-01.onrender.com/register_tab", {
        name: name,
        username: location.state.name,
        address: address,
        ocontact: ocontact,
        rcontact: rcontact
      })
      .then(() => {
        alert("Account create Successfully!!")
        navigate(`../${location.state.name}`, { state: { name: location.state.name } })
      })
      .catch((error) => {
        console.error("Error while making the POST request:", error);
        alert("some error, cannot create all tables successfully");
      });
  }

  return (
    <div className={classes.gym_body}>
      <img className={classes.back1} alt='' src={bg} />
      <div className={classes.gym_form}>
      <h1 className={classes.cla}>Let's Start By Adding Some General Details</h1>
        <form className={classes.gym}>
          <label htmlFor='name' className={classes.label1}>Name Of Gym</label>
          <input type='text' name='name' placeholder='TrainMe' required value={name} className={classes.input1} onChange={(e) => { setname(e.target.value) }} />
          <label htmlFor='ocontact' className={classes.label1}>Contact Of Owner</label>
          <input type='tel' name='ocontact' value={ocontact} required className={classes.input1} placeholder='2222222222' onChange={(e) => { setocontact(e.target.value) }} />
          <label htmlFor='address' className={classes.label1}>Address Of Gym</label>
          <input type='text' name='address' placeholder='abc' value={address} className={classes.input1} onChange={(e) => { setaddress(e.target.value) }} />
          <label htmlFor='rcontact' className={classes.label1}>Contact Of Receptionist</label>
          <input type='tel' name='rcontact' value={rcontact} required className={classes.input1} placeholder='2222222222' onChange={(e) => { setrcontact(e.target.value) }} />


          <input type='submit' value='Add Information' className={classes.submit} onClick={HandleSubmit} />
        </form>
      </div>
    </div>
  )
}

export default GymDetail
