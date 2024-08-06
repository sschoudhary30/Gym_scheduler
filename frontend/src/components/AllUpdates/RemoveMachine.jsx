import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import classes from './All.module.css'
import axios from "axios";

const RemoveMachine = () => {
    const location = useLocation();
    const [data, setdata] = useState(null);
    const [curID, setcurID] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://gym-scheduler-01.onrender.com/machine_details", {
                params: { name: location.state.name }
            })
            .then((res) => {
                setdata(res.data);
            })
            .catch((error) => {
                console.error("Error while making the POST request:", error);
            });
    }, [])

    const HandleSubmit = (e) => {
        e.preventDefault();

        axios
        .post("https://gym-scheduler-01.onrender.com/update_machine", {
          id: curID.MACHINE_ID,
          username: location.state.name,
          total: curID.TOT_ITEMS
        })
        .then(() => {
          alert("Data of new machine added Successfully!!")
          navigate(`/${location.state.name}`, {state:{name:location.state.name}})
        })
        .catch((error) => {
          console.error("Error while making the POST request:", error);
          alert("some error, cannot add new machine!! try again");
        });
    }
  return (
    <>
            
            {
                (data !== null) ? <div className={classes.data}>
                    <h1 className={classes.head}>Remove a Machine</h1>
                    <div className={classes.rm}>
                        <div className={classes.l}>
                        <label htmlFor="remove" className={classes.rla}>Select the Machine ID : </label>
                        <select onChange={(e) => {setcurID(data[e.target.value])}} className={classes.select}>
                        <option  value="" className={classes.opt}>CHOOSE</option>
                            {
                                data.map((e, idx) => {
                                    return <option key={idx} value={idx}>{e.MACHINE_ID}</option>
                                })
                            }
                        </select>
                        </div>
                        <h1 className={classes.mmk}>MACHINE NAME  :  {(curID !== null)?curID.MACHINE_NAME : ""}</h1>
                        <div className={classes.l}>
                        <label htmlFor="removem" className={classes.rla}>Set number of machines after removing machines : </label>
                        <input type="number" value={(curID !== null)?curID.TOT_ITEMS : 0} className={classes.inp} onChange={(e) => setcurID({ ...curID, TOT_ITEMS: e.target.value })}/>
                        </div>

                        <input type="submit" className={classes.submit} onClick={HandleSubmit} value="APPLY CHANGES"/>

                    </div>
                        
                </div>
                    : <div className={classes.data}>
                        <h1 className={classes.load}>Loading...</h1>
                    </div>
            }
        </>
  )
}

export default RemoveMachine
