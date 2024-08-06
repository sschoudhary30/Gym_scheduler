import { useEffect, useState } from 'react'
import classes from './All.module.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import l1 from '../../assets/l1.jpg'
import l2 from '../../assets/l2.webp'
import r1 from '../../assets/r1.jpg'

const Gymdet = () => {

    const location = useLocation();
    const [data, setdata] = useState(null);

    useEffect(() => {
        console.log(location.state.name);
        const name = location.state.name;
        axios
            .get("https://gym-scheduler-01.onrender.com/gym_details", {
                params: { name: name }
            })
            .then((res) => {
                setdata(res.data[0]);
                console.log(res.data[0]);
            })
            .catch((error) => {
                console.error("Error while making the POST request:", error);
            });
    }, [])
    return (
        <div className={classes.mm}>
            {
                (data !== null) ? <div className={classes.datan}>
                    <h1 className={classes.head}>About our gym</h1>
                    <div className={classes.covern}>
                        <div className={classes.sub}>
                            <label htmlFor='user'>USERNAME : </label>
                            <h1 className={classes.p1} id='user'>{data.USERNAME}</h1>
                        </div>
                        <div className={classes.sub}>
                            <label htmlFor='name'>NAME OF GYM : </label>
                            <h1 className={classes.p1} id='name'>{data.NAME}</h1>
                        </div>
                        <div className={classes.sub}>
                            <label htmlFor='location'>LOCATION OF GYM : </label>
                            <h1 className={classes.p1} id='location'>{data.ADDRESS}</h1>
                        </div>
                        <div className={classes.sub}>
                            <label htmlFor='ocontact'>CONTACT THE OWNER AT : </label>
                            <h1 className={classes.p1} id='ocontact'>{data.OCONTACT}</h1>
                        </div>
                        <div className={classes.sub}>
                            <label htmlFor='rcontact'>CONTACT THE RECEPTIONIST AT : </label>
                            <h1 className={classes.p1} id='rcontact'>{data.RCONTACT}</h1>
                        </div>
                    </div>
                </div>
                    : <div className={classes.data}>
                        <h1 className={classes.load}>Loading...</h1>
                    </div>
            }
            <div className={classes.k}>
            <img src={l1} alt='' className={classes.l1} />
            <img src={l2} alt='' className={classes.l2} />
            <img src={r1} alt='' className={classes.r1} />
            </div>
        </div>
    )
}

export default Gymdet
