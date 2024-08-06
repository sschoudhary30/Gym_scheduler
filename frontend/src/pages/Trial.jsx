import { useEffect, useState} from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {

  const[sno, setsno] = useState("");
  const[name, setname] = useState("");

  useEffect (() => {
    fetch('http://localhost:8081/')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

  }, [])

  const register = (e) => {
    e.preventDefault();
    console.log(sno,name)
  
    axios
      .post("http://localhost:8081/register", {
        sno: sno,
        name: name,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error while making the POST request:", error);
      });
  };

  return (
    <div>
      <form>
        <label htmlFor='sno'>SNO</label>
        <input type='text' name='sno' placeholder='sno' required onChange={(e) => {setsno(e.target.value)}}/>
        <label htmlFor='name'>NAME</label>
        <input type='text' name='name' placeholder='name' required onChange={(e) => {setname(e.target.value)}}/>
        <input type='submit' value="click to submit" onClick={register}/>
      </form>
    </div>
  )
}

export default App
