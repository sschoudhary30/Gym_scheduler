import { useEffect, useState } from "react"
import axios from "axios";
import { useLocation } from "react-router-dom";
import classes from './All.module.css'

const ShowCustomer = () => {
    const location = useLocation();
    const [name, setName] = useState(null);
    const [id, setId] = useState("")
    const [cust_det, setcust] = useState(null);
    const [schedule, getSchedule] = useState(null);

    useEffect(() => {
        axios
            .get("https://gym-scheduler-01.onrender.com/customers", {
                params: { name: location.state.name }
            })
            .then((res) => {
                setName(res.data);
            })
            .catch((error) => {
                console.error("Error while making the POST request:", error);
            });
    }, [])

    const find = () => {
        if (id === null) { alert("Select customer ID") }
        else {
            console.log("here")
            axios
                .get("https://gym-scheduler-01.onrender.com/customer_details", {
                    params: { name: location.state.name, id: id }
                })
                .then((res) => {
                    setcust(res.data[0]);
                })
                .catch((error) => {
                    console.error("Error while making the POST request:", error);
                });

            axios
                .get("https://gym-scheduler-01.onrender.com/customer_schedule", {
                    params: { name: location.state.name, id: id }
                })
                .then((res) => {
                    getSchedule(res.data[0]);
                })
                .catch((error) => {
                    console.error("Error while making the POST request:", error);
                });
        }

    }

    return (
        <div className={classes.cnbody}>
            <h1 className={classes.headq}>Our Customers</h1>
            {
                (name !== null) ? <div className={classes.night}>
                <div className={classes.cust_main}>
                        <h1 className={classes.h}>Enter CustomerID : </h1>
                        <div className={classes.clas}>
                        <select required onChange={(e) => { setId(e.target.value) }} className={classes.selectmw}>
                        <option  value="" className={classes.opt}>CHOOSE</option>
                            {
                                name.map((e, idx) => {
                                    return <option key={idx} value={e.CUSTOMER_ID}>{e.CUSTOMER_ID}</option>
                                })
                            }
                        </select>

                        <input type="submit" className={classes.submita} onClick={find} value="FIND" />
                    </div>
                </div>
                    {
                        (cust_det === null || schedule === null) ? <></>
                            : <div className={classes.nowa}>
                                <div className={classes.dataq}>
                                    <h1 className={classes.head}>CUSTOMER DETAILS</h1>
                                    <div className={classes.covere}>
                                        <div className={classes.sub}>
                                            <label htmlFor='id'>CUSTOMER ID : </label>
                                            <p className={classes.p11} id="id">{cust_det.CUSTOMER_ID}</p>
                                        </div>
                                        <div className={classes.sub}>
                                            <label htmlFor='name'>NAME : </label>
                                            <p className={classes.p11} id='name'>{cust_det.CUSTOMER_NAME}</p>
                                        </div>
                                        <div className={classes.sub}>
                                            <label htmlFor='gender'>GENDER : </label>
                                            <p className={classes.p11} id='gender'>{cust_det.GENDER}</p>
                                        </div>
                                        <div className={classes.sub}>
                                            <label htmlFor='address'>ADDRESS : </label>
                                            <p className={classes.p11} id='address'>{cust_det.ADDRESS}</p>
                                        </div>
                                        <div className={classes.sub}>
                                            <label htmlFor='medical'>MEDICAL ISSUES : </label>
                                            <p className={classes.p11} id='medical'>{cust_det.MEDICAL}</p>
                                        </div>
                                        <div className={classes.sub}>
                                            <label htmlFor='contact'>CONTACT NUMBER : </label>
                                            <p className={classes.p11} id='contact'>{cust_det.CONTACT}</p>
                                        </div>
                                        <div className={classes.sub}>
                                            <label htmlFor='wt'>WEIGHT OF CUSTOMER : </label>
                                            <p className={classes.p11} id='wt'>{cust_det.WEIGHT} Kg</p>
                                        </div>
                                        <div className={classes.sub}>
                                            <label htmlFor='ht'>HEIGHT OF CUSTOMER : </label>
                                            <p className={classes.p11} id='ht'>{cust_det.HEIGHT} cm</p>
                                        </div>

                                        <div className={classes.sub}>
                                            <label htmlFor='time'>TIME SLOT : </label>
                                            <p className={classes.p11} id='ht'>{cust_det.TIME_SLOT}</p>
                                        </div>
                                    </div>

                                    <div className={classes.part2}>
                                        <h1 className={classes.head}>CUSTOMER'S SCEDULE</h1>
                                        <table className={classes.tbla}>
                                            <thead>
                                                <tr className={classes.ctr}>
                                                    <th className={classes.cth212}></th>
                                                    <th className={classes.cth212}>MONDAY</th>
                                                    <th className={classes.cth212}>TUESDAY</th>
                                                    <th className={classes.cth212}>WEDNESDAY</th>
                                                    <th className={classes.cth212}>THURSDAY</th>
                                                    <th className={classes.cth212}>FRIDAY</th>
                                                    <th className={classes.cth212}>SATURDAY</th>
                                                    <th className={classes.cth212}>SUNDAY</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr className={classes.ctr}>
                                                    <th className={classes.cth212}>SL - 1</th>
                                                    <td className={classes.cth2q}>{schedule.MON1}</td>
                                                    <td className={classes.cth2q}>{schedule.TUES1}</td>
                                                    <td className={classes.cth2q}>{schedule.WED1}</td>
                                                    <td className={classes.cth2q}>{schedule.THURS1}</td>
                                                    <td className={classes.cth2q}>{schedule.FRI1}</td>
                                                    <td className={classes.cth2q}>{schedule.SAT1}</td>
                                                    <td className={classes.cth2q}>{schedule.SUN1}</td>
                                                </tr>

                                                <tr className={classes.ctr}>
                                                    <th className={classes.cth212}>SL - 2</th>
                                                    <td className={classes.cth2q}>{schedule.MON2}</td>
                                                    <td className={classes.cth2q}>{schedule.TUES2}</td>
                                                    <td className={classes.cth2q}>{schedule.WED2}</td>
                                                    <td className={classes.cth2q}>{schedule.THURS2}</td>
                                                    <td className={classes.cth2q}>{schedule.FRI2}</td>
                                                    <td className={classes.cth2q}>{schedule.SAT2}</td>
                                                    <td className={classes.cth2q}>{schedule.SUN2}</td>
                                                </tr>
                                                <tr className={classes.ctr}>
                                                    <th className={classes.cth212}>SL - 3</th>
                                                    <td className={classes.cth2q}>{schedule.MON3}</td>
                                                    <td className={classes.cth2q}>{schedule.TUES3}</td>
                                                    <td className={classes.cth2q}>{schedule.WED3}</td>
                                                    <td className={classes.cth2q}>{schedule.THURS3}</td>
                                                    <td className={classes.cth2q}>{schedule.FRI3}</td>
                                                    <td className={classes.cth2q}>{schedule.SAT3}</td>
                                                    <td className={classes.cth2q}>{schedule.SUN3}</td>
                                                </tr>

                                                <tr className={classes.ctr}>
                                                    <th className={classes.cth212}>SL - 4</th>
                                                    <td className={classes.cth2q}>{schedule.MON4}</td>
                                                    <td className={classes.cth2q}>{schedule.TUES4}</td>
                                                    <td className={classes.cth2q}>{schedule.WED4}</td>
                                                    <td className={classes.cth2q}>{schedule.THURS4}</td>
                                                    <td className={classes.cth2q}>{schedule.FRI4}</td>
                                                    <td className={classes.cth2q}>{schedule.SAT4}</td>
                                                    <td className={classes.cth2q}>{schedule.SUN4}</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
                    : <></>
            }
        </div>
    )
}

export default ShowCustomer
