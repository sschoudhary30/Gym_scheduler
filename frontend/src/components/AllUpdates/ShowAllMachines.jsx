import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import classes from './All.module.css'
import axios from "axios";

const ShowAllMachines = () => {
    const location = useLocation();
    const [data, setdata] = useState(null);

    useEffect(() => {
        console.log(location.state.name);
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
  return (
    <>           
            {
                (data !== null) ? <div className={classes.data}>
                    <h1 className={classes.head}>All Machines</h1>
                    <table className={classes.table}>
                        <tr className={classes.tr}>
                            <th className={classes.th1}>MACHINE ID</th>
                            <th className={classes.th1}>MACHINE NAME</th>
                            <th className={classes.th1}>BODY PART</th>
                            <th className={classes.th1}>TOTAL NAME</th>
                        </tr>
                        {
                            data.map((e, idx) => {
                                return <tr key={idx} className={classes.tr}>
                                    <td className={classes.th}>{e.MACHINE_ID}</td>
                                    <td className={classes.th}>{e.MACHINE_NAME}</td>
                                    <td className={classes.th}>{e.BODY_PART}</td>
                                    <td className={classes.th}>{e.TOT_ITEMS}</td>
                                </tr>
                            })
                        }
                    </table>
                        
                </div>
                    : <div className={classes.data}>
                        <h1 className={classes.load}>Loading...</h1>
                    </div>
            }
        </>
  )
}

export default ShowAllMachines
