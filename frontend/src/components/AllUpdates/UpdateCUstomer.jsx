import { useEffect, useState } from "react"
import axios from "axios";
import { useLocation } from "react-router-dom";
import classes from './All.module.css'

const UpdateCUstomer = () => {
    const location = useLocation();
    const [name, setName] = useState(null);
    const [id, setId] = useState("")
    const [cust_det, setcust] = useState(null);
    const [schedule, getSchedule] = useState(null);
    const [newSchedule, setNewSchedule] = useState(null);

    // gym schedule
    const [M1, setM1] = useState(null);
    const [T1, SetT1] = useState(null);
    const [W1, SetW1] = useState(null);
    const [Th1, SetTh1] = useState(null);
    const [F1, SetF1] = useState(null);
    const [Su1, SetSu1] = useState(null);
    const [Sa1, SetSa1] = useState(null);

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

    const shedule = (time) => {
        axios
            .get("https://gym-scheduler-01.onrender.com/machine_details", {
                params: { name: location.state.name }
            })
            .then((res) => {
                if (time === "MORNING") {
                    setM1(res.data.filter((e) => e.MON_M < (e.TOT_ITEMS * 2)))

                    SetT1(res.data.filter((e) => e.TUES_M < (e.TOT_ITEMS * 2)))

                    SetW1(res.data.filter((e) => e.WED_M < (e.TOT_ITEMS * 2)))

                    SetTh1(res.data.filter((e) => e.THURS_M < (e.TOT_ITEMS * 2)))

                    SetF1(res.data.filter((e) => e.FRI_M < (e.TOT_ITEMS * 2)))

                    SetSa1(res.data.filter((e) => e.SAT_M < (e.TOT_ITEMS * 2)))

                    SetSu1(res.data.filter((e) => e.SUN_M < (e.TOT_ITEMS * 2)))
                }

                else {
                    setM1(res.data.filter((e) => e.MON_E < (e.TOT_ITEMS * 2)))

                    SetT1(res.data.filter((e) => e.TUES_E < (e.TOT_ITEMS * 2)))

                    SetW1(res.data.filter((e) => e.WED_E < (e.TOT_ITEMS * 2)))

                    SetTh1(res.data.filter((e) => e.THURS_E < (e.TOT_ITEMS * 2)))

                    SetF1(res.data.filter((e) => e.FRI_E < (e.TOT_ITEMS * 2)))

                    SetSa1(res.data.filter((e) => e.SAT_E < (e.TOT_ITEMS * 2)))

                    SetSu1(res.data.filter((e) => e.SUN_E < (e.TOT_ITEMS * 2)))
                }
            })
            .catch((error) => {
                console.error("Error while making the POST request:", error);
            });
    }

    const find = () => {
        if (id === null) { alert("Select customer ID") }
        else {
            axios
                .get("https://gym-scheduler-01.onrender.com/customer_details", {
                    params: { name: location.state.name, id: id }
                })
                .then((res) => {
                    setcust(res.data[0]);
                    shedule(res.data[0].TIME_SLOT)

                })
                .catch((error) => {
                    console.error("Error while making the POST request:", error);
                });

            axios
                .get("http://localhost:8081/customer_schedule", {
                    params: { name: location.state.name, id: id }
                })
                .then((res) => {
                    getSchedule(res.data[0]);
                    setNewSchedule(res.data[0]);
                })
                .catch((error) => {
                    console.error("Error while making the POST request:", error);
                });
        }

    }

    const onClick = () => {
        axios
            .post("https://gym-scheduler-01.onrender.com/update_customer", {
                username: location.state.name,
                id: cust_det.CUSTOMER_ID,
                name: cust_det.CUSTOMER_NAME,
                gender: cust_det.GENDER,
                address: cust_det.ADDRESS,
                medical: cust_det.MEDICAL,
                contact: cust_det.CONTACT,
                wt: cust_det.WEIGHT,
                ht: cust_det.HEIGHT,
                timeslot: cust_det.TIME_SLOT

            })
            .then(() => {
                alert("CUSTOMER DETAILS UPDATED SUCCESSFULLY!!");

            })
            .catch((error) => {
                console.error("Error while making the POST request:", error);
                alert("COULDN'T ADD CUSTOMER, TRY AGAIN WITH RIGHT DATA");
            });
    }

    const SubmitSchedule = () => {

        for (let [keya, value] of Object.entries(newSchedule)) {
            if (newSchedule[keya] !== schedule[keya]) {
                console.log(value + " => " + schedule[keya]);
                let col = "";
                if (keya.includes("MON")) {
                    col = "MON";
                } else if (keya.includes("TUES")) {
                    col = "TUES";
                } else if (keya.includes("WED")) {
                    col = "WED";
                } else if (keya.includes("THURS")) {
                    col = "THURS";
                } else if (keya.includes("FRI")) {
                    col = "FRI";
                } else if (keya.includes("SAT")) {
                    col = "SAT";
                } else {
                    col = "SUN";
                }
                if (cust_det.TIME_SLOT === "MORNING") {
                    col += "_M";
                } else {
                    col += "_E"
                }

                // add new item
                axios
                    .post("https://gym-scheduler-01.onrender.com/update_machine_on_schedule_i", {
                        id: value,
                        col: col,
                        username: location.state.name
                    })
                    .then(() => {
                    })
                    .catch((error) => {
                        console.error("Error while making the POST request:", error);
                        alert("couldn't update details, try again");
                    });

                // remove old item
                axios
                    .post("https://gym-scheduler-01.onrender.com/update_machine_on_schedule_d", {
                        id: schedule[keya],
                        col: col,
                        username: location.state.name
                    })
                    .then(() => {
                    })
                    .catch((error) => {
                        console.error("Error while making the POST request:", error);
                        alert("couldn't update details, try again");
                    });

            }
        }
        axios
            .post("https://gym-scheduler-01.onrender.com/update_schedule", {
                id: cust_det.CUSTOMER_ID,
                data: newSchedule,
                username: location.state.name

            })
            .then(() => {
                alert("SCHEDULE UPDATED SUCCESSFULLY!!");

            })
            .catch((error) => {
                console.error("Error while making the POST request:", error);
                alert("COULDN'T ADD CUSTOMER, TRY AGAIN WITH RIGHT DATA");
            });
    }

    return (
        <div className={classes.cnbodyn}>
            <h1 className={classes.headq}>Find a Customer</h1>
            {
                (name !== null) ? <div className={classes.night}>
                <div className={classes.cust_main}>
                        <h1 className={classes.h}>Enter CustomerID : </h1>
                        <div className={classes.clas}>
                        <select required onChange={(e) => { setId(e.target.value) }} className={classes.select}>
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
                                            <input className={classes.p11} id='name' value={cust_det.CUSTOMER_NAME} onChange={(e) => setcust({ ...cust_det, CUSTOMER_NAME: e.target.value })} />
                                        </div>
                                        <div className={classes.sub}>
                                            <label htmlFor='gender'>GENDER : </label>
                                            <input className={classes.p11} id='gender' value={cust_det.GENDER} onChange={(e) => setcust({ ...cust_det, GENDER: e.target.value })} />
                                        </div>
                                        <div className={classes.sub}>
                                            <label htmlFor='address'>ADDRESS : </label>
                                            <input className={classes.p11} id='address' value={cust_det.ADDRESS} onChange={(e) => setcust({ ...cust_det, ADDRESS: e.target.value })} />
                                        </div>
                                        <div className={classes.sub}>
                                            <label htmlFor='medical'>MEDICAL ISSUES : </label>
                                            <input className={classes.p11} id='medical' value={cust_det.MEDICAL} onChange={(e) => setcust({ ...cust_det, MEDICAL: e.target.value })} />
                                        </div>
                                        <div className={classes.sub}>
                                            <label htmlFor='contact'>CONTACT NUMBER : </label>
                                            <input className={classes.p11} id='contact' value={cust_det.CONTACT} onChange={(e) => setcust({ ...cust_det, CONTACT: e.target.value })} />
                                        </div>
                                        <div className={classes.sub}>
                                            <label htmlFor='wt'>WEIGHT OF CUSTOMER : </label>
                                            <input className={classes.p11} id='wt' value={cust_det.WEIGHT} onChange={(e) => setcust({ ...cust_det, WEIGHT: e.target.value })} />
                                        </div>
                                        <div className={classes.sub}>
                                            <label htmlFor='ht'>HEIGHT OF CUSTOMER : </label>
                                            <input className={classes.p11} id='ht' value={cust_det.HEIGHT} onChange={(e) => setcust({ ...cust_det, HEIGHT: e.target.value })} />
                                        </div>

                                        <div className={classes.sub}>
                                            <label htmlFor='time'>TIME SLOT : </label>
                                            {/* <select className={classes.p12} value={cust_det.TIME_SLOT} onChange={(e) => setcust({ ...cust_det, TIME_SLOT: e.target.value })}>
                                                <option value="MORNING">MORNING</option>
                                                <option value="EVENING">EVENING</option>
                                            </select> */}
                                            <p className={classes.p11} id='ht'>{cust_det.TIME_SLOT}</p>
                                        </div>

                                        <input className={classes.submitall} onClick={onClick} type="submit" value="UPDATE DETAILS" />
                                    </div>

                                    {
                                        (schedule === null) ? <></>
                                            : <div className={classes.part2}>
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
                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.MON1} onChange={(e) => setNewSchedule({ ...newSchedule, MON1: e.target.value })}>
                                                                    {
                                                                        (M1 !== null) ? M1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.TUES1} onChange={(e) => setNewSchedule({ ...newSchedule, TUES1: e.target.value })}>
                                                                    {
                                                                        (T1 !== null) ? T1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.WED1} onChange={(e) => setNewSchedule({ ...newSchedule, WED1: e.target.value })}>
                                                                    {
                                                                        (W1 !== null) ? W1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.THURS1} onChange={(e) => setNewSchedule({ ...newSchedule, THURS1: e.target.value })}>
                                                                    {
                                                                        (Th1 !== null) ? Th1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.FRI1} onChange={(e) => setNewSchedule({ ...newSchedule, FRI1: e.target.value })}>
                                                                    {
                                                                        (F1 !== null) ? F1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.SAT1} onChange={(e) => setNewSchedule({ ...newSchedule, SAT1: e.target.value })}>
                                                                    {
                                                                        (Sa1 !== null) ? Sa1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.SUN1} onChange={(e) => setNewSchedule({ ...newSchedule, SUN1: e.target.value })}>
                                                                    {
                                                                        (Su1 !== null) ? Su1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>


                                                        </tr>

                                                        <tr className={classes.ctr}>
                                                            <th className={classes.cth212}>SL - 2</th>
                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.MON2} onChange={(e) => setNewSchedule({ ...newSchedule, MON2: e.target.value })}>
                                                                    {
                                                                        (M1 !== null) ? M1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.TUES2} onChange={(e) => setNewSchedule({ ...newSchedule, TUES2: e.target.value })}>
                                                                    {
                                                                        (T1 !== null) ? T1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.WED2} onChange={(e) => setNewSchedule({ ...newSchedule, WED2: e.target.value })}>
                                                                    {
                                                                        (W1 !== null) ? W1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.THURS2} onChange={(e) => setNewSchedule({ ...newSchedule, THURS2: e.target.value })}>
                                                                    {
                                                                        (Th1 !== null) ? Th1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.FRI2} onChange={(e) => setNewSchedule({ ...newSchedule, FRI2: e.target.value })}>
                                                                    {
                                                                        (F1 !== null) ? F1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.SAT2} onChange={(e) => setNewSchedule({ ...newSchedule, SAT2: e.target.value })}>
                                                                    {
                                                                        (Sa1 !== null) ? Sa1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.SUN2} onChange={(e) => setNewSchedule({ ...newSchedule, SUN2: e.target.value })}>
                                                                    {
                                                                        (Su1 !== null) ? Su1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>
                                                        </tr>

                                                        <tr className={classes.ctr}>
                                                            <th className={classes.cth212}>SL - 3</th>
                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.MON3} onChange={(e) => setNewSchedule({ ...newSchedule, MON3: e.target.value })}>
                                                                    {
                                                                        (M1 !== null) ? M1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.TUES3} onChange={(e) => setNewSchedule({ ...newSchedule, TUES3: e.target.value })}>
                                                                    {
                                                                        (T1 !== null) ? T1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.WED3} onChange={(e) => setNewSchedule({ ...newSchedule, WED3: e.target.value })}>
                                                                    {
                                                                        (W1 !== null) ? W1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.THURS3} onChange={(e) => setNewSchedule({ ...newSchedule, THURS3: e.target.value })}>
                                                                    {
                                                                        (Th1 !== null) ? Th1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.FRI3} onChange={(e) => setNewSchedule({ ...newSchedule, FRI3: e.target.value })}>
                                                                    {
                                                                        (F1 !== null) ? F1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.SAT3} onChange={(e) => setNewSchedule({ ...newSchedule, SAT3: e.target.value })}>
                                                                    {
                                                                        (Sa1 !== null) ? Sa1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.SUN3} onChange={(e) => setNewSchedule({ ...newSchedule, SUN3: e.target.value })}>
                                                                    {
                                                                        (Su1 !== null) ? Su1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>
                                                        </tr>

                                                        <tr className={classes.ctr}>
                                                            <th className={classes.cth212}>SL - 4</th>
                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.MON4} onChange={(e) => setNewSchedule({ ...newSchedule, MON4: e.target.value })}>
                                                                    {
                                                                        (M1 !== null) ? M1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.TUES4} onChange={(e) => setNewSchedule({ ...newSchedule, TUES4: e.target.value })}>
                                                                    {
                                                                        (T1 !== null) ? T1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.WED4} onChange={(e) => setNewSchedule({ ...newSchedule, WED4: e.target.value })}>
                                                                    {
                                                                        (W1 !== null) ? W1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.THURS4} onChange={(e) => setNewSchedule({ ...newSchedule, THURS4: e.target.value })}>
                                                                    {
                                                                        (Th1 !== null) ? Th1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.FRI4} onChange={(e) => setNewSchedule({ ...newSchedule, FRI4: e.target.value })}>
                                                                    {
                                                                        (F1 !== null) ? F1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.SAT4} onChange={(e) => setNewSchedule({ ...newSchedule, SAT4: e.target.value })}>
                                                                    {
                                                                        (Sa1 !== null) ? Sa1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>

                                                            <td className={classes.cth2}>
                                                                <select className={classes.sh} value={newSchedule.SUN4} onChange={(e) => setNewSchedule({ ...newSchedule, SUN4: e.target.value })}>
                                                                    {
                                                                        (Su1 !== null) ? Su1.map((e, idx) => {
                                                                            return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                                                                        })
                                                                            : <></>
                                                                    }
                                                                </select>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                                <input type="submit" className={classes.submitall} value="ADD SCHEDULE" onClick={SubmitSchedule} />
                                            </div>
                                    }
                                </div>
                            </div>
                    }
                </div>
                    : <></>
            }
        </div>
    )
}

export default UpdateCUstomer
