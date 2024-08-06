import { useLocation, useNavigate } from "react-router-dom"
import classes from './All.module.css'
import { useState, useEffect } from "react";
import axios from "axios";

const AddCustomer = () => {
  const location = useLocation();

  // CUSTOMER
  const [custID, setcustID] = useState("");
  const [custName, setCustName] = useState("");
  const [gender, setGender] = useState("");
  const [addres, setAddress] = useState("");
  const [medical, setMedical] = useState("");
  const [contact, setContact] = useState(0);
  const [wt, setwt] = useState(0);
  const [ht, setht] = useState(0);
  const [timeslot, settime] = useState("MORNING");

  useEffect(() => {
    shedule(timeslot)
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

  const onClick = () => {
    axios
      .post("https://gym-scheduler-01.onrender.com/add_new_customer", {
        username: location.state.name,
        id: custID,
        name: custName,
        gender: gender,
        address: addres,
        medical: medical,
        contact: contact,
        wt: wt,
        ht: ht,
        timeslot: timeslot

      })
      .then(() => {
        alert("CUSTOMER ADDED TO DATABASE SUCCESSFULLY!!");
        shedule(timeslot);

      })
      .catch((error) => {
        console.error("Error while making the POST request:", error);
        alert("COULDN'T ADD CUSTOMER, TRY AGAIN WITH RIGHT DATA");
      });
  }

  const SubmitSchedule = () => {

    for (let [keya, value] of Object.entries(newSchedule)) {
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
        if(timeslot === "MORNING"){
          col += "_M";
        }else{
          col += "_E";
        }

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
    }
    axios
      .post("https://gym-scheduler-01.onrender.com/add_schedule", {
        id: custID,
        data: newSchedule,
        username: location.state.name

      })
      .then(() => {
        alert("SCHEDULE ADDED SUCCESSFULLY!!");
        shedule(timeslot);

      })
      .catch((error) => {
        console.error("Error while making the POST request:", error);
        alert("COULDN'T ADD CUSTOMER, TRY AGAIN WITH RIGHT DATA");
      });
  }

  // gym schedule
  const [newSchedule, setNewSchedule] = useState([]);
  const [M1, setM1] = useState(null);
  const [T1, SetT1] = useState(null);
  const [W1, SetW1] = useState(null);
  const [Th1, SetTh1] = useState(null);
  const [F1, SetF1] = useState(null);
  const [Su1, SetSu1] = useState(null);
  const [Sa1, SetSa1] = useState(null);


  return (
    <div className={classes.datac}>
      <h1 className={classes.head}>ADD A CUSTOMER</h1>
      <div className={classes.cover}>
        <div className={classes.sub}>
          <label htmlFor='id'>CUSTOMER ID : </label>
          <input className={classes.p11} id='id' type="text" onChange={(e) => setcustID(e.target.value)} required />
        </div>
        <div className={classes.sub}>
          <label htmlFor='name'>NAME : </label>
          <input className={classes.p11} id='name' type="text" onChange={(e) => setCustName(e.target.value)} required />
        </div>
        <div className={classes.sub}>
          <label htmlFor='gender'>GENDER : </label>
          <input className={classes.p11} id='gender' type="text" onChange={(e) => setGender(e.target.value)} />
        </div>
        <div className={classes.sub}>
          <label htmlFor='address'>ADDRESS : </label>
          <input className={classes.p11} id='address' type="text" onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className={classes.sub}>
          <label htmlFor='medical'>MEDICAL ISSUES : </label>
          <input className={classes.p11} id='medical' type="text" onChange={(e) => setMedical(e.target.value)} />
        </div>
        <div className={classes.sub}>
          <label htmlFor='contact'>CONTACT NUMBER : </label>
          <input className={classes.p11} id='contact' type="tel" onChange={(e) => setContact(e.target.value)} />
        </div>
        <div className={classes.sub}>
          <label htmlFor='wt'>WEIGHT OF CUSTOMER : </label>
          <input className={classes.p11} id='wt' type="text" onChange={(e) => setwt(e.target.value)} />
        </div>
        <div className={classes.sub}>
          <label htmlFor='ht'>HEIGHT OF CUSTOMER : </label>
          <input className={classes.p11} id='ht' type="text" onChange={(e) => setht(e.target.value)} />
        </div>

        <div className={classes.sub}>
          <label htmlFor='time'>SELECT TIME SLOT : </label>
          <select className={classes.p121} onChange={(e) => { settime(e.target.value) }}>
            <option value="MORNING">MORNING</option>
            <option value="EVENING">EVENING</option>
          </select>
        </div>

        <input className={classes.submitall} onClick={onClick} type="submit" value="ADD" />
      </div>

      {
        (Su1 !== null) ? <div className={classes.part2}>
          <h1 className={classes.head}>ADD CUSTOMER'S SCEDULE</h1>
          <table className={classes.tbl}>
            <thead>
              <tr className={classes.ctr}>
                <th className={classes.cth21}></th>
                <th className={classes.cth21}>MONDAY</th>
                <th className={classes.cth21}>TUESDAY</th>
                <th className={classes.cth21}>WEDNESDAY</th>
                <th className={classes.cth21}>THURSDAY</th>
                <th className={classes.cth21}>FRIDAY</th>
                <th className={classes.cth21}>SATURDAY</th>
                <th className={classes.cth21}>SUNDAY</th>
              </tr>
            </thead>

            <tbody>
              <tr className={classes.ctr}>
                <th className={classes.cth21}>SL - 1</th>
                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, MON1: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (M1 !== null) ? M1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, TUES1: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (T1 !== null) ? T1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, WED1: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (W1 !== null) ? W1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, THURS1: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (Th1 !== null) ? Th1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, FRI1: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (F1 !== null) ? F1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, SAT1: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (Sa1 !== null) ? Sa1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, SUN1: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
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
                <th className={classes.cth21}>SL - 2</th>
                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, MON2: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (M1 !== null) ? M1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, TUES2: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (T1 !== null) ? T1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, WED2: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (W1 !== null) ? W1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, THURS2: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (Th1 !== null) ? Th1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, FRI2: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (F1 !== null) ? F1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, SAT2: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (Sa1 !== null) ? Sa1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, SUN2: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
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
                <th className={classes.cth21}>SL - 3</th>
                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, MON3: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (M1 !== null) ? M1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, TUES3: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (T1 !== null) ? T1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, WED3: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (W1 !== null) ? W1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, THURS3: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (Th1 !== null) ? Th1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, FRI3: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (F1 !== null) ? F1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, SAT3: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (Sa1 !== null) ? Sa1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, SUN3: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
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
                <th className={classes.cth21}>SL - 4</th>
                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, MON4: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (M1 !== null) ? M1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, TUES4: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (T1 !== null) ? T1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, WED4: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (W1 !== null) ? W1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, THURS4: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (Th1 !== null) ? Th1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, FRI4: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (F1 !== null) ? F1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, SAT4: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
                    {
                      (Sa1 !== null) ? Sa1.map((e, idx) => {
                        return <option key={idx} value={e.MACHINE_ID} className={classes.opt}>{e.MACHINE_ID}</option>
                      })
                        : <></>
                    }
                  </select>
                </td>

                <td className={classes.cth2}>
                  AVAILABLE MACHINES : <br />
                  <select required className={classes.sh} onChange={(e) => setNewSchedule({ ...newSchedule, SUN4: e.target.value })}>
                  <option  value="" className={classes.opt}>CHOOSE</option>
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

          <input type="submit" className={classes.submits} value="ADD SCHEDULE" onClick={SubmitSchedule} />
        </div>
          : <></>
      }
    </div>
  )
}

export default AddCustomer
