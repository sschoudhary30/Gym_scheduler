import { useNavigate, useLocation } from 'react-router-dom';
import classes from './Gym.module.css'
import customer from '../../assets/r2.jpg';
import gym from '../../assets/bg3.webp';
import machine from '../../assets/kind.jpg'
import { useState } from 'react';
import my from '../../assets/my.jpg'

const Gym = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const name = location.state.name;
    const [a, seta] = useState(false);
    const [b, setb] = useState(false);
    const [c, setc] = useState(false);

    const onClick1 = (ap) => {
        if (ap === "1") {
            seta(!a);
        } else if (ap === "2") {
            setb(!b);
        } else {
            setc(!c);
        }
    }

    const gym_details = () => {
        navigate(`/${name}/gym_details`, { state: { name: name } })
    }

    const update_gym_details = () => {
        navigate(`/${name}/update_gym_details`, { state: { name: name } })
    }

    const add_new_machine = () => {
        navigate(`/${name}/add_new_machine`, { state: { name: name } })
    }

    const remove_machine = () => {
        navigate(`/${name}/remove_machine`, { state: { name: name } })
    }

    const show_machine = () => {
        navigate(`/${name}/all_machine`, { state: { name: name } })
    }

    const add_new_customer = () => {
        navigate(`/${name}/add_new_customer`, { state: { name: name } })
    }

    const customer_details = () => {
        navigate(`/${name}/customer_details`, { state: { name: name } })
    }

    const update_customer = () => {
        navigate(`/${name}/update_customer_details`, { state: { name: name } })
    }
    return (
        <div className={classes.main}>
        <img src={my} alt='' className={classes.my}/>
        <div className={classes.body}>
            <div className={classes.bod}>
                <img src={machine} className={classes.immg} alt="" onClick={() => onClick1("2")} />
                <h1 className={classes.h1}>MACHINE DETAILS</h1>
                <div className={`${(b === true) ? classes.come : classes.go}`}>
                    <button className={classes.b1} onClick={show_machine}>DISPLAY EXISTING MACHINES</button>
                    <button className={classes.b1} onClick={add_new_machine}>ADD A MACHINE</button>
                    <button className={classes.b1} onClick={remove_machine}>REMOVE A MACHINE</button>
                </div>

            </div>

            <div className={classes.bod}>
                <img src={gym} className={classes.immg} alt="" onClick={() => onClick1("1")} />
                <h1 className={classes.h1}>GYM DETAILS</h1>
                <div className={`${(a === true) ? classes.come : classes.go}`}>
                    <button className={classes.b1} onClick={gym_details}>DISPLAY DETAILS OF GYM</button>
                    <button className={classes.b1} onClick={update_gym_details}>UPDATE DETAILS OF GYM</button>
                </div>
            </div>

            <div className={classes.bod}>
                <img src={customer} className={classes.immg} alt="" onClick={() => onClick1("3")} />
                <h1 className={classes.h1}>CUSTOMER DETAILS</h1>
                <div className={`${(c === true) ? classes.come : classes.go}`}>
                    <button className={classes.b1} onClick={add_new_customer}>ADD A CUSTOMER</button>
                    <button className={classes.b1} onClick={customer_details}>SHOW DETAILS OF A CUSTOMER</button>
                    <button className={classes.b1} onClick={update_customer}>UPDATE CUSTOMER DETAILS</button>
                </div>
            </div>

        </div>
        </div>
    )
}

export default Gym