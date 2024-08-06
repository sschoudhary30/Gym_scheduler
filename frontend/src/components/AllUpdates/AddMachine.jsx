import { useState, useEffect} from 'react';
import classes from './All.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import r2 from '../../assets/r2.jpg'

const AddMachine = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [machineID, setmachineID] = useState("");
    const [machineName, setMachineName] = useState("");
    const [bodypart, setbodypart] = useState("");
    const [totalitems, settotal] = useState(0);
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

    const HandleSubmit = (e) => {
        e.preventDefault();

        var a = false;
        for(var i = 0 ; i < data.length ; i ++){
          if(data[i].MACHINE_ID === machineID){
            a = true;
            break;
          }
        }

        if(a === true){
          axios
        .post("https://gym-scheduler-01.onrender.com/update_machine", {
          id: machineID,
          username: location.state.name,
          total: totalitems
        })
        .then(() => {
          alert("Details of machine updated Successfully!!")
          navigate(`/${location.state.name}`, {state:{name:location.state.name}})
        })
        .catch((error) => {
          console.error("Error while making the POST request:", error);
          alert("some error, cannot add new machine!! try again");
        });
        }else{
          axios
        .post("https://gym-scheduler-01.onrender.com/add_machine", {
          id: machineID,
          username: location.state.name,
          name: machineName,
          bodypart: bodypart,
          total: totalitems
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
      }

  return (
    <div className={classes.machine}>
        <div className={classes.min}>
            <h1 className={classes.head}>Add New Machine</h1>
        <form className={classes.gym}>
            <label htmlFor='id' className={classes.label}>Enter MachineID : </label>
                <input type='text' name='id' placeholder='M001' required value={machineID} className={classes.input1} onChange={(e) => {setmachineID(e.target.value)}}/>

                <label htmlFor='name' className={classes.label}>Name Of Machine</label>
                <input type='text' name='name'value={machineName} required className={classes.input1} placeholder='ABC' onChange={(e) => {setMachineName(e.target.value)}}/>

                <label htmlFor='body' className={classes.label}>Body part to train : </label>
                <input type='text' name='body' placeholder='arm muscles' value={bodypart} className={classes.input1} onChange={(e) => {setbodypart(e.target.value)}}/>

                <label htmlFor='total' className={classes.label}>Total number of Machines : </label>
                <input type='number' name='total'value={totalitems} required className={classes.input1} placeholder='0' onChange={(e) => {settotal(e.target.value)}}/>


                <input type='submit' value='Add New Machine' className={classes.submit1} onClick={HandleSubmit}/>
            </form>
        </div>
        <img src={r2} className={classes.r1m} alt=''/>
    </div>
  )
}

export default AddMachine
