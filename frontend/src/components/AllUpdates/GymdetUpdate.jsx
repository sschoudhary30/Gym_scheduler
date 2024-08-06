import { useEffect, useState } from 'react'
import classes from './All.module.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import l1 from '../../assets/l1.jpg'
import l2 from '../../assets/l2.webp'
import r1 from '../../assets/r1.jpg'

const GymdetUpdate = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [data, setdata] = useState(null);

  useEffect(() => {
    console.log(location.state.name);
    axios
      .get("https://gym-scheduler-01.onrender.com/gym_details", {
        params: { name: location.state.name }
      })
      .then((res) => {
        setdata(res.data[0]);
      })
      .catch((error) => {
        console.error("Error while making the POST request:", error);
      });
  }, [])

  const onClick = () => {

    axios
      .post("https://gym-scheduler-01.onrender.com/update_gym_details", {
        name: data.NAME,
        address: data.ADDRESS,
        ocontact: data.OCONTACT,
        rcontact: data.RCONTACT,
        username: data.USERNAME
      })
      .then(() => {
        alert("Details updated successfully!!");
        navigate(`/${data.USERNAME}`, {state:{name:data.USERNAME}})
      })
      .catch((error) => {
        console.error("Error while making the POST request:", error);
        alert("couldn't update details, try again");
      });
  }
  return (
    <>
      {
        (data !== null) ? <div className={classes.datak}>
          <h1 className={classes.headk}>UPDATE GYM DETAILS</h1>
          <div className={classes.coverk}>
            <div className={classes.sub}>
              <label htmlFor='user'>USERNAME : </label>
              <h1 className={classes.p1} id='user'>{data.USERNAME}</h1>
            </div>
            <div className={classes.sub}>
              <label htmlFor='name'>NAME OF GYM : </label>
              <input className={classes.p11} id='name' type="text" value={data.NAME} onChange={(e) => setdata({ ...data, NAME: e.target.value })} />
            </div>
            <div className={classes.sub}>
              <label htmlFor='location'>LOCATION OF GYM : </label>
              <input className={classes.p11} id='location' type="text" value={data.ADDRESS} onChange={(e) => setdata({ ...data, ADDRESS: e.target.value })} />
            </div>
            <div className={classes.sub}>
              <label htmlFor='ocontact'>CONTACT THE OWNER AT : </label>
              <input className={classes.p11} id='ocontact' type="text" value={data.OCONTACT} onChange={(e) => setdata({ ...data, OCONTACT: e.target.value })} />
            </div>
            <div className={classes.sub}>
              <label htmlFor='rcontact'>CONTACT THE RECEPTIONIST AT : </label>
              <input className={classes.p11} id='rcontact' type="text" value={data.RCONTACT} onChange={(e) => setdata({ ...data, RCONTACT: e.target.value })} />
            </div>

            <input className={classes.submit} onClick={onClick} type="submit" value="UPDATE" />
          </div>
        </div>
          : <div className={classes.data}>
            <h1 className={classes.load}>Loading...</h1>
          </div>
      }
    </>
  )
}

export default GymdetUpdate
